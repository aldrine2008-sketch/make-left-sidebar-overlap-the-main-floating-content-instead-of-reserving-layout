import { r as reactExports, W as useReducedMotion, j as jsxRuntimeExports, P as cn, X as useGetAllMarketTrends, Y as useGetTopSearches, Z as useGetDemandHeatMapPoints, s as SkeletonBlock, S as Search, _ as TrendingUp } from "./index-BY4GfDKL.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { C as CardHeader, b as CardDescription, a as CardTitle, c as CardContent } from "./card-Dw7-HZNo.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-mmhG8-YG.js";
import { D as DemandHeatMap, h as hotContentLinks, S as SiTiktok, a as SiInstagram, b as SiX, c as SiFacebook } from "./hotContentLinks-C5BYHY1e.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { A as AnimatedKPI } from "./AnimatedKPI-CCJUgMs0.js";
import { D as DollarSign } from "./dollar-sign-CP1Vs9qv.js";
import { M as MapPin } from "./map-pin-B7IvRxTD.js";
import { E as ExternalLink } from "./external-link-CpOvHv9p.js";
import "./GeneratedAssets-CjCe1tUh.js";
function AnimatedLineChart({
  data,
  className
}) {
  const [animated, setAnimated] = reactExports.useState(false);
  const prefersReducedMotion = useReducedMotion();
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const points = data.map((point, index) => {
    const x = index / (data.length - 1) * 100;
    const y = 100 - (point.value - minValue) / range * 80;
    return { x, y, ...point };
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 100 100",
        className: "w-full h-48",
        preserveAspectRatio: "none",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "lineGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "stop",
              {
                offset: "0%",
                stopColor: "oklch(var(--primary))",
                stopOpacity: "0.8"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "stop",
              {
                offset: "100%",
                stopColor: "oklch(var(--accent))",
                stopOpacity: "0.8"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: pathD,
              fill: "none",
              stroke: "url(#lineGradient)",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: cn(
                "transition-all duration-1500 ease-out motion-reduce:transition-none",
                animated && !prefersReducedMotion ? "opacity-100" : "opacity-0"
              ),
              style: {
                strokeDasharray: prefersReducedMotion ? "none" : "200",
                strokeDashoffset: animated && !prefersReducedMotion ? "0" : "200"
              }
            }
          ),
          points.map((point, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: point.x,
              cy: point.y,
              r: "2",
              fill: "oklch(var(--primary))",
              className: cn(
                "transition-all duration-500 motion-reduce:transition-none",
                animated ? "opacity-100 scale-100" : "opacity-0 scale-0"
              ),
              style: {
                transitionDelay: `${index * 100 + 500}ms`,
                transformOrigin: `${point.x}px ${point.y}px`
              }
            },
            `${point.x}-${point.y}`
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex justify-between text-xs text-muted-foreground", children: data.map((point, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: point.label }, point.label ?? index)) })
  ] });
}
function MarketTrendDashboardPage() {
  var _a;
  const { data: marketTrends, isLoading: trendsLoading } = useGetAllMarketTrends();
  const { data: topSearches, isLoading: searchesLoading } = useGetTopSearches(10);
  const { data: demandHeatMapPoints, isLoading: demandPointsLoading } = useGetDemandHeatMapPoints();
  const averagePricePerAcre = marketTrends && marketTrends.length > 0 ? Math.round(
    marketTrends.reduce((sum, trend) => {
      const latestPrice = trend.priceTrend.length > 0 ? trend.priceTrend[trend.priceTrend.length - 1].price : 0;
      return sum + latestPrice;
    }, 0) / marketTrends.length
  ) : 0;
  const trendingLocations = marketTrends ? [...marketTrends].sort((a, b) => Number(b.demandScore) - Number(a.demandScore)).slice(0, 5) : [];
  if (trendsLoading || searchesLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-12 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-32" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-96 w-full" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Market Trend Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Real-time insights into land prices, demand, and market activity across Kenya" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Average Price/Acre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "KES" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedKPI, { value: averagePricePerAcre })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Market average" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Active Locations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedKPI, { value: (marketTrends == null ? void 0 : marketTrends.length) || 0 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tracked regions" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Total Searches" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnimatedKPI,
            {
              value: (topSearches == null ? void 0 : topSearches.reduce(
                (sum, [, count]) => sum + Number(count),
                0
              )) || 0
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "User queries" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Trending Now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "truncate text-lg", children: ((_a = trendingLocations[0]) == null ? void 0 : _a.location) || "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Highest demand" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "trends", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "trends", children: "Price Trends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "demand", children: "Demand Map" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "searches", children: "Top Searches" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "social", children: "Hot Content" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "trends", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 lg:grid-cols-2", children: trendingLocations.slice(0, 4).map((trend) => {
        const chartData = trend.priceTrend.map((point) => ({
          label: new Date(
            Number(point.timestamp) / 1e6
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }),
          value: point.price
        }));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: trend.location }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                "Demand: ",
                Number(trend.demandScore)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Price trend over time" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedLineChart, { data: chartData }) })
        ] }, trend.location);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "demand", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Demand Heat Map" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Geographic visualization of land demand across regions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: demandPointsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-96 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DemandHeatMap, { locations: demandHeatMapPoints || [] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "searches", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Most Searched Locations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Popular locations based on user search activity" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: topSearches && topSearches.length > 0 ? topSearches.map(([location, count], index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between rounded-lg border bg-muted/30 p-4 transition-colors hover:bg-muted/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary", children: index + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium capitalize", children: location }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    Number(count),
                    " searches"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-1 h-3 w-3" }),
                Number(count)
              ] })
            ]
          },
          location
        )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "No search data available" }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "social", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Hot Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Trending land-related content on social media" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: hotContentLinks.tiktok,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group flex items-center gap-4 rounded-lg border bg-gradient-to-br from-background to-muted/30 p-6 transition-all hover:scale-105 hover:shadow-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-black text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiTiktok, { className: "h-6 w-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "TikTok" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Trending land videos" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: hotContentLinks.instagram,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group flex items-center gap-4 rounded-lg border bg-gradient-to-br from-background to-muted/30 p-6 transition-all hover:scale-105 hover:shadow-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiInstagram, { className: "h-6 w-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Instagram" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Land property posts" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: hotContentLinks.x,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group flex items-center gap-4 rounded-lg border bg-gradient-to-br from-background to-muted/30 p-6 transition-all hover:scale-105 hover:shadow-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-black text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiX, { className: "h-6 w-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "X (Twitter)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Land market discussions" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: hotContentLinks.facebook,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group flex items-center gap-4 rounded-lg border bg-gradient-to-br from-background to-muted/30 p-6 transition-all hover:scale-105 hover:shadow-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiFacebook, { className: "h-6 w-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Facebook" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Community groups" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" })
              ]
            }
          )
        ] }) })
      ] }) })
    ] })
  ] });
}
export {
  MarketTrendDashboardPage as default
};
