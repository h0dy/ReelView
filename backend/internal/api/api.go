package api

import (
	"github.com/h0dy/ReelView/backend/internal/client"
	"github.com/h0dy/ReelView/backend/internal/database"
)

type APIConfig struct {
	Platform   string
	Port       string
	DB         *database.Queries
	JWTSecret  string
	TmdbClient *client.TmdbClient
}
