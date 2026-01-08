import { createSupabaseServer } from './server';

export async function getAllFonts() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('fonts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching fonts:', error);
    return [];
  }
  return data;
}

export async function getFontBySlug(slug: string) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('fonts')
    .select('*')
    .or(`id.eq.${slug},name.eq.${slug}`)
    .single();

  if (error) {
    console.error(`Error fetching font ${slug}:`, error);
    return null;
  }
  return data;
}
