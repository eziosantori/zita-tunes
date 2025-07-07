"use client";

import { Button } from "@/components/ui/button";
import type { MediaType } from "@/types/media";
import { memo } from "react";

interface FilterButtonsProps {
  mediaTypes: Record<MediaType, string>;
  selectedTypes: MediaType[];
  isAllSelected: boolean;
  onToggle: (mediaType: MediaType) => void;
  onSelectAll: () => void;
}

const FilterButtons = ({
  mediaTypes,
  selectedTypes,
  isAllSelected,
  onToggle,
  onSelectAll,
}: FilterButtonsProps) => {
  return (
    <fieldset className="flex flex-wrap gap-2">
      <legend className="sr-only">Filter by media type:</legend>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Media type filters"
      >
        {/* All button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onSelectAll}
          className={`transition-all duration-200 border ${
            isAllSelected
              ? "bg-primary text-secondary-foreground border-primary shadow-sm"
              : "bg-background text-foreground border-secondary/30 hover:bg-accent hover:text-accent-foreground hover:border-secondary/50"
          }`}
          aria-pressed={isAllSelected}
          aria-label={`${
            isAllSelected ? "All types selected" : "Select all types"
          }`}
          type="button"
        >
          All
        </Button>

        {/* Individual type buttons */}
        {Object.entries(mediaTypes).map(([key, label]) => {
          const mediaType = key as MediaType;
          const isSelected = selectedTypes.includes(mediaType);
          const isActive = isSelected && !isAllSelected;

          return (
            <Button
              key={key}
              variant="outline"
              size="sm"
              onClick={() => onToggle(mediaType)}
              className={`transition-all duration-200 border ${
                isActive
                  ? "bg-primary text-secondary-foreground border-primary shadow-sm"
                  : "bg-background text-foreground border-secondary/30 hover:bg-accent hover:text-accent-foreground hover:border-secondary/50"
              }`}
              aria-pressed={isSelected}
              aria-label={`${isSelected ? "Remove" : "Add"} ${label} filter`}
              type="button"
            >
              {label}
            </Button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default memo(FilterButtons);
