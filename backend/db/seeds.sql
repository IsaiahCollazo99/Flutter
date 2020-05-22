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