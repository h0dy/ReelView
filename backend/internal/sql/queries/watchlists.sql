-- name: AddToWatchlist :one
INSERT INTO watchlists (id, user_id, movie_id, created_at)
VALUES (gen_random_uuid(), $1, $2, NOW())
RETURNING *;

-- name: RemoveMovieFromWatchlist :exec
DELETE FROM watchlists WHERE movie_id = $1 AND user_id = $2;

-- name: GetWatchlistRecord :one
SELECT * FROM watchlists WHERE movie_id = $1 AND user_id = $2;

-- name: GetUserWatchlist :many
SELECT * FROM watchlists WHERE user_id = $1;