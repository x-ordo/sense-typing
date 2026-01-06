import { createSupabaseServer } from '@/lib/supabase/server'
import TagChip from './TagChip'
import PremiumLock from './PremiumLock'
import { isPremiumTag } from '@/lib/access'

async function getFonts() {
  const supabase = createSupabaseServer()
  
  // Fetch fonts with their related tags
  // Note: This is a complex join. For MVP, we fetch fonts and then their tags or use a view.
  // Here we'll fetch fonts and manually aggregate tags for simplicity and control.
  
  const { data: fonts } = await supabase
    .from('fonts')
    .select('id, name, foundry, preview_url')
    .limit(12)

  if (!fonts) return []

  // Fetch tags for these fonts
  const fontIds = fonts.map(f => f.id)
  const { data: mappings } = await supabase
    .from('font_emotion_map')
    .select(`
      font_id,
      weight,
      emotion_tags (
        id,
        tag,
        polarity
      )
    `)
    .in('font_id', fontIds)

  // Map tags back to fonts
  return fonts.map(font => {
    const fontTags = mappings
      ?.filter(m => m.font_id === font.id)
      .map(m => ({
        ...m.emotion_tags, // id, tag, polarity
        name: m.emotion_tags?.tag, // Normalize for TagChip
        weight: m.weight
      }))
      .sort((a, b) => (b.weight || 0) - (a.weight || 0)) || []

    const hasPremium = fontTags.some(t => isPremiumTag(t))

    return {
      ...font,
      tags: fontTags,
      hasPremium
    }
  })
}

export default async function FontGrid() {
  const fonts = await getFonts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px] mx-auto">
      {fonts.map((font: any) => (
        <div key={font.id} className="group relative bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300 p-8 flex flex-col items-start h-full shadow-sm hover:shadow-md">
          {/* Header */}
          <div className="w-full flex justify-between items-baseline mb-6">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              {font.name}
            </h3>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              {font.foundry}
            </span>
          </div>

          {/* Preview (Placeholder if url missing) */}
          <div className="w-full h-32 mb-6 flex items-center text-4xl text-gray-800 break-keep leading-tight font-[family-name:var(--font-geist-sans)]">
            {font.preview_url ? (
               // eslint-disable-next-line @next/next/no-img-element
               <img src={font.preview_url} alt={font.name} className="max-w-full max-h-full object-contain" />
            ) : (
               <span style={{ fontFamily: "sans-serif" }}>다람쥐 헌 쳇바퀴에 타고파</span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            {font.tags.slice(0, 4).map((tag: any) => (
              <TagChip key={tag.id} tag={tag} />
            ))}
            {font.tags.length > 4 && (
              <span className="text-xs text-gray-400 py-1">+ {font.tags.length - 4}</span>
            )}
          </div>

          {/* Premium Lock (The Hook) */}
          <div className="w-full">
            <PremiumLock locked={font.hasPremium} />
          </div>
        </div>
      ))}
    </div>
  )
}
