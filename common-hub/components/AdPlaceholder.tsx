
import React from 'react';

interface AdPlaceholderProps {
  type: 'leaderboard' | 'rectangle' | 'skyscraper' | 'responsive';
  className?: string;
  slot?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, className = '', slot }) => {
  const getStyles = () => {
    switch (type) {
      case 'leaderboard':
        return 'w-full max-w-[728px] h-[90px]';
      case 'rectangle':
        return 'w-[300px] h-[250px] md:w-[336px] md:h-[280px]';
      case 'skyscraper':
        return 'w-[160px] h-[600px]';
      case 'responsive':
      default:
        return 'w-full min-h-[100px]';
    }
  };

  const getAdFormat = () => {
    switch (type) {
      case 'leaderboard':
        return 'horizontal';
      case 'rectangle':
        return 'rectangle';
      case 'skyscraper':
        return 'vertical';
      case 'responsive':
      default:
        return 'auto';
    }
  };

  const adRef = React.useRef<HTMLModElement>(null);
  const pushedRef = React.useRef(false);

  // In a real app, you would call (window.adsbygoogle = window.adsbygoogle || []).push({});
  // after the component mounts.
  React.useEffect(() => {
    if (pushedRef.current) return;

    const pushAd = () => {
      if (!adRef.current) return;
      
      // Check if the element already has an ad or is being processed
      const status = adRef.current.getAttribute('data-adsbygoogle-status');
      if (status === 'done' || status === 'processed') {
        pushedRef.current = true;
        return;
      }

      // Ensure the element is visible and has width to avoid "availableWidth=0" error
      if (adRef.current.offsetWidth > 0) {
        try {
          const clientId = adRef.current.getAttribute('data-ad-client');
          const slotId = adRef.current.getAttribute('data-ad-slot');
          if (!clientId || clientId.includes('YOUR_CLIENT_ID') || !slotId || slotId === 'YOUR_AD_SLOT_ID') {
            pushedRef.current = true;
            return;
          }

          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        } catch (e) {
          console.error('AdSense error:', e);
        }
      } else {
        // If no width yet, try again in the next frame
        requestAnimationFrame(pushAd);
      }
    };

    // Small delay to ensure layout is stable
    const timer = setTimeout(() => {
      requestAnimationFrame(pushAd);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex items-center justify-center bg-white/5 border border-dashed border-white/10 rounded-lg overflow-hidden my-8 mx-auto ${getStyles()} ${className}`}>
      <ins 
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-7014148671633305"
        data-ad-slot={slot || "YOUR_AD_SLOT_ID"}
        data-ad-format={getAdFormat()}
        data-full-width-responsive="true"
      ></ins>
      
      {/* Visual placeholder for development */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
        <div className="text-center p-4">
          <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] block mb-2">Advertisement</span>
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">
            AdSense Slot: {type}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
