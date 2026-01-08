-- Phase 2 Intelligence Deepening Migration

-- 1. Extend Fonts table with Intelligence Metrics
alter table fonts 
add column metrics_min int check (metrics_min between 0 and 100) default 50,
add column metrics_aut int check (metrics_aut between 0 and 100) default 50,
add column metrics_leg int check (metrics_leg between 0 and 100) default 50,
add column description text,
add column price int default 0;

-- 2. Extend Emotion Tags with Metric Weights
alter table emotion_tags
add column weight_min float default 0.0,
add column weight_aut float default 0.0,
add column weight_leg float default 0.0;

-- 3. Add Confidence to Emotion Map
alter table font_emotion_map
add column confidence float default 0.8;

-- 4. Enable RLS (Row Level Security) - Basic Security Baseline
alter table fonts enable row level security;
alter table emotion_tags enable row level security;
alter table font_emotion_map enable row level security;

-- Public read access
create policy "Public fonts are readable by everyone" on fonts for select using (true);
create policy "Public tags are readable by everyone" on emotion_tags for select using (true);
create policy "Public maps are readable by everyone" on font_emotion_map for select using (true);
