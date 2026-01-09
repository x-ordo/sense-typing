-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Fonts Table (The Assets)
create table fonts (
  id text primary key,                      -- e.g., 'noonnu-694'
  slug text unique,                         -- URL-friendly identifier
  name text not null,
  korean_name text,                         -- Korean name for searching
  foundry text,                             -- designer/foundry
  designer text,                            -- individual designer name
  license_type text check (license_type in ('free', 'commercial', 'subscription', 'ofl', 'mixed')),
  license_summary jsonb,                    -- detailed permissions (print, web, video, etc.)
  source_url text,                          -- external link (affiliate ready)
  preview_image text,                       -- URL to preview image
  webfont_url text,                         -- CDN URL for @font-face
  download_url text,                        -- Direct download URL
  description text,
  category text,                            -- '산세리프', '세리프', '손글씨', etc.
  tags text[],                              -- Array of tags
  emotion_tags text[],                      -- AI-generated emotion tags
  weight_count int,                         -- Number of available weights
  file_formats text[],                      -- ['otf', 'ttf', 'woff2']
  glyph_count_korean int,                   -- Korean glyph count
  glyph_count_total int,                    -- Total glyph count
  price decimal(10,2) default 0,            -- Price (0 for free)
  views int default 0,                      -- View count
  crawl_source text,                        -- 'noonnu', 'google', 'manual'
  crawl_source_id text,                     -- Original ID from source
  is_verified boolean default false,        -- Manual QA verified
  is_active boolean default true,           -- Display flag
  noonnu_available boolean default false,   -- Legacy field
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
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
  font_id text references fonts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  weight int check (weight between 0 and 100) default 50, -- Relevance score (0-100)
  primary key (font_id, tag_id)
);

-- 4. Analytics / Tracking (Enhanced for Affiliate)
create table click_events (
  id uuid default uuid_generate_v4() primary key,
  font_id text references fonts(id),
  link_type text,                           -- 'download', 'affiliate', 'source'
  session_id text,                          -- Browser session tracking
  user_id uuid,                             -- If logged in (future)
  referrer text,                            -- Where user came from
  user_agent text,                          -- Browser info
  ip_hash text,                             -- Hashed IP for privacy
  converted boolean default false,          -- Did user complete action?
  conversion_value decimal(10,2),           -- Revenue if any
  created_at timestamp with time zone default timezone('utc', now())
);

-- 5. Crawl Logs (Audit Trail)
create table crawl_logs (
  id uuid default uuid_generate_v4() primary key,
  source text not null,                     -- 'noonnu', 'google', etc.
  crawled_at timestamp with time zone default timezone('utc', now()),
  fonts_added int default 0,
  fonts_updated int default 0,
  fonts_skipped int default 0,
  errors jsonb,                             -- Array of error objects
  status text check (status in ('pending', 'running', 'completed', 'failed')) default 'completed',
  duration_seconds int
);

-- 6. Emotion Tag Vocabulary (Standardization)
create table emotion_vocabulary (
  id uuid default uuid_generate_v4() primary key,
  tag text not null unique,                 -- Korean tag name
  english_tag text,                         -- English equivalent
  category text,                            -- 'emotion', 'style', 'usage'
  polarity decimal(3,2),                    -- -3 to +3 scale for premium detection
  created_at timestamp with time zone default timezone('utc', now())
);

-- 7. User Profiles (extends Supabase Auth)
create table user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  user_type text check (user_type in ('customer', 'expert', 'admin')) default 'customer',
  subscription_plan text check (subscription_plan in ('free', 'personal', 'team', 'enterprise')) default 'free',
  subscription_status text check (subscription_status in ('active', 'cancelled', 'past_due', 'trialing')) default 'active',
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- Enable RLS for user_profiles
alter table user_profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on user_profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on user_profiles for update
  using (auth.uid() = id);

-- Service role can insert profiles (for triggers)
create policy "Service role can insert profiles"
  on user_profiles for insert
  with check (true);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 8. User Archives (saved fonts)
create table user_archives (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  font_id text references fonts(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc', now()),
  unique(user_id, font_id)
);

-- Enable RLS for user_archives
alter table user_archives enable row level security;

create policy "Users can manage own archives"
  on user_archives for all
  using (auth.uid() = user_id);

-- 9. Orders Table (E-Commerce)
create table orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null,            -- Human-readable order number (e.g., 'ORD-20240115-ABC123')
  user_id uuid references auth.users(id) on delete set null,
  email text not null,                          -- For guest checkout or reference
  status text check (status in ('pending', 'paid', 'failed', 'refunded', 'cancelled')) default 'pending',
  subtotal decimal(10,2) not null,              -- Sum of item prices
  discount decimal(10,2) default 0,             -- Applied discounts
  total decimal(10,2) not null,                 -- Final amount charged
  currency text default 'KRW',
  payment_method text,                          -- 'card', 'bank_transfer', 'kakao', etc.
  payment_id text,                              -- Toss payment key or transaction ID
  payment_data jsonb,                           -- Full payment response for auditing
  billing_name text,
  billing_email text,
  billing_phone text,
  notes text,
  paid_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- 10. Order Items Table
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade,
  font_id text references fonts(id) on delete set null,
  font_name text not null,                      -- Snapshot of font name at purchase time
  foundry text,                                 -- Snapshot of foundry
  license_type text check (license_type in ('personal', 'commercial', 'enterprise')) not null,
  price decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 11. Downloads Table (License Delivery)
create table downloads (
  id uuid default uuid_generate_v4() primary key,
  order_item_id uuid references order_items(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  download_token text unique not null,          -- Secure token for download URL
  download_count int default 0,                 -- Track number of downloads
  max_downloads int default 5,                  -- Limit downloads per purchase
  expires_at timestamp with time zone,          -- Optional expiration
  last_downloaded_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable RLS for orders
alter table orders enable row level security;

create policy "Users can view own orders"
  on orders for select
  using (auth.uid() = user_id);

create policy "Users can insert own orders"
  on orders for insert
  with check (auth.uid() = user_id or user_id is null);

-- Enable RLS for order_items
alter table order_items enable row level security;

create policy "Users can view own order items"
  on order_items for select
  using (
    order_id in (
      select id from orders where user_id = auth.uid()
    )
  );

-- Enable RLS for downloads
alter table downloads enable row level security;

create policy "Users can view own downloads"
  on downloads for select
  using (auth.uid() = user_id);

create policy "Users can update own downloads"
  on downloads for update
  using (auth.uid() = user_id);

-- Function to generate order number
create or replace function generate_order_number()
returns text as $$
declare
  prefix text := 'ORD';
  date_part text := to_char(now(), 'YYYYMMDD');
  random_part text := upper(substr(md5(random()::text), 1, 6));
begin
  return prefix || '-' || date_part || '-' || random_part;
end;
$$ language plpgsql;

-- 12. Affiliate Partners Table
create table affiliate_partners (
  id uuid default uuid_generate_v4() primary key,
  name text not null,                           -- Partner name (e.g., 'Noonnu', 'MyFonts')
  slug text unique not null,                    -- URL-friendly identifier
  domain text,                                  -- Partner domain for attribution
  logo_url text,                                -- Partner logo
  commission_rate decimal(5,4) default 0.05,   -- Commission rate (e.g., 0.05 = 5%)
  commission_type text check (commission_type in ('percentage', 'fixed')) default 'percentage',
  cookie_duration_days int default 30,          -- Attribution window
  is_active boolean default true,
  contact_email text,
  notes text,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- 13. Affiliate Links Table (pre-generated tracking links)
create table affiliate_links (
  id uuid default uuid_generate_v4() primary key,
  partner_id uuid references affiliate_partners(id) on delete cascade,
  font_id text references fonts(id) on delete cascade,
  target_url text not null,                     -- Where the link goes
  tracking_code text unique not null,           -- Short code for URL (e.g., 'abc123')
  click_count int default 0,
  conversion_count int default 0,
  revenue_generated decimal(10,2) default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- 14. Affiliate Clicks (Enhanced click_events for affiliate tracking)
create table affiliate_clicks (
  id uuid default uuid_generate_v4() primary key,
  link_id uuid references affiliate_links(id) on delete set null,
  font_id text references fonts(id) on delete set null,
  partner_id uuid references affiliate_partners(id) on delete set null,
  session_id text,                              -- Browser session for attribution
  visitor_id text,                              -- Persistent visitor ID (cookie)
  user_id uuid references auth.users(id) on delete set null,
  referrer text,                                -- Where user came from
  landing_page text,                            -- Page where click happened
  target_url text,                              -- Where user went
  user_agent text,
  ip_hash text,                                 -- Hashed for privacy
  country text,                                 -- Geo location
  device_type text,                             -- 'desktop', 'mobile', 'tablet'
  browser text,
  os text,
  utm_source text,                              -- UTM parameters
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  converted boolean default false,              -- Did user complete purchase?
  conversion_order_id uuid references orders(id) on delete set null,
  conversion_value decimal(10,2),               -- Revenue from conversion
  conversion_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 15. Affiliate Conversions (Attribution records)
create table affiliate_conversions (
  id uuid default uuid_generate_v4() primary key,
  click_id uuid references affiliate_clicks(id) on delete set null,
  partner_id uuid references affiliate_partners(id) on delete set null,
  order_id uuid references orders(id) on delete cascade,
  font_id text references fonts(id) on delete set null,
  order_total decimal(10,2) not null,
  commission_rate decimal(5,4) not null,
  commission_amount decimal(10,2) not null,
  status text check (status in ('pending', 'approved', 'paid', 'rejected')) default 'pending',
  paid_at timestamp with time zone,
  notes text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable RLS for affiliate tables
alter table affiliate_partners enable row level security;
alter table affiliate_links enable row level security;
alter table affiliate_clicks enable row level security;
alter table affiliate_conversions enable row level security;

-- Public read access for affiliate links (needed for tracking)
create policy "Public can view active affiliate links"
  on affiliate_links for select
  using (is_active = true);

-- Admins can manage affiliate data
create policy "Admins can manage affiliate partners"
  on affiliate_partners for all
  using (
    exists (
      select 1 from user_profiles
      where id = auth.uid() and user_type = 'admin'
    )
  );

create policy "Admins can manage affiliate links"
  on affiliate_links for all
  using (
    exists (
      select 1 from user_profiles
      where id = auth.uid() and user_type = 'admin'
    )
  );

create policy "Admins can view affiliate clicks"
  on affiliate_clicks for select
  using (
    exists (
      select 1 from user_profiles
      where id = auth.uid() and user_type = 'admin'
    )
  );

create policy "Admins can manage affiliate conversions"
  on affiliate_conversions for all
  using (
    exists (
      select 1 from user_profiles
      where id = auth.uid() and user_type = 'admin'
    )
  );

-- Allow anonymous click tracking (insert only)
create policy "Anyone can record clicks"
  on affiliate_clicks for insert
  with check (true);

-- Indexes for performance
create index idx_fonts_crawl_source on fonts(crawl_source);
create index idx_fonts_category on fonts(category);
create index idx_fonts_license_type on fonts(license_type);
create index idx_fonts_is_active on fonts(is_active);
create index idx_click_events_font_id on click_events(font_id);
create index idx_click_events_created_at on click_events(created_at);
create index idx_user_profiles_user_type on user_profiles(user_type);
create index idx_user_archives_user_id on user_archives(user_id);
create index idx_orders_user_id on orders(user_id);
create index idx_orders_status on orders(status);
create index idx_orders_created_at on orders(created_at);
create index idx_order_items_order_id on order_items(order_id);
create index idx_downloads_user_id on downloads(user_id);
create index idx_downloads_token on downloads(download_token);
create index idx_affiliate_links_tracking_code on affiliate_links(tracking_code);
create index idx_affiliate_links_partner_id on affiliate_links(partner_id);
create index idx_affiliate_clicks_session_id on affiliate_clicks(session_id);
create index idx_affiliate_clicks_visitor_id on affiliate_clicks(visitor_id);
create index idx_affiliate_clicks_created_at on affiliate_clicks(created_at);
create index idx_affiliate_conversions_partner_id on affiliate_conversions(partner_id);
create index idx_affiliate_conversions_status on affiliate_conversions(status);

-- =====================================================
-- EXPERT MARKETPLACE TABLES
-- =====================================================

-- 16. Experts Table (Professional profiles)
create table experts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade unique,
  slug text unique not null,                    -- URL-friendly identifier
  display_name text not null,
  title text,                                   -- e.g., "Typography Consultant"
  bio text,
  profile_image text,
  cover_image text,
  specialties text[] default '{}',             -- ['brand-identity', 'catchphrase', 'typography']
  expertise_level text check (expertise_level in ('junior', 'mid', 'senior', 'expert')) default 'mid',
  years_experience int,
  hourly_rate decimal(10,2),
  portfolio_url text,
  linkedin_url text,
  instagram_url text,
  languages text[] default '{Korean}',
  location text,
  timezone text default 'Asia/Seoul',
  is_verified boolean default false,           -- Admin verified
  is_featured boolean default false,           -- Homepage featured
  is_available boolean default true,           -- Currently accepting work
  rating_avg decimal(3,2) default 0,
  rating_count int default 0,
  completed_projects int default 0,
  response_time_hours int default 24,          -- Typical response time
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- 17. Expert Services Table (What experts offer)
create table expert_services (
  id uuid default uuid_generate_v4() primary key,
  expert_id uuid references experts(id) on delete cascade,
  name text not null,                          -- e.g., "Font Pairing Consultation"
  description text,
  category text check (category in ('typography', 'branding', 'catchphrase', 'consultation', 'design', 'other')) not null,
  price decimal(10,2) not null,
  price_type text check (price_type in ('fixed', 'hourly', 'starting_from')) default 'fixed',
  delivery_days int,                           -- Estimated delivery time
  revisions int default 1,                     -- Number of revisions included
  is_popular boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- 18. Expert Portfolio Items
create table expert_portfolio (
  id uuid default uuid_generate_v4() primary key,
  expert_id uuid references experts(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  project_url text,
  client_name text,
  category text,
  tags text[] default '{}',
  is_featured boolean default false,
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 19. Bookings/Inquiries Table
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  booking_number text unique not null,         -- e.g., 'BK-20240115-ABC123'
  expert_id uuid references experts(id) on delete set null,
  service_id uuid references expert_services(id) on delete set null,
  client_id uuid references auth.users(id) on delete set null,
  client_name text not null,
  client_email text not null,
  client_phone text,
  client_company text,
  status text check (status in ('inquiry', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled', 'rejected')) default 'inquiry',
  project_title text,
  project_brief text not null,                 -- What the client needs
  project_type text,                           -- 'brand-identity', 'font-selection', etc.
  budget_min decimal(10,2),
  budget_max decimal(10,2),
  deadline date,
  quoted_price decimal(10,2),                  -- Expert's quote
  final_price decimal(10,2),                   -- Agreed price
  expert_notes text,                           -- Private notes from expert
  client_notes text,                           -- Additional client info
  attachments jsonb default '[]',              -- Array of file URLs
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- 20. Expert Reviews
create table expert_reviews (
  id uuid default uuid_generate_v4() primary key,
  expert_id uuid references experts(id) on delete cascade,
  booking_id uuid references bookings(id) on delete set null,
  client_id uuid references auth.users(id) on delete set null,
  client_name text,
  rating int check (rating between 1 and 5) not null,
  title text,
  content text,
  is_verified boolean default false,           -- From completed booking
  is_featured boolean default false,
  expert_response text,                        -- Expert's reply
  responded_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 21. Expert Applications (For new expert signups)
create table expert_applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  display_name text not null,
  email text not null,
  phone text,
  specialty text not null,                     -- Primary specialty
  experience_years int,
  portfolio_url text,
  linkedin_url text,
  bio text,
  why_join text,                               -- Why they want to join
  status text check (status in ('pending', 'reviewing', 'approved', 'rejected')) default 'pending',
  reviewer_notes text,
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable RLS for expert tables
alter table experts enable row level security;
alter table expert_services enable row level security;
alter table expert_portfolio enable row level security;
alter table bookings enable row level security;
alter table expert_reviews enable row level security;
alter table expert_applications enable row level security;

-- Public can view active experts
create policy "Public can view active experts"
  on experts for select
  using (is_available = true or user_id = auth.uid());

-- Experts can update own profile
create policy "Experts can update own profile"
  on experts for update
  using (user_id = auth.uid());

-- Public can view active services
create policy "Public can view active services"
  on expert_services for select
  using (is_active = true);

-- Experts can manage own services
create policy "Experts can manage own services"
  on expert_services for all
  using (
    expert_id in (
      select id from experts where user_id = auth.uid()
    )
  );

-- Public can view portfolio items
create policy "Public can view portfolio"
  on expert_portfolio for select
  using (true);

-- Experts can manage own portfolio
create policy "Experts can manage own portfolio"
  on expert_portfolio for all
  using (
    expert_id in (
      select id from experts where user_id = auth.uid()
    )
  );

-- Users can view own bookings, experts can view their bookings
create policy "Users can view own bookings"
  on bookings for select
  using (
    client_id = auth.uid() or
    expert_id in (
      select id from experts where user_id = auth.uid()
    )
  );

-- Anyone can create bookings
create policy "Anyone can create bookings"
  on bookings for insert
  with check (true);

-- Experts can update their bookings
create policy "Experts can update bookings"
  on bookings for update
  using (
    expert_id in (
      select id from experts where user_id = auth.uid()
    )
  );

-- Public can view reviews
create policy "Public can view reviews"
  on expert_reviews for select
  using (true);

-- Clients can create reviews for their bookings
create policy "Clients can create reviews"
  on expert_reviews for insert
  with check (
    client_id = auth.uid() or
    booking_id in (
      select id from bookings where client_id = auth.uid()
    )
  );

-- Users can submit expert applications
create policy "Users can submit applications"
  on expert_applications for insert
  with check (auth.uid() = user_id);

-- Users can view own applications
create policy "Users can view own applications"
  on expert_applications for select
  using (user_id = auth.uid());

-- Function to generate booking number
create or replace function generate_booking_number()
returns text as $$
declare
  prefix text := 'BK';
  date_part text := to_char(now(), 'YYYYMMDD');
  random_part text := upper(substr(md5(random()::text), 1, 6));
begin
  return prefix || '-' || date_part || '-' || random_part;
end;
$$ language plpgsql;

-- Function to update expert rating
create or replace function update_expert_rating()
returns trigger as $$
begin
  update experts
  set
    rating_avg = (
      select coalesce(avg(rating), 0)
      from expert_reviews
      where expert_id = new.expert_id
    ),
    rating_count = (
      select count(*)
      from expert_reviews
      where expert_id = new.expert_id
    )
  where id = new.expert_id;
  return new;
end;
$$ language plpgsql;

-- Trigger to update rating on new review
create trigger on_expert_review_created
  after insert on expert_reviews
  for each row execute procedure update_expert_rating();

-- Expert marketplace indexes
create index idx_experts_slug on experts(slug);
create index idx_experts_is_available on experts(is_available);
create index idx_experts_is_verified on experts(is_verified);
create index idx_experts_rating_avg on experts(rating_avg desc);
create index idx_expert_services_expert_id on expert_services(expert_id);
create index idx_expert_services_category on expert_services(category);
create index idx_expert_portfolio_expert_id on expert_portfolio(expert_id);
create index idx_bookings_expert_id on bookings(expert_id);
create index idx_bookings_client_id on bookings(client_id);
create index idx_bookings_status on bookings(status);
create index idx_expert_reviews_expert_id on expert_reviews(expert_id);
create index idx_expert_applications_status on expert_applications(status);
