package types

import (
	"time"

	"github.com/google/uuid"
)

type MovieReview struct {
	ID        uuid.UUID `json:"id"`
	MovieID   uuid.UUID `json:"movie_id"`
	Review    string    `json:"review"`
	Rating    float32   `json:"rating"`
	IsSpoiler bool      `json:"is_spoiler"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	User      AuthUser  `json:"user"`
}
