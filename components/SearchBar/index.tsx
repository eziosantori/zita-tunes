"use client";

import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChange,
  loading = false,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    <div className="relative" role="search">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 h-12 text-base border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring"
        aria-label="Search media content"
        aria-describedby="search-description"
        type="search"
        autoComplete="off"
      />
      <div id="search-description" className="sr-only">
        Search for albums, audiobooks, and podcasts from the iTunes Store
      </div>
      {loading && (
        <Loader2
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground"
          aria-hidden="true"
        />
      )}
      {loading && <span className="sr-only">Searching...</span>}
    </div>
  );
};

export default SearchBar;
