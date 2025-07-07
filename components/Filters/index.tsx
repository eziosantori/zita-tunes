"use client";

import { useMediaStore } from "@/store/media-store";
import { MediaType } from "@/types/media";
import CategoriesFilter from "./CategoriesFilter";

const Filters = () => {
  const { activeTypes, setMediaTypes } = useMediaStore();

  const handleTypeToggle = (type: MediaType) => {
    const currentTypes = activeTypes || [];
    if (currentTypes.includes(type)) {
      setMediaTypes(currentTypes.filter((t) => t !== type));
    } else {
      setMediaTypes([...currentTypes, type]);
    }
  };
  return (
    <CategoriesFilter
      isAllSelected={!activeTypes || activeTypes.length === 0}
      mediaTypes={{
        album: "Album",
        audiobook: "Audiobook",
        podcast: "Podcast",
      }}
      selectedTypes={activeTypes || []}
      onToggle={handleTypeToggle}
      onSelectAll={() => setMediaTypes?.([])}
    />
  );
};

export default Filters;
