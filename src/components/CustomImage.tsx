import React from 'react';

type ImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
};

export default function CustomImage({ 
  src, 
  alt, 
  fill, 
  className,
  width,
  height 
}: ImageProps) {
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
    <img 
      src={src} 
      alt={alt} 
      className={className}
      style={{
        ...imgStyle,
        width: width,
        height: height
      }}
    />
  );
} 