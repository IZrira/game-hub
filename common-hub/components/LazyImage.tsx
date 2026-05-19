import React, { useState, memo } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string; 
  fallbackSrc?: string; 
  containerClassName?: string; 
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

const LazyImage = memo(({ 
  src, 
  alt, 
  fallbackSrc = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main/hsr%20images/items/unknown.webp',
  containerClassName = '',
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  ...props 
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* 뼈대(Skeleton) 애니메이션: 이미지가 로딩 전일 때만 보임 */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-inherit" />
      )}

      {/* 실제 이미지 */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async" // 비동기 디코딩으로 성능 향상
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true); // 에러가 나도 스켈레톤은 꺼줌
        }}
        className={`
          transition-opacity duration-500 ease-in-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'} 
          ${className}
        `}
        {...props}
      />
    </div>
  );
});

export default LazyImage;
