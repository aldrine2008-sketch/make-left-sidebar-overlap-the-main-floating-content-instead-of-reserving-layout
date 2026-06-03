import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  Briefcase,
  CheckCircle,
  FileText,
  LogIn,
  LogOut,
  Map as MapIcon,
  MessageSquare,
  Search,
  Settings,
  Shield,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { DomainRole } from "../../backend";
import { useGetCallerUserProfile } from "../../hooks/useCurrentUser";
import { useConversations } from "../../hooks/useMessaging";

export default function AppSidebar() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { identity, clear, isLoggingIn } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: conversations = [] } = useConversations();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const currentPath = routerState.location.pathname;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate({ to: "/" });
    } else {
      navigate({ to: "/login" });
    }
  };

  const isLandOfficerOrAdmin =
    userProfile?.role === DomainRole.landOfficer ||
    userProfile?.role === DomainRole.admin;

  // Calculate total unread messages
  const totalUnreadMessages = conversations.reduce(
    (sum, conv) => sum + Number(conv.unreadMessagesCount),
    0,
  );

  const citizenMenuItems = [
    { icon: Search, label: "Search Records", path: "/search" },
    { icon: FileText, label: "My Applications", path: "/applications" },
    {
      icon: MessageSquare,
      label: "Messages",
      path: "/messages",
      badge: totalUnreadMessages,
    },
    { icon: TrendingUp, label: "Market Trends", path: "/market" },
    { icon: MapIcon, label: "Kenya Land View", path: "/kenya-land-view" },
    { icon: Briefcase, label: "Services", path: "/services" },
    { icon: CheckCircle, label: "Verify Record", path: "/verify" },
    { icon: ArrowLeftRight, label: "Transactions", path: "/transactions" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const officerMenuItems = [
    { icon: Search, label: "Search Records", path: "/search" },
    { icon: FileText, label: "Applications Queue", path: "/queue" },
    {
      icon: MessageSquare,
      label: "Messages",
      path: "/messages",
      badge: totalUnreadMessages,
    },
    { icon: TrendingUp, label: "Market Trends", path: "/market" },
    { icon: MapIcon, label: "Kenya Land View", path: "/kenya-land-view" },
    { icon: Briefcase, label: "Services", path: "/services" },
    { icon: ArrowLeftRight, label: "Transactions", path: "/transactions" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const menuItems =
    isAuthenticated && isLandOfficerOrAdmin
      ? officerMenuItems
      : citizenMenuItems;

  const formatRole = (role: DomainRole): string => {
    switch (role) {
      case DomainRole.citizen:
        return "Citizen";
      case DomainRole.landOfficer:
        return "Land Officer";
      case DomainRole.admin:
        return "Administrator";
      default:
        return role;
    }
  };

  const roleBadgeClass =
    userProfile?.role === DomainRole.landOfficer ||
    userProfile?.role === DomainRole.admin
      ? "bg-[#0D5A3A] text-white"
      : "border border-white/30 text-white/70";

  return (
    <div className="flex h-screen w-64 flex-col bg-[#0B1F3A] text-white flex-shrink-0">
      {/* Header / Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-[#0D5A3A]">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold tracking-wider">
            GeoSentinel
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/50">
            Land Registry
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
          Navigation
        </p>
        {menuItems.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate({ to: item.path })}
            className={`sidebar-nav-item w-full text-left ${
              currentPath === item.path ? "active" : ""
            }`}
            data-ocid={`sidebar.nav.${item.label.toLowerCase().replace(/\s+/g, "_")}`}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded bg-red-600 px-1 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer / User */}
      <div className="border-t border-white/10 px-3 py-3">
        {isAuthenticated && userProfile ? (
          <div className="mb-3 flex items-center gap-2">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-[#0D5A3A] text-xs text-white font-semibold">
                {userProfile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">
                {userProfile.name}
              </p>
              <span
                className={`mt-0.5 inline-block px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider rounded ${roleBadgeClass}`}
              >
                {formatRole(userProfile.role)}
              </span>
            </div>
          </div>
        ) : null}
        <Button
          onClick={handleAuth}
          disabled={isLoggingIn}
          variant="outline"
          size="sm"
          className="w-full border-white/20 bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
          data-ocid="sidebar.auth_button"
        >
          {isLoggingIn ? (
            "Logging in..."
          ) : isAuthenticated ? (
            <>
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Logout
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-3.5 w-3.5" />
              Login
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
