-- Optional name override table. If a user has a row here, we use it.
-- Otherwise we read the name from Supabase auth metadata.

create table if not exists community_profiles (
  user_id text primary key,
  display_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Clean up any posts saved with the placeholder "You" before this fix.
-- (They will show as "Praxis User" until the original poster reposts.)
update community_posts
set author_name = 'Praxis User', author_initials = 'PU'
where author_name = 'You';

update community_replies
set author_name = 'Praxis User', author_initials = 'PU'
where author_name = 'You';
