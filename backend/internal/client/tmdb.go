package client

import (
	"net/http"
	"time"
)

const (
	baseURL    = "https://api.themoviedb.org/3"
	imgBaseURL = "https://image.tmdb.org/t/p/original"
)

type TmdbClient struct {
	httpClient  *http.Client
	accessToken string
}

func NewTmdbClient(timeout time.Duration, token string) *TmdbClient {
	return &TmdbClient{
		httpClient: &http.Client{
			Timeout: timeout,
		},
		accessToken: token,
	}
}
