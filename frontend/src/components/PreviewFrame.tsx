'use client';

import { useEffect, useRef, useState } from 'react';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';

interface PreviewFrameProps {
  html: string;
  css: string;
  className?: string; // Optional custom styling
  minimal?: boolean; // If true, hide chrome decoration
}

export default function PreviewFrame({ html, css, className, minimal = false }: PreviewFrameProps) {
  const { settings, isLoading } = useGlobalSettings();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Generate CSS Variables script to inject
  const generateVariablesCss = () => {
    if (!settings) return '';
    return `
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
      
      body {
        font-family: var(--font-body);
        margin: 0;
        padding: 0;
        min-height: 100vh;
        background-color: transparent;
      }
    `;
  };

  // Build the complete HTML document for the iframe
  const buildIframeContent = () => {
    const fontUrls = settings 
      ? `https://fonts.googleapis.com/css2?family=${settings.fontDisplay.replace(' ', '+')}:wght@400;700&family=${settings.fontBody.replace(' ', '+')}:wght@400;700&display=swap`
      : 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="${fontUrls}" rel="stylesheet">
          <style id="custom-block-vars">
            ${generateVariablesCss()}
          </style>
          <style id="custom-block-css">
            ${css}
          </style>
        </head>
        <body>
          <div id="root">${html}</div>
          
          <script>
            // Allow the parent window to update styles dynamically without reloading
            window.addEventListener('message', (event) => {
              if (event.data.type === 'UPDATE_VARS') {
                document.getElementById('custom-block-vars').textContent = event.data.css;
              } else if (event.data.type === 'UPDATE_CSS') {
                document.getElementById('custom-block-css').textContent = event.data.css;
              } else if (event.data.type === 'UPDATE_HTML') {
                document.getElementById('root').innerHTML = event.data.html;
              }
            });
          </script>
        </body>
      </html>
    `;
  };

  // Initially set the iframe source document
  useEffect(() => {
    if (iframeRef.current && !isLoading) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(buildIframeContent());
        doc.close();
        setIsIframeLoaded(true);
      }
    }
  }, [isLoading]); // Reload iframe base content only if loading state changes (initial load)

  // Dynamically update iframe via postMessage to avoid flickering on variable change
  useEffect(() => {
    if (iframeRef.current?.contentWindow && isIframeLoaded && settings) {
      iframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_VARS',
        css: generateVariablesCss()
      }, '*');
      
      // Also inject new font links if necessary
      const fontUrls = `https://fonts.googleapis.com/css2?family=${settings.fontDisplay.replace(' ', '+')}:wght@400;700&family=${settings.fontBody.replace(' ', '+')}:wght@400;700&display=swap`;
      iframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_FONTS',
        url: fontUrls
      }, '*');
    }
  }, [settings, isIframeLoaded]);

  // Update HTML/CSS dynamically
  useEffect(() => {
    if (iframeRef.current?.contentWindow && isIframeLoaded) {
      iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_HTML', html }, '*');
      iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_CSS', css }, '*');
    }
  }, [html, css, isIframeLoaded]);

  return (
    <div className={`flex-1 flex flex-col bg-zinc-950 overscroll-none h-full ${minimal ? 'p-0' : 'p-6'} ${className || ''}`}>
      {!minimal && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Sandbox Preview</h2>
          <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
             <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      )}
      
      <div className={`flex-1 overflow-hidden relative ${minimal ? '' : 'rounded-xl border border-zinc-800 bg-white shadow-2xl'}`}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100/50">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            title="Preview Sandbox"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
    </div>
  );
}
