package api

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/auth"
	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/types"
	"github.com/h0dy/ReelView/backend/internal/utils"
)

func (cfg APIConfig) HandlerGetUser(w http.ResponseWriter, r *http.Request) {
	userId, err := uuid.Parse(r.PathValue("userId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid user id", err)
		return
	}

	userRecord, err := cfg.DB.GetUserByID(r.Context(), userId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "couldn't find user", err)
		return
	}

	user := utils.DbUserToJson(userRecord)

	respondWithJson(w, http.StatusCreated, user)
}

func (cfg APIConfig) HandlerCreateUser(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Email    string `json:"email"`
		Username string `json:"username"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	body := reqBody{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&body); err != nil {
		respondWithErr(w, http.StatusBadRequest, "Invalid data", err)
		return
	}

	// check for any possible missing values
	if body.Email == "" ||
		body.Username == "" ||
		body.Password == "" ||
		body.Name == "" {
		respondWithErr(w, http.StatusBadRequest, "Make sure to provide the missing credentials", nil)
		return
	}

	hashedPassword, err := auth.HashPassword(body.Password)
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Internal server error", err)
		return
	}

	userRecord, err := cfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Email:          body.Email,
		Username:       body.Username,
		HashedPassword: hashedPassword,
		Name:           body.Name,
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

	user := utils.DbUserToJson(userRecord)

	respondWithJson(w, http.StatusCreated, user)
}

func (cfg APIConfig) HandlerUpdateUser(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Email     string `json:"email"`
		Username  string `json:"username"`
		IsPremium bool   `json:"is_premium"`
		Name      string `json:"name"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	body := reqBody{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondWithErr(w, http.StatusBadRequest, "Invalid data", err)
		return
	}

	user := r.Context().Value(UserContextKey).(*types.AuthUser)
	updatedUser, err := cfg.DB.UpdateUser(r.Context(), database.UpdateUserParams{
		ID:        user.ID,
		Name:      body.Name,
		Email:     body.Email,
		Username:  body.Username,
		IsPremium: body.IsPremium,
	})
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "username or email is already used", err)
		return
	}

	userResponse := utils.DbUserToJson(updatedUser)
	respondWithJson(w, http.StatusOK, userResponse)
}
