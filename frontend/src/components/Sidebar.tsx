import React, { useState } from 'react';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';
import { Copy, Check } from 'lucide-react';

const googleFonts = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Oswald', 'Raleway', 'Playfair Display'
];

export default function Sidebar() {
  const { settings, updateSettings, isLoading } = useGlobalSettings();
  const [copied, setCopied] = useState(false);

  if (isLoading || !settings) {
    return (
      <aside className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center justify-center p-6 text-zinc-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
        <p>Loading configuration...</p>
      </aside>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateSettings({ [name]: value });
  };

  const copyGlobalStyles = () => {
    const fontUrls = `https://fonts.googleapis.com/css2?family=${settings.fontDisplay.replace(' ', '+')}:wght@400;700&family=${settings.fontBody.replace(' ', '+')}:wght@400;700&display=swap`;
    
    const cssVars = `
<style id="ghl-global-vars">
  @import url('${fontUrls}');

  :root {
    --color-primary: ${settings.primaryColor};
    --color-secondary: ${settings.secondaryColor};
    --color-accent: ${settings.accentColor};
    --font-display: '${settings.fontDisplay}', sans-serif;
    --font-body: '${settings.fontBody}', sans-serif;
    --icon-size: ${settings.iconSize};
    --icon-weight: ${settings.iconWeight === 'bold' ? '700' : settings.iconWeight === 'light' ? '300' : '400'};
    --icon-color: ${settings.iconColor};
  }
</style>`.trim();

    navigator.clipboard.writeText(cssVars);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-80 h-full bg-zinc-900 border-r border-zinc-800 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 underline decoration-violet-500/30 underline-offset-8">
          Studio Canvas
        </h2>
        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-2">Design System Brain</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        {/* Colors */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-4 bg-violet-500 rounded-full" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Colors</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between group">
              <label className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">Primary</label>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-600">{settings.primaryColor}</span>
                <input
                  type="color"
                  name="primaryColor"
                  value={settings.primaryColor}
                  onChange={handleChange}
                  className="w-6 h-6 rounded-md cursor-pointer bg-zinc-800 border-none outline-none overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none shadow-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-between group">
              <label className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">Secondary</label>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-600">{settings.secondaryColor}</span>
                <input
                  type="color"
                  name="secondaryColor"
                  value={settings.secondaryColor}
                  onChange={handleChange}
                  className="w-6 h-6 rounded-md cursor-pointer bg-zinc-800 border-none py-[1px] px-[2px] outline-none overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none shadow-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-between group">
              <label className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">Accent</label>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-600">{settings.accentColor}</span>
                <input
                  type="color"
                  name="accentColor"
                  value={settings.accentColor}
                  onChange={handleChange}
                  className="w-6 h-6 rounded-md cursor-pointer bg-zinc-800 border-none outline-none overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-4 bg-indigo-500 rounded-full" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Typography</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400">Display Font</label>
              <select
                name="fontDisplay"
                value={settings.fontDisplay}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all font-medium"
              >
                {googleFonts.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400">Body Font</label>
              <select
                name="fontBody"
                value={settings.fontBody}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all font-medium"
              >
                {googleFonts.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Icons */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-4 bg-pink-500 rounded-full" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Icons</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400">Size</label>
              <select
                name="iconSize"
                value={settings.iconSize}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all"
              >
                <option value="16px">Small (16px)</option>
                <option value="20px">Medium (20px)</option>
                <option value="24px">Standard (24px)</option>
                <option value="32px">Large (32px)</option>
                <option value="48px">Extra Large (48px)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400">Weight</label>
              <select
                name="iconWeight"
                value={settings.iconWeight}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all"
              >
                <option value="light">Light</option>
                <option value="regular">Regular</option>
                <option value="bold">Bold</option>
                <option value="fill">Fill</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between group pt-1">
              <label className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">Icon Color</label>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-600">{settings.iconColor}</span>
                <input
                  type="color"
                  name="iconColor"
                  value={settings.iconColor}
                  onChange={handleChange}
                  className="w-6 h-6 rounded-md cursor-pointer bg-zinc-800 border-none outline-none overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="p-6 bg-zinc-950/50 border-t border-zinc-800">
        <button 
          onClick={copyGlobalStyles}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all border shadow-lg ${
            copied 
              ? 'bg-green-600 border-green-500 text-white' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-violet-500/50 hover:bg-zinc-800'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied to Clipboard!' : 'Copy Global CSS Variables'}
        </button>
        <p className="text-[9px] text-center text-zinc-600 mt-3 italic">
          Paste this on your GHL / Website header to link styles.
        </p>
      </div>
    </aside>
  );
}
