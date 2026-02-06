package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/h0dy/ReelView/backend/internal/auth"
	"github.com/h0dy/ReelView/backend/internal/database"
)

func (cfg *APIConfig) HandlerUserLogin(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	type response struct {
		User  AuthUser `json:"user"`
		Token string   `json:"token"`
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
		User: AuthUser{
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

	user, ok := r.Context().Value(UserContextKey).(*AuthUser)
	if !ok {
		respondWithErr(w, http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	respondWithJson(w, http.StatusOK, response{
		Message: fmt.Sprintf("welcome back, your user id is: %s", user.ID.String()),
	})
}

// handlerRefreshToken func creates a new access token(JWT) with the refresh token in the header
func (cfg *APIConfig) HandlerRefreshToken(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		respondWithErr(w, http.StatusUnauthorized, "Missing refresh token cookie", err)
		return
	}
	refreshToken := cookie.Value

	type response struct {
		Token string `json:"token"`
	}
	w.Header().Set("Content-Type", "application/json")

	user, err := cfg.DB.GetUserFromRefreshToken(r.Context(), refreshToken)
	if err != nil {
		respondWithErr(w, http.StatusUnauthorized, "Invalid or expired refresh token", err)
	}

	// new access token
	accessToken, err := auth.MakeJWT(user.ID, cfg.JWTSecret, time.Minute*10)
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Couldn't generate new access token", err)
		return
	}

	// Issue a new refresh token and update cookie
	newRefreshToken := auth.MarkRefreshToken()
	if err := cfg.DB.UpdateRefreshToken(r.Context(), database.UpdateRefreshTokenParams{
		Token:     newRefreshToken,
		ExpiresAt: time.Now().UTC().Add(time.Hour * 24 * 60),
		UserID:    user.ID,
	}); err == nil {
		http.SetCookie(w, &http.Cookie{
			Name:     "refresh_token",
			Value:    newRefreshToken,
			HttpOnly: true,
			Secure:   cfg.Platform != "dev",
			SameSite: http.SameSiteStrictMode,
			Path:     "/api/refresh",
			MaxAge:   60 * 24 * 60 * 60, // 60 days,
		})
	}

	respondWithJson(w, http.StatusOK, response{
		Token: accessToken,
	})
}
