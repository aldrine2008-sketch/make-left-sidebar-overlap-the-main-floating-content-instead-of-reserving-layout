import { create } from 'zustand';

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

/**
 * Zustand store for managing mobile sidebar state
 * 
 * Features:
 * - Tracks open/close state of left sidebar on mobile devices
 * - Provides toggle, open, and close actions
 * - Automatically closes on route changes (handled in DashboardLayout)
 * - Persists state during user session
 * 
 * Z-Index Stack:
 * - Sidebar overlay: z-50
 * - Backdrop: z-40
 * - Header: z-20
 * - Main content: z-0
 * 
 * Breakpoints:
 * - Mobile (≤768px): Sidebar is fixed overlay
 * - Desktop (>768px): Sidebar is relative column
 */
export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  
  open: () => set({ isOpen: true }),
  
  close: () => set({ isOpen: false }),
  
  setOpen: (open: boolean) => set({ isOpen: open }),
}));
