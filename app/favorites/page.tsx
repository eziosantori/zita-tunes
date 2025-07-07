import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { lazy, Suspense } from "react";

// Lazy load components
const FavoritesList = lazy(() => import("@/components/FavoritesList"));
const FavButtons = lazy(() => import("@/components/FavoritesList/FavButtons"));

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" aria-label="Back to home">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-secondary-foreground fill-current" />
                <h1 className="text-3xl font-bold">My Favorites</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Suspense
                fallback={
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                    <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                  </div>
                }
              >
                <FavButtons />
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" role="main">
        <Suspense
          fallback={
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
          }
        >
          <FavoritesList />
        </Suspense>
      </main>
    </div>
  );
}
