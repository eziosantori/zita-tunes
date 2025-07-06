import { Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">zTunes</h1>
              <div className="flex items-center gap-4">
                <Link href="/favorites">
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative bg-transparent"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites
                    <Badge
                      variant="secondary"
                      className="ml-2 h-5 px-1.5 text-xs bg-secondary text-primary-foreground"
                    ></Badge>
                  </Button>
                </Link>
                {/* Sign In button */}
                <Button variant="outline" size="sm" className="bg-transparent">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>

            <nav aria-label="Search controls" className="space-y-4">
              here will be the search controls, such as input fields and
              buttons.
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" role="main">
        <div className="mb-8">here goes the filter by category buttons.</div>
        Here goes the main content of the page, such as search results or
        featured items.
      </main>
    </div>
  );
}
