import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

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

const PageFallback = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
    <Loader2 size={40} className="text-brand-primary animate-spin" />
    <span className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Loading Archive...</span>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery/:gameId" element={<Gallery />} />
              <Route path="/gallery/:gameId/post/:postId" element={<Detail />} />
              <Route path="/gallery/:gameId/character/:charName" element={<CharacterDetail />} />
              <Route path="/gallery/:gameId/lightcone/:lcName" element={<LightConeDetail />} />
              <Route path="/gallery/:gameId/relic/:relicName" element={<RelicDetail />} />
              <Route path="/gallery/:gameId/ornament/:ornamentName" element={<OrnamentDetail />} />
              <Route path="/gallery/:gameId/tierlist" element={<TierList />} />
              <Route path="/gallery/:gameId/parties" element={<PartyRecommendations />} />
              <Route path="/gallery/:gameId/terminology" element={<Terminology />} />
              <Route path="/gallery/:gameId/guide/:charName" element={<CharacterGuideDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
