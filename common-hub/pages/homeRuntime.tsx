import React from 'react';

let resolved: typeof import('./Home') | undefined;
let pending: Promise<typeof import('./Home')> | undefined;

export function preloadHome() {
  return pending ??= import('./Home').then(module => {
    resolved = module;
    return module;
  }).catch(error => {
    pending = undefined;
    throw error;
  });
}

export const isHomeReady = () => Boolean(resolved);
const LazyHome = React.lazy(preloadHome);

export default function HomePage() {
  const Component = resolved?.default ?? LazyHome;
  return <Component />;
}
