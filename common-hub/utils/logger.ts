/**
 * @fileoverview Global Error Logging and Performance Monitoring System
 * Collects runtime errors, unhandled promise rejections, API failures,
 * and reports them to remote endpoints (e.g. Sentry / Logflare / Custom Webhook) with local buffering.
 */

export interface LogPayload {
  level: 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  stack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  context?: Record<string, any>;
}

class Logger {
  private isInitialized = false;
  private endpoint: string | null = null;
  private buffer: LogPayload[] = [];
  private maxBufferSize = 50;

  constructor() {
    if (typeof window !== 'undefined') {
      this.endpoint = (import.meta as any).env?.VITE_LOG_ENDPOINT || (import.meta as any).env?.VITE_SENTRY_DSN || null;
    }
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    // 1. Uncaught global JavaScript runtime errors
    window.onerror = (message, source, lineno, colno, error) => {
      this.captureException(error || new Error(String(message)), {
        source,
        lineno,
        colno,
        type: 'uncaught_error'
      });
      return false;
    };

    // 2. Unhandled Promise Rejections (e.g. async fetch / Supabase / Notion API errors)
    window.onunhandledrejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      this.captureException(
        reason instanceof Error ? reason : new Error(String(reason || 'Unhandled Promise Rejection')),
        { type: 'unhandled_rejection' }
      );
    };

    console.log('[RIRA Logger] Global runtime error monitor initialized.');
  }

  public captureException(error: Error | any, context?: Record<string, any>) {
    const payload: LogPayload = {
      level: 'error',
      message: error?.message || String(error),
      stack: error?.stack || undefined,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      context
    };

    this.send(payload);
  }

  public captureMessage(message: string, level: 'info' | 'warn' | 'error' = 'info', context?: Record<string, any>) {
    const payload: LogPayload = {
      level,
      message,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      context
    };

    this.send(payload);
  }

  private send(payload: LogPayload) {
    // 1. Always log locally in development with distinctive styling
    if (import.meta.env?.DEV || !this.endpoint) {
      if (payload.level === 'error' || payload.level === 'fatal') {
        console.error(`[RIRA Logger ERROR]`, payload);
      } else if (payload.level === 'warn') {
        console.warn(`[RIRA Logger WARN]`, payload);
      } else {
        console.info(`[RIRA Logger INFO]`, payload);
      }
    }

    // 2. Buffer logs
    this.buffer.push(payload);
    if (this.buffer.length > this.maxBufferSize) {
      this.buffer.shift();
    }

    // 3. Send to remote monitoring endpoint if configured
    if (this.endpoint && typeof navigator !== 'undefined') {
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon(this.endpoint, JSON.stringify(payload));
        } else {
          fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true
          }).catch(() => {
            // Silently ignore remote logging failures
          });
        }
      } catch (err) {
        // Fallback safely
      }
    }
  }

  public getRecentLogs(): LogPayload[] {
    return [...this.buffer];
  }
}

export const logger = new Logger();
