CREATE TABLE IF NOT EXISTS users (
    id       SERIAL PRIMARY KEY,
    username VARCHAR(80)  UNIQUE NOT NULL,
    email    VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS dramas (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    description TEXT,
    genre       VARCHAR(80),
    year        INT,
    channel     VARCHAR(100),
    poster_url  VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS reviews (
    id         SERIAL PRIMARY KEY,
    content    TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id    INT NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
    drama_id   INT NOT NULL REFERENCES dramas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ratings (
    id       SERIAL PRIMARY KEY,
    score    INT NOT NULL CHECK (score BETWEEN 1 AND 5),
    user_id  INT NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
    drama_id INT NOT NULL REFERENCES dramas(id) ON DELETE CASCADE,
    UNIQUE (user_id, drama_id)
);