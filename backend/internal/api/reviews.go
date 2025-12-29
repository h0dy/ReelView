package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/middleware"
)

func (cfg *APIConfig) HandlerCreateMovieReview(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Body      string  `json:"Body"`
		Rating    float32 `json:"rating"`
		IsSpoiler bool    `json:"is_spoiler"`
	}

	type response struct {
		User   User `json:"user"`
		Review database.MovieReview
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	review := reqBody{}
	if err := json.NewDecoder(r.Body).Decode(&review); err != nil {
		respondWithErr(w, http.StatusInternalServerError, "something went wrong", err)
		return
	}

	userId, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)
	user, err := cfg.DB.GetUserByID(r.Context(), userId)
	if !ok || err != nil {
		respondWithErr(w, http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	if review.Rating > 10 || review.Rating < 0 {
		respondWithErr(w, http.StatusBadRequest, "invalid rating", err)
		return
	}

	movieId, _ := strconv.Atoi(r.PathValue("movieId"))

	if _, err := cfg.TmdbClient.GetMovieDetails(r.Context(), movieId); err != nil {
		respondWithErr(w, http.StatusNotFound, "movie doesn't exit", err)
		return
	}

	reviewRecord, err := cfg.DB.CreateMovieReview(
		r.Context(),
		database.CreateMovieReviewParams{
			MovieID:   int32(movieId),
			UserID:    userId,
			Review:    review.Body,
			Rating:    review.Rating,
			IsSpoiler: review.IsSpoiler,
		})
	if err != nil {
		if strings.Contains(err.Error(), "unique_user_movie_review") {
			respondWithErr(w, http.StatusConflict, "You have already reviewed this movie. Edit your review to make changes", err)
			return
		}
		respondWithErr(w, http.StatusInternalServerError, "couldn't create review", err)
	}

	respondWithJson(w, http.StatusCreated, response{
		User: User{
			ID:        user.ID,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
			Email:     user.Email,
			IsPremium: user.IsPremium,
		},
		Review: reviewRecord,
	})
}
