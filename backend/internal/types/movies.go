package types

import (
	"github.com/google/uuid"
)

type Movie struct {
	ID            uuid.UUID `json:"id"`
	ImdbID        string    `json:"imdb_id"`
	TmdbID        int       `json:"tmdb_id"`
	OriginalTitle string    `json:"original_title"`
	Title         string    `json:"title"`
	PosterPath    string    `json:"poster_path"`
	BackdropPath  string    `json:"backdrop_path"`
	Overview      string    `json:"overview"`
	ReleaseDate   string    `json:"release_date"`
	VoteAverage   float64   `json:"vote_average"`
	VoteCount     int       `json:"vote_count"`
	Revenue       int       `json:"revenue"`
	Homepage      string    `json:"homepage"`
	Genre         []Genre   `json:"genre"`
	Runtime       int       `json:"runtime"`
	Tagline       string    `json:"tagline"`
}
