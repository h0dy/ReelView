-- name: CreateMovieReview :one 
INSERT INTO movie_reviews(id, movie_id, user_id, review, rating, is_spoiler, created_at, updated_at) 
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())
RETURNING *;

-- name: GetMovieReviews :many
SELECT * FROM movie_reviews
 WHERE movie_id = $1;

-- name: DeleteReview :exec
DELETE FROM movie_reviews WHERE id = $1 AND movie_id = $2;
