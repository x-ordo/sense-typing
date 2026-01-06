export const runtime = 'edge'

import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tag = searchParams.get('tag')
  const supabase = await createSupabaseServer()

  let query = supabase
    .from('font_emotion_map')
    .select(`
      confidence,
      fonts (*),
      emotion_tags (*)
    `)
    .order('weight', { ascending: false })

  if (tag) {
    query = query.eq('emotion_tags.tag', tag)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}