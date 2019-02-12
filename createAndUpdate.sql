create table users
(
  username    varchar(32)        null,
  firstname   varchar(32)        null,
  lastname    varchar(32)        null,
  id          int                not null,
  password    varchar(64)        null,
  permissions int(4) default 100 null,
  constraint users_id_uindex
    unique (id)
);

alter table users
  add primary key (id);

create table sessions
(
  id              int         not null,
  current_session varchar(64) null
);