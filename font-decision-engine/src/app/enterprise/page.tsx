'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, Building2, FileWarning, Users, Scale, FileText } from 'lucide-react'
import ContactModal from '@/components/ContactModal'

export default function EnterprisePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-red-100">
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* 1. Hero Section: The Hook */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold mb-8 tracking-wide">
            FOR ORGANIZATIONS
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-8 text-gray-900">
            문서 하나로<br />
            사고 나지 않게 하십시오.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
            무료 폰트를 고르는 문제가 아닙니다.<br/>
            <strong>조직 전체의 판단 기준을 통제하는 문제입니다.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={openModal}
              className="px-8 py-4 bg-black text-white font-bold text-lg rounded hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              조직용 기준 체계 문의하기
            </button>
            <button className="px-8 py-4 bg-white border border-gray-300 text-gray-700 font-bold text-lg rounded hover:bg-gray-50 transition-colors">
              샘플 리포트 보기
            </button>
          </div>
        </div>
      </section>

      {/* 2. Pain Framing: The Fear */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            대부분의 문서 사고는 ‘폰트 선택’에서 시작됩니다.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-red-100 bg-red-50/30 rounded-lg">
              <FileWarning className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">저작권 리스크</h3>
              <p className="text-gray-600 text-sm">
                상업적 사용 가능 여부가 불명확한 무료 폰트를 사용하여, 추후 내용증명을 받게 됩니다.
              </p>
            </div>
            <div className="p-8 border border-red-100 bg-red-50/30 rounded-lg">
              <Users className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">기준의 부재</h3>
              <p className="text-gray-600 text-sm">
                팀마다, 직원마다 다른 기준. 퇴사자가 만든 문서의 폰트 출처를 아무도 모릅니다.
              </p>
            </div>
            <div className="p-8 border border-red-100 bg-red-50/30 rounded-lg">
              <Scale className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">법적 책임</h3>
              <p className="text-gray-600 text-sm">
                사고 발생 시 개인의 실수가 아닌, 관리 소홀로 인한 조직의 책임으로 귀결됩니다.
              </p>
            </div>
          </div>
          <p className="text-center text-lg font-medium text-gray-500 mt-12">
            "사고는 디자인이 아니라, <strong>기준 부재</strong>에서 발생합니다."
          </p>
        </div>
      </section>

      {/* 3. Product Reframe: The Solution */}
      <section className="w-full py-24 bg-gray-900 text-white px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sense Typing은 ‘폰트 DB’가 아닙니다.
          </h2>
          <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 mb-16">
            조직이 사용할 수 있는 ‘문서 판단 기준 엔진’입니다.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-800 p-6 rounded border border-gray-700">
              <div className="text-green-400 font-bold mb-2">Safe Mapping</div>
              <p className="text-gray-300 text-sm">목적별(IR/계약/공문) 안전 폰트 매핑</p>
            </div>
            <div className="bg-gray-800 p-6 rounded border border-gray-700">
              <div className="text-green-400 font-bold mb-2">Risk Elimination</div>
              <p className="text-gray-300 text-sm">상표권·인쇄·임베딩 리스크 사전 제거</p>
            </div>
            <div className="bg-gray-800 p-6 rounded border border-gray-700">
              <div className="text-green-400 font-bold mb-2">Unified Standard</div>
              <p className="text-gray-300 text-sm">전사 모든 문서에 동일한 판단 기준 적용</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Comparison Table */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">기능 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-4 pl-4 text-gray-500 font-medium">기능</th>
                  <th className="py-4 text-center text-gray-500 font-medium w-32">개인 (Free)</th>
                  <th className="py-4 text-center text-gray-900 font-bold w-48 bg-gray-50 rounded-t-lg">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="py-4 pl-4 text-gray-900">Taxonomy 검색</td>
                  <td className="text-center text-green-600">⭕</td>
                  <td className="text-center text-green-600 bg-gray-50">⭕</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 pl-4 text-gray-900">Premium 기준 태그</td>
                  <td className="text-center text-gray-400">🔒</td>
                  <td className="text-center text-green-600 bg-gray-50">⭕</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 pl-4 text-gray-900">Use Case (IR, 계약) 매핑</td>
                  <td className="text-center text-gray-400">🔒</td>
                  <td className="text-center text-green-600 bg-gray-50">⭕</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 pl-4 text-gray-900 font-bold">팀 공통 기준 Lock</td>
                  <td className="text-center text-gray-300">❌</td>
                  <td className="text-center text-green-600 bg-gray-50 font-bold">⭕</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 pl-4 text-gray-900 font-bold">법무/감사 대응 리포트</td>
                  <td className="text-center text-gray-300">❌</td>
                  <td className="text-center text-green-600 bg-gray-50 font-bold">⭕</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 text-gray-900 font-bold">사내 배포용 가이드 PDF</td>
                  <td className="text-center text-gray-300">❌</td>
                  <td className="text-center text-green-600 bg-gray-50 font-bold">⭕</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Pre-emptive Defense (Why not in-house?) */}
      <section className="w-full py-20 bg-gray-50 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">“왜 내부에서 만들지 않습니까?”</h2>
          <div className="grid gap-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-gray-200 font-bold text-gray-400">1</div>
              <div>
                <h3 className="font-bold text-lg mb-2">유지비용의 착시</h3>
                <p className="text-gray-600">
                  매달 쏟아지는 신규 폰트와 변경되는 라이선스 약관을 누가 매일 체크합니까?<br/>
                  담당자 1명의 인건비 1/10 비용으로 해결하십시오.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-gray-200 font-bold text-gray-400">2</div>
              <div>
                <h3 className="font-bold text-lg mb-2">책임 소재</h3>
                <p className="text-gray-600">
                  내부 직원이 정리한 리스트에서 사고가 나면 그 직원의 책임입니다.<br/>
                  외부 전문 기업의 데이터를 사용하면, <strong>책임은 분산됩니다.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pricing & Final CTA */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">비용은 사고보다 저렴합니다.</h2>
            <p className="text-xl text-gray-500">
              연간 구독 비용은<br/>
              <strong>잘못 만든 IR 덱 하나를 폐기하는 비용</strong>보다 낮습니다.
            </p>
          </div>
          
          <div className="bg-black text-white p-12 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">조직의 안전 기준을 지금 확보하세요.</h3>
            <p className="mb-8 text-gray-400">
              무료 체험이 아닙니다. 조직에 맞는 <strong>안전 기준</strong>을 설계해드립니다.
            </p>
            <button 
              onClick={openModal}
              className="inline-block px-8 py-4 bg-white text-black font-bold text-lg rounded hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              조직용 기준 체계 도입 문의
            </button>
          </div>
          <div className="mt-8 text-sm text-gray-400">
            <Link href="/" className="underline hover:text-gray-600">개인용 서비스로 돌아가기</Link>
          </div>
        </div>
      </section>
    </div>
  )
}