// src/components/ErrorBoundary.tsx
'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-12 text-center bg-white rounded-[3rem] border-2 border-zinc-100 shadow-xl">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4">System Anomaly Detected</h2>
          <p className="text-zinc-400 text-sm max-w-sm mb-10 font-medium">
            예상치 못한 기술적 결함이 발생했습니다. 폰트 인텔리전스 엔진을 재가동해 주세요.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-lg"
          >
            <RefreshCcw className="w-4 h-4" /> Restart Engine
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
