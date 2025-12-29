-- name: CreateMovieReview :one 
INSERT INTO movie_reviews(id, movie_id, user_id, review, rating, is_spoiler, created_at, updated_at) 
VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())
RETURNING *;
