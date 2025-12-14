package middleware

import (
	"context"
	"net/http"

	"github.com/h0dy/ReelView/backend/internal/auth"
)

type contextKey string

const UserIDKey contextKey = "userID"

func JWTAuth(jwtSecret string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			accessToken, err := auth.GetBearerToken(r.Header)
			if err != nil {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			userID, err := auth.ValidateJWT(accessToken, jwtSecret)
			if err != nil {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), UserIDKey, userID)

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
