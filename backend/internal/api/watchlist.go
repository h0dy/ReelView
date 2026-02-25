package api

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/types"
	"github.com/h0dy/ReelView/backend/internal/utils"
)

func (cfg APIConfig) HandlerAddToWatchlist(w http.ResponseWriter, r *http.Request) {
	movieId, err := uuid.Parse(r.PathValue("movieId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid movie id", err)
		return
	}
	movie, err := cfg.DB.GetMovieById(r.Context(), movieId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "movie doesn't exit", err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	authUser := r.Context().Value(UserContextKey).(*types.AuthUser)

	watchlistRecord, err := cfg.DB.AddToWatchlist(r.Context(), database.AddToWatchlistParams{
		UserID:  authUser.ID,
		MovieID: movie.ID,
	})
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "movie already in watchlist", err)
		return
	}
	movieResponse, _ := utils.DbMovieTypeToJson(movie)
	watchlist := utils.DbWatchlistToJson(watchlistRecord, movieResponse)

	respondWithJson(w, http.StatusCreated, watchlist)
}

func (cfg APIConfig) HandlerRemoveFromWatchlist(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(r.PathValue("id"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid id", err)
		return
	}

	authUser := r.Context().Value(UserContextKey).(*types.AuthUser)
	record, err := cfg.DB.GetWatchlistsRecord(r.Context(), id)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "couldn't find watchlist record", err)
		return
	}

	if record.UserID != authUser.ID {
		respondWithErr(w, http.StatusUnauthorized, "Unauthorized", err)
		return
	}

	if err := cfg.DB.RemoveMovieFromWatchlist(r.Context(), id); err != nil {
		respondWithErr(w, http.StatusInternalServerError, "couldn't remove movie from watchlist", err)
		return
	}
	respondWithJson(w, http.StatusNoContent, nil)
}

func (cfg APIConfig) HandlerGetUserWatchlist(w http.ResponseWriter, r *http.Request) {
	userId, err := uuid.Parse(r.PathValue("userId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid user id", err)
		return
	}

	userWatchlist, err := cfg.DB.GetUserWatchlist(r.Context(), userId)
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "something went wrong, couldn't get user's watchlist", err)
		return
	}

	watchlistResponse := []types.WatchlistResponse{}
	for _, w := range userWatchlist {
		movie, _ := cfg.DB.GetMovieById(r.Context(), w.MovieID)
		m, _ := utils.DbMovieTypeToJson(movie)
		watchlist := utils.DbWatchlistToJson(w, m)
		watchlistResponse = append(watchlistResponse, watchlist)
	}

	respondWithJson(w, http.StatusOK, watchlistResponse)
}
