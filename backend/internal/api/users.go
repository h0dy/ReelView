package api

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/auth"
	"github.com/h0dy/ReelView/backend/internal/database"
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
