-- +goose Up
CREATE TABLE movie_reviews(
  id uuid PRIMARY KEY NOT NULL,
  movie_id INT NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  review TEXT NOT NULL,
  rating FLOAT4 NOT NULL CHECK (rating >= 0 AND rating <= 10),
  is_spoiler BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT unique_user_movie_review UNIQUE (user_id, movie_id)

);

-- +goose  Down 
DROP TABLE movie_reviews;