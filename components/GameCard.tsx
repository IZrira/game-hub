
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Game } from '../types';
import LazyImage from './LazyImage';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link 
      to={`/gallery/${game.id}`}
      className="group relative overflow-hidden rounded-2xl glass-card transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-primary/10"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <LazyImage 
          src={game.bannerImage} 
          alt={game.title}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold text-white mb-1">{game.title}</h3>
        <p className="text-brand-light/60 text-sm mb-4">{game.subTitle}</p>
        
        <div className="flex items-center gap-2 text-brand-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
          전체 공략 보기 <ChevronRight size={16} />
        </div>
      </div>
      
      <div className="absolute top-4 right-4 bg-brand-primary/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
        {game.posts.length} Posts
      </div>
    </Link>
  );
};

export default GameCard;
