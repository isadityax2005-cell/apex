import { create } from 'zustand';

export const scrollState = {
  progress: 0,
};

interface AppState {
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedPropertyId: null,
  setSelectedPropertyId: (id) => set({ selectedPropertyId: id }),
}));
