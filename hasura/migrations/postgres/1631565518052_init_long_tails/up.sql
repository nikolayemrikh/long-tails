CREATE TABLE long_tails (
  id serial NOT NULL,
  tail text NOT NULL unique,
  json_id integer NOT NULL unique,
  PRIMARY KEY (id)
);

INSERT INTO long_tails (tail, json_id) VALUES ("best-hello-ever", 1);
INSERT INTO long_tails (tail, json_id) VALUES ("best-hello-world-ever", 2);
INSERT INTO long_tails (tail, json_id) VALUES ("best-world-ever", 3);