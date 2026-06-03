import { e as createLucideIcon, b as useGetCallerUserProfile, r as reactExports, G as DomainRole, j as jsxRuntimeExports, Q as Building2, R as ArrowLeftRight, T as Link, V as ChevronRight, S as Search, c as Shield } from "./index-BY4GfDKL.js";
import { u as useGetDashboardStats } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { T as TriangleAlert } from "./triangle-alert-CJLPKK-P.js";
import { P as Plus } from "./plus-CPoLbfbP.js";
import { C as Calculator } from "./calculator-CCf5Li8w.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode);
function DashboardPage() {
  var _a;
  const { data: stats, isLoading, error } = useGetDashboardStats();
  const { data: userProfile } = useGetCallerUserProfile();
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const isOfficerOrAdmin = (userProfile == null ? void 0 : userProfile.role) === DomainRole.landOfficer || (userProfile == null ? void 0 : userProfile.role) === DomainRole.admin;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "dashboard.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-24 rounded-sm bg-card border border-border animate-pulse"
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 rounded-sm bg-card border border-border animate-pulse" })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "formal-card p-6 text-center",
        "data-ocid": "dashboard.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mx-auto mb-2 text-destructive", size: 28 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: "Failed to load dashboard. Please refresh." })
        ]
      }
    );
  }
  const kpiCards = [
    {
      label: "Active Disputes",
      value: Number((stats == null ? void 0 : stats.activeDisputes) ?? 342),
      trend: "+33%",
      trendUp: true,
      icon: TriangleAlert,
      accent: "#D32F2F",
      desc: "Open investigation cases"
    },
    {
      label: "Pending Registrations",
      value: Number((stats == null ? void 0 : stats.pendingTransactions) ?? 1875),
      trend: "+12%",
      trendUp: true,
      icon: Building2,
      accent: "#B45309",
      desc: "Awaiting officer review"
    },
    {
      label: "Land Transactions",
      value: Number((stats == null ? void 0 : stats.totalRegisteredTitles) ?? 114),
      trend: "+8%",
      trendUp: true,
      icon: ArrowLeftRight,
      accent: "#0D5A3A",
      desc: "Total Value: KES 1,799,154"
    },
    {
      label: "Verified Owners",
      value: Number((stats == null ? void 0 : stats.verifiedOwners) ?? 67),
      trend: "-2%",
      trendUp: false,
      icon: UserCheck,
      accent: "#D32F2F",
      desc: "Critical & overdue leases"
    }
  ];
  const quickActions = [
    {
      label: "Search Land",
      icon: Search,
      to: "/search",
      desc: "Find title records"
    },
    {
      label: "New Application",
      icon: Plus,
      to: "/applications/new",
      desc: "Register land title"
    },
    {
      label: "Run Valuation",
      icon: Calculator,
      to: "/ai-valuation",
      desc: "AI-powered estimate"
    },
    {
      label: "Check Risk",
      icon: Shield,
      to: "/risk-intelligence",
      desc: "Dispute & fraud"
    }
  ];
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "applications", label: "Applications" },
    { id: "transactions", label: "Transactions" },
    { id: "disputes", label: "Disputes" },
    { id: "reports", label: "Reports" }
  ];
  const getStatusBadge = (status) => {
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
      date: "Mon 7, 2024"
    },
    {
      parcelId: "KJL-784-913",
      owner: "Alm Abdath",
      status: "pending",
      type: "Inheritance",
      date: "Mon 7, 2024"
    },
    {
      parcelId: "KJL-784-914",
      owner: "Jamm Edernon",
      status: "pending",
      type: "Sale",
      date: "Mon 7, 2024"
    },
    {
      parcelId: "KJL-784-915",
      owner: "Mars Smith",
      status: "rejected",
      type: "Lease",
      date: "Mon 7, 2024"
    },
    {
      parcelId: "KJL-784-916",
      owner: "Alm Sbmith",
      status: "approved",
      type: "Sale",
      date: "Mon 7, 2024"
    },
    {
      parcelId: "KJL-784-917",
      owner: "Jamm Mitarman",
      status: "approved",
      type: "Lease",
      date: "Mon 7, 2024"
    }
  ];
  const appRows = ((_a = stats == null ? void 0 : stats.recentApplications) == null ? void 0 : _a.length) ? stats.recentApplications.map((app, i) => ({
    parcelId: app.titleNumber,
    owner: `Owner ${i + 1}`,
    status: app.status,
    type: "Transfer",
    date: new Date(Number(app.created) / 1e6).toLocaleDateString(
      "en-KE"
    )
  })) : sampleApplications;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold tracking-wide text-foreground", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 tracking-wide", children: "Land Registry Management System" })
      ] }),
      isOfficerOrAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/queue",
          className: "flex items-center gap-2 rounded-sm border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-colors",
          "data-ocid": "dashboard.officer_queue_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 12 }),
            "Pending applications to review",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 11 })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-4 gap-3",
        "data-ocid": "dashboard.kpi_section",
        children: kpiCards.map(
          ({ label, value, trend, trendUp, icon: Icon, accent, desc }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-sm p-4",
              style: {
                borderLeft: `3px solid ${accent}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
              },
              "data-ocid": `dashboard.kpi.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13, style: { color: accent } })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-3xl font-bold tracking-tight text-foreground",
                    style: { fontVariantNumeric: "tabular-nums" },
                    children: value.toLocaleString()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-semibold",
                    style: { color: trendUp ? "#0D5A3A" : "#D32F2F" },
                    children: [
                      trendUp ? "▲" : "▼",
                      " ",
                      trend
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-muted-foreground truncate", children: desc })
              ]
            },
            label
          )
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border", "data-ocid": "dashboard.tabs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab.id),
        className: `px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === tab.id ? "border-b-2 border-[#0D5A3A] text-[#0D5A3A] dark:text-green-400" : "text-muted-foreground hover:text-foreground"}`,
        "data-ocid": `dashboard.tab.${tab.id}`,
        children: tab.label
      },
      tab.id
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "md:col-span-2 bg-card border border-border rounded-sm",
          style: { boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-foreground", children: "Recent Ownership Transfers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-badge-verified", children: "VERIFIED" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Sorting ↕" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Filtering ▾" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full text-xs",
                "data-ocid": "dashboard.applications.table",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 pl-4 pr-2 text-left font-semibold uppercase tracking-widest text-muted-foreground", children: "Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 text-left font-semibold uppercase tracking-widest text-muted-foreground", children: "Parcel ID" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 text-left font-semibold uppercase tracking-widest text-muted-foreground", children: "Current Owner" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 text-left font-semibold uppercase tracking-widest text-muted-foreground", children: "Transaction Type" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 text-left font-semibold uppercase tracking-widest text-muted-foreground", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 pl-2 pr-4 text-left font-semibold uppercase tracking-widest text-muted-foreground", children: "Action" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: appRows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: `border-b border-border/50 ${idx % 2 === 1 ? "bg-muted/20" : ""} hover:bg-muted/40 transition-colors`,
                      "data-ocid": `dashboard.applications.item.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pl-4 pr-2 text-muted-foreground", children: row.date }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-2 font-mono font-medium text-foreground", children: row.parcelId }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-2 text-foreground", children: row.owner }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-2 text-muted-foreground", children: row.type }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: getStatusBadge(row.status), children: row.status.toUpperCase() }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pl-2 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            className: "text-[10px] font-semibold uppercase tracking-wider text-primary hover:underline",
                            children: "View"
                          }
                        ) })
                      ]
                    },
                    row.parcelId
                  )) })
                ]
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-sm p-4",
          style: { boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Quick Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-2 gap-2",
                "data-ocid": "dashboard.quick_actions",
                children: quickActions.map(({ label, icon: Icon, to, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to,
                    className: "flex flex-col gap-1.5 rounded-sm border border-border p-3 text-left hover:border-primary/60 hover:bg-muted/40 transition-colors",
                    "data-ocid": `dashboard.quick_action.${label.toLowerCase().replace(/\s+/g, "_")}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, className: "text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground leading-tight", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: desc })
                    ]
                  },
                  label
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border-t border-border pt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                "Last Update:",
                " ",
                (/* @__PURE__ */ new Date()).toLocaleDateString("en-KE", { dateStyle: "medium" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground mt-0.5", children: "GeoSentinel Land Registry v2" })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  DashboardPage as default
};
