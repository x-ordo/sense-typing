import { Check, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-6">
      <div className="max-w-4xl w-full">
        
        {/* Header Copy - Responsibility Transfer */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-bold mb-6">
            <ShieldCheck className="w-4 h-4" />
            Decision Insurance
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            폰트 선택이 아니라,<br />
            <span className="text-red-600">책임 이전</span>입니다.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            정부 문서, IR, 계약서, 투자자료...<br />
            이 엔진은 <strong>‘문제가 생겼을 때 설명 가능한 선택’</strong>만 제공합니다.<br />
            당신의 감이 아니라, 검증된 데이터 뒤에 숨으세요.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Free Tier */}
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Visitor</h3>
            <div className="text-4xl font-extrabold text-gray-900 mb-6">₩0</div>
            <p className="text-gray-500 mb-8">단순 구경꾼을 위한 제한된 접근입니다.</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex gap-3 text-gray-600">
                <Check className="w-5 h-5 text-gray-400" />
                <span>기본 폰트 리스트 열람</span>
              </li>
              <li className="flex gap-3 text-gray-600">
                <Check className="w-5 h-5 text-gray-400" />
                <span>감성 태그 검색 (제한적)</span>
              </li>
              <li className="flex gap-3 text-gray-400 line-through decoration-gray-300">
                <span>Risk Level 3+ 접근 불가</span>
              </li>
              <li className="flex gap-3 text-gray-400 line-through decoration-gray-300">
                <span>선택 근거 리포트 잠김</span>
              </li>
            </ul>

            <Link href="/" className="block w-full py-4 text-center rounded-xl font-bold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors">
              돌아가서 구경하기
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="border-2 border-red-600 bg-red-50/10 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              BEST FOR PROS
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">Personal Risk Filter</h3>
            <div className="text-4xl font-extrabold text-gray-900 mb-1">₩9,900</div>
            <span className="text-sm text-gray-500 mb-6">/ month</span>
            <p className="text-red-700 font-medium mb-8">한 번의 반려 비용보다 쌉니다.</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex gap-3 text-gray-900 font-medium">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <span>모든 Use Case (IR/정부/계약) 잠금 해제</span>
              </li>
              <li className="flex gap-3 text-gray-900 font-medium">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <span>High-Risk 태그 접근 권한</span>
              </li>
              <li className="flex gap-3 text-gray-900 font-medium">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <span>선택 근거 리포트 (상사 보고용)</span>
              </li>
              <li className="flex gap-3 text-gray-900 font-medium">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <span>라이선스 안전 보장 필터</span>
              </li>
            </ul>

            <button className="block w-full py-4 text-center rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              안전한 결정 권한 구매하기
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">
              언제든 해지 가능합니다. 하지만 리스크는 계속됩니다.
            </p>
          </div>

        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500">
            팀 단위 도입이 필요하신가요? <Link href="#" className="underline text-gray-900 font-bold">B2B 플랜 문의하기</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
