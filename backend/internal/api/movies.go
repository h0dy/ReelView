package api

import (
	"net/http"
)

func (cfg *APIConfig) HandlerGetMovies(w http.ResponseWriter, r *http.Request) {
	movieTitle := r.URL.Query().Get("name")

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	if movieTitle == "" {
		respondWithErr(w, http.StatusBadRequest, "Make sure to provide a movie name", nil)
		return
	}

	movies, err := cfg.TmdbClient.GetMoviesByTitle(r.Context(), movieTitle)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "Couldn't find a movie", err)
		return
	}

	respondWithJson(w, http.StatusOK, movies)
}
