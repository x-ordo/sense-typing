
import React, { useState } from 'react';
import { analyzeDesignSystem } from '../services/geminiService';
import { DesignSystemAnalysis } from '../types';
import { ICONS } from '../constants';

interface DesignSystemModalProps {
  onAnalysisComplete: (result: DesignSystemAnalysis) => void;
}

const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ onAnalysisComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeDesignSystem(input);
      onAnalysisComplete(result);
      setIsOpen(false);
    } catch (error) {
      console.error("Design System Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-200 font-bold rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all active:scale-95"
      >
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        Design System Consultant
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-900 p-8 text-white relative">
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                Design System Consultant
              </h2>
              <p className="mt-2 text-gray-400 text-sm">Paste a GitHub URL or describe your project to get expert recommendations.</p>
            </div>
            
            <div className="p-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Input</label>
              <textarea 
                className="w-full h-40 p-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-gray-700 bg-gray-50 placeholder:text-gray-400"
                placeholder="e.g. https://github.com/facebook/react or 'A fintech app for crypto trading with heavy data visualization...'"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              
              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-4 text-gray-500 font-semibold hover:bg-gray-50 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={isAnalyzing}
                  onClick={handleAnalyze}
                  className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:bg-gray-300"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>Get Expert Advice</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignSystemModal;
