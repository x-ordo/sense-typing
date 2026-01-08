import { createSupabaseServer } from './server';
import { MOCK_FONTS, shouldUseMockData } from '../mock-data';

export async function getAllFonts() {
  // Use mock data if Supabase is not configured
  if (shouldUseMockData()) {
    return MOCK_FONTS;
  }

  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from('fonts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching fonts:', error);
      return MOCK_FONTS;
    }
    return data;
  } catch {
    return MOCK_FONTS;
  }
}

export async function getFontBySlug(slug: string) {
  // Use mock data if Supabase is not configured
  if (shouldUseMockData()) {
    const font = MOCK_FONTS.find(f => f.id === slug || f.name === slug);
    return font || null;
  }

  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from('fonts')
      .select('*')
      .or(`id.eq.${slug},name.eq.${slug}`)
      .single();

    if (error) {
      console.error(`Error fetching font ${slug}:`, error);
      // Fallback to mock data
      const font = MOCK_FONTS.find(f => f.id === slug || f.name === slug);
      return font || null;
    }
    return data;
  } catch {
    const font = MOCK_FONTS.find(f => f.id === slug || f.name === slug);
    return font || null;
  }
}
