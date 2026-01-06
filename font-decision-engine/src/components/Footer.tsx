// src/components/Footer.tsx
import Link from 'next/link'
import { Instagram, Facebook, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="text-lg font-black tracking-tighter mb-6 block">
              SENSE TYPING
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              © 2026 Project Sense Typing. All rights reserved.<br/>
              모든 폰트의 저작권은 각 저작권자에게 있으며, 정확한 라이선스는 저작권자에게 확인해야 합니다.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6">Service</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-xs text-gray-500 hover:text-black">소개</Link></li>
              <li><Link href="/notices" className="text-xs text-gray-500 hover:text-black">공지사항</Link></li>
              <li><Link href="/questions" className="text-xs text-gray-500 hover:text-black">자주 묻는 질문</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6">Support</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/user_agreement" className="text-xs text-gray-500 hover:text-black">이용약관</Link></li>
              <li><Link href="/privacy_agreement" className="text-xs text-gray-500 hover:text-black font-bold">개인정보처리방침</Link></li>
              <li><a href="mailto:team@sensetyping.cc" className="text-xs text-gray-500 hover:text-black flex items-center gap-1">
                <Mail className="w-3 h-3" /> team@sensetyping.cc
              </a></li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <h4 className="text-sm font-bold text-gray-900 mb-6">Social</h4>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-all">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-gray-300">
            Sense Typing 사업자 정보 (예시): 대표 박하성 | 서울특별시 서초구 | 사업자등록번호 000-00-00000
          </div>
        </div>
      </div>
    </footer>
  )
}
