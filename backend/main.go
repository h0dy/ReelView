package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/h0dy/ReelView/backend/internal/api"
	"github.com/h0dy/ReelView/backend/internal/client"
	"github.com/h0dy/ReelView/backend/internal/database"
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

	tmdbAcessToken := os.Getenv("TMDB_TOKEN")
	if jwtSecret == "" {
		log.Fatal("make sure you set up TMDB_TOKEN")
	}

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("couldn't connect to database: %v\n", err)
	}
	defer db.Close()

	// register the generated functions for our database queries from sqlc
	dbQueries := database.New(db)
	tmdbClient := client.NewTmdbClient(5*time.Second, tmdbAcessToken)

	apiConfig := api.APIConfig{
		Platform:   platform,
		Port:       port,
		DB:         dbQueries,
		TmdbClient: tmdbClient,
	}

	mux := http.NewServeMux()

	// public
	mux.HandleFunc("GET /api/healthz", apiConfig.HandlerReadiness)
	mux.HandleFunc("POST /admin/reset", apiConfig.HandlerReset)

	// user/auth
	mux.HandleFunc("POST /api/users", apiConfig.HandlerCreateUser)
	mux.HandleFunc("POST /api/login", apiConfig.HandlerUserLogin)
	mux.HandleFunc("POST /api/refresh", apiConfig.HandlerRefreshToken)

	// movies
	mux.HandleFunc("GET /api/movies", apiConfig.HandlerGetMovies)
	mux.HandleFunc("GET /api/movies/{movieId}", apiConfig.HandlerGetMovieDetails)

	// reviews
	mux.HandleFunc("GET /api/reviews/{reviewId}", apiConfig.HandlerGetSingleMovieReview)
	mux.HandleFunc("GET /api/movies/{movieId}/reviews", apiConfig.HandlerGetMovieReviews)
	mux.Handle(
		"DELETE /api/reviews/{reviewId}",
		apiConfig.JWTAuth(apiConfig.JWTSecret)(
			http.HandlerFunc(apiConfig.HandlerDeleteMovieReview),
		),
	)
	mux.Handle(
		"POST /api/movies/{movieId}/reviews",
		apiConfig.JWTAuth(apiConfig.JWTSecret)(
			http.HandlerFunc(apiConfig.HandlerCreateMovieReview),
		),
	)
	mux.Handle(
		"PUT /api/movies/{movieId}/reviews/{reviewId}",
		apiConfig.JWTAuth(apiConfig.JWTSecret)(
			http.HandlerFunc(apiConfig.HandlerUpdateMovieReview),
		),
	)

	// dairy
	mux.Handle(
		"POST /api/dairy/movies",
		apiConfig.JWTAuth(apiConfig.JWTSecret)(
			http.HandlerFunc(apiConfig.HandlerCreateMovieDiary),
		),
	)

	// protected
	mux.Handle(
		"POST /api/protected", // endpoint
		apiConfig.JWTAuth(apiConfig.JWTSecret)( // middleware
			http.HandlerFunc(apiConfig.HandlerTestToken), // handler
		),
	)

	server := http.Server{
		Addr:    ":" + apiConfig.Port,
		Handler: mux,
	}

	fmt.Printf("Listing on http://localhost:%v\n", apiConfig.Port)
	log.Fatal(server.ListenAndServe())
}
