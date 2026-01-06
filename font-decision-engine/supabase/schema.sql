-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Fonts Table (The Assets)
create table fonts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  foundry text, -- designer/foundry
  license_type text check (license_type in ('free', 'commercial', 'subscription', 'ofl', 'mixed')),
  license_summary jsonb, -- detailed permissions (print, web, video, etc.)
  source_url text, -- external link (affiliate ready)
  preview_image text, -- URL to preview image
  description text,
  noonnu_available boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 2. Tags Table (Taxonomy)
create table tags (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique, -- e.g., "serif", "playful", "title"
  category text not null, -- style, emotion, usage, weight
  label text -- display name if different
);

-- 3. Font <-> Tag Map (The Logic)
create table font_tags (
  font_id uuid references fonts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  weight int check (weight between 0 and 100) default 50, -- Relevance score (0-100)
  primary key (font_id, tag_id)
);

-- 4. Analytics / Tracking (Minimal)
create table click_events (
  id uuid default uuid_generate_v4() primary key,
  font_id uuid references fonts(id),
  link_type text, -- 'download', 'affiliate', 'source'
  created_at timestamp with time zone default timezone('utc', now())
);
