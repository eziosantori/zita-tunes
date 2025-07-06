import type { ApiResponse } from "@/types/media";

export async function fetchMediaData(
  term: string,
  media: string,
  entity: string,
  limit = 20,
  country = "US"
): Promise<ApiResponse> {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    term
  )}&media=${media}&entity=${entity}&limit=${limit}&country=${country}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${media} data: ${response.statusText}`);
  }

  return response.json();
}
