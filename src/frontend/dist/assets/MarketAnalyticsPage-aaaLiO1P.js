import { r as reactExports, j as jsxRuntimeExports, _ as TrendingUp, L as Label, a3 as Select, a4 as SelectTrigger, a5 as SelectValue, a6 as SelectContent, a7 as SelectItem } from "./index-BY4GfDKL.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { A as AnimatedKPI } from "./AnimatedKPI-CCJUgMs0.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { d as useGetMarketAnalytics } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { Z as Zap } from "./zap-D6StZJ1k.js";
import { M as MapPin } from "./map-pin-B7IvRxTD.js";
import { C as ChartColumn } from "./chart-column-B6lWExek.js";
import "./card-Dw7-HZNo.js";
const KENYA_REGIONS = [
  "All Regions",
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Kiambu",
  "Machakos",
  "Nyeri",
  "Meru"
];
function MarketAnalyticsPage() {
  const [selectedRegion, setSelectedRegion] = reactExports.useState("All Regions");
  const region = selectedRegion === "All Regions" ? null : selectedRegion;
  const { data: analytics, isLoading, error } = useGetMarketAnalytics(region);
  const maxPrice = analytics ? Math.max(...analytics.pricesByRegion.map(([, v]) => v), 1) : 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-7 w-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Market Analytics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Live land market intelligence for Kenya" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "region-filter",
            className: "text-xs text-muted-foreground",
            children: "Region"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedRegion, onValueChange: setSelectedRegion, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              id: "region-filter",
              "data-ocid": "market.region.select",
              className: "w-40 bg-card/60 backdrop-blur-md border-white/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: KENYA_REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "market.error_state",
        className: "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
        children: error.message
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-24 animate-pulse rounded-2xl bg-muted/40"
      },
      i
    )) }) : analytics ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Active Listings" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AnimatedKPI,
          {
            value: Number(analytics.activeListings),
            className: "text-3xl font-bold"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Tracked Regions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AnimatedKPI,
          {
            value: analytics.pricesByRegion.length,
            className: "text-3xl font-bold"
          }
        )
      ] }) })
    ] }) : null,
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-12 animate-pulse rounded-xl bg-muted/40"
      },
      i
    )) }) : analytics && analytics.pricesByRegion.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Average Price by Region (KES/acre)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: analytics.pricesByRegion.map(([regionName, price]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: regionName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "KES ",
            price.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full bg-primary transition-all duration-700",
            style: {
              width: `${Math.min(price / maxPrice * 100, 100)}%`
            }
          }
        ) })
      ] }, regionName)) })
    ] }) }) : analytics ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "market.prices.empty_state",
        className: "rounded-2xl border border-white/10 bg-card/40 p-8 text-center text-muted-foreground",
        children: "No price data available for the selected region."
      }
    ) : null,
    analytics && analytics.appreciationRates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-green-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Appreciation Rates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: analytics.appreciationRates.map(([regionName, rate]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between rounded-xl bg-card/40 border border-white/10 px-4 py-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: regionName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: rate > 10 ? "default" : rate > 5 ? "secondary" : "outline",
                className: "tabular-nums",
                children: [
                  "+",
                  rate.toFixed(1),
                  "%"
                ]
              }
            )
          ]
        },
        regionName
      )) })
    ] }) }),
    analytics && analytics.topRegions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Top Regions by Demand" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: analytics.topRegions.map((regionName, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 rounded-xl bg-card/40 border border-white/10 px-4 py-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary", children: idx + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium flex-1", children: regionName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Hot" })
          ]
        },
        regionName
      )) })
    ] }) })
  ] });
}
export {
  MarketAnalyticsPage as default
};
