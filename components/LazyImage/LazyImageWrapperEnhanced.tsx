"use client";

import dynamic from "next/dynamic";
import { memo, Suspense, useEffect, useState } from "react";

// Define the props interface for the LazyImage component
interface LazyImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  preload?: boolean;
}

// Enhanced loading component with better UX
const LazyImageLoader = ({ className }: { className?: string }) => (
  <div className={`relative animate-pulse ${className}`}>
    <div className="bg-muted/50 rounded-lg aspect-square w-full" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

// Error fallback component
const LazyImageError = ({
  className,
  alt,
}: {
  className?: string;
  alt: string;
}) => (
  <div
    className={`relative bg-muted/30 rounded-lg flex items-center justify-center ${className}`}
  >
    <div className="text-center p-4">
      <div className="w-8 h-8 mx-auto mb-2 text-muted-foreground">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <p className="text-sm text-muted-foreground">Failed to load image</p>
      <p className="text-xs text-muted-foreground mt-1">{alt}</p>
    </div>
  </div>
);

// Dynamic import of the LazyImage component
const LazyImageComponent = dynamic(() => import("./index"), {
  loading: () => <LazyImageLoader />,
  ssr: false,
});

// Enhanced wrapper component with preloading and error handling
const LazyImageWrapperEnhanced = memo(
  ({ src, fallbackSrc, alt, className, preload = false }: LazyImageProps) => {
    const [hasError, setHasError] = useState(false);

    // Preload the image if requested
    useEffect(() => {
      if (preload && src) {
        const img = new Image();
        img.onload = () => {
          // Image preloaded successfully
        };
        img.onerror = () => setHasError(true);
        img.src = src;
      }
    }, [preload, src]);

    if (hasError && !fallbackSrc) {
      return <LazyImageError className={className} alt={alt} />;
    }

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

LazyImageWrapperEnhanced.displayName = "LazyImageWrapperEnhanced";

export { LazyImageWrapperEnhanced };
export default LazyImageWrapperEnhanced;
