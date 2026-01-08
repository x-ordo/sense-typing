// src/components/EmptyState.tsx
import React from 'react';
import { SearchX, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="w-full py-32 flex flex-col items-center text-center px-6">
      <div className="w-20 h-20 bg-zinc-50 text-zinc-200 rounded-full flex items-center justify-center mb-8">
        <SearchX className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-black uppercase italic tracking-tighter text-zinc-900 mb-3">{title}</h3>
      <p className="text-sm text-zinc-400 font-medium mb-10 max-w-xs leading-relaxed">{description}</p>
      
      {actionLabel && actionHref && (
        <Link 
          href={actionHref}
          className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl"
        >
          {actionLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
