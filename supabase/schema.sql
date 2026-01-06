-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Fonts Table (The Assets)
create table fonts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  foundry text,
  license_type text check (license_type in ('free', 'commercial', 'subscription', 'ofl')),
  origin_country text,
  noonnu_available boolean default false,
  preview_url text,
  download_link text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 2. Emotion Tags (The Taxonomy - Axis & Polarity)
create table emotion_tags (
  id uuid default uuid_generate_v4() primary key,
  tag text not null unique, -- e.g., "권위적인", "법적_안정감"
  axis text not null, -- e.g., "Authority", "Stability", "Risk"
  polarity int check (polarity between -2 and 2) default 0 -- -2: Very Negative, +2: Very Positive/Strong
);

-- 3. Font <-> Emotion Map
create table font_emotion_map (
  font_id uuid references fonts(id) on delete cascade,
  emotion_tag_id uuid references emotion_tags(id) on delete cascade,
  weight int check (weight between 1 and 5) default 3,
  primary key (font_id, emotion_tag_id)
);

-- 4. Use Cases (The "Money" Triggers)
create table use_cases (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique, -- e.g., "정부_제출_문서", "시리즈A_IR"
  risk_level int check (risk_level between 1 and 5) default 1, -- 5: Critical Risk (Lawsuit/Rejection)
  description text
);

-- 5. Font <-> Use Case Map (The Recommendation)
create table font_usecase_map (
  font_id uuid references fonts(id) on delete cascade,
  usecase_id uuid references use_cases(id) on delete cascade,
  confidence int check (confidence between 1 and 5) default 3,
  primary key (font_id, usecase_id)
);

-- 6. Users (Simple Auth)
create table users (
  id uuid primary key, -- References auth.users
  email text,
  plan text default 'free',
  created_at timestamp with time zone default timezone('utc', now())
);