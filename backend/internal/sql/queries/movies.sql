-- name: GetMovieByTmdbId :one
SELECT * FROM movies WHERE tmdb_id = $1;

-- name: GetMovieById :one
SELECT * FROM movies WHERE id = $1;

-- name: AddMovie :one
INSERT INTO movies (
    id,
    tmdb_id,
    title,
    original_title,
    poster_path,
    backdrop_path,
    overview,
    release_date,
    vote_average,
    genres,
    runtime,
    status,
    tagline,
    created_at
) VALUES (
    gen_random_uuid(),              
    $1,                              
    $2,                              
    $3,                              
    $4,                              
    $5,                              
    $6,                              
    $7,                              
    $8,                              
    $9::jsonb,                       
    $10,                             
    $11,                             
    $12,                             
    NOW()                            
)
ON CONFLICT (tmdb_id) DO UPDATE
SET 
    title = EXCLUDED.title,
    original_title = EXCLUDED.original_title,
    poster_path = EXCLUDED.poster_path,
    backdrop_path = EXCLUDED.backdrop_path,
    overview = EXCLUDED.overview,
    release_date = EXCLUDED.release_date,
    vote_average = EXCLUDED.vote_average,
    genres = EXCLUDED.genres,
    runtime = EXCLUDED.runtime,
    status = EXCLUDED.status,
    tagline = EXCLUDED.tagline
RETURNING *;

