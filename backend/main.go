package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/h0dy/ReelView/backend/internal/api"
	"github.com/h0dy/ReelView/backend/internal/database"
	"github.com/h0dy/ReelView/backend/internal/middleware"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	if err := godotenv.Load("./../.env"); err != nil {
		log.Fatalf("error in loading env file, make sure to set up env file, or provide env variables: %v\n", err)
	}

	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		log.Fatal("DB_URL must be set")
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("PORT must be set")
	}

	platform := os.Getenv("PLATFORM")
	if platform == "" {
		log.Fatal("platform must be set")
	}
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatal("make sure you set up JWT_SECRET")
	}

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("couldn't connect to database: %v\n", err)
	}
	defer db.Close()

	// register the generated functions for our database queries from sqlc
	dbQueries := database.New(db)

	apiConfig := api.APIConfig{
		Platform: platform,
		Port:     port,
		DB:       dbQueries,
	}

	mux := http.NewServeMux()

	// public
	mux.HandleFunc("GET /api/healthz", apiConfig.HandlerReadiness)
	mux.HandleFunc("POST /admin/reset", apiConfig.HandlerReset)

	mux.HandleFunc("POST /api/users", apiConfig.HandlerCreateUser)
	mux.HandleFunc("POST /api/login", apiConfig.HandlerUserLogin)

	mux.HandleFunc("POST /api/refresh", apiConfig.HandlerRefreshToken)

	// protected
	mux.Handle(
		"POST /api/protected",
		middleware.JWTAuth(apiConfig.JWTSecret)(
			http.HandlerFunc(apiConfig.HandlerTestToken),
		),
	)

	server := http.Server{
		Addr:    ":" + apiConfig.Port,
		Handler: mux,
	}

	fmt.Printf("Listing on http://localhost:%v\n", apiConfig.Port)
	log.Fatal(server.ListenAndServe())
}
