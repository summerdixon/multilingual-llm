import { supabase } from "../lib/supabaseClient";

export type ListenItem = {
  audio_id: string;
  file_name: string;
  original_file_extension: string | null;
  audio_url: string | null;
};

export type LookItem = {
  image_id: number;
  file_extension: string | null;
  file_name: string;
  page_number: number | null;
  section_type: string | null;
  description_id: number | null;
  chant_id: number | null;
  performer_info: string | null;
  corresponding_description_id: number | null;
  title_en: string | null;
  title_km: string | null;
  raw_text: string | null;
  clean_text: string | null;
};

export async function fetchListenItems(): Promise<ListenItem[]> {
  const { data, error } = await supabase
    .from("smot_audio")
    .select("audio_id, file_name, original_file_extension, audio_url")
    .order("audio_id", { ascending: true });

  console.log("fetchListenItems result:", { data, error });

  if (error) {
    console.error("Error fetching listen items:", error);
    throw error;
  }

  return (data ?? []) as ListenItem[];
}

export function getAudioUrl(item: ListenItem): string {
  if (item.audio_url) {
    return item.audio_url;
  }

  const base = item.file_name.replace(/\.[^/.]+$/, "");
  const path = `${base}.mp3`;

  const { data } = supabase.storage.from("smot_audio").getPublicUrl(path);
  return data.publicUrl;
}

export async function fetchLookItems(): Promise<LookItem[]> {
  const { data, error } = await supabase
    .from("smot_images")
    .select(`
      image_id,
      file_extension,
      file_name,
      page_number,
      section_type,
      description_id,
      chant_id,
      performer_info,
      corresponding_description_id,
      title_en,
      title_km,
      raw_text,
      clean_text
    `)
    .order("chant_id", { ascending: true })
    .order("page_number", { ascending: true });

  if (error) {
    console.error("Error fetching look items:", error);
    throw error;
  }

  return (data ?? []) as LookItem[];
}

export function getImageUrl(file_name: string): string {
  return `/${encodeURIComponent(file_name)}`;
}
