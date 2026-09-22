-- PRAXIS Practice, one portfolio per user, trades, snapshots.
-- Run once in the Supabase SQL editor.

create table if not exists practice_portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id text not null unique,
  starting_capital numeric not null check (starting_capital > 0),
  cash numeric not null check (cash >= 0),
  created_at timestamptz not null default now(),
  reset_count integer not null default 0
);

create table if not exists practice_trades (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  portfolio_id uuid not null references practice_portfolios(id) on delete cascade,
  ticker text not null,
  side text not null check (side in ('buy','sell')),
  shares numeric not null check (shares > 0),
  price numeric not null check (price > 0),
  total numeric not null check (total > 0),
  reason text,
  executed_at timestamptz not null default now()
);

create index if not exists practice_trades_user_idx on practice_trades(user_id, executed_at desc);
create index if not exists practice_trades_ticker_idx on practice_trades(user_id, ticker);

create table if not exists practice_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  portfolio_id uuid not null references practice_portfolios(id) on delete cascade,
  total_value numeric not null,
  cash numeric not null,
  invested numeric not null,
  taken_at timestamptz not null default now()
);

create index if not exists practice_snapshots_user_idx on practice_snapshots(user_id, taken_at desc);
