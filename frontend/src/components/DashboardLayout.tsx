'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { LayoutGrid, Layout, BrainCircuit, Search } from 'lucide-react';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';

type ActiveSection = 'library' | 'icons' | 'extractor';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState<ActiveSection>('library');
  const { settings } = useGlobalSettings();

  const navItems = [
    { id: 'library', label: 'Library', icon: LayoutGrid },
    { id: 'icons', label: 'Icon Studio', icon: Layout },
    { id: 'extractor', label: 'AI Extractor', icon: BrainCircuit },
  ];

  return (
    <div 
      className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden"
      style={{ '--app-primary': settings?.primaryColor || '#7c3aed' } as React.CSSProperties}
    >
      {/* Global Sidebar (Design Variables) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-8 flex-shrink-0">
          <nav className="flex gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as ActiveSection)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-violet-400 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search blocks..."
                className="bg-zinc-950 border border-zinc-800 rounded-full py-1.5 pl-10 pr-4 text-xs outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 w-64 transition-all"
              />
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center border border-white/10 text-white font-bold text-xs">
              NS
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {activeSection === 'library' && children}
          {activeSection === 'icons' && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500">
              <Layout size={48} className="mb-4 opacity-20" />
              <h2 className="text-xl font-medium text-zinc-300">Icon Studio</h2>
              <p className="max-w-md text-center mt-2">Specialized section for Material Symbols configuration. Coming soon.</p>
            </div>
          )}
          {activeSection === 'extractor' && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500">
              <BrainCircuit size={48} className="mb-4 opacity-20" />
              <h2 className="text-xl font-medium text-zinc-300">AI Extractor</h2>
              <p className="max-w-md text-center mt-2">Clean up and adapt messy code using Gemini. Coming soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
