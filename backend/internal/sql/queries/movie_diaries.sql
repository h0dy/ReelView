-- name: CreateMovieDiary :one
INSERT INTO movie_diaries(id, movie_id, user_id, watched_at, is_rewatched, created_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), NOW())
RETURNING *;

-- name: UpdateMovieDiary :one 
UPDATE movie_diaries
SET watched_at = $1,
  is_rewatched = $2,
  updated_at = NOW()
WHERE user_id = $3
RETURNING *;

-- name: DeleteMovieDiary :exec
DELETE FROM movie_diaries 
  WHERE user_id = $1 
  AND movie_id = $2;

-- name: GetMovieDiary :one
SELECT FROM movie_diaries
  WHERE user_id = $1
  AND movie_id = $2;