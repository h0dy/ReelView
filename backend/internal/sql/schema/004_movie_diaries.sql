-- +goose Up
CREATE TABLE movie_diaries (
  id uuid PRIMARY KEY NOT NULL,
  movie_id INT NOT NULL, 
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  watched_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  is_rewatched BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT unique_user_dairy UNIQUE (user_id, movie_id)
);

-- +goose Down
DROP TABLE movie_diaries;