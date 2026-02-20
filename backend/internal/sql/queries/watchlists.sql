-- name: AddToWatchlist :one
INSERT INTO watchlists (id, user_id, movie_id, created_at)
VALUES (gen_random_uuid(), $1, $2, NOW())
RETURNING *;

-- name: RemoveMovieFromWatchlist :exec
DELETE FROM watchlists WHERE id = $1;

-- name: GetWatchlistsRecord :one
SELECT * FROM watchlists WHERE id = $1;

-- name: GetUserWatchlist :many
SELECT * FROM watchlists WHERE user_id = $1;