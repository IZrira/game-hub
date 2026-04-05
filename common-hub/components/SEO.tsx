import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  name?: string;
  image?: string;
  url?: string;
  keywords?: string;
  type?: 'website' | 'article';
  gameCategory?: string;  // 게임 구분 (명조, 붕스 등)
  itemType?: string;      // 아이템 종류 (직검, 파멸, 유물 등)
}

export default function SEO({ 
  title, 
  description = "완벽한 플레이를 위한 데이터의 정점. 리라 아카이브에서 최신 메타와 공략을 확인하세요.", 
  name,
  image = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/common/default_banner.webp",
  url = "",
  keywords = "리라 아카이브, 붕괴 스타레일, 명조, 게임 공략, 티어표, 위키",
  type = 'website',
  gameCategory,
  itemType
}: SEOProps) {
  
  const siteName = "RIRA ARCHIVE";
  const siteTitle = `${title} | ${siteName}`;
  const baseUrl = "https://rira-archive.com";
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  // 구글 검색 로봇에게 전달할 구조화 데이터 (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GameContent",
    "name": name || title,
    "description": description,
    "image": image,
    "genre": "Open World RPG",
    "gameItem": itemType || gameCategory ? {
      "@type": "Thing",
      "name": name || title,
      "category": itemType,
      "game": gameCategory
    } : undefined,
    "author": { "@type": "Person", "name": "Rira" }
  };

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      {/* 가이드 권장 사이즈 및 포맷 명시 */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />

      {/* 로봇 및 언어 설정 */}
      <meta name="robots" content="index, follow" />
      <meta property="og:locale" content="ko_KR" />
      
      {/* 업데이트 일자 표기 (네이버 최신성 점수 가산점용) */}
      <meta property="article:published_time" content={new Date().toISOString()} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* 구조화 데이터 주입 */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
