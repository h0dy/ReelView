package client

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

func (client *TmdbClient) GetMovieDetails(ctx context.Context, movieId string) (MovieDetails, error) {
	url := fmt.Sprintf("%s/movie/%s", baseURL, movieId)

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return MovieDetails{}, err
	}

	req.Header.Set("Authorization", "Bearer "+client.accessToken)

	res, err := client.httpClient.Do(req)
	if err != nil {
		return MovieDetails{}, err
	}
	defer res.Body.Close()

	var movieDetails MovieDetails
	if err := json.NewDecoder(res.Body).Decode(&movieDetails); err != nil {
		return MovieDetails{}, err
	}

	movieDetails.PosterPath = imgBaseURL + movieDetails.PosterPath
	movieDetails.BackdropPath = imgBaseURL + movieDetails.BackdropPath
	if movieDetails.Title == "" {
		return MovieDetails{}, fmt.Errorf("couldn't find a movie with the id of %s", movieId)
	}
	return movieDetails, nil
}
