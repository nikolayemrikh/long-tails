CREATE TABLE long_tails (
  id serial NOT NULL,
  tail text NOT NULL unique,
  json_id integer NOT NULL unique,
  PRIMARY KEY (id)
);
