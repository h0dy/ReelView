package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/h0dy/ReelView/backend/internal/auth"
	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/types"
	"github.com/h0dy/ReelView/backend/internal/utils"
)

func (cfg *APIConfig) HandlerUserLogin(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	type response struct {
		User  types.AuthUser `json:"user"`
		Token string         `json:"token"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	data := reqBody{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&data); err != nil {
		respondWithErr(w, http.StatusBadRequest, "missing credential", err)
	}

	user, err := cfg.DB.GetUserByEmail(r.Context(), data.Email)
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "couldn't find user. you need to sign in", err)
		return
	}
	if err := auth.CheckPasswordHash(data.Password, user.HashedPassword); err != nil {
		respondWithErr(w, http.StatusInternalServerError, "something went wrong", err)
		return
	}

	accessToken, err := auth.MakeJWT(user.ID, cfg.JWTSecret, time.Minute*10)
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Couldn't create access token", err)
		return
	}

	refreshToken := auth.MakeRefreshToken()
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

	userResponse := utils.DbUserToJson(user)

	respondWithJson(w, http.StatusOK, response{
		User:  userResponse,
		Token: accessToken,
	})
}

func (cfg *APIConfig) HandlerTestToken(w http.ResponseWriter, r *http.Request) {
	type response struct {
		Message string `json:"message"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	user, ok := r.Context().Value(UserContextKey).(*types.AuthUser)
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
		return
	}

	// new access token
	accessToken, err := auth.MakeJWT(user.ID, cfg.JWTSecret, time.Minute*10)
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Couldn't generate new access token", err)
		return
	}

	// Issue a new refresh token and delete old one
	newRefreshToken := auth.MakeRefreshToken()
	if err := cfg.DB.DeleteRefreshToken(r.Context(), database.DeleteRefreshTokenParams{
		Token:  refreshToken,
		UserID: user.ID,
	}); err != nil {
		respondWithErr(w, http.StatusInternalServerError, "something went wrong, couldn't delete old refresh token", err)
		return
	}

	_, err = cfg.DB.CreateRefreshToken(r.Context(), database.CreateRefreshTokenParams{
		Token:     newRefreshToken,
		ExpiresAt: time.Now().UTC().Add(time.Hour * 24 * 60),
		UserID:    user.ID,
	})
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "something went wrong, couldn't create new refresh token", err)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    newRefreshToken,
		HttpOnly: true,
		Secure:   cfg.Platform != "dev",
		SameSite: http.SameSiteStrictMode,
		Path:     "/",
		MaxAge:   60 * 24 * 60 * 60, // 60 days,
	})
	respondWithJson(w, http.StatusOK, response{
		Token: accessToken,
	})
}

func (cfg *APIConfig) HandlerLogout(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		respondWithJson(w, http.StatusNoContent, nil)
		return
	}

	refreshToken := cookie.Value

	authUser := r.Context().Value(UserContextKey).(*types.AuthUser)

	if err := cfg.DB.DeleteRefreshToken(r.Context(), database.DeleteRefreshTokenParams{
		Token:  refreshToken,
		UserID: authUser.ID,
	}); err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Failed to delete refresh token", err)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    "",
		Path:     "/",
		MaxAge:   -1, // tells browser to delete cookie
		HttpOnly: true,
		Secure:   cfg.Platform != "dev",
		SameSite: http.SameSiteStrictMode,
	})

	respondWithJson(w, http.StatusNoContent, nil)
}
