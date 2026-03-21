'use client';

import React from 'react';
import PreviewFrame from '@/components/PreviewFrame';
import { Maximize2, ExternalLink, Copy, Trash2, Edit } from 'lucide-react';

interface Block {
  id: string;
  name: string;
  html: string;
  css: string;
  category: string;
}

interface BlockCardProps {
  block: Block;
  onClick: () => void;
}

export function BlockCard({ block, onClick }: BlockCardProps) {
  return (
    <div 
      className="group bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-900/10 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {/* Container with a fixed aspect ratio (16:9) */}
      <div className="aspect-video relative overflow-hidden bg-white/5 border-b border-zinc-800">
        <div className="absolute inset-0 pointer-events-none origin-top-left scale-[0.5] w-[200%] h-[200%]">
          <PreviewFrame 
            html={block.html} 
            css={block.css} 
            minimal={true}
            className="pointer-events-none"
          />
        </div>
        <div className="absolute inset-0 bg-transparent group-hover:bg-zinc-900/10 transition-colors z-10" />
      </div>
      
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{block.name}</h3>
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider font-mono">{block.category}</span>
        </div>
        <div className="flex gap-2">
           <button className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white border border-transparent hover:border-zinc-700">
             <Edit size={14} />
           </button>
           <button className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white border border-transparent hover:border-zinc-700">
             <Copy size={14} />
           </button>
        </div>
      </div>
    </div>
  );
}

interface BlockDetailModalProps {
  block: Block | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdateCategory: (id: string, newCategory: string) => void;
  availableCategories: string[];
}

export function BlockDetailModal({ 
  block, 
  onClose, 
  onDelete, 
  onUpdateCategory,
  availableCategories 
}: BlockDetailModalProps) {
  if (!block) return null;

  const isDemo = block.id.startsWith('demo-');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-6xl h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-3xl animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white">{block.name}</h2>
            <div className="h-5 w-[1px] bg-zinc-700" />
            <span className="text-xs bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded border border-violet-500/20 font-bold uppercase tracking-tight">
              {block.category}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <Maximize2 size={20} />
          </button>
        </div>

        {/* Content Panel Scrollable */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Preview */}
          <div className="flex-[2] bg-zinc-950/50 p-8 flex items-center justify-center overflow-hidden border-r border-zinc-800">
             <div className="w-full h-full max-w-2xl max-h-[600px] shadow-2xl rounded-lg overflow-hidden border border-zinc-700 bg-black">
                <PreviewFrame html={block.html} css={block.css} />
             </div>
          </div>

          {/* Right Controls Panel */}
          <div className="flex-1 p-8 flex flex-col gap-8 bg-zinc-900 overflow-y-auto">
            <section>
              <h3 className="text-xs uppercase font-bold text-zinc-500 tracking-widest mb-4">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 w-full bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
                   <Edit size={18} />
                   Open in AI Playground
                </button>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${block.html}\n<style>${block.css}</style>`);
                    }}
                    className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2.5 rounded-lg font-medium transition-colors border border-zinc-700 text-sm"
                  >
                    <Copy size={16} />
                    Copy Code
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2.5 rounded-lg font-medium transition-colors border border-zinc-700 text-sm">
                    <ExternalLink size={16} />
                    Raw Preview
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs uppercase font-bold text-zinc-500 tracking-widest mb-4">Instance Settings</h3>
              <div className="space-y-4">
                 <div>
                   <label className="text-[10px] text-zinc-400 block mb-1.5 uppercase font-mono tracking-tighter">Category</label>
                   <select 
                      disabled={isDemo}
                      value={block.category}
                      onChange={(e) => onUpdateCategory(block.id, e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2 px-3 text-sm focus:border-violet-500 outline-none disabled:opacity-50"
                   >
                      {availableCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                   </select>
                   {isDemo && <p className="text-[10px] text-zinc-500 mt-1 italic">Demo blocks cannot be modified.</p>}
                 </div>
                 <div>
                   <label className="text-[10px] text-zinc-400 block mb-1.5 uppercase font-mono tracking-tighter">Text Override</label>
                   <input 
                      type="text" 
                      defaultValue={block.name} 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2 px-3 text-sm focus:border-violet-500 outline-none" 
                   />
                 </div>
              </div>
            </section>

            <div className="mt-auto pt-8 border-t border-zinc-800 flex items-center justify-between">
               {!isDemo ? (
                 <button 
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this block?')) {
                      onDelete(block.id);
                    }
                  }}
                  className="text-red-400 hover:text-red-300 flex items-center gap-2 text-xs font-medium px-2 py-1 hover:bg-red-500/10 rounded-md transition-colors"
                 >
                    <Trash2 size={14} />
                    Delete Block
                 </button>
               ) : (
                 <span className="text-zinc-600 text-[10px] font-mono italic">Protected Demo Asset</span>
               )}
               <span className="text-zinc-600 text-[10px] font-mono">ID: {block.id.slice(0, 8)}...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
