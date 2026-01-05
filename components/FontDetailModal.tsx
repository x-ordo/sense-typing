
import React from 'react';
import { Font } from '../types';
import { ICONS } from '../constants';

interface FontDetailModalProps {
  font: Font;
  onClose: () => void;
  previewText: string;
}

const FontDetailModal: React.FC<FontDetailModalProps> = ({ font, onClose, previewText }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-8 duration-300 scrollbar-hide">
        <div className="relative h-64 bg-gray-50 flex items-center justify-center border-b border-gray-100 p-8">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="text-center w-full">
            <h2 
              style={{ fontFamily: font.fontFamily }} 
              className="text-6xl text-gray-900 leading-tight mb-4 px-12"
            >
              {previewText || font.name}
            </h2>
            <p className="text-gray-400 font-medium">{font.name} Regular</p>
          </div>
        </div>

        <div className="p-12">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Description</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{font.description}</p>
              </section>

              <section>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">License Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Commercial Use', status: font.license.commercial },
                    { label: 'Print/Pub', status: font.license.print },
                    { label: 'Web Embed', status: font.license.web },
                    { label: 'Video/Broad', status: font.license.video },
                    { label: 'Embedding', status: font.license.embedding },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${item.status ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                      <span className={`text-sm font-bold ${item.status ? 'text-green-700' : 'text-gray-400'}`}>{item.label}</span>
                      <span className={`text-xs font-black uppercase px-2 py-1 rounded ${item.status ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        {item.status ? 'Yes' : 'No'}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="bg-gray-50 p-6 rounded-[24px]">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">About Font</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Designer</p>
                    <p className="text-sm font-bold text-gray-900">{font.creator}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Category</p>
                    <p className="text-sm font-bold text-gray-900">{font.category}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Price</p>
                    <p className="text-sm font-bold text-green-600">{typeof font.price === 'number' ? `₩${font.price.toLocaleString()}` : 'Free'}</p>
                  </div>
                </div>
              </section>

              <button 
                onClick={() => window.open(font.sourceUrl, '_blank')}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100"
              >
                <ICONS.Download />
                Get Font File
              </button>
              
              <div className="flex flex-wrap gap-2">
                {font.emotions.map(emo => (
                   <span key={emo} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">#{emo}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontDetailModal;
