import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet, ScrollRestoration, useParams } from 'react-router';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

// 1. 페이지 지연 로딩 (Lazy Loading)
const Home = React.lazy(() => import('./pages/Home'));
const GalleryHSR = React.lazy(() => import('../hsr-hub/pages/Gallery'));
const GalleryWW = React.lazy(() => import('../ww-hub/pages/Gallery'));
const GalleryNTE = React.lazy(() => import('../nte-hub/pages/Gallery'));
const Detail = React.lazy(() => import('./pages/Detail'));
const CharacterDetailHSR = React.lazy(() => import('../hsr-hub/pages/CharacterDetail'));
const CharacterDetailWW = React.lazy(() => import('../ww-hub/pages/CharacterDetail'));
const CharacterDetailNTE = React.lazy(() => import('../nte-hub/pages/CharacterDetail'));
const LightConeDetail = React.lazy(() => import('../hsr-hub/pages/LightConeDetail'));
const RelicDetail = React.lazy(() => import('../hsr-hub/pages/RelicDetail'));
const OrnamentDetail = React.lazy(() => import('../hsr-hub/pages/OrnamentDetail'));
const HSRTierList = React.lazy(() => import('../hsr-hub/pages/TierList'));
const HSRPartyRecommendations = React.lazy(() => import('../hsr-hub/pages/PartyRecommendations'));
const WWTierList = React.lazy(() => import('../ww-hub/pages/TierList'));
const NTETierList = React.lazy(() => import('../nte-hub/pages/TierList'));
const WWPartyRecommendations = React.lazy(() => import('../ww-hub/pages/PartyRecommendations'));
const NTEPartyRecommendations = React.lazy(() => import('../nte-hub/pages/PartyRecommendations'));
const WuwaWeaponDetail = React.lazy(() => import('../ww-hub/pages/WuwaWeaponDetail'));
const NTEArcDetail = React.lazy(() => import('../nte-hub/pages/NTEArcDetail'));
const Terminology = React.lazy(() => import('../hsr-hub/pages/Terminology'));
const CharacterGuideDetailHSR = React.lazy(() => import('../hsr-hub/pages/CharacterGuideDetail'));
const CharacterGuideDetailWW = React.lazy(() => import('../ww-hub/pages/WuwaCharacterGuideDetail'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const WuwaEchoDetail = React.lazy(() => import('../ww-hub/pages/WuwaEchoDetail'));
const ItemDetailDispatcher = React.lazy(() => import('./pages/ItemDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// 새로 추가된 정책 및 블로그 페이지
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const BlogList = React.lazy(() => import('./pages/BlogList'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Notices = React.lazy(() => import('./pages/Notices'));
const NoticeDetail = React.lazy(() => import('./pages/NoticeDetail'));

// Game Specific Page Dispatchers
const TierListDispatcher = () => {
  const { gameId } = useParams<{ gameId: string }>();
  if (gameId === 'ww') return <WWTierList />;
  if (gameId === 'nte') return <NTETierList />;
  return <HSRTierList />;
};

const PartyDispatcher = () => {
  const { gameId } = useParams<{ gameId: string }>();
  if (gameId === 'ww') return <WWPartyRecommendations />;
  if (gameId === 'nte') return <NTEPartyRecommendations />;
  return <HSRPartyRecommendations />;
};

const GalleryDispatcher = () => {
  const { gameId } = useParams<{ gameId: string }>();
  if (gameId === 'ww') return <GalleryWW />;
  if (gameId === 'nte') return <GalleryNTE />;
  return <GalleryHSR />;
};

const CharacterDetailDispatcher = () => {
  const { gameId } = useParams<{ gameId: string }>();
  if (gameId === 'ww') return <CharacterDetailWW />;
  if (gameId === 'nte') return <CharacterDetailNTE />;
  return <CharacterDetailHSR />;
};

const CharacterGuideDispatcher = () => {
  const { gameId } = useParams<{ gameId: string }>();
  if (gameId === 'ww') return <CharacterGuideDetailWW />;
  return <CharacterGuideDetailHSR />;
};

// 로딩 화면 폴백
const PageFallback = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
    <Loader2 size={40} className="text-brand-primary animate-spin" />
    <span className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Loading Archive...</span>
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
      { path: "gallery/nte/weapon/:lcName", element: <NTEArcDetail /> },
      { path: "gallery/nte/arc/:lcName", element: <NTEArcDetail /> },
      { path: "gallery/:gameId/echo/:echoName", element: <WuwaEchoDetail /> },
      { path: "gallery/:gameId/item/:itemName", element: <ItemDetailDispatcher /> },
      { path: "gallery/:gameId/tierlist", element: <TierListDispatcher /> },
      { path: "gallery/:gameId/parties", element: <PartyDispatcher /> },
      { path: "gallery/:gameId/terminology", element: <Terminology /> },
      { path: "gallery/:gameId/character/:charName/guide", element: <CharacterGuideDispatcher /> },
      { path: "admin", element: <AdminDashboard /> },
      
      // 애드센스 승인 대비 정책 및 정보성 라우트
      { path: "about", element: <AboutUs /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "tos", element: <TermsOfService /> },
      { path: "contact", element: <ContactUs /> },
      { path: "blog", element: <BlogList /> },
      { path: "blog/:id", element: <BlogPost /> },
      { path: "notices", element: <Notices /> },
      { path: "notices/:id", element: <NoticeDetail /> },
      
      // 404 Not Found 처리 (존재하지 않는 페이지 접근 시)
      { path: "*", element: <NotFound /> }
    ],
  },
]);
