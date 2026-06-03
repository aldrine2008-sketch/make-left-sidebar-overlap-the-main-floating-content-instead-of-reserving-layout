import { create } from "zustand";

interface RightSidebarState {
  isExpanded: boolean;
  toggleExpanded: () => void;
  setExpanded: (expanded: boolean) => void;
}

export const useRightSidebarState = create<RightSidebarState>((set) => ({
  isExpanded: true,
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setExpanded: (expanded) => set({ isExpanded: expanded }),
}));

export const SIDEBAR_WIDTH_EXPANDED = 320;
export const SIDEBAR_WIDTH_COLLAPSED = 64;
