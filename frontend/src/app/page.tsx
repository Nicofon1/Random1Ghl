'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { BlockCard, BlockDetailModal } from '@/components/Library';
import { Plus, X } from 'lucide-react';
import * as api from '@/lib/api';

const demoBlocks: api.CustomBlock[] = [
  {
    id: 'demo-1',
    name: 'Pricing Tier Table',
    category: 'E-commerce',
    html: `<div class="card">
      <div class="icon">🚀</div>
      <h1 class="title">Standard Plan</h1>
      <p class="description">Perfect for small teams and individual designers.</p>
      <button class="btn">$29/mo - Subscribe</button>
    </div>`,
    css: `.card { background: white; border-radius: 12px; padding: 32px; margin: 0 auto; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; border: 1px solid #eaeaea; }
    .icon { font-size: var(--icon-size); color: var(--icon-color); margin-bottom: 16px; }
    .title { font-family: var(--font-display); font-size: 24px; color: var(--color-primary); margin-bottom: 12px; }
    .description { color: #666; font-family: var(--font-body); margin-bottom: 24px; }
    .btn { background: var(--color-accent); color: white; border: none; padding: 12px 24px; border-radius: 6px; font-family: var(--font-body); font-weight: 500; cursor: pointer; }`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-2',
    name: 'Hero Section Minimal',
    category: 'Header',
    html: `<div class="hero">
      <h1 class="title">Build your future with code.</h1>
      <p class="description">Scale faster with pre-made components design-system compliant.</p>
      <div class="actions">
        <button class="btn">Get Started</button>
      </div>
    </div>`,
    css: `.hero { text-align: center; padding: 80px 20px; background: #fafafa; border-radius: 16px; border: 1px solid #eee; }
    .title { font-family: var(--font-display); font-size: 48px; color: var(--color-primary); font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
    .description { font-family: var(--font-body); font-size: 18px; color: #555; max-width: 600px; margin: 0 auto 32px; }
    .btn { background: var(--color-primary); color: white; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-family: var(--font-body); border: none; cursor: pointer; }`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-3',
    name: 'Feature Integration List',
    category: 'Services',
    html: `<div class="features">
      <div class="item">✓ Automated Exports</div>
      <div class="item">✓ Global Styling Sync</div>
      <div class="item">✓ AI Code Extraction</div>
    </div>`,
    css: `.features { display: flex; flex-direction: column; gap: 12px; padding: 24px; background: white; border-radius: 12px; border: 1px solid #eee; }
    .item { font-family: var(--font-body); color: var(--color-secondary); font-weight: 600; font-size: 16px; display: flex; align-items: center; gap: 10px; }`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function Home() {
  const [blocks, setBlocks] = useState<api.CustomBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<api.CustomBlock | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

  // New Block Form State
  const [newBlock, setNewBlock] = useState({
    name: 'New Component',
    category: 'General',
    html: '<div class="new-block">Hello World</div>',
    css: '.new-block { padding: 20px; text-align: center; font-family: var(--font-body); color: var(--color-primary); }'
  });

  const allVisibleBlocks = [...demoBlocks, ...blocks];
  const categories = ['All', ...Array.from(new Set(allVisibleBlocks.map(b => b.category)))];

  const filteredBlocks = selectedCategory === 'All' 
    ? allVisibleBlocks 
    : allVisibleBlocks.filter(b => b.category === selectedCategory);

  const fetchBlocks = async () => {
    try {
      const data = await api.getBlocks();
      setBlocks(data);
    } catch (error) {
      console.error('Error fetching blocks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const handleCreateBlock = async () => {
    try {
      await api.createBlock(newBlock);
      setIsCreateModalOpen(false);
      setIsAddingNewCategory(false);
      fetchBlocks();
    } catch (error) {
      console.error('Error creating block:', error);
    }
  };

  const handleDeleteBlock = async (id: string) => {
    try {
      await api.deleteBlock(id);
      setSelectedBlock(null);
      fetchBlocks();
    } catch (error) {
      console.error('Error deleting block:', error);
    }
  };

  const handleUpdateCategory = async (id: string, newCategory: string) => {
    try {
      // In a real app, we'd have a specific patch endpoint.
      // For now, let's update local state or if the API supports PATCH:
      // await api.updateBlock(id, { category: newCategory });
      // Since I don't have updateBlock in api.ts yet, I'll add it or just refresh.
      
      // Let's check if the backend has updateBlock. Yes, it does. 
      // I need to add updateBlock to api.ts if not there.
      
      const response = await fetch(`http://localhost:3001/api/blocks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: newCategory }),
      });
      
      if (response.ok) {
        if (selectedBlock && selectedBlock.id === id) {
          setSelectedBlock({ ...selectedBlock, category: newCategory });
        }
        fetchBlocks();
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-black tracking-tight flex items-center gap-3 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              My Block Library
            </h1>
            <p className="text-zinc-500 mt-1">Manage and sync styles across your saved UI components.</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-2 px-5 rounded-lg shadow-xl shadow-violet-900/20 transition-all border border-white/10 active:scale-95"
            >
              <Plus size={18} />
              Create Block
            </button>
            <div className="relative">
               <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-xs font-bold text-white outline-none focus:border-violet-500 appearance-none pr-8 transition-all hover:bg-zinc-800"
               >
                 {categories.map(cat => (
                   <option key={cat} value={cat}>{cat}</option>
                 ))}
               </select>
               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>
            </div>
          </div>
        </div>

        {/* Library Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[300px] bg-zinc-900/50 rounded-xl animate-pulse border border-zinc-800" />
            ))
          ) : (
            <>
              {filteredBlocks.map((block) => (
                <BlockCard 
                  key={block.id} 
                  block={block} 
                  onClick={() => setSelectedBlock(block)}
                />
              ))}

              <div 
                onClick={() => setIsCreateModalOpen(true)}
                className="h-full min-h-[300px] border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 hover:border-zinc-700 hover:text-zinc-400 hover:bg-zinc-900/20 transition-all cursor-pointer group"
              >
                 <div className="p-4 rounded-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors mb-4 border border-zinc-800">
                   <Plus size={24} />
                 </div>
                 <span className="font-medium">Add New Component</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Simplified Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Create New Block</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase block mb-2 font-mono">Name</label>
                <input 
                  type="text" 
                  value={newBlock.name}
                  onChange={(e) => setNewBlock({...newBlock, name: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white outline-none focus:border-violet-500"
                />
              </div>
              <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase block mb-2 font-mono">Category</label>
                  <div className="flex gap-2">
                    {isAddingNewCategory ? (
                      <input 
                        type="text" 
                        autoFocus
                        placeholder="New category name..."
                        value={newBlock.category}
                        onChange={(e) => setNewBlock({...newBlock, category: e.target.value})}
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white outline-none focus:border-violet-500"
                      />
                    ) : (
                      <select 
                        value={newBlock.category}
                        onChange={(e) => setNewBlock({...newBlock, category: e.target.value})}
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white outline-none focus:border-violet-500 appearance-none"
                      >
                        {categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    )}
                    <button 
                      onClick={() => setIsAddingNewCategory(!isAddingNewCategory)}
                      className={`p-2.5 rounded-lg border flex items-center justify-center transition-all ${
                        isAddingNewCategory 
                          ? 'bg-violet-600 border-violet-500 text-white' 
                          : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                      }`}
                      title={isAddingNewCategory ? "Use existing category" : "Add new category"}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase block mb-2 font-mono">HTML Content</label>
                <textarea 
                  rows={3}
                  value={newBlock.html}
                  onChange={(e) => setNewBlock({...newBlock, html: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white outline-none focus:border-violet-500 font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase block mb-2 font-mono">CSS Content</label>
                <textarea 
                  rows={3}
                  value={newBlock.css}
                  onChange={(e) => setNewBlock({...newBlock, css: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white outline-none focus:border-violet-500 font-mono text-xs"
                />
              </div>
            </div>

            <button 
              onClick={handleCreateBlock}
              className="w-full mt-8 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-lg transition-all"
            >
              Save to Library
            </button>
          </div>
        </div>
      )}

      <BlockDetailModal 
        block={selectedBlock} 
        onClose={() => setSelectedBlock(null)} 
        onDelete={handleDeleteBlock}
        onUpdateCategory={handleUpdateCategory}
        availableCategories={categories.filter(c => c !== 'All')}
      />
    </DashboardLayout>
  );
}
