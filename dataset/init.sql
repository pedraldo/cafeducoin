CREATE TYPE gameaction AS ENUM ('BORROWING', 'RETURN');

CREATE TABLE users
(
    id serial NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text UNIQUE NOT NULL,
    password varchar NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE games
(
    id serial NOT NULL,
    name text NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO games (name)
VALUES ('Monopoly'),
('Pictionary'),
('Cluedo'),
('Uno'),
('Cranium'),
('Times Up');

CREATE TABLE users_games
(
    id serial NOT NULL,
    user_id serial NOT NULL,
    game_id serial NOT NULL,
		action_type gameaction NOT NULL,
		action_date timestamp with time zone NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES public.users (id),
    FOREIGN KEY (game_id) REFERENCES public.games (id)
);

