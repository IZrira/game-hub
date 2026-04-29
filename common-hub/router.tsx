import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet, ScrollRestoration, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

// 1. 페이지 지연 로딩 (Lazy Loading)
const Home = React.lazy(() => import('./pages/Home'));
const GalleryHSR = React.lazy(() => import('../hsr-hub/pages/Gallery'));
const GalleryWW = React.lazy(() => import('../ww-hub/pages/Gallery'));
const Detail = React.lazy(() => import('./pages/Detail'));
const CharacterDetailHSR = React.lazy(() => import('../hsr-hub/pages/CharacterDetail'));
const CharacterDetailWW = React.lazy(() => import('../ww-hub/pages/CharacterDetail'));
const LightConeDetail = React.lazy(() => import('../hsr-hub/pages/LightConeDetail'));
const RelicDetail = React.lazy(() => import('../hsr-hub/pages/RelicDetail'));
const OrnamentDetail = React.lazy(() => import('../hsr-hub/pages/OrnamentDetail'));
const HSRTierList = React.lazy(() => import('../hsr-hub/pages/TierList'));
const HSRPartyRecommendations = React.lazy(() => import('../hsr-hub/pages/PartyRecommendations'));
const WWTierList = React.lazy(() => import('../ww-hub/pages/TierList'));
const WWPartyRecommendations = React.lazy(() => import('../ww-hub/pages/PartyRecommendations'));
const WuwaWeaponDetail = React.lazy(() => import('../ww-hub/pages/WuwaWeaponDetail'));
const Terminology = React.lazy(() => import('../hsr-hub/pages/Terminology'));
const CharacterGuideDetail = React.lazy(() => import('../hsr-hub/pages/CharacterGuideDetail'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

// Game Specific Page Dispatchers
const TierListDispatcher = () => {
  const { gameId } = useParams<{ gameId: string }>();
  if (gameId === 'ww') return <WWTierList />;
  return <HSRTierList />;
};

const PartyDispatcher = () => {
  const { gameId } = useParams<{ gameId: string }>();
  if (gameId === 'ww') return <WWPartyRecommendations />;
  return <HSRPartyRecommendations />;
};

const GalleryDispatcher = () => {
  const { gameId } = useParams<{ gameId: string }>();
  if (gameId === 'ww') return <GalleryWW />;
  return <GalleryHSR />;
};

const CharacterDetailDispatcher = () => {
  const { gameId } = useParams<{ gameId: string }>();
  if (gameId === 'ww') return <CharacterDetailWW />;
  return <CharacterDetailHSR />;
};

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
      {/* 💡 React Router v7 최신 기능: 페이지 이동 시 스크롤을 자동으로 맨 위로 올려줍니다.
          getKey를 pathname으로 설정하여 검색 파라미터(?search=)만 바뀔 때는 스크롤이 튀지 않도록 고정합니다. */}
      <ScrollRestoration 
        getKey={(location) => {
          return location.pathname;
        }} 
      />
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
      { path: "gallery/:gameId", element: <GalleryDispatcher /> },
      { path: "gallery/:gameId/post/:postId", element: <Detail /> },
      { path: "gallery/:gameId/character/:charName", element: <CharacterDetailDispatcher /> },
      { path: "gallery/:gameId/lightcone/:lcName", element: <LightConeDetail /> },
      { path: "gallery/:gameId/relic/:relicName", element: <RelicDetail /> },
      { path: "gallery/:gameId/ornament/:ornamentName", element: <OrnamentDetail /> },
      { path: "gallery/ww/weapon/:lcName", element: <WuwaWeaponDetail /> },
      { path: "gallery/:gameId/tierlist", element: <TierListDispatcher /> },
      { path: "gallery/:gameId/parties", element: <PartyDispatcher /> },
      { path: "gallery/:gameId/terminology", element: <Terminology /> },
      { path: "gallery/:gameId/character/:charName/guide", element: <CharacterGuideDetail /> },
      { path: "admin", element: <AdminDashboard /> },
      
      // 404 Not Found 처리 (잘못된 주소로 왔을 때 Home으로 돌려보내기)
      { path: "*", element: <Home /> }
    ],
  },
]);
