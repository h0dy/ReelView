package types

import (
	"time"

	"github.com/google/uuid"
)

type Diary struct {
	ID        uuid.UUID `json:"id"`
	MovieID   uuid.UUID `json:"movie_id"`
	UserID    uuid.UUID `json:"user_id"`
	WatchedAt time.Time `json:"watched_at"`
	UpdatedAt time.Time `json:"updated_at"`
	CreatedAt time.Time `json:"created_at"`

	Movie Movie `json:"movie"`
}
