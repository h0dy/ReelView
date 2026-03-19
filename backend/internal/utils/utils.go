package utils

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/h0dy/ReelView/backend/internal/client"
	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/types"
)

type UtilsConfig struct {
	DB         *database.Queries
	TmdbClient *client.TmdbClient
}

var ErrMovieNotFound = errors.New("couldn't find movie")

func (u *UtilsConfig) AddMovieToDB(ctx context.Context, tmdb_id int) (database.Movie, error) {
	movie, err := u.TmdbClient.GetMovieDetails(ctx, tmdb_id)
	if err != nil {
		return database.Movie{}, fmt.Errorf("%w: %v\n", ErrMovieNotFound, err)
	}

	releaseDate, err := time.Parse("2006-01-02", movie.ReleaseDate)
	if err != nil {
		log.Fatalf("Error in AddMovieToDB func in utils\nError:%v\n", err)
		return database.Movie{}, err
	}

	var genres []types.Genre
	for _, g := range movie.Genres {
		if name, ok := client.MovieGenre[g.ID]; ok {
			genres = append(genres, types.Genre{
				ID:   g.ID,
				Name: name,
			})
		}
	}
	genresJSON, err := json.Marshal(genres)
	if err != nil {
		log.Fatalf("Error in AddMovieToDB func in utils\nError:%v\n", err)
		return database.Movie{}, err
	}

	movieTrailer, err := u.TmdbClient.GetMovieTrailer(ctx, movie.ID)
	if err != nil {
		fmt.Printf("Error in GetMovieTrailer func:%v\n", err)
	}
	trailer := fmt.Sprintf("https://www.youtube.com/watch?v=%v", movieTrailer.Key)

	movieRecord, err := u.DB.AddMovie(ctx, database.AddMovieParams{
		TmdbID:        int32(movie.ID),
		Title:         movie.Title,
		OriginalTitle: movie.OriginalTitle,
		PosterPath:    movie.PosterPath,
		BackdropPath:  movie.BackdropPath,
		Overview:      movie.Overview,
		ReleaseDate:   releaseDate,
		VoteAverage:   movie.VoteAverage,
		Runtime:       int32(movie.Runtime),
		Tagline:       movie.Tagline,
		ImdbID:        movie.ImdbID,
		VoteCount:     int32(movie.VoteCount),
		Revenue:       int64(movie.Revenue),
		Homepage:      movie.Homepage,
		Trailer:       trailer,
		Column13:      genresJSON,
	})
	if err != nil {
		log.Fatalf("Error in AddMovieToDB func in utils\nError:%v\n", err)
		return database.Movie{}, err
	}
	return movieRecord, nil
}
