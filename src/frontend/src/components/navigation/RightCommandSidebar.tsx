import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useMotionSafe } from "@/utils/motion";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import SkeletonBlock from "../loading/SkeletonBlock";
import { AlertBadge, NotificationDot, RiskBadge } from "./RightSidebarBadges";
import RightSidebarSparkline from "./RightSidebarSparkline";
import SidebarTooltip from "./SidebarTooltip";
import { menuCategories, menuItems } from "./rightSidebarMenu";
import {
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
  useRightSidebarState,
} from "./rightSidebarState";
import { useRightSidebarCommandCenterData } from "./useRightSidebarCommandCenterData";

export default function RightCommandSidebar() {
  const { isExpanded, toggleExpanded } = useRightSidebarState();
  const motionSafe = useMotionSafe();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const commandCenterData = useRightSidebarCommandCenterData();

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => {
      const next = new Set(prev);
      if (next.has(menuId)) {
        next.delete(menuId);
      } else {
        next.add(menuId);
      }
      return next;
    });
  };

  const handleMenuClick = (item: (typeof menuItems)[0]) => {
    if (item.route) {
      navigate({ to: item.route });
    } else if (item.subItems && item.subItems.length > 0) {
      toggleMenu(item.id);
    }
  };

  const renderCommandCenterPreview = () => {
    if (!isExpanded) return null;

    if (commandCenterData.isLoading) {
      return (
        <div className="space-y-2 px-3 py-2">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-3/4" />
        </div>
      );
    }

    return (
      <div className="space-y-2 px-3 py-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Locations</span>
          <span className="font-semibold">
            {commandCenterData.summary.totalLocations}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Avg Demand</span>
          <span className="font-semibold">
            {commandCenterData.summary.avgDemandScore}
          </span>
        </div>
        {commandCenterData.miniPreview.topLocation && (
          <div className="rounded-md bg-accent/10 p-2">
            <div className="text-[10px] text-muted-foreground">Top Search</div>
            <div className="font-medium">
              {commandCenterData.miniPreview.topLocation}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {commandCenterData.miniPreview.topLocationSearches} searches
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMenuItem = (item: (typeof menuItems)[0]) => {
    const isMenuExpanded = expandedMenus.has(item.id);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const Icon = item.icon;

    const menuButton = (
      <button
        type="button"
        onClick={() => handleMenuClick(item)}
        className={cn(
          "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all",
          "hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          isExpanded ? "justify-start" : "justify-center",
          motionSafe && "hover:theme-glow",
        )}
        aria-expanded={hasSubItems ? isMenuExpanded : undefined}
        aria-controls={hasSubItems ? `submenu-${item.id}` : undefined}
      >
        <Icon className="h-5 w-5 shrink-0 text-foreground" />
        {isExpanded && (
          <>
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            {item.hasPreview === "sparkline" && (
              <RightSidebarSparkline className="shrink-0" />
            )}
            {item.hasPreview === "risk" && (
              <RiskBadge level="low" className="shrink-0" />
            )}
            {item.hasPreview === "alert" && (
              <AlertBadge
                count={commandCenterData.alertCount}
                className="shrink-0"
              />
            )}
            {item.hasPreview === "command-center" && (
              <>
                <AlertBadge
                  count={commandCenterData.alertCount}
                  className="shrink-0"
                />
                <NotificationDot className="shrink-0" />
              </>
            )}
            {hasSubItems && (
              <ChevronRight
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform",
                  isMenuExpanded && "rotate-90",
                )}
              />
            )}
          </>
        )}
      </button>
    );

    return (
      <div key={item.id}>
        {isExpanded ? (
          menuButton
        ) : (
          <SidebarTooltip content={item.label}>{menuButton}</SidebarTooltip>
        )}

        {/* Command Center Preview */}
        {item.hasPreview === "command-center" &&
          isMenuExpanded &&
          renderCommandCenterPreview()}

        {/* Sub-items */}
        {hasSubItems && isMenuExpanded && isExpanded && (
          <div
            id={`submenu-${item.id}`}
            className={cn(
              "ml-8 mt-1 space-y-1 overflow-hidden",
              motionSafe ? "animate-accordion-down" : "block",
            )}
          >
            {item.subItems!.map((subItem) => (
              <button
                type="button"
                key={subItem.id}
                onClick={() => item.route && navigate({ to: item.route })}
                className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                {subItem.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 z-40 flex h-screen flex-col border-l",
        "glass-sidebar-right",
        motionSafe && "transition-all duration-300 ease-in-out",
      )}
      style={{
        width: isExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED,
      }}
      aria-label="Command sidebar"
    >
      {/* Toggle button */}
      <div className="flex h-14 items-center justify-center border-b px-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleExpanded}
          className="h-8 w-8"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Menu content */}
      <div className="flex-1 overflow-y-auto p-2">
        {menuCategories.map((category) => {
          const categoryItems = menuItems.filter(
            (item) => item.category === category.id,
          );
          if (categoryItems.length === 0) return null;

          return (
            <div key={category.id} className="mb-4">
              {isExpanded && (
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.label}
                </div>
              )}
              <div className="space-y-1">
                {categoryItems.map((item) => renderMenuItem(item))}
              </div>
              <Separator className="my-3" />
            </div>
          );
        })}
      </div>
    </aside>
  );
}
