export interface GlobalSettings {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontDisplay: string;
  fontBody: string;
  iconSize: string;
  iconWeight: string;
  iconColor: string;
}

export interface CustomBlock {
  id: string;
  name: string;
  html: string;
  css: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

export const getGlobalSettings = async (): Promise<GlobalSettings> => {
  const response = await fetch(`${API_BASE_URL}/global-settings`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch settings');
  }
  return response.json();
};

export const updateGlobalSettings = async (settings: Partial<GlobalSettings>): Promise<GlobalSettings> => {
  const response = await fetch(`${API_BASE_URL}/global-settings`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update settings');
  }
  
  return response.json();
};

export const getBlocks = async (): Promise<CustomBlock[]> => {
  const response = await fetch(`${API_BASE_URL}/blocks`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch blocks');
  }
  return response.json();
};

export const createBlock = async (data: Omit<CustomBlock, 'id' | 'createdAt' | 'updatedAt'>): Promise<CustomBlock> => {
  const response = await fetch(`${API_BASE_URL}/blocks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create block');
  }
  return response.json();
};

export const deleteBlock = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/blocks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete block');
  }
};
