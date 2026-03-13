package utils

import (
	"encoding/json"

	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/types"
)

func DbMovieTypeToJson(dbMovie database.Movie) (types.Movie, error) {
	var movieGenres []types.Genre
	if dbMovie.Genres.Valid {
		if err := json.Unmarshal(dbMovie.Genres.RawMessage, &movieGenres); err != nil {
			return types.Movie{}, err
		}
	}

	return types.Movie{
		ID:            dbMovie.ID,
		TmdbID:        int(dbMovie.TmdbID),
		ImdbID:        dbMovie.ImdbID,
		Title:         dbMovie.Title,
		OriginalTitle: dbMovie.OriginalTitle,
		PosterPath:    dbMovie.PosterPath,
		BackdropPath:  dbMovie.BackdropPath,
		Overview:      dbMovie.OriginalTitle,
		ReleaseDate:   dbMovie.ReleaseDate.String(),
		VoteAverage:   dbMovie.VoteAverage,
		VoteCount:     int(dbMovie.VoteCount),
		Revenue:       int(dbMovie.Revenue),
		Homepage:      dbMovie.Homepage,
		Tagline:       dbMovie.Tagline,
		Genre:         movieGenres,
		Runtime:       int(dbMovie.Runtime),
	}, nil
}

func DbReviewsTypeToJson(dbReviews []database.GetMovieReviewsRow) []types.MovieReview {
	reviews := []types.MovieReview{}
	for _, r := range dbReviews {
		reviews = append(reviews, types.MovieReview{
			ID:        r.ID,
			MovieID:   r.MovieID,
			Review:    r.Review,
			Rating:    r.Rating,
			IsSpoiler: r.IsSpoiler,
			CreatedAt: r.CreatedAt,
			UpdatedAt: r.UpdatedAt,
			User: types.AuthUser{
				ID:        r.UserID,
				Username:  r.UserUsername,
				Name:      r.UserName,
				CreatedAt: r.CreatedAt,
				UpdatedAt: r.UpdatedAt,
				Email:     r.UserEmail,
				IsPremium: r.UserIsPremium,
			},
		})
	}
	return reviews
}

func DbReviewTypeToJson(dbReview database.MovieReview, user types.AuthUser) types.MovieReview {
	return types.MovieReview{
		ID:        dbReview.ID,
		MovieID:   dbReview.MovieID,
		Review:    dbReview.Review,
		Rating:    dbReview.Rating,
		IsSpoiler: dbReview.IsSpoiler,
		CreatedAt: dbReview.CreatedAt,
		UpdatedAt: dbReview.UpdatedAt,
		User:      user,
	}
}

func DbUserToJson(dbUser database.User) types.AuthUser {
	return types.AuthUser{
		ID:        dbUser.ID,
		CreatedAt: dbUser.CreatedAt,
		UpdatedAt: dbUser.UpdatedAt,
		Email:     dbUser.Email,
		IsPremium: dbUser.IsPremium,
		Username:  dbUser.Username,
		Name:      dbUser.Name,
	}
}

func DbWatchlistToJson(dbWatchlist database.Watchlist, movie types.Movie) types.WatchlistResponse {
	return types.WatchlistResponse{
		ID:        dbWatchlist.ID,
		MovieID:   dbWatchlist.MovieID,
		UserID:    dbWatchlist.UserID,
		CreatedAt: dbWatchlist.CreatedAt,
		Movie:     movie,
	}
}

func DbDiaryToJson(dbDiary database.MovieDiary) types.Diary {
	return types.Diary{
		ID:        dbDiary.ID,
		MovieID:   dbDiary.MovieID,
		UserID:    dbDiary.UserID,
		WatchedAt: dbDiary.WatchedAt,
		UpdatedAt: dbDiary.UpdatedAt,
		CreatedAt: dbDiary.CreatedAt,
	}
}
