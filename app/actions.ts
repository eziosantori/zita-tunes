"use server";

import { fetchMediaData } from "@/services/itunes-api";

export async function searchMedia(term: string) {
  if (!term) {
    return { albums: [], podcasts: [], audiobooks: [] };
  }

  const [albums, podcasts, audiobooks] = await Promise.all([
    (await fetchMediaData(term, "music", "album")).results,
    (await fetchMediaData(term, "audiobook", "audiobook")).results,
    (await fetchMediaData(term, "podcast", "podcast")).results,
  ]);

  const groupedResults = { albums, podcasts, audiobooks };

  return groupedResults;
}
