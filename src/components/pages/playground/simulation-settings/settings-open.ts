import { create } from "zustand";

interface ISettingsProps {
  isOpen: boolean;
  actions: {
    onClose: () => void;
    onOpen: () => void;
  };
}

export const useSettingsOpen = create<ISettingsProps>()((set) => ({
  isOpen: false,
  actions: {
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  },
}));
