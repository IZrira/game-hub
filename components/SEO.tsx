import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
}

export default function SEO({ 
  title, 
  description = "완벽한 플레이를 위한 데이터의 정점. 리라 아카이브에서 최신 메타와 공략을 확인하세요.", 
  image = "https://raw.githubusercontent.com/IZrira/riragameinfo/main/hsr%20images/common/default_banner.webp",
  url = "https://rira-archive.com",
  keywords = "리라 아카이브, 붕괴 스타레일, 명조, 게임 공략, 티어표, 위키" 
}: SEOProps) {
  
  const siteTitle = `${title} | RIRA ARCHIVE`;

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
