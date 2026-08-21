import * as React from 'react';
import { ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';
import { logger } from '../utils/logger';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    logger.captureException(error, {
      componentStack: errorInfo.componentStack,
      type: 'react_error_boundary'
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 text-white font-sans">
          <div className="max-w-md w-full bg-[#121212] border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
            
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <AlertOctagon size={40} className="text-red-400" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-black tracking-tight">앗! 문제가 발생했습니다</h1>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                데이터를 불러오거나 화면을 그리는 중 오류가 발생했습니다.<br/>
                일시적인 현상일 수 있으니 새로고침을 시도해 주세요.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-bold text-sm transition-colors"
              >
                <RefreshCw size={16} /> 새로고침
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/80 text-white py-3 rounded-xl font-bold text-sm transition-colors"
              >
                <Home size={16} /> 메인으로
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
