/** Retire the old root worker without registering a replacement or reloading tabs. */
export const retireServiceWorker = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) return;
  const registrations = await navigator.serviceWorker.getRegistrations();
  const rootScope = new URL('/', window.location.origin).href;
  await Promise.all(registrations.filter(registration => registration.scope === rootScope)
    .map(registration => registration.unregister()));
};
