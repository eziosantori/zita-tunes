"use client";

import dynamic from "next/dynamic";
import { memo, Suspense } from "react";

// Define the props interface for the LazyImage component
interface LazyImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

// Loading component for the dynamic import
const LazyImageLoader = ({ className }: { className?: string }) => (
  <div className={`relative animate-pulse ${className}`}>
    <div className="bg-muted/50 rounded-lg aspect-square w-full" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

// Dynamic import of the LazyImage component with loading state
const LazyImageComponent = dynamic(() => import("./index"), {
  loading: () => <LazyImageLoader />,
  ssr: false, // Disable server-side rendering for this component
});

// Create a wrapper component that handles the dynamic loading
const LazyImageWrapper = memo(
  ({ src, fallbackSrc, alt, className }: LazyImageProps) => {
    return (
      <Suspense fallback={<LazyImageLoader className={className} />}>
        <LazyImageComponent
          src={src}
          fallbackSrc={fallbackSrc}
          alt={alt}
          className={className}
        />
      </Suspense>
    );
  }
);

LazyImageWrapper.displayName = "LazyImageWrapper";

export default LazyImageWrapper;
