'use client'

import { useState } from 'react'
import { X, CheckCircle, ArrowRight } from 'lucide-react'

type Step = 'form' | 'success'

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>('form')
  const [formData, setFormData] = useState({
    companyName: '',
    teamSize: '10-50',
    purpose: 'risk_management', // risk_management, branding, compliance
    email: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here we would normally send data to API/Zapier
    // For MVP/Fake Door, we just show the success message
    // simulating a "Quality Control" gate.
    setStep('success')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="p-8">
            <h3 className="text-xl font-bold mb-2 text-gray-900">조직용 기준 체계 도입 문의</h3>
            <p className="text-sm text-gray-500 mb-6">
              현재 내부 검증이 완료된 조직만 선별적으로 연결하고 있습니다.<br/>
              정보를 남겨주시면 담당자가 검토 후 연락드립니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  회사명
                </label>
                <input 
                  required
                  type="text"
                  placeholder="Ex. Toss, Samsung"
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  팀 규모
                </label>
                <select 
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-2 focus:ring-black outline-none bg-white"
                  value={formData.teamSize}
                  onChange={e => setFormData({...formData, teamSize: e.target.value})}
                >
                  <option value="under_10">10명 미만</option>
                  <option value="10-50">10 ~ 50명</option>
                  <option value="50-200">50 ~ 200명</option>
                  <option value="enterprise">200명 이상 (Enterprise)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  주요 도입 목적 (핵심)
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                    <input 
                      type="radio" 
                      name="purpose" 
                      value="risk_management"
                      checked={formData.purpose === 'risk_management'}
                      onChange={e => setFormData({...formData, purpose: e.target.value})}
                      className="accent-black"
                    />
                    <span className="text-sm">리스크 방지 (저작권/법무)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                    <input 
                      type="radio" 
                      name="purpose" 
                      value="compliance"
                      checked={formData.purpose === 'compliance'}
                      onChange={e => setFormData({...formData, purpose: e.target.value})}
                      className="accent-black"
                    />
                    <span className="text-sm">사내 규정/컴플라이언스 확립</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                    <input 
                      type="radio" 
                      name="purpose" 
                      value="branding"
                      checked={formData.purpose === 'branding'}
                      onChange={e => setFormData({...formData, purpose: e.target.value})}
                      className="accent-black"
                    />
                    <span className="text-sm">IR/브랜딩 퀄리티 통제</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  업무 이메일
                </label>
                <input 
                  required
                  type="email"
                  placeholder="name@company.com"
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white font-bold py-4 rounded mt-4 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                도입 가능 여부 확인 <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center h-full">
            <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-gray-900">접수되었습니다.</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              귀사의 리스크 프로필을 분석하여,<br/>
              <strong>도입 적합 판정 시</strong> 24시간 내로<br/>
              제안서와 함께 연락드리겠습니다.
            </p>
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-gray-100 text-gray-900 font-bold rounded hover:bg-gray-200 transition-colors"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
