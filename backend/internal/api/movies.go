package api

import (
	"net/http"
	"strconv"
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

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	movie, err := cfg.TmdbClient.GetMovieDetails(r.Context(), movieId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "couldn't find a movie", err)
		return
	}

	respondWithJson(w, http.StatusOK, movie)
}
