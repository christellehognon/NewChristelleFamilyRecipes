import React, { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

// Lightweight lazy-image component with simple IntersectionObserver
export function LazyImage({ src, alt, className }: Props): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisible(true)
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e && e.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '100px' });
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return visible ? (
    <img ref={imgRef} src={src} alt={alt} loading="lazy" className={className} />
  ) : (
    <div ref={imgRef} className={className} aria-label={alt} />
  );
}
