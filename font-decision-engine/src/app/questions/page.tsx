'use client'

export const runtime = 'edge';

import { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, Camera, User, Eye, MessageCircle } from 'lucide-react';

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

  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <span className="mono-label text-brand-gold mb-2 block">Community</span>
            <h1 className="text-2xl font-bold text-brand-black mb-2 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-brand-gold" /> 무슨 폰트?
            </h1>
            <p className="text-zinc-500 text-sm">궁금한 폰트를 이미지와 함께 물어보세요.</p>
          </div>
          <button className="px-5 py-2.5 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all flex items-center gap-2 text-sm">
            <Camera className="w-4 h-4" /> 질문하기
          </button>
        </header>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-brand-beige">
          {[
            { id: 'all', label: '전체 질문' },
            { id: 'waiting', label: '답변 대기' },
            { id: 'answered', label: '답변 완료' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-brand-black'
                  : 'text-zinc-400 hover:text-brand-black'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"></span>
              )}
            </button>
          ))}
        </div>

        {/* Question List */}
        <div className="bg-white border border-brand-beige rounded-2xl overflow-hidden">
          {/* Header Row - Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-brand-beige/30 border-b border-brand-beige text-xs font-medium text-zinc-500">
            <div className="col-span-7">제목</div>
            <div className="col-span-2">작성자</div>
            <div className="col-span-1 text-center">날짜</div>
            <div className="col-span-1 text-center">조회</div>
            <div className="col-span-1 text-center">답변</div>
          </div>

          {/* Questions */}
          <div className="divide-y divide-brand-beige/50">
            {questions.map((q) => (
              <div key={q.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-brand-beige/20 transition-colors cursor-pointer group">
                <div className="col-span-1 md:col-span-7 flex gap-3 items-center">
                  {q.thumbnail ? (
                    <div className="relative w-12 h-12 bg-brand-beige/30 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={q.thumbnail} alt="Preview" fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-brand-beige/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-zinc-300" />
                    </div>
                  )}
                  <h3 className="text-sm font-medium text-brand-black group-hover:text-brand-gold transition-colors line-clamp-1">{q.title}</h3>
                </div>

                <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-brand-beige/50 rounded-full flex items-center justify-center">
                    <User className="w-2.5 h-2.5 text-zinc-400" />
                  </div>
                  <span className="text-xs text-zinc-500">{q.author}</span>
                </div>

                <div className="col-span-1 text-center hidden md:flex items-center justify-center text-xs text-zinc-400">{q.date}</div>
                <div className="col-span-1 text-center hidden md:flex items-center justify-center gap-1 text-xs text-zinc-400">
                  <Eye className="w-3 h-3" /> {q.views}
                </div>
                <div className="col-span-1 text-center hidden md:flex items-center justify-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                    q.replies > 0 ? 'bg-brand-gold/10 text-brand-gold' : 'bg-zinc-100 text-zinc-400'
                  }`}>
                    <MessageCircle className="w-3 h-3" /> {q.replies}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="mt-8 flex justify-center">
          <button className="px-5 py-2.5 bg-white border border-brand-beige text-zinc-600 text-sm font-medium rounded-xl hover:bg-brand-beige/30 transition-colors">
            더 보기
          </button>
        </div>
      </div>
    </div>
  );
}
