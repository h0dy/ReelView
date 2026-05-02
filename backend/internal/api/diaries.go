package api

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/types"
	"github.com/h0dy/ReelView/backend/internal/utils"
)

func (cfg *APIConfig) HandlerGetDiary(w http.ResponseWriter, r *http.Request) {
	diaryId, err := uuid.Parse(r.PathValue("diaryId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid diary id", err)
		return
	}

	diaryRecord, err := cfg.DB.GetDiary(r.Context(), diaryId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "couldn't find diary", err)
		return
	}

	diary := utils.DbDiaryToJson(diaryRecord)

	respondWithJson(w, http.StatusOK, diary)
}

func (cfg *APIConfig) HandlerCreateMovieDiary(w http.ResponseWriter, r *http.Request) {
	type reqBody struct {
		WatchedAt string `json:"watched_at"`
	}
	movieId, err := uuid.Parse(r.PathValue("movieId"))
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

	user := r.Context().Value(UserContextKey).(*types.AuthUser)

	if _, err := cfg.DB.GetMovieById(r.Context(), movieId); err != nil {
		respondWithErr(w, http.StatusNotFound, "movie doesn't exit", err)
		return
	}

	diaryRecord, err := cfg.DB.CreateMovieDiary(r.Context(), database.CreateMovieDiaryParams{
		MovieID:   movieId,
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

	diary := utils.DbDiaryToJson(diaryRecord)

	respondWithJson(w, http.StatusOK, diary)
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
	authUser := r.Context().Value(UserContextKey).(*types.AuthUser)
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
		ID:        diary.ID,
	})
	if err != nil {
		respondWithErr(w, http.StatusInternalServerError, "Couldn't update diary, something went wrong", err)
		return
	}

	Diary := utils.DbDiaryToJson(updatedDiary)

	respondWithJson(w, http.StatusOK, Diary)
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
	authUser := r.Context().Value(UserContextKey).(*types.AuthUser)

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

func (cfg *APIConfig) HandlerGetUserDiaries(w http.ResponseWriter, r *http.Request) {
	userId, err := uuid.Parse(r.PathValue("userId"))
	if err != nil {
		respondWithErr(w, http.StatusBadRequest, "invalid user id", err)
		return
	}
	diaries, err := cfg.DB.GetUserDiaries(r.Context(), userId)
	if err != nil {
		respondWithErr(w, http.StatusNotFound, "couldn't find diaries for user", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	diariesResponse := []types.Diary{}
	for _, d := range diaries {
		diary := utils.DbDiaryToJson(d)
		diariesResponse = append(diariesResponse, diary)
	}

	respondWithJson(w, http.StatusOK, diariesResponse)
}
