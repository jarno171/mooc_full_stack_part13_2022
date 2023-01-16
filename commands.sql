CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes int DEFAULT 0
);

INSERT INTO BLOGS (author, url, title, likes) values ('Leevi', 'www.com', 'cat blog', 3);
INSERT INTO BLOGS (author, url, title) values ('Vinski', 'www.fi', 'dog blog');