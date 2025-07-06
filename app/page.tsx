import HomeSection from "@/components/HomeSection";
import NavButtons from "@/components/NavButtons";

export default function Home() {
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
              here will be the search controls, such as input fields and
              buttons.
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" role="main">
        <div className="mb-8">here goes the filter by category buttons.</div>
        <HomeSection />
      </main>
    </div>
  );
}
