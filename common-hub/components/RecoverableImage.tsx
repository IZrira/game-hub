import React, { useEffect, useRef, useState } from 'react';
import { repositoryImageCandidates } from '../utils/imageSources';

/** Retry the same public asset through a bounded provider chain, never another item. */
export function imageCandidates(src: string): string[] {
  return repositoryImageCandidates(src);
}

function ImageAttempt({ src, onLoad, onError, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  const [attempt, setAttempt] = useState(0);
  const [loadedAttempt, setLoadedAttempt] = useState(-1);
  const [active, setActive] = useState(props.loading !== 'lazy');
  const imageRef = useRef<HTMLImageElement>(null);
  const candidates = imageCandidates(src);
  useEffect(() => {
    if (active) return;
    if (!('IntersectionObserver' in window)) { setActive(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setActive(true); observer.disconnect(); }
    }, { rootMargin: '200px' });
    if (imageRef.current) observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, [active, attempt]);
  useEffect(() => {
    if (!active || loadedAttempt === attempt || attempt === candidates.length - 1) return;
    const timer = window.setTimeout(() => setAttempt(current => current === attempt ? current + 1 : current), 8000);
    return () => window.clearTimeout(timer);
  }, [active, loadedAttempt, attempt, candidates.length]);
  return <img key={attempt} ref={imageRef} {...props} src={candidates[attempt]} onLoad={event => {
    setLoadedAttempt(attempt);
    onLoad?.(event);
  }} onError={event => {
    if (attempt < candidates.length - 1) setAttempt(current => current === attempt ? current + 1 : current);
    else onError?.(event);
  }} />;
}

export default function RecoverableImage(props: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  return <ImageAttempt key={props.src} {...props} />;
}
