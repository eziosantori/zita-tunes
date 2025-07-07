import Filters from "@/components/Filters";
import HomeSection from "@/components/HomeSection";
import NavButtons from "@/components/NavButtons";
import SearchBarWrapper from "@/components/SearchBar/SearchBarWrapper";
import { fetchMediaData } from "@/services/itunes-api";
export const revalidate = 3600;

export default async function Home() {
  const [albums, podcasts, audiobooks] = await Promise.all([
    (await fetchMediaData("music", "music", "album")).results,
    (await fetchMediaData("bestseller", "audiobook", "audiobook")).results,
    (await fetchMediaData("podcast", "podcast", "podcast")).results,
  ]);

  const initialData = { albums, podcasts, audiobooks };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">zTunes</h1>
              <NavButtons />
            </div>

            <nav aria-label="Search controls" className="space-y-4">
              <SearchBarWrapper placeholder="Search albums, audiobooks, podcasts..." />
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" role="main">
        <div className="mb-8">
          <Filters />
        </div>
        <HomeSection initialData={initialData} />
      </main>
    </div>
  );
}
