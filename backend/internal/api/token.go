package api

import (
	"net/http"
	"time"

	"github.com/h0dy/ReelView/backend/internal/auth"
	"github.com/h0dy/ReelView/backend/internal/database"
)

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
