-- name: GetMovieByTmdbId :one
SELECT * FROM movies WHERE tmdb_id = $1;


-- name: GetMovieById :one
SELECT * FROM movies WHERE id = $1;


-- name: AddMovie :one
INSERT INTO movies (
    id,
    tmdb_id,
    imdb_id,
    title,
    original_title,
    poster_path,
    backdrop_path,
    overview,
    release_date,
    vote_average,
    vote_count,
    revenue,
    homepage,
    genres,
    runtime,
    tagline,
    trailer,
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
    $9,          
    $10,
    $11,
    $12,
    $13::jsonb,  
    $14,
    $15,
    $16,
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
    tagline = EXCLUDED.tagline
RETURNING *;

-- name: DeleteAllMovies :exec
DELETE FROM movies;


-- name: GetUserMetadataForMovie :one
SELECT 
    m.id AS movie_id,

    md.id AS diary_id,
    md.user_id AS diary_user_id,
    md.watched_at,
    md.created_at AS diary_created_at,
    md.updated_at AS diary_updated_at,

    (wl.movie_id IS NOT NULL) AS is_in_watchlist,

    r.id AS review_id,
    r.review,
    r.rating,
    r.is_spoiler,
    r.created_at AS review_created_at,
    r.updated_at AS review_updated_at

FROM movies m
LEFT JOIN movie_diaries md
    ON md.id = (
        SELECT id
        FROM movie_diaries
        WHERE movie_id = m.id AND md.user_id = $1
    )

LEFT JOIN watchlists wl
    ON m.id = wl.movie_id AND wl.user_id = $1

LEFT JOIN movie_reviews r
    ON r.id = (
        SELECT id
        FROM movie_reviews
        WHERE movie_id = m.id AND r.user_id = $1
    )

WHERE m.id = $2;