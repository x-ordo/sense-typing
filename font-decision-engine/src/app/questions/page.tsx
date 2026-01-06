'use client'

export const runtime = 'edge';

import { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, Camera, User } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  author: string;
  date: string;
  views: number;
  replies: number;
  thumbnail?: string;
}

export default function QuestionsPage() {
  const [questions] = useState<Question[]>([
    { id: 'q1', title: '이 영상에 나오는 본문 폰트 뭘까요?', author: '디자인꿈나무', date: '2시간 전', views: 45, replies: 1, thumbnail: 'https://via.placeholder.com/150' },
    { id: 'q2', title: '배민 배달 봉투에 있는 폰트 정보 아시는 분', author: '폰트헌터', date: '5시간 전', views: 120, replies: 3, thumbnail: 'https://via.placeholder.com/150' },
    { id: 'q3', title: '깔끔한 무드의 제목용 폰트 추천 부탁드려요', author: '기획자K', date: '8시간 전', views: 89, replies: 0 },
    { id: 'q4', title: '이 뉴스 자막 폰트 아시는 분?', author: '자막러', date: '1일 전', views: 230, replies: 2, thumbnail: 'https://via.placeholder.com/150' },
  ]);

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            <MessageSquare className="w-8 h-8" /> 무슨 폰트?
          </h1>
          <p className="text-gray-500 text-sm">궁금한 폰트를 이미지나 링크와 함께 물어보세요. 커뮤니티가 답변해 드립니다.</p>
        </div>
        <button className="px-8 py-4 bg-black text-white font-black rounded-lg hover:bg-gray-800 transition-all flex items-center gap-3">
          <Camera className="w-5 h-5" /> 질문하기
        </button>
      </header>

      {/* Stats Summary */}
      <div className="flex gap-8 mb-10 border-b border-gray-100 pb-6 overflow-x-auto">
        <button className="text-sm font-black border-b-2 border-black pb-2 whitespace-nowrap">전체 질문</button>
        <button className="text-sm font-bold text-gray-400 hover:text-black pb-2 whitespace-nowrap">답변 대기 중</button>
        <button className="text-sm font-bold text-gray-400 hover:text-black pb-2 whitespace-nowrap">답변 완료</button>
        <button className="text-sm font-bold text-gray-400 hover:text-black pb-2 whitespace-nowrap">베스트 답변</button>
      </div>

      {/* Board List */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <div className="col-span-7">제목</div>
          <div className="col-span-2">작성자</div>
          <div className="col-span-1 text-center">날짜</div>
          <div className="col-span-1 text-center">조회수</div>
          <div className="col-span-1 text-center">답변</div>
        </div>

        <div className="divide-y divide-gray-100">
          {questions.map((q) => (
            <div key={q.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-6 hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="col-span-1 md:col-span-7 flex gap-4 items-center">
                {q.thumbnail && (
                  <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image src={q.thumbnail} alt="Preview" fill className="object-cover group-hover:scale-110 transition-transform" unoptimized />
                  </div>
                )}
                {!q.thumbnail && (
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-200">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                )}
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{q.title}</h3>
              </div>
              
              <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-zinc-200 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-zinc-500" />
                </div>
                <span className="text-xs text-gray-600">{q.author}</span>
              </div>

              <div className="col-span-1 text-center hidden md:flex items-center justify-center text-xs text-gray-400">{q.date}</div>
              <div className="col-span-1 text-center hidden md:flex items-center justify-center text-xs text-gray-400">{q.views}</div>
              <div className="col-span-1 text-center hidden md:flex items-center justify-center">
                <span className={`px-2 py-1 rounded text-[10px] font-black ${q.replies > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                  {q.replies}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-6 py-3 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">
          더 많은 질문 보기
        </button>
      </div>
    </div>
  );
}
