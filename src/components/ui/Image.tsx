import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  webp?: boolean;
}

export default function Image({ 
  src, 
  alt, 
  className,
  width,
  height,
  fill = false,
  webp = true
}: ImageProps) {
  const webpSrc = webp ? src.replace(/\.(jpg|png)$/, '.webp') : src;
  const imgStyle: React.CSSProperties = fill 
    ? { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover' 
      } 
    : {};

  return (
    <picture>
      {webp && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          ...imgStyle,
          width: width,
          height: height
        }}
        decoding="async"
      />
    </picture>
  );
} 