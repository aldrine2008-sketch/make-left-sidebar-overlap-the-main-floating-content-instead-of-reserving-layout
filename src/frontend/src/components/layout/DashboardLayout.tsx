import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Outlet } from "@tanstack/react-router";
import { Cpu, Heart, Shield } from "lucide-react";
import AppSidebar from "../navigation/AppSidebar";
import RightCommandSidebar from "../navigation/RightCommandSidebar";
import { useRightSidebarState } from "../navigation/rightSidebarState";
import ThemeSwitcher from "../theme/ThemeSwitcher";

export default function DashboardLayout() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { isExpanded } = useRightSidebarState();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Left Sidebar — fixed non-overlapping column */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="w-64">
            <AppSidebar />
          </div>
        </div>

        {/* Main Content Area — takes remaining space */}
        <div
          className="flex flex-1 flex-col min-w-0"
          style={{
            marginRight: isAuthenticated && isExpanded ? "320px" : "0",
          }}
        >
          {/* Header */}
          <header
            className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-card px-6"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            {/* Mobile: hamburger placeholder */}
            <div className="flex items-center gap-3 md:hidden">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold tracking-wide">
                GeoSentinel
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground tracking-wide">
                GeoSentinel Land Registry
              </span>
              <span className="text-border">|</span>
              <span className="text-xs uppercase tracking-widest">v2.0</span>
            </div>
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 bg-background p-6">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="border-t border-border bg-card px-6 py-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                © {new Date().getFullYear()} GeoSentinel. All rights reserved.
              </span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined"
                    ? window.location.hostname
                    : "unknown-app",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                Built with{" "}
                <Heart className="h-3 w-3 fill-red-500 text-red-500 mx-0.5" />{" "}
                caffeine.ai
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
