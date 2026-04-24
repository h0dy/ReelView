package api

import (
	"context"
	"net/http"

	"github.com/google/uuid"
	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/types"
	"github.com/h0dy/ReelView/backend/internal/utils"
)

func (cfg *APIConfig) GetUserMovieMeta(ctx context.Context, r *http.Request, movieID uuid.UUID) *types.UserMovieMeta {
	authUser, ok := r.Context().Value(UserContextKey).(*types.AuthUser)
	if !ok {
		return nil
	}

	userData, err := cfg.DB.GetUserMetadataForMovie(r.Context(), database.GetUserMetadataForMovieParams{
		UserID: authUser.ID,
		ID:     movieID,
	})
	if err != nil {
		return nil
	}

	meta := utils.DbUserMetaToJson(userData)

	return &meta
}
