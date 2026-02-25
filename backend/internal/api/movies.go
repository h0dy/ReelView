package api

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/h0dy/ReelView/backend/internal/types"
	"github.com/h0dy/ReelView/backend/internal/utils"
)

func (cfg *APIConfig) HandlerGetMovies(w http.ResponseWriter, r *http.Request) {
	movieTitle := r.URL.Query().Get("name")
	period := r.URL.Query().Get("period")

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	movies, err := cfg.TmdbClient.GetMovies(r.Context(), movieTitle, period)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "Couldn't find a movie", err)
		return
	}

	respondWithJson(w, http.StatusOK, movies)
}

func (cfg *APIConfig) HandlerGetMovieDetails(w http.ResponseWriter, r *http.Request) {
	tmdbId, _ := strconv.Atoi(r.PathValue("tmdbId"))

	type response struct {
		Movie   types.Movie         `json:"movie"`
		Reviews []types.MovieReview `json:"reviews"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	movieRecord, err := cfg.DB.GetMovieByTmdbId(r.Context(), int32(tmdbId))
	if err != nil {
		// upsert into db
		movieRecord, err = cfg.Utils.AddMovieToDB(r.Context(), tmdbId)
		if err != nil {

			if errors.Is(err, utils.ErrMovieNotFound) {
				respondWithErr(w, http.StatusNotFound, "movie doesn't exit", err)
				return
			}

			respondWithErr(w, http.StatusInternalServerError, "something went wrong with getting couldn't get the movie", err)
			return
		}
		return
	}

	var movieGenres []types.Genre
	if movieRecord.Genres.Valid {
		if err := json.Unmarshal(movieRecord.Genres.RawMessage, &movieGenres); err != nil {
			respondWithErr(w, http.StatusInternalServerError, "something went wrong. Couldn't get genres", err)
			return
		}
	}

	movieReviews, _ := cfg.DB.GetMovieReviews(r.Context(), movieRecord.ID)
	reviews := utils.DbReviewsTypeToJson(movieReviews)

	movie, err := utils.DbMovieTypeToJson(movieRecord)
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "something went wrong", err)
		return
	}

	respondWithJson(w, http.StatusOK, response{
		Movie:   movie,
		Reviews: reviews,
	})
}
