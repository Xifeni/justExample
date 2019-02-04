create table users
(
  username  varchar(32)  not null
    primary key,
  firstname varchar(128) null,
  lastname  varchar(128) null
);

create table vault
(
  username        varchar(32) not null
    primary key,
  password        varchar(64) not null,
  current_session varchar(32) null,
  constraint vault_users_username_fk
    foreign key (username) references users (username)
      on update cascade on delete cascade
);


create table permission
(
  username   varchar(32)  not null
    primary key,
  permission varchar(4)   null,
  rolename   varchar(128) null,
  constraint permission_users_username_fk
    foreign key (username) references users (username)
      on update cascade on delete cascade
);

INSERT INTO users (username, firstname, lastname) VALUES ('test', 'test', 'test');
INSERT INTO users (username, firstname, lastname) VALUES ('user', 'user', 'user');

INSERT INTO permission (username, permission, rolename) VALUES ('test', '111', 'test');
INSERT INTO permission (username, permission, rolename) VALUES ('user', '100', 'user');

INSERT INTO vault (username, password, current_session) VALUES ('test', 'test', null);
INSERT INTO vault (username, password, current_session) VALUES ('user', 'user', null);