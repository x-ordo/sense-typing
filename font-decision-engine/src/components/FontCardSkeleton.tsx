// src/components/FontCardSkeleton.tsx

export default function FontCardSkeleton() {
  return (
    <article className="relative bg-white border border-transparent animate-pulse">
      {/* Specimen Area */}
      <div className="aspect-[4/5] bg-zinc-100 overflow-hidden relative">
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="h-6 w-16 bg-zinc-200 rounded-sm" />
          <div className="h-4 w-20 bg-zinc-200 rounded-sm" />
        </div>
      </div>

      {/* Product Info Area */}
      <div className="pt-10 pb-8 px-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-2">
            <div className="h-7 w-32 bg-zinc-200 rounded" />
            <div className="h-3 w-20 bg-zinc-100 rounded" />
          </div>
          <div className="w-10 h-10 bg-zinc-100 rounded" />
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
          <div className="flex gap-4">
            <div className="h-3 w-10 bg-zinc-100 rounded" />
            <div className="h-3 w-8 bg-zinc-100 rounded" />
            <div className="h-3 w-10 bg-zinc-100 rounded" />
          </div>
          <div className="h-3 w-12 bg-zinc-100 rounded" />
        </div>
      </div>
    </article>
  );
}
