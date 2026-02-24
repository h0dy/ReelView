package types

import (
	"time"

	"github.com/google/uuid"
)

type AuthUser struct { // User strut to hold json response
	ID        uuid.UUID `json:"id"`
	Username  string    `json:"username"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Email     string    `json:"email"`
	IsPremium bool      `json:"is_premium"`
}
