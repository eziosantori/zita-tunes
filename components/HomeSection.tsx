"use client";

import { useMediaData } from "@/hooks/useMediaData";
import { MediaType } from "@/types/media";
import { useEffect } from "react";
import Carousel from "./Carousel";

const HomeSection = () => {
  const {
    albumData,
    audiobookData,
    podcastData,
    loading,
    searchLoading,
    fetchInitialData,
  } = useMediaData();

  // 300ms debounce

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const mediaTypes: MediaType[] = ["album", "audiobook", "podcast"];

  return (
    <>
      <Carousel
        selectedMediaTypes={mediaTypes}
        albumData={albumData}
        audiobookData={audiobookData}
        podcastData={podcastData}
        loading={loading}
        searchLoading={searchLoading}
      />
    </>
  );
};

export default HomeSection;
