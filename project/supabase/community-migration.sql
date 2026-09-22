create table if not exists community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  author_name text not null,
  author_initials text not null,
  author_color text not null default '#2563eb',
  kind text not null check (kind in ('discussion','question','win','challenge')),
  title text not null,
  body text not null,
  tags text[] not null default '{}',
  is_pinned boolean not null default false,
  is_official boolean not null default false,
  reply_count integer not null default 0,
  helpful_count integer not null default 0,
  flagged boolean not null default false,
  flag_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists community_posts_feed_idx on community_posts (is_pinned desc, created_at desc);
create index if not exists community_posts_kind_idx on community_posts (kind, created_at desc);

create table if not exists community_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references community_posts(id) on delete cascade,
  user_id text not null,
  author_name text not null,
  author_initials text not null,
  author_color text not null default '#2563eb',
  body text not null,
  helpful_count integer not null default 0,
  flagged boolean not null default false,
  flag_reason text,
  created_at timestamptz not null default now()
);

create index if not exists community_replies_post_idx on community_replies (post_id, created_at asc);

create table if not exists community_reactions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  target_type text not null check (target_type in ('post','reply')),
  target_id uuid not null,
  kind text not null check (kind in ('helpful','agree','respect')),
  created_at timestamptz not null default now()
);

create unique index if not exists community_reactions_unique on community_reactions (user_id, target_type, target_id, kind);
create index if not exists community_reactions_target_idx on community_reactions (target_type, target_id);

create table if not exists community_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id text not null,
  target_type text not null check (target_type in ('post','reply')),
  target_id uuid not null,
  reason text not null,
  note text,
  created_at timestamptz not null default now()
);

create unique index if not exists community_reports_unique on community_reports (reporter_user_id, target_type, target_id);
create index if not exists community_reports_target_idx on community_reports (target_type, target_id);
create index if not exists community_reports_created_idx on community_reports (created_at desc);
