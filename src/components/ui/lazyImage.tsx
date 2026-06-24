import React, { useState, useEffect } from "react";
import type { LazyLoadImageProps as OriginalProps } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Props type for your wrapper
interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | string;
  className?: string;
  effect?: "blur" | "opacity";
  placeholderSrc?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  className,
  effect = "blur",
  placeholderSrc = "https://placehold.co/380x200",
}) => {
  const [LazyComp, setLazyComp] = useState<React.FC<OriginalProps> | null>(null);

  useEffect(() => {
    // Dynamically import LazyLoadImage on client only
    import("react-lazy-load-image-component").then((mod) => {
      setLazyComp(() => mod.LazyLoadImage);
    });
  }, []);

  // SSR fallback
  if (!LazyComp) {
    return (
      <img
        className={`${className} w-full`}
        src={src}
        alt={alt}
        width={width}
        loading="lazy"
      />
    );
  }

  return (
    <LazyComp
      className={`${className} w-full`}
      alt={alt}
      src={src}
      width={width}
      effect={effect}
      placeholderSrc={placeholderSrc}
      loading="lazy"
    />
  );
};

export default LazyImage;
