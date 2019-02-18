create table users
(
  id          int auto_increment,
  username    varchar(32)     not null,
  firstname   varchar(128)    not null,
  lastname    varchar(128)    not null,
  permissions int default 100 not null,
  password    varchar(64)     not null,
  constraint users_id_uindex
    unique (id),
  constraint users_username_uindex
    unique (username)
);

alter table users
  add primary key (id);

create table sessions
(
  current_session varchar(32) null,
  id              int         not null,
  constraint sessions_users_id_fk
    foreign key (id) references users (id)
      on update cascade on delete cascade
);

INSERT INTO users (username, firstname, lastname, permissions, password) VALUES ('test', 'test', 'test', '111', 'edd5bb5389dfb55beb4d3ac56b7546c17cd464bc4da27aaf95b7dc9cbae8cf1f');
INSERT INTO users (username, firstname, lastname, permissions, password) VALUES ('user', 'user', 'user', '100', '48cee8d8b352a2221a8993ac5fafd739ef877013a7576e582ac1363b92995782');

INSERT INTO sessions (id) VALUES (1);
INSERT INTO sessions (id) VALUES (2);