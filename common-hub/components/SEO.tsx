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
  noindex?: boolean;      // 검색 노출 차단 옵션 (관리자 페이지 등 전용)
  publishedTime?: string; // 콘텐츠 발행일 (ISO 포맷 또는 YYYY-MM-DD)
  modifiedTime?: string;  // 콘텐츠 최종 수정일 (ISO 포맷 또는 YYYY-MM-DD)
  isHomepage?: boolean;   // 홈페이지 여부
  carouselData?: Array<{ name: string; url: string; position: number }>; // 캐러셀 목록 데이터
  googleVerification?: string; // 구글 서치콘솔 인증 토큰
}

export default function SEO({ 
  title, 
  description = "붕괴: 스타레일, 명조, 이환, 애니모의 도감·능력치·티어표·공략을 확인하는 통합 게임 데이터베이스입니다.",
  name,
  image = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/common/default_banner.webp",
  url = "",
  keywords = "리라 아카이브, 붕괴 스타레일, 명조, 이환, 애니모, Aniimo, 애니모 도감, 게임 공략, 티어표, 위키",
  type = 'website',
  gameCategory,
  itemType,
  faqData,
  breadcrumbData,
  noindex = false,
  publishedTime,
  modifiedTime,
  isHomepage = false,
  carouselData,
  googleVerification
}: SEOProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  const locale = currentLang === 'en' ? 'en_US' : 'ko_KR';
  
  const siteName = "RIRA ARCHIVE";
  const siteTitle = `${title} | ${siteName}`;
  const baseUrl = "https://riragamehub.com";
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  // 쿼리 매개변수를 사전순으로 정렬하고 lng 파라미터를 정제하며 후행 슬래시를 정규화하는 헬퍼 함수
  const getSortedUrl = (rawUrl: string, targetLang?: string) => {
    try {
      const isAbsolute = rawUrl.startsWith('http');
      const dummyBase = "https://dummy-url-for-parsing.com";
      const urlObj = new URL(rawUrl, isAbsolute ? undefined : dummyBase);
      
      // 트레일링 슬래시 정규화 (루트 / 제외하고 끝의 슬래시 제거하여 중복 URL 방지)
      if (urlObj.pathname.length > 1 && urlObj.pathname.endsWith('/')) {
        urlObj.pathname = urlObj.pathname.slice(0, -1);
      }

      // lng는 canonical/alternate를 위해 동적으로 제어하므로 일단 제거
      urlObj.searchParams.delete('lng');
      
      // 다국어 버전의 경우에만 lng 파라미터 부여
      if (targetLang && targetLang !== 'ko') {
        urlObj.searchParams.set('lng', targetLang);
      }
      
      // 쿼리 파라미터를 사전 순으로 정렬하여 일관성 강제
      urlObj.searchParams.sort();
      
      if (isAbsolute) {
        return urlObj.toString();
      } else {
        const searchStr = urlObj.searchParams.toString();
        return urlObj.pathname + (searchStr ? `?${searchStr}` : '') + urlObj.hash;
      }
    } catch (e) {
      return rawUrl;
    }
  };

  // 표준(Canonical) URL은 언어 쿼리나 후행 슬래시 없는 단일 정규 URL을 가리켜 색인 분산/중복을 차단합니다.
  const canonicalUrl = getSortedUrl(fullUrl);
  const alternateKo = getSortedUrl(fullUrl, 'ko');
  const alternateEn = getSortedUrl(fullUrl, 'en');
  const alternateDefault = getSortedUrl(fullUrl);

  const schemas: any[] = [];

  if (isHomepage) {
    // 1. 홈페이지일 경우 WebSite 구조화 데이터 주입 (사이트 이름 및 사이트링크 검색창)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "RIRA ARCHIVE",
      "alternateName": ["리라 아카이브", "Rira Archive"],
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/gallery/hsr?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    });
  } else {
    // 2. 일반 페이지일 경우 기존 baseSchema (Article 또는 WebPage) 적용
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type === 'article' ? "Article" : "WebPage",
      "name": name || title,
      "headline": name || title,
      "description": description,
      "image": image,
      "datePublished": publishedTime || "2024-05-01T00:00:00Z",
      "dateModified": modifiedTime || publishedTime || "2024-05-01T00:00:00Z",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "author": {
        "@type": "Organization",
        "name": "RIRA ARCHIVE",
        "url": "https://riragamehub.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "RIRA ARCHIVE",
        "url": "https://riragamehub.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://riragamehub.com/logo192.png"
        },
        "sameAs": [
          "https://github.com/IZrira/game-hub"
        ]
      },
      "about": itemType || gameCategory ? {
        "@type": "Thing",
        "name": gameCategory,
        "description": itemType
      } : undefined
    };
    schemas.push(baseSchema);
  }

  // 4. 리스트 캐러셀 노출을 위한 ItemList 구조화 데이터 주입
  if (carouselData && carouselData.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": carouselData.map((item) => ({
        "@type": "ListItem",
        "position": item.position,
        "name": item.name,
        "url": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
      }))
    });
  }

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

  // 관리자 페이지 등 인덱싱 원천 차단 시 단순 noindex 태그만 삽입
  if (noindex) {
    return (
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    );
  }

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      {googleVerification && <meta name="google-site-verification" content={googleVerification} />}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* 다국어 SEO (hreflang) 설정 */}
      <link rel="alternate" hrefLang="ko" href={alternateKo} />
      <link rel="alternate" hrefLang="en" href={alternateEn} />
      <link rel="alternate" hrefLang="x-default" href={alternateDefault} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />

      {/* 로봇 및 언어 설정 */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta property="og:locale" content={locale} />
      
      {/* 업데이트 일자 표기 */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
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
