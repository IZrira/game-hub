import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  name: string;
  url: string;
}

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
  faqData?: Array<{ question: string; answer: string }>; // AEO를 위한 FAQ 스키마 데이터
  breadcrumbData?: BreadcrumbItem[]; // 검색엔진 경로 구조화를 위한 데이터
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
  itemType,
  faqData,
  breadcrumbData
}: SEOProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  const locale = currentLang === 'en' ? 'en_US' : 'ko_KR';
  
  const siteName = "RIRA ARCHIVE";
  const siteTitle = `${title} | ${siteName}`;
  const baseUrl = "https://rira-archive.com";
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  // 구글 검색 로봇 및 AI 크롤러에게 전달할 구조화 데이터 (JSON-LD)
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? "Article" : "WebPage",
    "name": name || title,
    "headline": name || title,
    "description": description,
    "image": image,
    "datePublished": "2024-05-01T00:00:00Z", // 사이트 개편 기준일
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "author": {
      "@type": "Organization",
      "name": "RIRA ARCHIVE",
      "url": "https://rira-archive.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RIRA ARCHIVE",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/common/default_banner.webp"
      }
    },
    "about": itemType || gameCategory ? {
      "@type": "Thing",
      "name": gameCategory,
      "description": itemType
    } : undefined
  };

  const schemas: any[] = [baseSchema];

  // AEO(Answer Engine Optimization)를 위한 FAQ 스키마 주입
  if (faqData && faqData.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  // 검색엔진 탐색 경로 최적화를 위한 Breadcrumb 스키마 주입
  if (breadcrumbData && breadcrumbData.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbData.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
      }))
    });
  }

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* 다국어 SEO (hreflang) 설정: 실제 언어 파라미터를 포함하여 개별 색인 유도 */}
      <link rel="alternate" hrefLang="ko" href={fullUrl.includes('?') ? `${fullUrl}&lng=ko` : `${fullUrl}?lng=ko`} />
      <link rel="alternate" hrefLang="en" href={fullUrl.includes('?') ? `${fullUrl}&lng=en` : `${fullUrl}?lng=en`} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />

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

      {/* 로봇 및 언어 설정: 대형 이미지 미리보기 및 충분한 스니펫 허용 */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta property="og:locale" content={locale} />
      
      {/* 업데이트 일자 표기 (네이버 최신성 점수 가산점용) */}
      <meta property="article:published_time" content={new Date().toISOString()} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* 구조화 데이터 주입 (AEO/SEO/Breadcrumb) */}
      <script type="application/ld+json">
        {JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)}
      </script>
    </Helmet>
  );
}
