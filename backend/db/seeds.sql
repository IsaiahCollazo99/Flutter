INSERT INTO  users 
  (id, full_name, email, username)
VALUES
  ('uhcbP1U3kMVwFE5Hr5fXpobCJxf2', test, test@test.com, test);

INSERT INTO posts
  (poster_id, body, created_at)
VALUES
  ('uhcbP1U3kMVwFE5Hr5fXpobCJxf2', 'YERRR', '2020-03-07T03:36:00'),
  ('uhcbP1U3kMVwFE5Hr5fXpobCJxf2', 'YERR YERRR', '2020-03-07T03:36:00'),
  ('uhcbP1U3kMVwFE5Hr5fXpobCJxf2', 'HELLO', '2020-03-07T03:37:00');

INSERT INTO tags
  (post_id, name)
VALUES
  (1, 'TAG1'),
  (2, 'TAG2'),
  (2, 'TAG3'),
  (1, 'TAG4'),
  (1, 'TAG5');  