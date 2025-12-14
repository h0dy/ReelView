package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/auth"
	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/middleware"
)

type User struct { // User strut to hold json response
	ID        uuid.UUID `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Email     string    `json:"email"`
	IsPremium bool      `json:"is_premium"`
}

func (cfg *APIConfig) HandlerCreateUser(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Email    string `json:"email"`
		Username string `json:"username"`
		Password string `json:"password"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	params := reqBody{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&params); err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Internal server error", err)
		return
	}

	// check for any possible missing values
	if params.Email == "" || params.Username == "" || params.Password == "" {
		respondWithErr(w, http.StatusBadRequest, "Make sure to provide the missing credentials", nil)
		return
	}

	hashedPassword, err := auth.HashPassword(params.Password)
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Internal server error", err)
		return
	}

	user, err := cfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Email:          params.Email,
		Username:       params.Username,
		HashedPassword: hashedPassword,
	})
	if err != nil {
		if strings.Contains(err.Error(), "users_email_key") {
			respondWithErr(w, http.StatusConflict, "Email already exists", err)
			return
		}

		if strings.Contains(err.Error(), "users_username_key") {
			respondWithErr(w, http.StatusConflict, "Username is taken", err)
			return
		}

		respondWithErr(w, http.StatusInternalServerError, "Couldn't create user", err)
		return
	}

	respondWithJson(w, http.StatusCreated, User{
		ID:        user.ID,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		Email:     user.Email,
		IsPremium: user.IsPremium,
	})
}

func (cfg *APIConfig) HandlerUserLogin(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	type response struct {
		User
		Token string `json:"token"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	data := reqBody{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&data); err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Couldn't decode the json data", err)
	}

	user, err := cfg.DB.GetUserByEmail(r.Context(), data.Email)
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "Incorrect credential", err)
		return
	}
	if err := auth.CheckPasswordHash(data.Password, user.HashedPassword); err != nil {
		respondWithErr(w, http.StatusUnauthorized, "Incorrect credential", err)
		return
	}

	accessToken, err := auth.MakeJWT(user.ID, cfg.JWTSecret, time.Minute*10)
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Couldn't create access token", err)
		return
	}

	refreshToken := auth.MarkRefreshToken()
	_, err = cfg.DB.CreateRefreshToken(r.Context(), database.CreateRefreshTokenParams{
		Token:     refreshToken,
		UserID:    user.ID,
		ExpiresAt: time.Now().UTC().Add(time.Hour * 24 * 60),
	})
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Couldn't create access JWT", err)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    refreshToken,
		HttpOnly: true,
		Secure:   cfg.Platform != "dev",
		SameSite: http.SameSiteStrictMode,
		Path:     "/api/refresh",
		MaxAge:   60 * 24 * 60 * 60, // 60 days
	})

	respondWithJson(w, http.StatusOK, response{
		User: User{
			ID:        user.ID,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
			Email:     user.Email,
			IsPremium: user.IsPremium,
		},
		Token: accessToken,
	})
}

func (cfg *APIConfig) HandlerTestToken(w http.ResponseWriter, r *http.Request) {
	type response struct {
		Message string `json:"message"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	userId, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)
	if !ok {
		respondWithErr(w, http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	respondWithJson(w, http.StatusOK, response{
		Message: fmt.Sprintf("welcome back, your user id is: %s", userId.String()),
	})
}
