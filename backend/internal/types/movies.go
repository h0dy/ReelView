package types

import (
	"github.com/google/uuid"
)

type Movie struct {
	ID            uuid.UUID `json:"id"`
	BackdropPath  string    `json:"backdrop_path"`
	Genre         []Genre   `json:"genre"`
	TmdbID        int       `json:"tmdb_id"`
	OriginalTitle string    `json:"original_title"`
	Overview      string    `json:"overview"`
	PosterPath    string    `json:"poster_path"`
	ReleaseDate   string    `json:"release_date"`
	Title         string    `json:"title"`
	VoteAverage   float64   `json:"vote_average"`
}
