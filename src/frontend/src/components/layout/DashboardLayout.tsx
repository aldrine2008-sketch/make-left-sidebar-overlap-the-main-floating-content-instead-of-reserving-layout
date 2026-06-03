import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Outlet } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect } from "react";
import AppSidebar from "../navigation/AppSidebar";
import RightCommandSidebar from "../navigation/RightCommandSidebar";
import { useRightSidebarState } from "../navigation/rightSidebarState";
import { useSidebarStore } from "../../stores/sidebarStore";
import ThemeSwitcher from "../theme/ThemeSwitcher";

export default function DashboardLayout() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { isExpanded } = useRightSidebarState();
  const { isOpen: isSidebarOpen, toggle: toggleSidebar, close: closeSidebar } = useSidebarStore();

  // Handle Escape key to close sidebar
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        closeSidebar();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isSidebarOpen, closeSidebar]);

  // Close sidebar when pathname changes on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  }, [closeSidebar]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative">
        {/* Mobile Sidebar Backdrop Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 md:hidden z-40 transition-opacity duration-300"
            onClick={closeSidebar}
            role="presentation"
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar — Glassmorphic Overlay on Mobile, Fixed Column on Desktop */}
        <aside
          className={`
            fixed md:relative
            top-0 left-0
            w-64 h-screen
            bg-[#0B1F3A] text-white
            glass-card backdrop-blur-xl
            flex-shrink-0
            border-r border-white/10
            transition-transform duration-300 ease-in-out
            z-50 md:z-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            overflow-y-auto
          `}
          role="navigation"
          aria-label="Main Navigation"
          aria-hidden={!isSidebarOpen && window.innerWidth < 768 ? "true" : "false"}
        >
          {/* Sidebar Content */}
          <div className="hidden md:block">
            <AppSidebar />
          </div>
          {/* Mobile version with close button */}
          <div className="md:hidden">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <span className="text-sm font-semibold tracking-wider">Navigation</span>
              <button
                onClick={closeSidebar}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <AppSidebar />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0 w-full">
          {/* Header */}
          <header
            className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-card px-6 glass-surface"
            role="banner"
          >
            {/* Mobile: Hamburger Menu Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="md:hidden p-1 hover:bg-muted rounded transition-colors"
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                aria-expanded={isSidebarOpen}
                aria-controls="sidebar-nav"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex md:hidden items-center gap-2">
                <span className="text-sm font-semibold tracking-wide">GeoSentinel</span>
              </div>
            </div>

            {/* Desktop: Title */}
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground tracking-wide">
                GeoSentinel Land Registry
              </span>
              <span className="text-border">|</span>
              <span className="text-xs uppercase tracking-widest">v2.0</span>
            </div>

            {/* Theme Switcher */}
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 bg-background p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="border-t border-border bg-card px-6 py-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()} GeoSentinel. All rights reserved.</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "unknown-app",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                Built with ❤️ caffeine.ai
              </a>
            </div>
          </footer>
        </div>

        {/* Right Command Sidebar */}
        {isAuthenticated && <RightCommandSidebar />}
      </div>
    </SidebarProvider>
  );
}
