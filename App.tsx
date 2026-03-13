import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Detail from './pages/Detail';
import CharacterDetail from './pages/CharacterDetail';
import LightConeDetail from './pages/LightConeDetail';
import RelicDetail from './pages/RelicDetail';
import OrnamentDetail from './pages/OrnamentDetail';
import TierList from './pages/TierList';
import PartyRecommendations from './pages/PartyRecommendations';
import Terminology from './pages/Terminology';
import CharacterGuideDetail from './pages/CharacterGuideDetail';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
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
      </Layout>
    </Router>
  );
};

export default App;