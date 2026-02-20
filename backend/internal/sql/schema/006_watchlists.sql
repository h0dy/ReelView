-- +goose Up
CREATE TABLE watchlists(
  id uuid PRIMARY KEY NOT NULL,
  movie_id INT NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL,
  CONSTRAINT unique_user_watchlist UNIQUE (user_id, movie_id)
);

-- -- +goose  Down 
DROP TABLE watchlists;
