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
  ratingValue?: number;   // 평점 별점 노출용 값 (예: 4.0, 5.0 등)
  reviewCount?: number;   // 평점 리뷰 수
  carouselData?: Array<{ name: string; url: string; position: number }>; // 캐러셀 목록 데이터
  googleVerification?: string; // 구글 서치콘솔 인증 토큰
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
  breadcrumbData,
  noindex = false,
  publishedTime,
  modifiedTime,
  isHomepage = false,
  ratingValue,
  reviewCount,
  carouselData,
  googleVerification
}: SEOProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  const locale = currentLang === 'en' ? 'en_US' : 'ko_KR';
  
  const siteName = "RIRA ARCHIVE";
  const siteTitle = `${title} | ${siteName}`;
  const baseUrl = "https://rira-game-hub.pages.dev";
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  // 쿼리 매개변수를 사전순으로 정렬하고 lng 파라미터를 강제/정제하는 헬퍼 함수
  const getSortedUrl = (rawUrl: string, targetLang?: string) => {
    try {
      const isAbsolute = rawUrl.startsWith('http');
      const dummyBase = "https://dummy-url-for-parsing.com";
      const urlObj = new URL(rawUrl, isAbsolute ? undefined : dummyBase);
      
      // lng는 canonical/alternate를 위해 동적으로 제어하므로 일단 제거
      urlObj.searchParams.delete('lng');
      
      // 한국어(기본값)일 경우 파라미터를 추가하지 않고 클린 URL을 사용하도록 수정
      if (targetLang && targetLang !== 'ko') {
        urlObj.searchParams.set('lng', targetLang);
      }
      
      // 쿼리 파라미터를 사전 순으로 정렬하여 일관성 강제
      urlObj.searchParams.sort();
      
      if (isAbsolute) {
        return urlObj.toString();
      } else {
        // 상대 경로일 경우 파싱용 더미 베이스 제거하여 원본 양식 보존
        return urlObj.pathname + urlObj.search + urlObj.hash;
      }
    } catch (e) {
      return rawUrl;
    }
  };

  const canonicalUrl = getSortedUrl(fullUrl, currentLang);
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
      "datePublished": publishedTime || "2024-05-01T00:00:00Z", // 사이트 개편 기준일
      "dateModified": modifiedTime || publishedTime || "2024-05-01T00:00:00Z", // 실제 수정일이 없으면 매번 바뀌는 현재 시간 대신 안정된 기준일 사용
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "author": {
        "@type": "Organization",
        "name": "RIRA ARCHIVE",
        "url": "https://rira-game-hub.pages.dev"
      },
      "publisher": {
        "@type": "Organization",
        "name": "RIRA ARCHIVE",
        "url": "https://rira-game-hub.pages.dev",
        "logo": {
          "@type": "ImageObject",
          "url": "https://rira-game-hub.pages.dev/logo192.png"
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

  // 3. 평점 별점 노출을 위한 Product 구조화 데이터 주입
  if (ratingValue !== undefined) {
    const cleanRating = ratingValue.toFixed(1);
    const count = reviewCount || 1;
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": name || title,
      "image": image,
      "description": description,
      "brand": {
        "@type": "Brand",
        "name": "RIRA ARCHIVE"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": cleanRating,
        "bestRating": "5.0",
        "worstRating": "1.0",
        "ratingCount": count
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "KRW",
        "availability": "https://schema.org/InStock",
        "url": canonicalUrl
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": cleanRating,
          "bestRating": "5.0"
        },
        "author": {
          "@type": "Organization",
          "name": "RIRA ARCHIVE"
        },
        "reviewBody": `${name || title} - ${description}`
      }
    });
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

      {/* 다국어 SEO (hreflang) 설정: 실제 언어 파라미터를 포함하여 개별 색인 유도 */}
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
      {/* 가이드 권장 사이즈 및 포맷 명시 */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />

      {/* 로봇 및 언어 설정: 대형 이미지 미리보기 및 충분한 스니펫 허용 */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta property="og:locale" content={locale} />
      
      {/* 업데이트 일자 표기 (구글/네이버 최신성 가산점용) */}
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
