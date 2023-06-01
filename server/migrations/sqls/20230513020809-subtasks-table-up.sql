CREATE TABLE subtasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    completed BOOLEAN,
    task_id INTEGER REFERENCES tasks(id)
);