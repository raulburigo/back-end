CREATE table tokens (
	id serial PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	type VARCHAR ( 13 ) NOT NULL,
    host VARCHAR ( 13 ) NOT NULL,
    username VARCHAR ( 100 ) NOT NULL,
    password VARCHAR ( 100 ) NOT NULL,
    database VARCHAR ( 100 ) NOT NULL,
    port INTEGER NOT NULL
);
