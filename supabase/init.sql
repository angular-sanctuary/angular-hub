-- Custom types
create type public.app_permission as enum ('feature_flags.delete', 'messages.delete');
create type public.app_role as enum ('admin', 'moderator');

-- USERS
create table public.users
(
  id       uuid references auth.users on delete cascade not null primary key, -- UUID from auth.users
  username text,
  updated_at timestamp with time zone
);
comment on table public.users is 'Profile data for each user.';
comment on column public.users.id is 'References the internal Supabase Auth user.';

-- FEATURE FLAGS

create table public.feature_flags
(
  id          bigint generated by default as identity primary key,
  name        varchar unique                                                not null,
  description text,
  status      boolean,
  created_at  timestamp with time zone default timezone('utc'::text, now()) not null
);
comment on table public.feature_flags is 'Feature flags';

-- Feature Flag logs

create table public.feature_flag_logs
(
  id              bigint generated by default as identity primary key,
  feature_flag_id bigint references public.feature_flags on delete cascade      not null,
  changed_by      uuid references public.users                                  not null,
  new_status      boolean,
  reason          text                                                          not null,
  created_at      timestamp with time zone default timezone('utc'::text, now()) not null

);

-- Secure the tables
alter table public.users
  enable row level security;
alter table public.feature_flags
  enable row level security;
alter table public.feature_flag_logs
  enable row level security;


/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */

begin;
-- remove the realtime publication
drop publication if exists supabase_realtime;

-- re-create the publication but don't enable it for any tables
create publication supabase_realtime;
commit;

-- add tables to the publication
TODO : add proper tables
alter publication supabase_realtime add table public.channels;
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.users;
