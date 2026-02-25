package types

import (
	"time"

	"github.com/google/uuid"
)

type WatchlistResponse struct {
	ID        uuid.UUID `json:"id"`
	MovieID   uuid.UUID `json:"movie_id"`
	UserID    uuid.UUID `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	Movie     Movie     `json:"movie"`
}
