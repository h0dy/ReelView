package api

import (
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/client"
	"github.com/h0dy/ReelView/backend/internal/database"
)

type WatchlistRecordResponse struct {
	ID           uuid.UUID           `json:"id"`
	MovieID      int32               `json:"movie_id"`
	UserID       uuid.UUID           `json:"user_id"`
	CreatedAt    time.Time           `json:"created_at"`
	MovieDetails client.MovieDetails `json:"movie_details"`
}

func (cfg *APIConfig) HandlerAddMovieToWatchlist(w http.ResponseWriter, r *http.Request) {
	movieId, _ := strconv.Atoi(r.PathValue("movieId"))
	movie, err := cfg.TmdbClient.GetMovieDetails(r.Context(), movieId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "movie doesn't exit", err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	authUser := r.Context().Value(UserContextKey).(*AuthUser)

	watchlistRecord, err := cfg.DB.AddToWatchlist(r.Context(), database.AddToWatchlistParams{
		UserID:  authUser.ID,
		MovieID: int32(movie.ID),
	})

	respondWithJson(w, http.StatusCreated, WatchlistRecordResponse{
		ID:           watchlistRecord.ID,
		MovieID:      watchlistRecord.MovieID,
		UserID:       watchlistRecord.UserID,
		CreatedAt:    watchlistRecord.CreatedAt,
		MovieDetails: movie,
	})
}
