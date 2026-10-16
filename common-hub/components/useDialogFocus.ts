import { useEffect, type RefObject } from 'react';

/** Keep keyboard and programmatic focus inside a mounted modal. */
export function useDialogFocus(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const dialog = ref.current;
    if (!enabled || !dialog) return;
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
    )).filter(element => !element.hidden && !element.closest('[hidden], [inert]') && getComputedStyle(element).display !== 'none' && getComputedStyle(element).visibility !== 'hidden');
    const focusInitial = () => (dialog.querySelector<HTMLElement>('[data-dialog-autofocus]') || focusable()[0] || dialog).focus();
    focusInitial();
    const onFocus = (event: FocusEvent) => {
      if (!dialog.contains(event.target as Node)) focusInitial();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first) { event.preventDefault(); dialog.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || !items.includes(document.activeElement as HTMLElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !items.includes(document.activeElement as HTMLElement))) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener('focusin', onFocus);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('keydown', onKey);
    };
  }, [enabled, ref]);
}
