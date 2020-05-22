-- DROP DATABASE IF EXISTS flutter_db;
-- CREATE DATABASE flutter_db;

-- \c flutter_db;

-- DROP TABLE IF EXISTS tags;
-- DROP TABLE IF EXISTS posts;
-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users
-- (
--   id VARCHAR UNIQUE NOT NULL,
--   full_name TEXT NOT NULL,
--   email TEXT NOT NULL UNIQUE,
--   username TEXT UNIQUE NOT NULL,
--   bio TEXT
-- );

-- CREATE TABLE posts
-- (
--   id SERIAL PRIMARY KEY,
--   poster_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   body TEXT, 
--   created_at TEXT NOT NULL
-- );


-- CREATE TABLE tags
-- (
--   id SERIAL PRIMARY KEY,
--   post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
--   name TEXT NOT NULL
-- );

-- CREATE TABLE likes 
-- (
--   id SERIAL PRIMARY KEY,
--   post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
--   liker_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE
-- );

-- CREATE TABLE comments
-- (
--   id SERIAL PRIMARY KEY,
--   post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
--   commenter_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   comment TEXT,
--   created_at TEXT NOT NULL
-- )

-- ALTER TABLE posts
-- ADD is_retweet boolean;

-- UPDATE posts
-- SET is_retweet = false
-- WHERE id>3;

-- ALTER TABLE posts
-- ADD retweeter_id VARCHAR REFERENCES users(id) ON DELETE CASCADE;