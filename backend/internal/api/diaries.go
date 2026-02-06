package api

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/h0dy/ReelView/backend/internal/database"
)

func (cfg *APIConfig) HandlerCreateMovieDiary(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		MovieID   int    `json:"movie_id"`
		WatchedAt string `json:"watched_at"`
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	body := reqBody{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid type", err)
		return
	}
	if body.MovieID == 0 {
		respondWithErr(w,
			http.StatusBadRequest,
			"missing movie_id field, please provide the movie_id",
			nil)
		return
	}

	watchedAt, err := time.Parse("2006-01-02", body.WatchedAt)
	if err != nil {
		if body.WatchedAt == "" {
			body.WatchedAt = time.Now().UTC().Format("2006-01-02")
		} else {
			respondWithErr(w,
				http.StatusBadRequest,
				"invalid data formate, make sure to provide the correct data formate for watchedAt",
				err)
			return
		}
	}

	user := r.Context().Value(UserContextKey).(*AuthUser)

	diary, err := cfg.DB.CreateMovieDiary(r.Context(), database.CreateMovieDiaryParams{
		MovieID:   int32(body.MovieID),
		UserID:    user.ID,
		WatchedAt: watchedAt,
	})
	if err != nil {
		respondWithErr(w,
			http.StatusInternalServerError,
			"Something went wrong",
			err)
		return
	}

	respondWithJson(w, http.StatusCreated, diary)
}
