import { useEffect, useState } from 'react';

/** A selected hashed resource only; route changes hide stale data immediately. */
export function useHsrRuntime<T>(url: string | undefined, validate: (value: T) => boolean) {
  const [loaded, setLoaded] = useState<{ url: string; value: T }>();
  const [failedUrl, setFailedUrl] = useState<string>();
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    setFailedUrl(undefined);
    void fetch(url, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error(`HSR data request failed: ${response.status}`);
      return response.json() as Promise<T>;
    }).then(value => {
      if (!validate(value)) throw new Error('Invalid HSR data response');
      if (!controller.signal.aborted) setLoaded({ url, value });
    }).catch(() => {
      if (!controller.signal.aborted) setFailedUrl(url);
    });
    return () => controller.abort();
  }, [url, attempt, validate]);
  return {
    data: loaded?.url === url ? loaded?.value : undefined,
    failed: Boolean(url && failedUrl === url),
    retry: () => { setFailedUrl(undefined); setAttempt(value => value + 1); }
  };
}
