"use client";

import { Badge } from "@/components/ui/badge";
import { getCategoryInfo, getHighResArtwork } from "@/lib/utils";
import type { MediaItem, MediaType } from "@/types/media";
import Image from "next/image";
import type React from "react";
import { memo } from "react";
// import LazyImage from "@/components/LazyImage";

interface MediaCardProps {
  item: MediaItem;
  mediaType: MediaType;
  uniqueKey?: string;
  showCategoryBadge?: boolean; // New prop to show category badge
}

const MediaCard = ({
  item,
  mediaType,
  uniqueKey,
  showCategoryBadge = false,
}: MediaCardProps) => {
  const handleClick = () => {
    const url = item.trackViewUrl || item.collectionViewUrl;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const releaseYear = new Date(item.releaseDate).getFullYear();

  const categoryInfo = getCategoryInfo(mediaType);

  return (
    <article key={uniqueKey || `${mediaType}-${item.trackId}`}>
      <div
        className="cursor-pointer transition-all duration-200 hover:shadow-lg rounded-lg relative"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View ${item.trackName} by ${item.artistName} on iTunes. Released in ${releaseYear}. Genre: ${item.primaryGenreName}`}
      >
        <div className="aspect-square mb-2 md:mb-3 overflow-hidden rounded-lg bg-muted/50 relative">
          <Image
            src={
              getHighResArtwork(item.artworkUrl100, 400) || "/placeholder.svg"
            }
            alt={`${item.trackName} by ${item.artistName} artwork`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            data-ai-hint={`${item.trackName} artwork`}
          />
          {/* Category badge - top left */}
          {showCategoryBadge && (
            <div className="absolute top-2 left-2">
              <Badge
                variant="secondary"
                className={`text-xs px-2 py-1 ${categoryInfo.color} backdrop-blur-sm`}
              >
                {categoryInfo.label}
              </Badge>
            </div>
          )}

          {/* Favorite button - top right */}
          <div className="absolute top-2 right-2">
            {/* TODO <FavoriteButton
              item={item}
              className="bg-background/80 backdrop-blur-sm"
            /> */}
          </div>
        </div>

        <div className="space-y-1 md:space-y-2">
          <h3 className="font-semibold text-xs md:text-sm leading-tight line-clamp-2 text-foreground">
            {item.trackName}
          </h3>

          <p
            className="text-xs md:text-sm text-secondary-foreground line-clamp-1 font-medium"
            aria-label={`Artist: ${item.artistName}`}
          >
            {item.artistName}
          </p>

          {item.collectionName && item.collectionName !== item.trackName && (
            <p
              className="text-xs text-muted-foreground line-clamp-1"
              aria-label={`Collection: ${item.collectionName}`}
            >
              {item.collectionName}
            </p>
          )}

          <div className="pt-1">
            <p
              className="text-xs text-muted-foreground"
              aria-label={`Genre: ${item.primaryGenreName}`}
            >
              {item.primaryGenreName}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(MediaCard);
