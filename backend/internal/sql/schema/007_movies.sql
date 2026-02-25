-- +goose Up
CREATE TABLE movies (
    id uuid PRIMARY KEY NOT NULL,          
    tmdb_id INT UNIQUE NOT NULL,    
    title TEXT NOT NULL,
    original_title TEXT NOT NULL,
    poster_path TEXT NOT NULL,
    backdrop_path TEXT NOT NULL,
    overview TEXT NOT NULL,
    release_date TIMESTAMP NOT NULL,
    vote_average FLOAT NOT NULL,
    genres JSONB,                   
    runtime INT NOT NULL,                     
    status TEXT NOT NULL,             
    tagline TEXT NOT NULL,            
    created_at TIMESTAMP NOT NULL 
);

-- +goose Down
DROP TABLE movies;