"use client";

import { searchMedia } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useMediaStore } from "@/store/media-store";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export interface SearchBarProps {
  loading?: boolean;
  placeholder?: string;
}

const SearchBar = ({ placeholder = "Search..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setQuery, setMediaData, setLoading, setError, clearError } =
    useMediaStore();

  const [isPending, startTransition] = useTransition();
  const debouncedSearchTerm = useDebounce(searchTerm, 600);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setQuery("");
      setMediaData({
        albums: [],
        audiobooks: [],
        podcasts: [],
      });
      return;
    }
  }, [searchTerm, setMediaData, setQuery]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setQuery(debouncedSearchTerm);
      setLoading(true);
      clearError();
      startTransition(async () => {
        try {
          const results = await searchMedia(debouncedSearchTerm);
          setMediaData(results); // Reset genre filter on new search
        } catch (error) {
          setError(error instanceof Error ? error.message : String(error));
        } finally {
          setLoading(false);
        }
      });
    } else {
      setMediaData({
        albums: [],
        audiobooks: [],
        podcasts: [],
      });
    }
  }, [
    debouncedSearchTerm,
    setMediaData,
    setLoading,
    clearError,
    setError,
    setQuery,
  ]);

  return (
    <div className="relative" role="search">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-10 h-12 text-base border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring"
        aria-label="Search media content"
        aria-describedby="search-description"
        type="search"
        autoComplete="off"
      />
      <div id="search-description" className="sr-only">
        Search for albums, audiobooks, and podcasts from the iTunes Store
      </div>
      {isPending && (
        <Loader2
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground"
          aria-hidden="true"
        />
      )}
      {isPending && <span className="sr-only">Searching...</span>}
    </div>
  );
};

export default SearchBar;
