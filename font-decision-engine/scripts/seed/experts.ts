// scripts/seed/experts.ts
// Expert sample data seeding script
// Usage: npx tsx scripts/seed/experts.ts

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  console.error('Please check your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Sample expert data
const SAMPLE_EXPERTS = [
  {
    display_name: '김타이포',
    slug: 'kim-typo',
    title: '타이포그래피 컨설턴트',
    bio: '10년 이상의 타이포그래피 경력을 가진 전문가입니다. 대기업 브랜드 리뉴얼, 스타트업 BI 프로젝트를 다수 진행했으며, 특히 한글 타이포그래피와 웹 가독성 최적화에 전문성을 보유하고 있습니다. 삼성, LG, 네이버 등 국내 주요 기업과 협업한 경험이 있습니다.',
    profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    specialties: ['typography-consulting', 'font-pairing', 'brand-identity'],
    years_experience: 12,
    hourly_rate: 150000,
    minimum_project_rate: 500000,
    is_verified: true,
    is_available: true,
    rating_avg: 4.9,
    review_count: 47,
    completed_projects: 128,
    response_time_hours: 2,
    languages: ['한국어', 'English'],
    location: '서울',
    website_url: 'https://kimtypo.design',
    portfolio_url: 'https://behance.net/kimtypo',
  },
  {
    display_name: '이브랜드',
    slug: 'lee-brand',
    title: '브랜드 아이덴티티 디자이너',
    bio: '브랜드의 본질을 시각적 언어로 번역하는 디자이너입니다. 스타트업부터 대기업까지 다양한 규모의 브랜드 아이덴티티 프로젝트를 성공적으로 이끌었습니다. 특히 F&B, 패션, 테크 분야에서 강점을 보이며, 브랜드 전략부터 실행까지 전 과정을 함께합니다.',
    profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    specialties: ['brand-identity', 'logo-design', 'visual-identity'],
    years_experience: 8,
    hourly_rate: 200000,
    minimum_project_rate: 1000000,
    is_verified: true,
    is_available: true,
    rating_avg: 4.8,
    review_count: 32,
    completed_projects: 85,
    response_time_hours: 4,
    languages: ['한국어', 'English', '日本語'],
    location: '서울',
    website_url: 'https://leebrand.co',
    portfolio_url: 'https://dribbble.com/leebrand',
  },
  {
    display_name: '박카피',
    slug: 'park-copy',
    title: '카피라이터 & 브랜드 스토리텔러',
    bio: '말의 힘을 믿는 카피라이터입니다. 광고대행사에서 7년간 근무하며 다양한 캠페인 카피를 담당했고, 현재는 프리랜서로 브랜드 네이밍, 슬로건, 캐치프레이즈 개발에 집중하고 있습니다. 브랜드의 목소리를 찾아드립니다.',
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    specialties: ['catchphrase', 'brand-identity'],
    years_experience: 9,
    hourly_rate: 120000,
    minimum_project_rate: 300000,
    is_verified: true,
    is_available: true,
    rating_avg: 4.9,
    review_count: 56,
    completed_projects: 203,
    response_time_hours: 1,
    languages: ['한국어', 'English'],
    location: '서울',
    website_url: null,
    portfolio_url: null,
  },
  {
    display_name: '최디자인',
    slug: 'choi-design',
    title: '비주얼 아이덴티티 전문가',
    bio: '런던 예술대학에서 그래픽 디자인을 전공하고, 글로벌 에이전시에서 경력을 쌓았습니다. 브랜드의 시각적 일관성을 구축하는 비주얼 시스템 설계를 전문으로 합니다. 컬러, 그리드, 타이포그래피를 아우르는 종합적인 가이드라인을 제작해드립니다.',
    profile_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    specialties: ['visual-identity', 'brand-identity', 'typography-consulting'],
    years_experience: 6,
    hourly_rate: 180000,
    minimum_project_rate: 800000,
    is_verified: true,
    is_available: false,
    rating_avg: 4.7,
    review_count: 21,
    completed_projects: 42,
    response_time_hours: 6,
    languages: ['한국어', 'English'],
    location: '런던 / 서울',
    website_url: 'https://choidesign.studio',
    portfolio_url: 'https://behance.net/choidesign',
  },
  {
    display_name: '정폰트',
    slug: 'jung-font',
    title: '폰트 조합 & 웹타이포 전문가',
    bio: '웹과 앱에서의 타이포그래피를 전문으로 합니다. 다양한 디바이스와 환경에서 최적의 가독성을 제공하는 폰트 조합을 제안하고, CSS 타이포그래피 시스템 구축을 도와드립니다. 개발자와의 협업 경험이 풍부합니다.',
    profile_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    specialties: ['font-pairing', 'typography-consulting'],
    years_experience: 5,
    hourly_rate: 100000,
    minimum_project_rate: 200000,
    is_verified: true,
    is_available: true,
    rating_avg: 4.8,
    review_count: 38,
    completed_projects: 95,
    response_time_hours: 3,
    languages: ['한국어', 'English'],
    location: '판교',
    website_url: null,
    portfolio_url: 'https://github.com/jungfont',
  },
  {
    display_name: '한로고',
    slug: 'han-logo',
    title: '로고 & 심볼 디자이너',
    bio: '미니멀하고 임팩트 있는 로고 디자인을 추구합니다. 15년 경력의 로고 전문 디자이너로, 500개 이상의 로고를 제작했습니다. 특히 스타트업과 소상공인을 위한 합리적인 가격의 고퀄리티 로고 패키지를 제공합니다.',
    profile_image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
    specialties: ['logo-design', 'brand-identity'],
    years_experience: 15,
    hourly_rate: 130000,
    minimum_project_rate: 400000,
    is_verified: true,
    is_available: true,
    rating_avg: 4.9,
    review_count: 89,
    completed_projects: 512,
    response_time_hours: 2,
    languages: ['한국어'],
    location: '부산',
    website_url: 'https://hanlogo.kr',
    portfolio_url: 'https://hanlogo.kr/portfolio',
  },
]

// Sample services for each expert
const SAMPLE_SERVICES = [
  // 김타이포 services
  {
    expert_slug: 'kim-typo',
    services: [
      {
        name: '폰트 컨설팅 (1회)',
        description: '브랜드/프로젝트에 적합한 폰트 추천 및 조합 가이드 제공. 1시간 화상 미팅 + 폰트 추천 리포트 포함.',
        category: 'consultation',
        price: 150000,
        price_type: 'fixed',
        delivery_days: 3,
        revisions_included: 1,
        is_active: true,
        display_order: 1,
      },
      {
        name: '타이포그래피 시스템 설계',
        description: '웹/앱 전체 타이포그래피 시스템 설계. 폰트 선정, 스케일, 행간, 자간 등 상세 가이드라인 제작.',
        category: 'design',
        price: 800000,
        price_type: 'starting_from',
        delivery_days: 14,
        revisions_included: 3,
        is_active: true,
        display_order: 2,
      },
      {
        name: '월정액 타이포 자문',
        description: '월 4회 미팅 + 무제한 슬랙 Q&A. 지속적인 타이포그래피 품질 관리가 필요한 팀에 추천.',
        category: 'consultation',
        price: 500000,
        price_type: 'fixed',
        delivery_days: null,
        revisions_included: 0,
        is_active: true,
        display_order: 3,
      },
    ],
  },
  // 이브랜드 services
  {
    expert_slug: 'lee-brand',
    services: [
      {
        name: '브랜드 아이덴티티 기본',
        description: '로고 + 컬러 팔레트 + 기본 가이드라인. 스타트업 초기 브랜딩에 적합.',
        category: 'package',
        price: 1500000,
        price_type: 'starting_from',
        delivery_days: 21,
        revisions_included: 3,
        is_active: true,
        display_order: 1,
      },
      {
        name: '브랜드 아이덴티티 프리미엄',
        description: '로고 + 컬러 + 타이포 + 그래픽 요소 + 상세 가이드북. 본격적인 브랜드 런칭에 추천.',
        category: 'package',
        price: 3500000,
        price_type: 'starting_from',
        delivery_days: 45,
        revisions_included: 5,
        is_active: true,
        display_order: 2,
      },
      {
        name: '브랜드 전략 컨설팅',
        description: '브랜드 포지셔닝, 타겟 분석, 경쟁사 조사를 통한 전략 수립. 디자인 전 필수 단계.',
        category: 'consultation',
        price: 800000,
        price_type: 'fixed',
        delivery_days: 10,
        revisions_included: 2,
        is_active: true,
        display_order: 3,
      },
    ],
  },
  // 박카피 services
  {
    expert_slug: 'park-copy',
    services: [
      {
        name: '브랜드 네이밍',
        description: '브랜드/제품/서비스 네이밍 개발. 10개 후보안 + 의미 해설 + 도메인/상표 사전조사 포함.',
        category: 'writing',
        price: 500000,
        price_type: 'starting_from',
        delivery_days: 7,
        revisions_included: 2,
        is_active: true,
        display_order: 1,
      },
      {
        name: '슬로건/캐치프레이즈',
        description: '브랜드 핵심 메시지 개발. 5개 후보안 + 활용 가이드 제공.',
        category: 'writing',
        price: 300000,
        price_type: 'fixed',
        delivery_days: 5,
        revisions_included: 2,
        is_active: true,
        display_order: 2,
      },
      {
        name: '브랜드 스토리 라이팅',
        description: '브랜드 히스토리, 미션/비전, About 페이지 등 브랜드 스토리 전체 작성.',
        category: 'writing',
        price: 800000,
        price_type: 'starting_from',
        delivery_days: 14,
        revisions_included: 3,
        is_active: true,
        display_order: 3,
      },
    ],
  },
  // 최디자인 services
  {
    expert_slug: 'choi-design',
    services: [
      {
        name: '비주얼 시스템 설계',
        description: '컬러 시스템, 그리드, 타이포그래피, 아이콘 스타일 등 종합 비주얼 가이드라인.',
        category: 'design',
        price: 2000000,
        price_type: 'starting_from',
        delivery_days: 30,
        revisions_included: 3,
        is_active: true,
        display_order: 1,
      },
      {
        name: '브랜드 가이드북 제작',
        description: '기존 브랜드 자산을 정리하여 체계적인 가이드북으로 문서화.',
        category: 'design',
        price: 1200000,
        price_type: 'starting_from',
        delivery_days: 21,
        revisions_included: 2,
        is_active: true,
        display_order: 2,
      },
    ],
  },
  // 정폰트 services
  {
    expert_slug: 'jung-font',
    services: [
      {
        name: '웹 폰트 최적화 컨설팅',
        description: '웹 성능을 고려한 폰트 선정 및 로딩 최적화 가이드. 개발자 협업 포함.',
        category: 'consultation',
        price: 200000,
        price_type: 'fixed',
        delivery_days: 5,
        revisions_included: 1,
        is_active: true,
        display_order: 1,
      },
      {
        name: '폰트 페어링 가이드',
        description: '프로젝트 맞춤 폰트 조합 5세트 + 적용 예시 + CSS 코드 제공.',
        category: 'design',
        price: 300000,
        price_type: 'fixed',
        delivery_days: 7,
        revisions_included: 2,
        is_active: true,
        display_order: 2,
      },
    ],
  },
  // 한로고 services
  {
    expert_slug: 'han-logo',
    services: [
      {
        name: '로고 디자인 베이직',
        description: '로고 3안 제시 + 선택안 수정 2회 + AI/PNG/SVG 파일 제공.',
        category: 'design',
        price: 400000,
        price_type: 'fixed',
        delivery_days: 7,
        revisions_included: 2,
        is_active: true,
        display_order: 1,
      },
      {
        name: '로고 디자인 프로',
        description: '로고 5안 제시 + 수정 무제한 + 명함/서류 양식 적용 + 모든 파일 형식 제공.',
        category: 'design',
        price: 800000,
        price_type: 'fixed',
        delivery_days: 14,
        revisions_included: 99,
        is_active: true,
        display_order: 2,
      },
      {
        name: '로고 리디자인',
        description: '기존 로고의 현대화 또는 리뉴얼. 브랜드 헤리티지를 유지하면서 새롭게.',
        category: 'design',
        price: 600000,
        price_type: 'starting_from',
        delivery_days: 10,
        revisions_included: 3,
        is_active: true,
        display_order: 3,
      },
    ],
  },
]

// Sample portfolio items
const SAMPLE_PORTFOLIO = [
  {
    expert_slug: 'kim-typo',
    items: [
      {
        title: '네이버 웹툰 타이포그래피 시스템',
        description: '네이버 웹툰 앱 전체 타이포그래피 시스템 리뉴얼 프로젝트',
        image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        project_url: null,
        client_name: '네이버 웹툰',
        tags: ['typography', 'mobile', 'app'],
      },
      {
        title: '현대카드 브랜드 폰트 가이드',
        description: '현대카드 브랜드 전용 폰트 사용 가이드라인 제작',
        image_url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
        project_url: null,
        client_name: '현대카드',
        tags: ['typography', 'guideline', 'brand'],
      },
    ],
  },
  {
    expert_slug: 'lee-brand',
    items: [
      {
        title: '배달의민족 서브 브랜드 BI',
        description: 'B마트 브랜드 아이덴티티 전체 설계',
        image_url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
        project_url: null,
        client_name: '우아한형제들',
        tags: ['brand-identity', 'logo', 'visual'],
      },
      {
        title: '스타트업 TYPED BI',
        description: '문서 협업 스타트업 TYPED 브랜드 아이덴티티',
        image_url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&h=600&fit=crop',
        project_url: 'https://typed.do',
        client_name: 'TYPED',
        tags: ['brand-identity', 'startup', 'tech'],
      },
    ],
  },
  {
    expert_slug: 'han-logo',
    items: [
      {
        title: '카페 브랜드 로고',
        description: '부산 감성 카페 "바다담" 로고 디자인',
        image_url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop',
        project_url: null,
        client_name: '바다담',
        tags: ['logo', 'cafe', 'local'],
      },
      {
        title: 'IT 스타트업 심볼',
        description: 'AI 기반 법률 서비스 "로앤AI" 심볼 마크',
        image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
        project_url: null,
        client_name: '로앤AI',
        tags: ['logo', 'tech', 'ai'],
      },
      {
        title: '패션 브랜드 워드마크',
        description: '의류 브랜드 "MODA" 워드마크 로고',
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        project_url: null,
        client_name: 'MODA',
        tags: ['logo', 'fashion', 'wordmark'],
      },
    ],
  },
]

// Sample reviews
const SAMPLE_REVIEWS = [
  {
    expert_slug: 'kim-typo',
    reviews: [
      { rating: 5, review_text: '정말 전문적인 조언을 받았습니다. 폰트 선택에 확신이 없었는데, 명쾌한 기준을 제시해주셔서 큰 도움이 되었어요.' },
      { rating: 5, review_text: '타이포그래피 시스템 설계 결과물이 기대 이상이었습니다. 개발팀도 적용하기 쉽다고 좋아했어요.' },
      { rating: 4, review_text: '전문성은 훌륭하나 일정이 조금 지연되었습니다. 그래도 결과물은 만족스럽습니다.' },
    ],
  },
  {
    expert_slug: 'lee-brand',
    reviews: [
      { rating: 5, review_text: '브랜드의 본질을 정확히 이해하고 시각화해주셨습니다. 투자자 미팅에서 큰 호응을 받았어요!' },
      { rating: 5, review_text: '소통이 정말 원활했고, 피드백 반영도 빠르셨습니다. 다음 프로젝트도 꼭 함께하고 싶습니다.' },
    ],
  },
  {
    expert_slug: 'park-copy',
    reviews: [
      { rating: 5, review_text: '슬로건 하나로 브랜드 방향성이 명확해졌습니다. 진작 의뢰할걸 그랬어요.' },
      { rating: 5, review_text: '네이밍 후보안 중 하나를 선택했는데, 모든 직원들이 만족했습니다. 감사합니다!' },
      { rating: 5, review_text: '카피라이터님의 글은 정말 다릅니다. 브랜드 스토리가 감동적이에요.' },
      { rating: 4, review_text: '좋은 결과물이었지만, 제 의견이 좀 더 반영됐으면 했습니다.' },
    ],
  },
  {
    expert_slug: 'han-logo',
    reviews: [
      { rating: 5, review_text: '가격 대비 퀄리티가 정말 좋습니다. 소상공인 분들께 강력 추천드려요.' },
      { rating: 5, review_text: '수정 요청에도 친절하게 대응해주셨습니다. 로고가 너무 마음에 들어요!' },
      { rating: 5, review_text: '빠른 작업 속도와 높은 완성도, 두 마리 토끼를 다 잡으셨네요.' },
    ],
  },
]

async function seedExperts() {
  console.log('🌱 Starting expert data seeding...\n')

  // 1. Insert experts
  console.log('📝 Inserting experts...')
  const expertIdMap: Record<string, string> = {}

  for (const expert of SAMPLE_EXPERTS) {
    const { data, error } = await supabase
      .from('experts')
      .upsert(
        {
          ...expert,
          user_id: null, // No real user associated
        },
        { onConflict: 'slug' }
      )
      .select('id, slug')
      .single()

    if (error) {
      console.error(`  ❌ Failed to insert ${expert.display_name}:`, error.message)
    } else {
      expertIdMap[expert.slug] = data.id
      console.log(`  ✅ ${expert.display_name} (${expert.slug})`)
    }
  }

  console.log(`\n📊 Inserted ${Object.keys(expertIdMap).length} experts\n`)

  // 2. Insert services
  console.log('🛠️  Inserting services...')
  let serviceCount = 0

  for (const expertServices of SAMPLE_SERVICES) {
    const expertId = expertIdMap[expertServices.expert_slug]
    if (!expertId) continue

    for (const service of expertServices.services) {
      const { error } = await supabase.from('expert_services').upsert(
        {
          expert_id: expertId,
          ...service,
        },
        { onConflict: 'expert_id,name' }
      )

      if (error) {
        console.error(`  ❌ Failed to insert service "${service.name}":`, error.message)
      } else {
        serviceCount++
      }
    }
    console.log(`  ✅ ${expertServices.expert_slug}: ${expertServices.services.length} services`)
  }

  console.log(`\n📊 Inserted ${serviceCount} services\n`)

  // 3. Insert portfolio items
  console.log('🖼️  Inserting portfolio items...')
  let portfolioCount = 0

  for (const expertPortfolio of SAMPLE_PORTFOLIO) {
    const expertId = expertIdMap[expertPortfolio.expert_slug]
    if (!expertId) continue

    for (let i = 0; i < expertPortfolio.items.length; i++) {
      const item = expertPortfolio.items[i]
      const { error } = await supabase.from('expert_portfolio').insert({
        expert_id: expertId,
        ...item,
        display_order: i + 1,
      })

      if (error && !error.message.includes('duplicate')) {
        console.error(`  ❌ Failed to insert portfolio "${item.title}":`, error.message)
      } else {
        portfolioCount++
      }
    }
    console.log(`  ✅ ${expertPortfolio.expert_slug}: ${expertPortfolio.items.length} items`)
  }

  console.log(`\n📊 Inserted ${portfolioCount} portfolio items\n`)

  // 4. Insert reviews (without real booking/client - for demo purposes)
  console.log('⭐ Inserting sample reviews...')
  let reviewCount = 0

  for (const expertReviews of SAMPLE_REVIEWS) {
    const expertId = expertIdMap[expertReviews.expert_slug]
    if (!expertId) continue

    for (const review of expertReviews.reviews) {
      const { error } = await supabase.from('expert_reviews').insert({
        expert_id: expertId,
        booking_id: null,
        client_id: null,
        rating: review.rating,
        review_text: review.review_text,
        is_verified: true,
      })

      if (error && !error.message.includes('duplicate')) {
        console.error(`  ❌ Failed to insert review:`, error.message)
      } else {
        reviewCount++
      }
    }
    console.log(`  ✅ ${expertReviews.expert_slug}: ${expertReviews.reviews.length} reviews`)
  }

  console.log(`\n📊 Inserted ${reviewCount} reviews\n`)

  console.log('✨ Expert data seeding completed!')
  console.log(`
Summary:
  - Experts: ${Object.keys(expertIdMap).length}
  - Services: ${serviceCount}
  - Portfolio items: ${portfolioCount}
  - Reviews: ${reviewCount}
  `)
}

// Run the seeding
seedExperts()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seeding failed:', err)
    process.exit(1)
  })
