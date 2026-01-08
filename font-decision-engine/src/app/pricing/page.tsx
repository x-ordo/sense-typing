import { Check, ShieldCheck, X } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="mono-label text-brand-gold mb-4 block">Pricing</span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-4">
            폰트 선택이 아니라,<br />
            <span className="text-brand-gold">책임 이전</span>입니다.
          </h1>
          <p className="text-base text-zinc-500 max-w-xl mx-auto leading-relaxed">
            정부 문서, IR, 계약서, 투자자료...<br />
            이 엔진은 &apos;문제가 생겼을 때 설명 가능한 선택&apos;만 제공합니다.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">

          {/* Free Tier */}
          <div className="bg-white border border-brand-beige rounded-2xl p-8 flex flex-col">
            <h3 className="text-lg font-bold text-brand-black mb-2">Visitor</h3>
            <div className="text-4xl font-bold text-brand-black mb-1">₩0</div>
            <span className="text-sm text-zinc-400 mb-6">무료 이용</span>
            <p className="text-zinc-500 text-sm mb-8">기본 기능만 제공됩니다.</p>

            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex gap-3 text-zinc-600 text-sm">
                <Check className="w-4 h-4 text-zinc-400 mt-0.5" />
                <span>기본 폰트 리스트 열람</span>
              </li>
              <li className="flex gap-3 text-zinc-600 text-sm">
                <Check className="w-4 h-4 text-zinc-400 mt-0.5" />
                <span>감성 태그 검색 (제한적)</span>
              </li>
              <li className="flex gap-3 text-zinc-400 text-sm">
                <X className="w-4 h-4 mt-0.5" />
                <span>Risk Level 3+ 접근 불가</span>
              </li>
              <li className="flex gap-3 text-zinc-400 text-sm">
                <X className="w-4 h-4 mt-0.5" />
                <span>선택 근거 리포트 잠김</span>
              </li>
            </ul>

            <Link href="/" className="block w-full py-3 text-center rounded-xl font-bold bg-brand-beige/50 text-brand-black hover:bg-brand-beige transition-colors text-sm">
              둘러보기
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="bg-white border-2 border-brand-gold rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-card">
            <div className="absolute top-0 right-0 bg-brand-gold text-brand-black text-xs font-bold px-3 py-1 rounded-bl-lg">
              추천
            </div>

            <h3 className="text-lg font-bold text-brand-black mb-2">Personal Risk Filter</h3>
            <div className="text-4xl font-bold text-brand-black mb-1">₩9,900</div>
            <span className="text-sm text-zinc-400 mb-6">/ month</span>
            <p className="text-brand-gold font-medium text-sm mb-8">한 번의 반려 비용보다 쌉니다.</p>

            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex gap-3 text-brand-black text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-gold mt-0.5" />
                <span>모든 Use Case 잠금 해제</span>
              </li>
              <li className="flex gap-3 text-brand-black text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-gold mt-0.5" />
                <span>High-Risk 태그 접근 권한</span>
              </li>
              <li className="flex gap-3 text-brand-black text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-gold mt-0.5" />
                <span>선택 근거 리포트 (상사 보고용)</span>
              </li>
              <li className="flex gap-3 text-brand-black text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-gold mt-0.5" />
                <span>라이선스 안전 보장 필터</span>
              </li>
            </ul>

            <button className="block w-full py-3 text-center rounded-xl font-bold bg-brand-gold text-brand-black hover:bg-brand-gold/90 transition-colors text-sm">
              구매하기
            </button>
            <p className="text-xs text-center text-zinc-400 mt-4">
              언제든 해지 가능합니다.
            </p>
          </div>

        </div>

        {/* Enterprise CTA */}
        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm">
            팀 단위 도입이 필요하신가요?{' '}
            <Link href="/enterprise" className="text-brand-black font-bold hover:text-brand-gold transition-colors">
              Enterprise 플랜 문의하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
