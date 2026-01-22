-- name: CreateDairyMovie :one
INSERT INTO dairy_movies(id, movie_id, user_id, watched_at, is_rewatched, created_at, updated_at)
VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), NOW())
RETURNING *;

-- name: UpdateDairyMovie :one 
UPDATE dairy_movies
SET watched_at = $1,
  is_rewatched = $2,
  updated_at = NOW()
WHERE user_id = $3
RETURNING *;

-- name: DeleteDairyMovie :exec
DELETE FROM dairy_movies 
  WHERE user_id = $1 
  AND movie_id = $2;

-- name: GetDairyMovie :one
SELECT FROM dairy_movies
  WHERE user_id = $1
  AND movie_id = $2;