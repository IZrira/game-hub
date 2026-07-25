
import React from 'react';
import { useParams } from 'react-router';
import { ARCHIVE_DATA } from '../data/games';
import PageHeader from '../components/PageHeader';
import GameDashboard from '../components/GameDashboard';

const GameArchive: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const game = ARCHIVE_DATA.games.find(g => g.id === gameId);

  if (!game) return <div className="p-20 text-center">Game not found.</div>;

  return (
    <div className="min-h-screen pb-20 bg-[#0a0a0a]">
      {/* Page Header */}
      <PageHeader gameId={gameId} title={game.title} />

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <GameDashboard game={game} setActiveMenu={() => {}} />
      </div>
    </div>
  );
};

export default GameArchive;
