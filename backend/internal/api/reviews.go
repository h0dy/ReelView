package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/database"
)

func (cfg *APIConfig) HandlerCreateMovieReview(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Body      string  `json:"Body"`
		Rating    float32 `json:"rating"`
		IsSpoiler bool    `json:"is_spoiler"`
	}

	type response struct {
		User   AuthUser `json:"user"`
		Review database.MovieReview
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	review := reqBody{}
	if err := json.NewDecoder(r.Body).Decode(&review); err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid field type", err)
		return
	}

	if review.Body == "" && review.Rating == 0 {
		respondWithErr(w, http.StatusBadRequest, "please provide a rating or review", nil)
	}

	user := r.Context().Value(UserContextKey).(*AuthUser)

	if review.Rating > 10 || review.Rating < 0 {
		respondWithErr(w, http.StatusBadRequest, "invalid rating", nil)
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
			UserID:    user.ID,
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
		User: AuthUser{
			ID:        user.ID,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
			Email:     user.Email,
			IsPremium: user.IsPremium,
		},
		Review: reviewRecord,
	})
}

func (cfg *APIConfig) HandlerDeleteMovieReview(w http.ResponseWriter, r *http.Request) {
	movieId, _ := strconv.ParseInt(r.PathValue("movieId"), 10, 32)
	reviewId, err := uuid.Parse(r.PathValue("reviewId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid review id", err)
		return
	}
	if err := cfg.DB.DeleteReview(r.Context(), database.DeleteReviewParams{
		ID:      reviewId,
		MovieID: int32(movieId),
	}); err != nil {
		respondWithErr(w, http.StatusNotFound, "review not found", err)
		return
	}
	respondWithJson(w, http.StatusNoContent, struct{}{})
}
