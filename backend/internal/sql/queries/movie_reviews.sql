-- name: CreateMovieReview :one 
INSERT INTO movie_reviews(id, movie_id, user_id, review, rating, is_spoiler, created_at, updated_at) 
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())
RETURNING *;

-- name: GetMovieReviews :many
SELECT 
    r.id,
    r.movie_id,
    r.review,
    r.rating,
    r.is_spoiler,
    r.created_at,
    r.updated_at,
    u.id AS user_id,
    u.name AS user_name,
    u.email AS user_email,
    u.username AS user_username,
    u.is_premium AS user_is_premium
FROM movie_reviews r
INNER JOIN users u ON r.user_id = u.id
WHERE r.movie_id = $1;


-- name: DeleteReview :exec
DELETE FROM movie_reviews WHERE movie_id = $1 AND user_id = $2;

-- name: GetSingleMovieReview :one
SELECT * FROM movie_reviews WHERE id = $1;

-- name: UpdateMovieReview :one
UPDATE movie_reviews
SET review = $1,
  is_spoiler = $2,
  rating = $3,
  updated_at = NOW()
WHERE movie_id = $4 AND user_id = $5
RETURNING *;

-- name: GetUserReviews :many
SELECT * FROM movie_reviews WHERE user_id = $1;
