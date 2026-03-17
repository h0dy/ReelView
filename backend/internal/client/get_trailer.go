package client

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"slices"
)

func (client *TmdbClient) GetMovieTrailer(ctx context.Context, movieId int) (MovieTrailer, error) {
	url := fmt.Sprintf("%s/movie/%v/videos", baseURL, movieId)

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return MovieTrailer{}, err
	}

	req.Header.Set("Authorization", "Bearer "+client.accessToken)

	res, err := client.httpClient.Do(req)
	if err != nil {
		return MovieTrailer{}, err
	}
	defer res.Body.Close()

	var movieTrailers MovieTrailers
	if err := json.NewDecoder(res.Body).Decode(&movieTrailers); err != nil {
		return MovieTrailer{}, err
	}

	for _, t := range slices.Backward(movieTrailers.Results) {
		if t.Official == true && t.Site == "YouTube" {
			return t, nil
		}
	}
	return MovieTrailer{}, fmt.Errorf("Couldn't find trailer")
}
