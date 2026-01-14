package api

import (
	"net/http"
	"strconv"

	"github.com/h0dy/ReelView/backend/internal/client"
	"github.com/h0dy/ReelView/backend/internal/database"
)

func (cfg *APIConfig) HandlerGetMovies(w http.ResponseWriter, r *http.Request) {
	movieTitle := r.URL.Query().Get("name")

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	movies, err := cfg.TmdbClient.GetMovies(r.Context(), movieTitle, "week")
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "Couldn't find a movie", err)
		return
	}

	respondWithJson(w, http.StatusOK, movies)
}

func (cfg *APIConfig) HandlerGetMovieDetails(w http.ResponseWriter, r *http.Request) {
	movieId, _ := strconv.Atoi(r.PathValue("movieId"))

	type response struct {
		Movie   client.MovieDetails    `json:"movie"`
		Reviews []database.MovieReview `json:"review"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	movie, err := cfg.TmdbClient.GetMovieDetails(r.Context(), movieId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "couldn't find a movie", err)
		return
	}
	movieReviews, _ := cfg.DB.GetMovieReviews(r.Context(), int32(movieId))

	respondWithJson(w, http.StatusOK, response{
		Movie:   movie,
		Reviews: movieReviews,
	})
}
