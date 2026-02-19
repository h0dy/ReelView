-- name: CreateUser :one
INSERT INTO users(id, created_at, updated_at, name, email, username, hashed_password)
VALUES (gen_random_uuid(), NOW(), NOW(), $1, $2, $3, $4)
RETURNING *;

-- name: DeleteUsers :exec 
DELETE FROM users;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- name: GetUserByID :one
SELECT * FROM users WHERE id = $1;

-- name: UpdateUser :one 
UPDATE users
  SET email = $1,
  username = $2,
  is_premium = $3,
  name = $4,
  updated_at = NOW() 
WHERE id = $5
RETURNING *;