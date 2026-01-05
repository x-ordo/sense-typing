
import { Font, FontCategory, Emotion } from './types';

export const MOCK_FONTS: Font[] = [
  {
    id: 'f1',
    name: 'Pretendard',
    creator: 'Orad Type',
    category: FontCategory.SANS_SERIF,
    emotions: [Emotion.MODERN, Emotion.MINIMAL, Emotion.CALM],
    price: 'Free',
    fontFamily: "'IBM Plex Sans KR', sans-serif",
    description: '어디서나 읽기 편한 현대적인 한글 서체의 표준입니다.',
    isPopular: true,
    license: { commercial: true, print: true, web: true, video: true, embedding: true },
    sourceUrl: 'https://github.com/orioncactus/pretendard'
  },
  {
    id: 'f2',
    name: '나눔명조',
    creator: 'Naver',
    category: FontCategory.SERIF,
    emotions: [Emotion.TRADITIONAL, Emotion.EMOTIONAL, Emotion.CALM],
    price: 'Free',
    fontFamily: "'Nanum Myeongjo', serif",
    description: '한국의 정서를 담은 클래식한 명조체입니다.',
    license: { commercial: true, print: true, web: true, video: true, embedding: false },
    sourceUrl: 'https://hangeul.naver.com/'
  },
  {
    id: 'f3',
    name: '블랙한산스',
    creator: 'Zess Type',
    category: FontCategory.DISPLAY,
    emotions: [Emotion.BOLD, Emotion.MODERN],
    price: 'Free',
    fontFamily: "'Black Han Sans', sans-serif",
    description: '굵고 정직한 매력의 타이틀용 서체입니다.',
    isPopular: true,
    license: { commercial: true, print: true, web: true, video: true, embedding: true },
    sourceUrl: 'https://fonts.google.com/specimen/Black+Han+Sans'
  },
  {
    id: 'f9',
    name: '바탕체',
    creator: 'Hanyang',
    category: FontCategory.SERIF,
    emotions: [Emotion.TRADITIONAL, Emotion.CALM],
    price: 'Free',
    fontFamily: "'Song Myung', serif",
    description: '한옥의 기둥처럼 단단하고 정갈한 느낌의 바탕체입니다.',
    license: { commercial: true, print: true, web: true, video: true, embedding: true },
    sourceUrl: 'https://hangeul.naver.com/'
  },
  {
    id: 'f4',
    name: '스타일리쉬',
    creator: 'Sandoll',
    category: FontCategory.HANDWRITING,
    emotions: [Emotion.EMOTIONAL, Emotion.CUTE, Emotion.PLAYFUL],
    price: 'Free',
    fontFamily: "'Stylish', sans-serif",
    description: '부드러운 손글씨의 감성을 담았습니다.',
    license: { commercial: true, print: true, web: true, video: true, embedding: false },
    sourceUrl: 'https://www.sandollcloud.com/'
  },
  {
    id: 'f6',
    name: '도현체',
    creator: '우아한형제들',
    category: FontCategory.DISPLAY,
    emotions: [Emotion.PLAYFUL, Emotion.BOLD],
    price: 'Free',
    fontFamily: "'Do Hyeon', sans-serif",
    description: '배달의민족 특유의 위트와 정겨움이 느껴지는 서체입니다.',
    license: { commercial: true, print: true, web: true, video: true, embedding: true },
    sourceUrl: 'https://www.woowayouth.com/font'
  }
];

export const ICONS = {
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Magic: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Download: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Tag: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
  Heart: (props: { filled?: boolean }) => (
    <svg className={`w-5 h-5 ${props.filled ? 'fill-red-600 text-red-600' : 'text-gray-300 hover:text-red-400'}`} fill={props.filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Copy: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
};
