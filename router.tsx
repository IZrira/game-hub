import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

// 1. 페이지 지연 로딩 (Lazy Loading)
const Home = React.lazy(() => import('./pages/Home'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Detail = React.lazy(() => import('./pages/Detail'));
const CharacterDetail = React.lazy(() => import('./pages/CharacterDetail'));
const LightConeDetail = React.lazy(() => import('./pages/LightConeDetail'));
const RelicDetail = React.lazy(() => import('./pages/RelicDetail'));
const OrnamentDetail = React.lazy(() => import('./pages/OrnamentDetail'));
const TierList = React.lazy(() => import('./pages/TierList'));
const PartyRecommendations = React.lazy(() => import('./pages/PartyRecommendations'));
const Terminology = React.lazy(() => import('./pages/Terminology'));
const CharacterGuideDetail = React.lazy(() => import('./pages/CharacterGuideDetail'));

// 로딩 화면 폴백
const PageFallback = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
    <Loader2 size={40} className="text-brand-primary animate-spin" />
    <span className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Loading Archive...</span>
  </div>
);

// 2. 공통 레이아웃 래퍼 컴포넌트
const RootLayout = () => {
  return (
    <ErrorBoundary>
      {/* 💡 React Router v7 최신 기능: 페이지 이동 시 스크롤을 자동으로 맨 위로 올려줍니다 (기존 ScrollToTop 컴포넌트 대체) */}
      <ScrollRestoration />
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Outlet /> {/* 자식 라우트들이 이 자리에 렌더링됩니다 */}
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
};

// 3. 객체 배열 형태의 라우트 매핑 (Config-based)
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // 자식 라우트들을 배열로 깔끔하게 관리합니다.
    children: [
      { index: true, element: <Home /> }, // 최상위 경로 (/)
      { path: "gallery/:gameId", element: <Gallery /> },
      { path: "gallery/:gameId/post/:postId", element: <Detail /> },
      { path: "gallery/:gameId/character/:charName", element: <CharacterDetail /> },
      { path: "gallery/:gameId/lightcone/:lcName", element: <LightConeDetail /> },
      { path: "gallery/:gameId/relic/:relicName", element: <RelicDetail /> },
      { path: "gallery/:gameId/ornament/:ornamentName", element: <OrnamentDetail /> },
      { path: "gallery/:gameId/tierlist", element: <TierList /> },
      { path: "gallery/:gameId/parties", element: <PartyRecommendations /> },
      { path: "gallery/:gameId/terminology", element: <Terminology /> },
      { path: "gallery/:gameId/guide/:charName", element: <CharacterGuideDetail /> },
      
      // 404 Not Found 처리 (잘못된 주소로 왔을 때 Home으로 돌려보내기)
      { path: "*", element: <Home /> }
    ],
  },
]);
