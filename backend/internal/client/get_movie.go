package client

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

func (client *TmdbClient) GetMoviesByTitle(ctx context.Context, title string) (Movies, error) {
	url := fmt.Sprintf("%s/search/movie?query=%s", baseURL, title)

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return Movies{}, err
	}
	req.Header.Set("Authorization", "Bearer "+client.accessToken)

	res, err := client.httpClient.Do(req)
	if err != nil {
		return Movies{}, err
	}
	if res.StatusCode != http.StatusOK {
		return Movies{}, fmt.Errorf("unexpected status code: %d", res.StatusCode)
	}

	defer res.Body.Close()

	var movies Movies
	if err := json.NewDecoder(res.Body).Decode(&movies); err != nil {
		return Movies{}, err
	}
	for idx, movie := range movies.Results {
		movies.Results[idx].BackdropPath = imgBaseURL + movie.BackdropPath
		movies.Results[idx].PosterPath = imgBaseURL + movie.PosterPath
		for _, id := range movie.GenreIds {
			movies.Results[idx].Genre = append(movies.Results[idx].Genre, MovieGenre[id])
		}
	}
	return movies, nil
}
