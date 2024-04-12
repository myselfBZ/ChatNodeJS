CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password_hash VARCHAR(64) NOT NULL
);
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    message_text TEXT NOT NULL,
    sender_id INT NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users (user_id),
);