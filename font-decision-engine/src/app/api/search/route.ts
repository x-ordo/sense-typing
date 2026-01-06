import { createSupabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tag = searchParams.get('tag')
  const supabase = createSupabaseServer()

  let query = supabase
    .from('font_emotion_map')
    .select(`
      weight,
      fonts (
        id,
        name,
        foundry,
        license_type,
        preview_url
      ),
      emotion_tags!inner (
        id,
        tag,
        polarity,
        axis
      )
    `)
    .order('weight', { ascending: false })

  if (tag) {
    query = query.eq('emotion_tags.tag', tag)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Transform data to group tags by font if necessary, 
  // but for this specific "search by tag" logic, returning the flat map is efficient for the list.
  // We might want to fetch *other* tags for these fonts to show context.
  // For MVP, we'll return the matches directly.

  return NextResponse.json(data)
}
