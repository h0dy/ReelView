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
	TmdbID        int32       `json:"tmdb_id"`
	MovieID       uuid.UUID   `json:"movie_id"`
	IsInWatchlist interface{} `json:"is_in_watchlist"`
	Diary         *UserDiary  `json:"diary,omitempty"`
	Review        *UserReview `json:"review,omitempty"`
}

type UserDiary struct {
	ID        uuid.UUID `json:"id"`
	WatchedAt time.Time `json:"watched_at"`
	CreatedAt time.Time `json:"created_at"`
}

type UserReview struct {
	ID        uuid.UUID `json:"id"`
	Text      string    `json:"text"`
	Rating    float64   `json:"rating"`
	IsSpoiler bool      `json:"is_spoiler"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
