CREATE TABLE columns (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    board_id INTEGER REFERENCES boards(id)
);