// src/lib/mock-data.ts
// Mock data for local development without Supabase connection

import type { FontCardProps } from '@/types/font';

export const MOCK_FONTS: FontCardProps[] = [
  {
    id: 'mock-1',
    name: 'Pretendard',
    foundry: 'Gil Family',
    license_type: 'ofl',
    tags: ['산세리프', '본문', '모던'],
    description: '프리텐다드는 크로스 플랫폼으로 제작된 system-ui 대체 글꼴입니다. 가변 글꼴과 스태틱 글꼴 모두 제공됩니다.',
    views: 15420,
    price: 0,
    source_url: 'https://cactus.tistory.com/306',
  },
  {
    id: 'mock-2',
    name: 'Noto Sans KR',
    foundry: 'Google',
    license_type: 'ofl',
    tags: ['산세리프', '본문', '다국어'],
    description: 'Google과 Adobe가 협력하여 개발한 오픈소스 글꼴. 한글, 영문, 일본어 등 다국어 지원.',
    views: 28930,
    price: 0,
    source_url: 'https://fonts.google.com/noto/specimen/Noto+Sans+KR',
  },
  {
    id: 'mock-3',
    name: 'Gmarket Sans',
    foundry: 'Gmarket',
    license_type: 'free',
    tags: ['산세리프', '제목', '굵은'],
    description: 'G마켓에서 제작한 무료 글꼴. 볼드한 느낌의 제목용 서체로 인기.',
    views: 12350,
    price: 0,
    source_url: 'https://corp.gmarket.com/fonts',
  },
  {
    id: 'mock-4',
    name: 'Nanum Myeongjo',
    foundry: 'Naver',
    license_type: 'ofl',
    tags: ['세리프', '본문', '전통'],
    description: '네이버에서 제작한 명조체. 가독성이 좋고 한글의 전통적인 아름다움을 담고 있습니다.',
    views: 9870,
    price: 0,
    source_url: 'https://hangeul.naver.com/font',
  },
  {
    id: 'mock-5',
    name: 'IBM Plex Sans KR',
    foundry: 'IBM',
    license_type: 'ofl',
    tags: ['산세리프', '테크', '기업'],
    description: 'IBM의 기업용 글꼴 패밀리. 기술 문서와 UI에 최적화된 깔끔한 디자인.',
    views: 7650,
    price: 0,
    source_url: 'https://fonts.google.com/specimen/IBM+Plex+Sans+KR',
  },
  {
    id: 'mock-6',
    name: 'Spoqa Han Sans Neo',
    foundry: 'Spoqa',
    license_type: 'ofl',
    tags: ['산세리프', '앱', '미니멀'],
    description: '스포카에서 제작한 모바일 최적화 글꼴. 작은 크기에서도 높은 가독성.',
    views: 11200,
    price: 0,
    source_url: 'https://spoqa.github.io/spoqa-han-sans/',
  },
  {
    id: 'mock-7',
    name: 'Wanted Sans',
    foundry: 'Wanted Lab',
    license_type: 'ofl',
    tags: ['산세리프', 'HR', '프로페셔널'],
    description: '원티드랩에서 제작한 기업용 글꼴. 전문적이고 신뢰감 있는 인상.',
    views: 6540,
    price: 0,
    source_url: 'https://github.com/AcmeGamesForks/wantedlab-wanted-sans-fonts',
  },
  {
    id: 'mock-8',
    name: 'D2Coding',
    foundry: 'Naver',
    license_type: 'ofl',
    tags: ['고정폭', '코딩', '개발'],
    description: '네이버에서 개발자를 위해 제작한 코딩 전용 글꼴. 가독성과 구분성이 뛰어남.',
    views: 18900,
    price: 0,
    source_url: 'https://github.com/naver/d2codingfont',
  },
  {
    id: 'mock-9',
    name: 'Cafe24 Surround',
    foundry: 'Cafe24',
    license_type: 'free',
    tags: ['장식체', '귀여운', '캐주얼'],
    description: '카페24에서 제작한 라운드 글꼴. 부드럽고 친근한 느낌의 디자인.',
    views: 8320,
    price: 0,
    source_url: 'https://fonts.cafe24.com/',
  },
];

/**
 * Check if we should use mock data (when Supabase credentials are placeholder values)
 */
export function shouldUseMockData(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !supabaseUrl || supabaseUrl.includes('xxxx') || supabaseUrl === 'https://xxxx.supabase.co';
}
