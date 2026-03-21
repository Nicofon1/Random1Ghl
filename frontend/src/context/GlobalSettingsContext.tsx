'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GlobalSettings, getGlobalSettings, updateGlobalSettings } from '../lib/api';

interface GlobalSettingsContextType {
  settings: GlobalSettings | null;
  updateSettings: (newSettings: Partial<GlobalSettings>) => void;
  isLoading: boolean;
}

const GlobalSettingsContext = createContext<GlobalSettingsContextType | undefined>(undefined);

export const GlobalSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<GlobalSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await getGlobalSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching global settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (newSettings: Partial<GlobalSettings>) => {
    if (!settings) return;
    
    // Optimistic update
    setSettings((prev) => prev ? { ...prev, ...newSettings } : null);
    
    try {
      await updateGlobalSettings(newSettings);
    } catch (error) {
      console.error('Failed to update settings in backend:', error);
      // Revert optimism if needed (simplified for now)
      fetchSettings();
    }
  };

  return (
    <GlobalSettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext);
  if (context === undefined) {
    throw new Error('useGlobalSettings must be used within a GlobalSettingsProvider');
  }
  return context;
};
