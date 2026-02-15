package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/database"
)

type DiaryResponse struct {
	ID        uuid.UUID `json:"id"`
	MovieID   int32     `json:"movie_id"`
	UserID    uuid.UUID `json:"user_id"`
	WatchedAt time.Time `json:"watched_at"`
	UpdatedAt time.Time `json:"updated_at"`
	CreatedAt time.Time `json:"created_at"`
}

func (cfg *APIConfig) HandlerGetDiary(w http.ResponseWriter, r *http.Request) {
	diaryId, err := uuid.Parse(r.PathValue("diaryId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid diary id", err)
		return
	}

	diary, err := cfg.DB.GetDiary(r.Context(), diaryId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "couldn't find diary", err)
		return
	}
	respondWithJson(w, http.StatusOK, DiaryResponse{
		ID:        diary.ID,
		MovieID:   diary.MovieID,
		UserID:    diary.UserID,
		WatchedAt: diary.WatchedAt,
		UpdatedAt: diary.UpdatedAt,
		CreatedAt: diary.CreatedAt,
	})
}

func (cfg *APIConfig) HandlerCreateMovieDiary(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		WatchedAt string `json:"watched_at"`
	}
	movieId, err := strconv.Atoi(r.PathValue("movieId"))
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "invalid movieId", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	defer r.Body.Close()

	body := reqBody{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid type", err)
		return
	}

	if body.WatchedAt == "" {
		body.WatchedAt = time.Now().UTC().Format("2006-01-02")
	}
	watchedAt, err := time.Parse("2006-01-02", body.WatchedAt)
	if err != nil {
		respondWithErr(w,
			http.StatusBadRequest,
			"invalid data formate, make sure to provide the correct data formate (year-month-day) for watchedAt",
			err)
		return

	}

	user := r.Context().Value(UserContextKey).(*AuthUser)

	diary, err := cfg.DB.CreateMovieDiary(r.Context(), database.CreateMovieDiaryParams{
		MovieID:   int32(movieId),
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

	respondWithJson(w, http.StatusOK, DiaryResponse{
		ID:        diary.ID,
		MovieID:   diary.MovieID,
		UserID:    diary.UserID,
		WatchedAt: diary.WatchedAt,
		UpdatedAt: diary.UpdatedAt,
		CreatedAt: diary.CreatedAt,
	})
}

func (cfg *APIConfig) HandlerUpdateDiary(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		WatchedAt string `json:"watched_at"`
	}
	dairyId, err := uuid.Parse(r.PathValue("diaryId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid diary id", err)
		return
	}

	defer r.Body.Close()
	w.Header().Set("Content-Type", "application/json")

	diary, err := cfg.DB.GetDiary(r.Context(), dairyId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "Couldn't find dairy", err)
		return
	}
	authUser := r.Context().Value(UserContextKey).(*AuthUser)
	if authUser.ID != diary.UserID {
		respondWithErr(w, http.StatusUnauthorized, "Unauthorized", err)
		return
	}
	body := reqBody{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid data", err)
		return
	}

	if body.WatchedAt == "" {
		body.WatchedAt = time.Now().UTC().Format("2006-01-02")
	}
	watchedAt, err := time.Parse("2006-01-02", body.WatchedAt)
	if err != nil {
		respondWithErr(w,
			http.StatusBadRequest,
			"invalid data formate, make sure to provide the correct data formate (year-month-day) for watchedAt",
			err)
		return
	}

	updatedDiary, err := cfg.DB.UpdateMovieDiary(r.Context(), database.UpdateMovieDiaryParams{
		WatchedAt: watchedAt,
		ID:        authUser.ID,
	})
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Couldn't update diary, something went wrong", err)
		return
	}

	respondWithJson(w, http.StatusOK, DiaryResponse{
		ID:        updatedDiary.ID,
		MovieID:   updatedDiary.MovieID,
		UserID:    updatedDiary.UserID,
		WatchedAt: updatedDiary.WatchedAt,
		UpdatedAt: updatedDiary.UpdatedAt,
		CreatedAt: updatedDiary.CreatedAt,
	})
}

func (cfg *APIConfig) HandlerDeleteDiary(w http.ResponseWriter, r *http.Request) {
	diaryId, err := uuid.Parse(r.PathValue("diaryId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid diary id", err)
		return
	}

	diary, err := cfg.DB.GetDiary(r.Context(), diaryId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "Couldn't find diary", err)
		return
	}
	authUser := r.Context().Value(UserContextKey).(*AuthUser)

	if authUser.ID != diary.UserID {
		respondWithErr(w, http.StatusUnauthorized, "Unauthorized", err)
		return
	}

	if err := cfg.DB.DeleteMovieDiary(r.Context(), database.DeleteMovieDiaryParams{
		UserID: authUser.ID,
		ID:     diary.ID,
	}); err != nil {
		respondWithErr(w, http.StatusInternalServerError, "something went wrong, couldn't delete diary", err)
		return
	}
	respondWithJson(w, http.StatusNoContent, nil)
}
