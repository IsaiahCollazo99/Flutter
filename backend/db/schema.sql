-- DROP DATABASE IF EXISTS flutter_db;
-- CREATE DATABASE flutter_db;

-- \c flutter_db;

DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NUll,
  bio TEXT NOT NULL
);

CREATE TABLE posts
(
  id SERIAL PRIMARY KEY,
  poster_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT, 
  created_at TEXT NOT NULL
);


CREATE TABLE tags
(
  id SERIAL PRIMARY KEY,
  post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  name TEXT NOT NULL
);

INSERT INTO users
  (full_name, email, username, password, bio)
VALUES
  ('Isaiah Collazo', 'isaiahcollazo@pursuit.org', 'theycallme_zay', 'test', 'Aspiring game designer and cinematopgrapher');


INSERT INTO posts
  (poster_id, body, created_at)
VALUES
  (1, 'YERRR', '2020-03-07T03:36:00'),
  (1, 'YERR YERRR', '2020-03-07T03:36:00'),
  (1, 'HELLO', '2020-03-07T03:37:00');

INSERT INTO tags
  (post_id, name)
VALUES
  (1, 'TAG1'),
  (2, 'TAG2'),
  (2, 'TAG3'),
  (1, 'TAG4'),
  (1, 'TAG5');  