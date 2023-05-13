CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INTEGER REFERENCES users(id)
);