import { Loader2, Search } from "lucide-react";
import dynamic from "next/dynamic";
import { Input } from "../ui/input";
import { SearchBarProps } from "./index";

// Loading component per il fallback
const SearchBarLoading = ({ placeholder }: { placeholder: string }) => (
  <div className="relative" role="search">
    <Search
      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
      aria-hidden="true"
    />
    <Input
      placeholder={placeholder}
      className="pl-10 pr-10 h-12 text-base border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring"
      aria-label="Search media content"
      aria-describedby="search-description"
      type="search"
      autoComplete="off"
    />
    <div id="search-description" className="sr-only">
      Search for albums, audiobooks, and podcasts from the iTunes Store
    </div>
    <Loader2
      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground"
      aria-hidden="true"
    />
  </div>
);

const SearchBar = dynamic(() => import("./index"), {
  ssr: true, // Now ssr: false is allowed because this is a Client Component
  loading: () => (
    <SearchBarLoading placeholder="Search..." /> // Use a default placeholder for loading state
  ),
});

export default function SearchBarWrapper({
  loading,
  placeholder,
}: SearchBarProps) {
  return <SearchBar loading={loading} placeholder={placeholder} />;
}
