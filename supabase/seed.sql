-- Clean up existing data to ensure idempotency
TRUNCATE TABLE font_usecase_map, font_emotion_map, use_cases, emotion_tags, fonts CASCADE;

DO $$
DECLARE
  -- Font IDs
  f_pretendard uuid;
  f_noto_kr uuid;
  f_chosun uuid;
  f_gmarket uuid;
  f_kopub_batang uuid;
  f_suit uuid;
  f_wanted uuid;
  f_nanum_myeongjo uuid;
  
  -- Emotion Tag IDs
  t_auth_high uuid;    -- 권위적_압도감
  t_trust_biz uuid;    -- 비즈니스_신뢰
  t_legal_safe uuid;   -- 법적_안정감
  t_startup_aggr uuid; -- 스타트업_공격성
  t_neutral_gov uuid;  -- 행정_중립
  t_warm_human uuid;   -- 인간적_온기
  t_minimal_tech uuid; -- 기술_미니멀리즘
  
  -- Use Case IDs
  u_gov_report uuid;   -- 정부_제출_문서
  u_ir_deck uuid;      -- 투자_IR_Deck
  u_contract uuid;     -- 법률_계약서
  u_landing_hero uuid; -- 랜딩페이지_헤드라인
  u_fintech_ui uuid;   -- 핀테크_UI

BEGIN
  ---------------------------------------------------------------------------
  -- 1. Insert Fonts (The Raw Material)
  ---------------------------------------------------------------------------
  INSERT INTO fonts (name, foundry, license_type, origin_country, noonnu_available) VALUES 
  ('Pretendard', 'Kil Hyeong-jin', 'ofl', 'KR', true) RETURNING id INTO f_pretendard;
  
  INSERT INTO fonts (name, foundry, license_type, origin_country, noonnu_available) VALUES 
  ('Noto Sans KR', 'Google', 'ofl', 'Global', true) RETURNING id INTO f_noto_kr;
  
  INSERT INTO fonts (name, foundry, license_type, origin_country, noonnu_available) VALUES 
  ('Chosun Centenary', 'Chosun Ilbo', 'free', 'KR', true) RETURNING id INTO f_chosun;
  
  INSERT INTO fonts (name, foundry, license_type, origin_country, noonnu_available) VALUES 
  ('Gmarket Sans', 'Gmarket', 'ofl', 'KR', true) RETURNING id INTO f_gmarket;

  INSERT INTO fonts (name, foundry, license_type, origin_country, noonnu_available) VALUES 
  ('KoPub World Batang', 'KOPUS', 'ofl', 'KR', true) RETURNING id INTO f_kopub_batang;

  INSERT INTO fonts (name, foundry, license_type, origin_country, noonnu_available) VALUES 
  ('SUIT', 'Sunn', 'ofl', 'KR', true) RETURNING id INTO f_suit;

  INSERT INTO fonts (name, foundry, license_type, origin_country, noonnu_available) VALUES 
  ('Wanted Sans', 'Wanted Lab', 'ofl', 'KR', true) RETURNING id INTO f_wanted;

  INSERT INTO fonts (name, foundry, license_type, origin_country, noonnu_available) VALUES 
  ('Nanum Myeongjo', 'Naver', 'ofl', 'KR', true) RETURNING id INTO f_nanum_myeongjo;


  ---------------------------------------------------------------------------
  -- 2. Insert Emotion Tags (The Taxonomy - The "Soul")
  ---------------------------------------------------------------------------
  INSERT INTO emotion_tags (tag, axis, polarity) VALUES ('권위적_압도감', 'Authority', 2) RETURNING id INTO t_auth_high;
  INSERT INTO emotion_tags (tag, axis, polarity) VALUES ('비즈니스_신뢰', 'Trust', 2) RETURNING id INTO t_trust_biz;
  INSERT INTO emotion_tags (tag, axis, polarity) VALUES ('법적_안정감', 'Stability', 2) RETURNING id INTO t_legal_safe;
  INSERT INTO emotion_tags (tag, axis, polarity) VALUES ('스타트업_공격성', 'Aggression', 1) RETURNING id INTO t_startup_aggr;
  INSERT INTO emotion_tags (tag, axis, polarity) VALUES ('행정_중립', 'Neutrality', 2) RETURNING id INTO t_neutral_gov;
  INSERT INTO emotion_tags (tag, axis, polarity) VALUES ('인간적_온기', 'Warmth', 1) RETURNING id INTO t_warm_human;
  INSERT INTO emotion_tags (tag, axis, polarity) VALUES ('기술_미니멀리즘', 'Modernity', 2) RETURNING id INTO t_minimal_tech;


  ---------------------------------------------------------------------------
  -- 3. Insert Use Cases (The "Money" Triggers)
  ---------------------------------------------------------------------------
  INSERT INTO use_cases (name, risk_level, description) VALUES 
  ('정부_제출_문서', 5, '반려 위험 0%를 목표로 하는 공공기관/정부 제출용. 튀면 죽는다.') RETURNING id INTO u_gov_report;
  
  INSERT INTO use_cases (name, risk_level, description) VALUES 
  ('투자_IR_Deck', 5, 'VC에게 성장성과 신뢰를 동시에. 가독성과 임팩트의 균형.') RETURNING id INTO u_ir_deck;
  
  INSERT INTO use_cases (name, risk_level, description) VALUES 
  ('법률_계약서', 5, '오해의 소지가 없어야 하며, 법적 효력이 느껴지는 무게감.') RETURNING id INTO u_contract;

  INSERT INTO use_cases (name, risk_level, description) VALUES 
  ('랜딩페이지_헤드라인', 3, '3초 안에 고객을 사로잡는 강력한 훅(Hook).') RETURNING id INTO u_landing_hero;

  INSERT INTO use_cases (name, risk_level, description) VALUES 
  ('핀테크_UI', 4, '내 돈을 맡겨도 될 것 같은 정교한 숫자와 UI 밸런스.') RETURNING id INTO u_fintech_ui;


  ---------------------------------------------------------------------------
  -- 4. Mapping: Font -> Emotion (The Logic)
  ---------------------------------------------------------------------------
  -- Pretendard: The All-rounder
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_pretendard, t_minimal_tech, 5);
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_pretendard, t_trust_biz, 4);
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_pretendard, t_neutral_gov, 3);
  
  -- Noto Sans KR: The Standard
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_noto_kr, t_neutral_gov, 5);
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_noto_kr, t_legal_safe, 4);
  
  -- Chosun Centenary: Authority
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_chosun, t_auth_high, 5);
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_chosun, t_legal_safe, 3);
  
  -- Gmarket Sans: Impact & Pop
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_gmarket, t_startup_aggr, 4);
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_gmarket, t_minimal_tech, 2);

  -- KoPub World Batang: Print Standard
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_kopub_batang, t_legal_safe, 5);
  INSERT INTO font_emotion_map (font_id, emotion_tag_id, weight) VALUES (f_kopub_batang, t_neutral_gov, 4);


  ---------------------------------------------------------------------------
  -- 5. Mapping: Font -> Use Case (The Solution)
  ---------------------------------------------------------------------------
  -- Pretendard -> IR Deck, Fintech, Landing
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_pretendard, u_ir_deck, 5);
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_pretendard, u_fintech_ui, 5);
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_pretendard, u_landing_hero, 4);

  -- Noto Sans KR -> Government Report
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_noto_kr, u_gov_report, 5);
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_noto_kr, u_contract, 4);

  -- Chosun Centenary -> Contract, High Authority
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_chosun, u_contract, 5);
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_chosun, u_gov_report, 3);

  -- Gmarket Sans -> Landing Hero
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_gmarket, u_landing_hero, 5);
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_gmarket, u_ir_deck, 2); -- 좀 가벼움

  -- KoPub World Batang -> Government, Contract
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_kopub_batang, u_gov_report, 5);
  INSERT INTO font_usecase_map (font_id, usecase_id, confidence) VALUES (f_kopub_batang, u_contract, 5);

END $$;