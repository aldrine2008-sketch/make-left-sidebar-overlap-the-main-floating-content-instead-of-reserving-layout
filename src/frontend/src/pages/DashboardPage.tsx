import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeftRight,
  Building2,
  Calculator,
  ChevronRight,
  Plus,
  Search,
  Shield,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { DomainRole } from "../backend";
import DepthCard from "../components/cards/DepthCard";
import AnimatedKPI from "../components/charts/AnimatedKPI";
import { useGetCallerUserProfile } from "../hooks/useCurrentUser";
import { useGetDashboardStats } from "../hooks/useSidebarDomainQueries";

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useGetDashboardStats();
  const { data: userProfile } = useGetCallerUserProfile();
  const [activeTab, setActiveTab] = useState("overview");

  const isOfficerOrAdmin =
    userProfile?.role === DomainRole.landOfficer ||
    userProfile?.role === DomainRole.admin;

  if (isLoading) {
    return (
      <div className="space-y-4" data-ocid="dashboard.loading_state">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 rounded-sm bg-card border border-border animate-pulse"
            />
          ))}
        </div>
        <div className="h-64 rounded-sm bg-card border border-border animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="formal-card p-6 text-center"
        data-ocid="dashboard.error_state"
      >
        <AlertTriangle className="mx-auto mb-2 text-destructive" size={28} />
        <p className="text-sm text-destructive">
          Failed to load dashboard. Please refresh.
        </p>
      </div>
    );
  }

  const kpiCards = [
    {
      label: "Active Disputes",
      value: Number(stats?.activeDisputes ?? 342),
      trend: "+33%",
      trendUp: true,
      icon: AlertTriangle,
      accent: "#D32F2F",
      desc: "Open investigation cases",
    },
    {
      label: "Pending Registrations",
      value: Number(stats?.pendingTransactions ?? 1875),
      trend: "+12%",
      trendUp: true,
      icon: Building2,
      accent: "#B45309",
      desc: "Awaiting officer review",
    },
    {
      label: "Land Transactions",
      value: Number(stats?.totalRegisteredTitles ?? 114),
      trend: "+8%",
      trendUp: true,
      icon: ArrowLeftRight,
      accent: "#0D5A3A",
      desc: "Total Value: KES 1,799,154",
    },
    {
      label: "Verified Owners",
      value: Number(stats?.verifiedOwners ?? 67),
      trend: "-2%",
      trendUp: false,
      icon: UserCheck,
      accent: "#D32F2F",
      desc: "Critical & overdue leases",
    },
  ];

  const quickActions = [
    {
      label: "Search Land",
      icon: Search,
      to: "/search",
      desc: "Find title records",
    },
    {
      label: "New Application",
      icon: Plus,
      to: "/applications/new",
      desc: "Register land title",
    },
    {
      label: "Run Valuation",
      icon: Calculator,
      to: "/ai-valuation",
      desc: "AI-powered estimate",
    },
    {
      label: "Check Risk",
      icon: Shield,
      to: "/risk-intelligence",
      desc: "Dispute & fraud",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "applications", label: "Applications" },
    { id: "transactions", label: "Transactions" },
    { id: "disputes", label: "Disputes" },
    { id: "reports", label: "Reports" },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "approved" || status === "verified")
      return "status-badge-verified";
    if (status === "rejected") return "status-badge-rejected";
    return "status-badge-pending";
  };

  const sampleApplications = [
    {
      parcelId: "KJL-784-912",
      owner: "M. Abdallah",
      status: "approved",
      type: "Sale",
      date: "Mon 7, 2024",
    },
    {
      parcelId: "KJL-784-913",
      owner: "Alm Abdath",
      status: "pending",
      type: "Inheritance",
      date: "Mon 7, 2024",
    },
    {
      parcelId: "KJL-784-914",
      owner: "Jamm Edernon",
      status: "pending",
      type: "Sale",
      date: "Mon 7, 2024",
    },
    {
      parcelId: "KJL-784-915",
      owner: "Mars Smith",
      status: "rejected",
      type: "Lease",
      date: "Mon 7, 2024",
    },
    {
      parcelId: "KJL-784-916",
      owner: "Alm Sbmith",
      status: "approved",
      type: "Sale",
      date: "Mon 7, 2024",
    },
    {
      parcelId: "KJL-784-917",
      owner: "Jamm Mitarman",
      status: "approved",
      type: "Lease",
      date: "Mon 7, 2024",
    },
  ];

  const appRows = stats?.recentApplications?.length
    ? stats.recentApplications.map((app, i) => ({
        parcelId: app.titleNumber,
        owner: `Owner ${i + 1}`,
        status: app.status,
        type: "Transfer",
        date: new Date(Number(app.created) / 1_000_000).toLocaleDateString(
          "en-KE",
        ),
      }))
    : sampleApplications;

  return (
    <div className="space-y-5" data-ocid="dashboard.page">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-foreground">
            Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5 tracking-wide">
            Land Registry Management System
          </p>
        </div>
        {isOfficerOrAdmin && (
          <Link
            to="/queue"
            className="flex items-center gap-2 rounded-sm border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
            data-ocid="dashboard.officer_queue_link"
          >
            <AlertTriangle size={12} />
            Pending applications to review
            <ChevronRight size={11} />
          </Link>
        )}
      </div>

      {/* KPI Cards */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
        data-ocid="dashboard.kpi_section"
      >
        {kpiCards.map(
          ({ label, value, trend, trendUp, icon: Icon, accent, desc }, idx) => (
            <div
              key={label}
              className="bg-card border border-border rounded-sm p-4"
              style={{
                borderLeft: `3px solid ${accent}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
              data-ocid={`dashboard.kpi.${idx + 1}`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {label}
                </p>
                <Icon size={13} style={{ color: accent }} />
              </div>
              <p
                className="text-3xl font-bold tracking-tight text-foreground"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {value.toLocaleString()}
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <span
                  className="text-xs font-semibold"
                  style={{ color: trendUp ? "#0D5A3A" : "#D32F2F" }}
                >
                  {trendUp ? "▲" : "▼"} {trend}
                </span>
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground truncate">
                {desc}
              </p>
            </div>
          ),
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-border" data-ocid="dashboard.tabs">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-[#0D5A3A] text-[#0D5A3A] dark:text-green-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`dashboard.tab.${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ownership Transfers Table */}
        <div
          className="md:col-span-2 bg-card border border-border rounded-sm"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Recent Ownership Transfers
              </h2>
              <span className="status-badge-verified">VERIFIED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Sorting ↕
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Filtering ▾
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table
              className="w-full text-xs"
              data-ocid="dashboard.applications.table"
            >
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="py-2 pl-4 pr-2 text-left font-semibold uppercase tracking-widest text-muted-foreground">
                    Date
                  </th>
                  <th className="py-2 px-2 text-left font-semibold uppercase tracking-widest text-muted-foreground">
                    Parcel ID
                  </th>
                  <th className="py-2 px-2 text-left font-semibold uppercase tracking-widest text-muted-foreground">
                    Current Owner
                  </th>
                  <th className="py-2 px-2 text-left font-semibold uppercase tracking-widest text-muted-foreground">
                    Transaction Type
                  </th>
                  <th className="py-2 px-2 text-left font-semibold uppercase tracking-widest text-muted-foreground">
                    Status
                  </th>
                  <th className="py-2 pl-2 pr-4 text-left font-semibold uppercase tracking-widest text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {appRows.map((row, idx) => (
                  <tr
                    key={row.parcelId}
                    className={`border-b border-border/50 ${
                      idx % 2 === 1 ? "bg-muted/20" : ""
                    } hover:bg-muted/40 transition-colors`}
                    data-ocid={`dashboard.applications.item.${idx + 1}`}
                  >
                    <td className="py-2.5 pl-4 pr-2 text-muted-foreground">
                      {row.date}
                    </td>
                    <td className="py-2.5 px-2 font-mono font-medium text-foreground">
                      {row.parcelId}
                    </td>
                    <td className="py-2.5 px-2 text-foreground">{row.owner}</td>
                    <td className="py-2.5 px-2 text-muted-foreground">
                      {row.type}
                    </td>
                    <td className="py-2.5 px-2">
                      <span className={getStatusBadge(row.status)}>
                        {row.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2.5 pl-2 pr-4">
                      <button
                        type="button"
                        className="text-[10px] font-semibold uppercase tracking-wider text-primary hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="bg-card border border-border rounded-sm p-4"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Quick Actions
          </h2>
          <div
            className="grid grid-cols-2 gap-2"
            data-ocid="dashboard.quick_actions"
          >
            {quickActions.map(({ label, icon: Icon, to, desc }) => (
              <Link
                key={label}
                to={to}
                className="flex flex-col gap-1.5 rounded-sm border border-border p-3 text-left hover:border-primary/60 hover:bg-muted/40 transition-colors"
                data-ocid={`dashboard.quick_action.${label.toLowerCase().replace(/\s+/g, "_")}`}
              >
                <Icon size={15} className="text-primary" />
                <span className="text-xs font-semibold text-foreground leading-tight">
                  {label}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {desc}
                </span>
              </Link>
            ))}
          </div>

          {/* System footer */}
          <div className="mt-4 border-t border-border pt-3">
            <p className="text-[10px] text-muted-foreground">
              Last Update:{" "}
              {new Date().toLocaleDateString("en-KE", { dateStyle: "medium" })}
            </p>
            <p className="text-[10px] font-semibold text-muted-foreground mt-0.5">
              GeoSentinel Land Registry v2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
