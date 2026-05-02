package api

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/types"
	"github.com/h0dy/ReelView/backend/internal/utils"
)

func (cfg APIConfig) HandlerCreateReview(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Text      string  `json:"text"`
		Rating    float32 `json:"rating"`
		IsSpoiler bool    `json:"is_spoiler"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	review := reqBody{}
	if err := json.NewDecoder(r.Body).Decode(&review); err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid type", err)
		return
	}

	if review.Text == "" && review.Rating == 0 {
		respondWithErr(w, http.StatusBadRequest, "please provide a rating (1 - 10) or review field", nil)
		return
	}

	authUser := r.Context().Value(UserContextKey).(*types.AuthUser)

	if review.Rating > 10 || review.Rating < 0 {
		respondWithErr(w, http.StatusBadRequest, "invalid rating", nil)
		return
	}

	movieId, _ := uuid.Parse(r.PathValue("movieId"))

	if _, err := cfg.DB.GetMovieById(r.Context(), movieId); err != nil {
		respondWithErr(w, http.StatusNotFound, "movie doesn't exit", err)
		return
	}

	reviewRecord, err := cfg.DB.CreateMovieReview(
		r.Context(),
		database.CreateMovieReviewParams{
			MovieID:   movieId,
			UserID:    authUser.ID,
			Review:    review.Text,
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

	reviewResponse := utils.DbReviewTypeToJson(reviewRecord, *authUser)

	respondWithJson(w, http.StatusCreated, reviewResponse)
}

func (cfg APIConfig) HandlerDeleteReview(w http.ResponseWriter, r *http.Request) {
	movieId, err := uuid.Parse(r.PathValue("movieId"))
	reviewId, err := uuid.Parse(r.PathValue("reviewId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid review id", err)
		return
	}

	authUser := r.Context().Value(UserContextKey).(*types.AuthUser)

	review, err := cfg.DB.GetSingleMovieReview(r.Context(), reviewId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "couldn't find review", err)
		return
	}
	if review.UserID != authUser.ID {
		respondWithErr(w, http.StatusUnauthorized, "unauthorized", nil)
		return
	}

	if err := cfg.DB.DeleteReview(r.Context(), database.DeleteReviewParams{
		MovieID: movieId,
		UserID:  authUser.ID,
	}); err != nil {
		respondWithErr(w, http.StatusInternalServerError, "something went wrong", err)
		return
	}
	respondWithJson(w, http.StatusNoContent, nil)
}

func (cfg APIConfig) HandlerUpdateReview(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		Text      string  `json:"text"`
		Rating    float32 `json:"rating"`
		IsSpoiler bool    `json:"is_spoiler"`
	}

	authUser := r.Context().Value(UserContextKey).(*types.AuthUser)
	movieId, err := uuid.Parse(r.PathValue("movieId"))
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
	if currentReview.UserID != authUser.ID {
		respondWithErr(w, http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	updatedReview, err := cfg.DB.UpdateMovieReview(r.Context(), database.UpdateMovieReviewParams{
		Review:    review.Text,
		IsSpoiler: review.IsSpoiler,
		Rating:    review.Rating,
		MovieID:   movieId,
		UserID:    authUser.ID,
	})
	if err != nil {
		respondWithErr(w,
			http.StatusInternalServerError,
			"something went wrong",
			err)
		return
	}

	reviewResponse := utils.DbReviewTypeToJson(updatedReview, *authUser)

	respondWithJson(w, http.StatusOK, reviewResponse)
}

func (cfg APIConfig) HandlerGetMovieReviews(w http.ResponseWriter, r *http.Request) {
	movieId, _ := uuid.Parse(r.PathValue("movieId"))
	reviewsRecord, _ := cfg.DB.GetMovieReviews(r.Context(), movieId)

	reviews := utils.DbReviewsTypeToJson(reviewsRecord)

	respondWithJson(w, http.StatusOK, reviews)
}

func (cfg APIConfig) HandlerGetSingleReview(w http.ResponseWriter, r *http.Request) {
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
	user, err := cfg.DB.GetUserByID(r.Context(), review.UserID)
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "couldn't get user, something went wrong", err)
		return
	}
	userResponse := utils.DbUserToJson(user)
	reviewResponse := utils.DbReviewTypeToJson(review, userResponse)

	respondWithJson(w, http.StatusOK, reviewResponse)
}

func (cfg *APIConfig) HandlerGetUserReviews(w http.ResponseWriter, r *http.Request) {
	userId, err := uuid.Parse(r.PathValue("userId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid review id", err)
		return
	}

	reviews, err := cfg.DB.GetUserReviews(r.Context(), userId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "couldn't find reviews for user", err)
		return
	}
	user, err := cfg.DB.GetUserByID(r.Context(), userId)
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "something went wrong with retrieving the user's review", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	reviewsResponse := []types.MovieReview{}
	authUser := utils.DbUserToJson(user)
	for _, r := range reviews {
		review := utils.DbReviewTypeToJson(r, authUser)
		reviewsResponse = append(reviewsResponse, review)
	}

	respondWithJson(w, http.StatusOK, reviewsResponse)
}
