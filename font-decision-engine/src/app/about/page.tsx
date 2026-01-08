// src/app/about/page.tsx
import Link from 'next/link';
import { Lightbulb, Shield, Award, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20">
      <main className="max-w-4xl mx-auto px-6">
        {/* Hero Section */}
        <section className="mb-20">
          <span className="mono-label text-brand-gold mb-4 block">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-black mb-6">
            폰트 선택이 아니라,<br />
            <span className="text-brand-gold">의사결정</span>입니다.
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl">
            Sense Typing은 수천 개의 폰트 목록이 아닌,<br />
            당신의 의도에 맞는 최적의 <strong className="text-brand-black">결정(Decision)</strong>을 돕기 위해 만들어졌습니다.
          </p>
        </section>

        {/* Philosophy Cards */}
        <section className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: Lightbulb,
              title: 'Intent First',
              desc: '이름이 아닌 \'사용 목적\'으로 폰트를 찾습니다.'
            },
            {
              icon: Shield,
              title: 'Safety First',
              desc: '라이선스 리스크를 명확히 표시합니다.'
            },
            {
              icon: Award,
              title: 'Quality over Quantity',
              desc: '검증된 폰트만 큐레이션합니다.'
            }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-brand-beige rounded-2xl p-6 hover:shadow-card transition-shadow">
              <div className="w-10 h-10 bg-brand-beige/50 rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-brand-gold" />
              </div>
              <h3 className="font-bold text-brand-black mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Mission Statement */}
        <section className="bg-white border border-brand-beige rounded-3xl p-8 md:p-12 mb-20">
          <h2 className="text-2xl font-bold text-brand-black mb-6">Our Mission</h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              폰트를 고르는 일은 단순히 예쁜 모양을 찾는 것이 아닙니다.
            </p>
            <p className="text-brand-black font-medium">
              &quot;이 폰트가 내 프로젝트의 목적을 달성해줄 수 있는가?&quot;
            </p>
            <p>
              를 결정하는 일입니다. 우리는 디자이너, 기획자, 개발자가
              폰트 선택에 대한 확신을 가질 수 있도록 돕습니다.
            </p>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="bg-brand-black rounded-3xl p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="mono-label text-brand-gold mb-2 block">For Enterprise</span>
              <h3 className="text-xl font-bold mb-2">조직의 문서 리스크 관리가 필요하신가요?</h3>
              <p className="text-zinc-400 text-sm">기업 전용 폰트 파이프라인으로 전사적 디자인 품질을 보장합니다.</p>
            </div>
            <Link
              href="/enterprise"
              className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-brand-gold/90 transition-colors"
            >
              자세히 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
