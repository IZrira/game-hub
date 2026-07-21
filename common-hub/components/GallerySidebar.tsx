
import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AdPlaceholder from './AdPlaceholder';
import { 
  Home as HomeIcon, 
  Users, 
  Zap, 
  Shield, 
  BookOpen, 
  Backpack, 
  Trophy,
  LayoutGrid,
  Bell,
  FileText
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNoticeBadge } from './NoticeComponents';
import { GLOBAL_NOTICES } from '../data/notices';
import { Notice } from '../data/types';

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  menuKey?: string;
}

interface GallerySidebarProps {
  activeMenu?: string;
  setActiveMenu?: (menu: string) => void;
}

const GallerySidebar: React.FC<GallerySidebarProps> = ({ activeMenu, setActiveMenu }) => {
  const { t } = useTranslation();
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { hasUnread } = useNoticeBadge();

  const gameNotices = GLOBAL_NOTICES.filter(n => n.gameId === gameId || n.gameId === 'common');
  const showNewBadge = hasUnread(gameNotices);

  const MAIN_NAVIGATION: SidebarItem[] = [
    { label: '홈', icon: <HomeIcon size={14} />, menuKey: '홈' },
    { label: '캐릭터', icon: <Users size={14} />, menuKey: '캐릭터' },
    { label: '광추', icon: <Zap size={14} />, menuKey: '광추' },
    { label: '유물 & 장신구', icon: <Shield size={14} />, menuKey: '유물 & 장신구' },
    { label: '공략', icon: <BookOpen size={14} />, menuKey: '공략' },
    { label: '블로그 / 칼럼', icon: <FileText size={14} />, path: gameId ? `/blog?game=${gameId}` : '/blog' },
    { label: '티어표', icon: <Trophy size={14} />, path: `/gallery/${gameId}/tierlist` },
    { label: '추천 파티 조합', icon: <LayoutGrid size={14} />, path: `/gallery/${gameId}/parties` },
    { label: '인벤토리', icon: <Backpack size={14} />, menuKey: '인벤토리' },
  ];

  const handleItemClick = (item: SidebarItem) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.menuKey) {
      // Use query parameter for menu selection
      // This allows direct navigation from other pages
      navigate(`/gallery/${gameId}?menu=${item.menuKey}`);
      if (setActiveMenu) {
        setActiveMenu(item.menuKey);
      }
    }
  };

  return (
    <aside className="space-y-12">
      <div className="sticky top-20 space-y-3">
        <h2 className="text-[11px] font-black text-gray-700 uppercase tracking-[0.4em] px-4 mb-4">MENU</h2>
        {MAIN_NAVIGATION.map(item => {
          let displayLabel = item.label;
          let menuKey = item.menuKey;
          
          if (gameId === 'ww') {
            if (displayLabel === '광추') {
              displayLabel = '무기';
              menuKey = '무기';
            }
            if (displayLabel === '유물 & 장신구') {
              displayLabel = '에코';
              menuKey = '에코';
            }
          }
          if (gameId === 'nte') {
            if (displayLabel === '광추') {
              displayLabel = '아크';
              menuKey = '아크';
            }
            if (displayLabel === '유물 & 장신구') {
              displayLabel = '콘솔';
              menuKey = '콘솔';
            }
          }

          const currentPath = window.location.pathname;
          const currentMenu = searchParams.get('menu') || activeMenu || '홈';
          
          const isActive = item.path 
            ? currentPath === item.path
            : (currentPath === `/gallery/${gameId}` && currentMenu === menuKey);

          return (
            <button
              key={item.label}
              onClick={() => handleItemClick({ ...item, menuKey })}
              className={`w-full flex items-center gap-5 px-5 py-4 rounded-2xl transition-all border ${
                isActive 
                  ? 'bg-brand-primary/10 text-brand-accent border-brand-primary/20' 
                  : 'text-gray-600 hover:bg-white/[0.05] border-transparent'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${isActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/50' : 'bg-white/5'}`}>
                {item.icon}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span className="text-[14px] font-black tracking-tight">{t(displayLabel)}</span>
                {item.label === '공지사항' && showNewBadge && (
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </div>
            </button>
          );
        })}
        
        <div className="pt-8">
          <AdPlaceholder type="skyscraper" />
        </div>
      </div>
    </aside>
  );
};

export default GallerySidebar;
