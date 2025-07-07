"use client";

import MediaCard from "@/components/Media/MediaCard";
import { Button } from "@/components/ui/button";
import { useHydration } from "@/hooks/useHydration";
import { getMediaTypeFromItem } from "@/lib/utils";
import { useFavoritesStore } from "@/store/favorites-store";
import type { MediaItem } from "@/types/media";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { memo, useCallback } from "react";

const FavoritesList = () => {
  const { favorites } = useFavoritesStore();
  const isHydrated = useHydration();

  const _getMediaTypeFromItem = useCallback((item: MediaItem) => {
    return getMediaTypeFromItem(item);
  }, []);

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-muted rounded-lg mb-3" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6">
            Start adding items to your favorites by clicking the heart icon on
            any media item.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Media
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div
            className="space-y-12"
            role="region"
            aria-label="Favorite media content"
          >
            <section aria-labelledby="all-favorites-heading">
              <header className="mb-6">
                <h2
                  id="all-favorites-heading"
                  className="text-2xl font-semibold"
                >
                  All Favorites
                </h2>
              </header>

              {favorites.length > 0 ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-in fade-in-0 duration-300"
                  role="grid"
                  aria-label="All favorites collection"
                >
                  {favorites.map((item, index) => (
                    <div
                      key={`favorites-grid-${item.trackId}-${index}`}
                      role="gridcell"
                    >
                      <MediaCard
                        item={item}
                        mediaType={_getMediaTypeFromItem(item)}
                        uniqueKey={`favorites-grid-${item.trackId}-${index}`}
                        showCategoryBadge={true}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="text-center py-12 animate-in fade-in-0 duration-300"
                  role="status"
                  aria-live="polite"
                >
                  <p className="text-muted-foreground">
                    No favorites found for the selected categories. Try
                    selecting different media types.
                  </p>
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default memo(FavoritesList);
