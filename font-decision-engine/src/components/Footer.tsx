// src/components/Footer.tsx
import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="text-3xl font-black tracking-tighter mb-8 block uppercase italic">
              Sense<span className="text-indigo-500">.</span>
            </Link>
            <p className="text-[10px] text-zinc-500 leading-relaxed max-w-xs uppercase tracking-widest font-bold">
              Building the future of type selection through artificial intelligence and design intuition.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-10">System</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">INTEL</Link></li>
              <li><Link href="/notices" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">LOGS</Link></li>
              <li><Link href="/questions" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">SUPPORT</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-10">Legal</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/user_agreement" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">TERMS</Link></li>
              <li><Link href="/privacy_agreement" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">PRIVACY</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-10">Network</h4>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all text-zinc-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all text-zinc-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
          <div>© 2026 SENSE TYPING INTELLIGENCE. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <span>HQ: SEOUL, SOUTH KOREA</span>
            <span>TYPE DECISION ENGINE V2.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
