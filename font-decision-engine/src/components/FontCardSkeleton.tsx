// src/components/FontCardSkeleton.tsx
// Loading skeleton for FontCard with matched structure

export default function FontCardSkeleton() {
  return (
    <article className="relative bg-white border border-brand-beige rounded-lg overflow-hidden animate-pulse">
      {/* Specimen Area */}
      <div className="aspect-[4/3] bg-zinc-100 relative">
        {/* Badge placeholders */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <div className="h-5 w-16 bg-zinc-200 rounded" />
          <div className="h-4 w-14 bg-zinc-200 rounded" />
        </div>
        <div className="absolute top-3 right-3">
          <div className="w-7 h-7 bg-zinc-200 rounded-full" />
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 border-t border-zinc-100">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1">
            <div className="h-4 w-24 bg-zinc-200 rounded mb-1" />
            <div className="h-3 w-16 bg-zinc-100 rounded" />
          </div>
          <div className="h-3 w-10 bg-zinc-100 rounded" />
        </div>
        <div className="flex gap-1">
          <div className="h-4 w-12 bg-zinc-100 rounded" />
          <div className="h-4 w-10 bg-zinc-100 rounded" />
          <div className="h-4 w-14 bg-zinc-100 rounded" />
        </div>
      </div>
    </article>
  );
}
