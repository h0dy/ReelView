-- name: CreateMovieDiary :one
INSERT INTO movie_diaries(id, movie_id, user_id, watched_at, created_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())
RETURNING *;

-- name: UpdateMovieDiary :one 
UPDATE movie_diaries
SET watched_at = $1,
  updated_at = NOW()
WHERE id = $2
RETURNING *;

-- name: DeleteMovieDiary :exec
DELETE FROM movie_diaries 
  WHERE user_id = $1 
  AND id = $2;

-- name: GetMovieDiariesForUser :many
SELECT * FROM movie_diaries
  WHERE user_id = $1
  AND movie_id = $2;

-- name: GetDiary :one
SELECT * FROM movie_diaries WHERE id = $1;

-- name: GetUserDiaries :many
SELECT
    movie_diaries.*,
    movies.tmdb_id,
    movies.imdb_id,
    movies.title,
    movies.original_title,
    movies.poster_path,
    movies.backdrop_path,
    movies.overview,
    movies.release_date,
    movies.vote_average,
    movies.vote_count,
    movies.revenue,
    movies.homepage,
    movies.genres,
    movies.runtime,
    movies.trailer,
    movies.tagline
FROM movie_diaries
JOIN movies
ON movie_diaries.movie_id = movies.id
WHERE movie_diaries.user_id = $1;