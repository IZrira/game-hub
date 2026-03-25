
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Search, 
  User,
  Clock,
  LayoutGrid,
  LayoutList
} from 'lucide-react';
import { ARCHIVE_DATA } from '../data/games';
import PageHeader from '../components/PageHeader';
import AdPlaceholder from '../components/AdPlaceholder';

const List: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const game = ARCHIVE_DATA.games.find(g => g.id === gameId);
  if (!game) return <div className="p-20 text-center">Game not found.</div>;

  const categories = ['전체', ...new Set(game.posts.map(p => p.category))];

  const filteredPosts = game.posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pb-20 bg-[#0a0a0a]">
      {/* Page Header */}
      <PageHeader gameId={gameId} title={game.title} />

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="공략 검색 (제목, 키워드...)"
              className="w-full bg-brand-dark border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex bg-brand-dark p-1 rounded-xl border border-white/10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedCategory === cat 
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                    : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="h-8 w-px bg-white/10 hidden md:block" />

            <div className="flex bg-brand-dark p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                <LayoutList size={18} />
              </button>
            </div>
          </div>
        </div>

        <AdPlaceholder type="leaderboard" className="mb-12" />

        {/* Posts Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/archive/${gameId}/${post.id}`}
                className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-brand-primary/50 transition-all hover:-translate-y-1"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${post.id}/800/450`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-primary/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-brand-accent transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <div className="flex items-center gap-2">
                      <User size={12} className="text-brand-primary" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-brand-primary" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredPosts.map(post => (
              <Link
                key={post.id}
                to={`/archive/${gameId}/${post.id}`}
                className="group flex items-center gap-6 bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-brand-primary/50 transition-all"
              >
                <div className="w-48 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={`https://picsum.photos/seed/${post.id}/400/225`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex gap-2 mt-3">
                    {post.keywords.slice(0, 3).map(kw => (
                      <span key={kw} className="text-[10px] text-gray-500">#{kw}</span>
                    ))}
                  </div>
                </div>
                <div className="pr-4">
                  <ChevronRight className="text-gray-700 group-hover:text-brand-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-700" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500">다른 검색어나 카테고리를 선택해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
