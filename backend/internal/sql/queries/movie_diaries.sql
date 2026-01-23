-- name: CreateMovieDiary :one
INSERT INTO movie_diaries(id, movie_id, user_id, watched_at, created_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())
RETURNING *;

-- name: UpdateMovieDiary :one 
UPDATE movie_diaries
SET watched_at = $1,
  updated_at = NOW()
WHERE user_id = $2
RETURNING *;

-- name: DeleteMovieDiary :exec
DELETE FROM movie_diaries 
  WHERE user_id = $1 
  AND movie_id = $2;

-- name: GetMovieDiaries :many
SELECT FROM movie_diaries
  WHERE user_id = $1
  AND movie_id = $2;

-- name: GetUserDiaries :many
SELECT FROM movie_diaries WHERE user_id = $1;