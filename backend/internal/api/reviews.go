package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/database"
)

func (cfg *APIConfig) HandlerCreateReview(w http.ResponseWriter, r *http.Request) {
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
		respondWithErr(w, http.StatusBadRequest, "invalid type", err)
		return
	}

	if review.Body == "" && review.Rating == 0 {
		respondWithErr(w, http.StatusBadRequest, "please provide a rating (1 - 10) or review field", nil)
		return
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

func (cfg *APIConfig) HandlerDeleteReview(w http.ResponseWriter, r *http.Request) {
	reviewId, err := uuid.Parse(r.PathValue("reviewId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid review id", err)
		return
	}

	user := r.Context().Value(UserContextKey).(*AuthUser)

	review, err := cfg.DB.GetSingleMovieReview(r.Context(), reviewId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "couldn't find review", err)
		return
	}
	if review.UserID != user.ID {
		respondWithErr(w, http.StatusUnauthorized, "unauthorized", nil)
		return
	}

	if err := cfg.DB.DeleteReview(r.Context(), reviewId); err != nil {
		respondWithErr(w, http.StatusInternalServerError, "something went wrong", err)
		return
	}
	respondWithJson(w, http.StatusNoContent, struct{}{})
}

func (cfg *APIConfig) HandlerUpdateReview(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Body      string  `json:"Body"`
		Rating    float32 `json:"rating"`
		IsSpoiler bool    `json:"is_spoiler"`
	}

	reviewId, err := uuid.Parse(r.PathValue("reviewId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid review id", err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	review := reqBody{}
	if err := json.NewDecoder(r.Body).Decode(&review); err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid type", err)
		return
	}
	currentReview, err := cfg.DB.GetSingleMovieReview(r.Context(), reviewId)
	if err != nil {
		respondWithErr(w,
			http.StatusNotFound,
			"Couldn't find review",
			err)
		return
	}
	authUser := r.Context().Value(UserContextKey).(*AuthUser)
	if currentReview.UserID != authUser.ID {
		respondWithErr(w, http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	updatedReview, err := cfg.DB.UpdateMovieReview(r.Context(), database.UpdateMovieReviewParams{
		Review:    review.Body,
		IsSpoiler: review.IsSpoiler,
		Rating:    review.Rating,
		ID:        reviewId,
	})
	if err != nil {
		respondWithErr(w,
			http.StatusInternalServerError,
			"something went wrong",
			err)
		return
	}

	respondWithJson(w, http.StatusOK, updatedReview)
}

func (cfg *APIConfig) HandlerGetMovieReviews(w http.ResponseWriter, r *http.Request) {
	movieId, _ := strconv.Atoi(r.PathValue("movieId"))
	reviews, err := cfg.DB.GetMovieReviews(r.Context(), int32(movieId))
	if err != nil {
		return
	}
	respondWithJson(w, http.StatusOK, reviews)
}

func (cfg *APIConfig) HandlerGetSingleReview(w http.ResponseWriter, r *http.Request) {
	reviewId, err := uuid.Parse(r.PathValue("reviewId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid review id", err)
		return
	}
	review, err := cfg.DB.GetSingleMovieReview(r.Context(), reviewId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "Couldn't find review", err)
		return
	}

	respondWithJson(w, http.StatusOK, review)
}
