package types

import (
	"time"

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
	Trailer       string    `json:"trailer"`
	Tagline       string    `json:"tagline"`
}

type UserMovieMeta struct {
	MovieID         uuid.UUID   `json:"movie_id"`
	DiaryID         uuid.UUID   `json:"diary_id"`
	DiaryCreatedAt  time.Time   `json:"diary_created_at"`
	WatchedAt       time.Time   `json:"watch_at"`
	IsInWatchlist   interface{} `json:"is_in_watchlist"`
	ReviewID        uuid.UUID   `json:"review_id"`
	Review          string      `json:"review"`
	Rating          float64     `json:"rating"`
	IsSpoiler       bool        `json:"review_is_spoiler"`
	ReviewCreatedAt time.Time   `json:"review_created_at"`
	ReviewUpdatedAt time.Time   `json:"review_updated_at"`
}
