import {
  Bell,
  Brain,
  Building2,
  Construction,
  FileText,
  Globe,
  LayoutDashboard,
  type LucideIcon,
  Settings,
  Shield,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  category: string;
  route?: string;
  subItems?: SubMenuItem[];
  hasPreview?: "sparkline" | "risk" | "alert" | "command-center";
}

export interface SubMenuItem {
  id: string;
  label: string;
}

export const menuCategories = [
  { id: "core", label: "Core" },
  { id: "explore", label: "Explore" },
  { id: "intelligence", label: "Intelligence" },
  { id: "marketplace", label: "Marketplace" },
  { id: "user", label: "User" },
];

export const menuItems: MenuItem[] = [
  {
    id: "command-center",
    label: "Command Center",
    icon: LayoutDashboard,
    category: "core",
    route: "/dashboard",
    hasPreview: "command-center",
  },
  {
    id: "explore-intelligence",
    label: "Explore Intelligence",
    icon: Globe,
    category: "explore",
    subItems: [
      { id: "satellite-view", label: "Satellite view" },
      { id: "demand-heatmap", label: "Demand heatmap" },
      { id: "dispute-overlay", label: "Dispute overlay" },
      { id: "infrastructure-overlay", label: "Infrastructure overlay" },
      { id: "zoning-layers", label: "Zoning layers" },
    ],
  },
  {
    id: "market-analytics",
    label: "Market Analytics",
    icon: TrendingUp,
    category: "intelligence",
    route: "/market-analytics",
    hasPreview: "sparkline",
    subItems: [
      { id: "price-trends", label: "Price trends" },
      { id: "appreciation-rate", label: "Appreciation rate" },
      { id: "roi-calculator", label: "ROI calculator" },
      { id: "area-comparison", label: "Area comparison" },
      { id: "historical-growth", label: "Historical growth data" },
    ],
  },
  {
    id: "ai-valuation",
    label: "AI Valuation Lab",
    icon: Brain,
    category: "intelligence",
    route: "/ai-valuation",
    subItems: [
      { id: "quick-valuation", label: "Quick valuation" },
      { id: "advanced-valuation", label: "Advanced valuation" },
      { id: "growth-forecast", label: "Growth forecast" },
      { id: "comparable-properties", label: "Comparable properties" },
    ],
  },
  {
    id: "risk-intelligence",
    label: "Risk Intelligence",
    icon: Shield,
    category: "intelligence",
    route: "/risk-intelligence",
    hasPreview: "risk",
    subItems: [
      { id: "dispute-tracker", label: "Dispute tracker" },
      { id: "fraud-alerts", label: "Fraud alerts" },
      { id: "ownership-history", label: "Ownership history" },
      { id: "legal-case-monitor", label: "Legal case monitor" },
      { id: "risk-score-analyzer", label: "Risk score analyzer" },
    ],
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: Building2,
    category: "marketplace",
    route: "/marketplace",
    subItems: [
      { id: "verified-listings", label: "Verified listings" },
      { id: "premium-properties", label: "Premium properties" },
      { id: "my-saved-listings", label: "My saved listings" },
      { id: "recently-viewed", label: "Recently viewed" },
      { id: "compare-properties", label: "Compare properties" },
    ],
  },
  {
    id: "reports",
    label: "Reports & Documents",
    icon: FileText,
    category: "user",
    route: "/reports-documents",
    subItems: [
      { id: "generate-report", label: "Generate report" },
      { id: "download-history", label: "Download history" },
      { id: "valuation-certificate", label: "Valuation certificate" },
      { id: "investment-summary", label: "Investment summary" },
    ],
  },
  {
    id: "portfolio",
    label: "Investment Portfolio",
    icon: Wallet,
    category: "user",
    route: "/investment-portfolio",
    subItems: [
      { id: "my-properties", label: "My properties" },
      { id: "roi-tracker", label: "ROI tracker" },
      { id: "value-growth", label: "Value growth" },
      { id: "alert-center", label: "Alert center" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure Tracker",
    icon: Construction,
    category: "user",
    route: "/infrastructure-tracker",
    subItems: [
      { id: "upcoming-roads", label: "Upcoming roads" },
      { id: "government-projects", label: "Government projects" },
      { id: "urban-expansion", label: "Urban expansion zones" },
      { id: "development-timeline", label: "Development timeline" },
    ],
  },
  {
    id: "notifications",
    label: "Notification Center",
    icon: Bell,
    category: "user",
    route: "/notification-center",
    hasPreview: "alert",
  },
  {
    id: "profile",
    label: "Profile & Verification",
    icon: User,
    category: "user",
    route: "/profile-verification",
    subItems: [
      { id: "account-info", label: "Account info" },
      { id: "verification-status", label: "Verification status" },
      { id: "document-uploads", label: "Document uploads" },
      { id: "security-settings", label: "Security settings" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    category: "user",
    route: "/settings",
  },
];
