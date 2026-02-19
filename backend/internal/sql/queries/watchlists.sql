-- name: AddToWatchlist :one
INSERT INTO watchlists (id, user_id, movie_id, created_at)
VALUES (gen_random_uuid(), $1, $2, NOW())
RETURNING *;