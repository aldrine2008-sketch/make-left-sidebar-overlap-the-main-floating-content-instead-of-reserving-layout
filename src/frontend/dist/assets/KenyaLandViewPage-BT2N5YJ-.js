import { e as createLucideIcon, j as jsxRuntimeExports, _ as TrendingUp, Z as useGetDemandHeatMapPoints, r as reactExports, a8 as Map, L as Label, s as SkeletonBlock } from "./index-BY4GfDKL.js";
import { d as Card, C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { S as Switch } from "./switch-C0IfSf45.js";
import { S as SiTiktok, h as hotContentLinks, a as SiInstagram, b as SiX, c as SiFacebook, D as DemandHeatMap } from "./hotContentLinks-C5BYHY1e.js";
import { E as ExternalLink } from "./external-link-CpOvHv9p.js";
import "./GeneratedAssets-CjCe1tUh.js";
import "./map-pin-B7IvRxTD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode);
function HotContentLinksSection() {
  const links = [
    {
      name: "TikTok",
      url: hotContentLinks.tiktok,
      icon: SiTiktok,
      description: "Discover trending land ownership stories and property insights",
      color: "text-[#000000] dark:text-[#ffffff]"
    },
    {
      name: "Instagram",
      url: hotContentLinks.instagram,
      icon: SiInstagram,
      description: "Explore visual content about Kenya land and property",
      color: "text-[#E4405F]"
    },
    {
      name: "X (Twitter)",
      url: hotContentLinks.x,
      icon: SiX,
      description: "Follow real-time discussions on land disputes and ownership",
      color: "text-[#000000] dark:text-[#ffffff]"
    },
    {
      name: "Facebook",
      url: hotContentLinks.facebook,
      icon: SiFacebook,
      description: "Join communities discussing Kenya land issues",
      color: "text-[#1877F2]"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-surface", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Hot Content & Discussions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Explore trending content about Kenya land ownership, disputes, and property rights across social media" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: link.url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "group",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 ${link.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: link.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: link.description })
          ] })
        ] })
      },
      link.name
    )) }) })
  ] });
}
function KenyaLandViewPage() {
  const { data: heatMapPoints, isLoading, error } = useGetDemandHeatMapPoints();
  const [showDemandLayer, setShowDemandLayer] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mb-2 flex items-center gap-2 text-3xl font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-8 w-8 text-primary" }),
        "Kenya Land View"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Interactive map visualization of land demand and market activity across Kenya" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-surface", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Map Layers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Toggle map layers to customize your view" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "demand-layer", children: "Demand Heat Map" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Show property demand intensity by location" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id: "demand-layer",
            checked: showDemandLayer,
            onCheckedChange: setShowDemandLayer
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-surface", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Land Demand Map" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Visualizing property demand across Kenya based on search activity and market trends" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-8 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "aspect-video w-full" })
      ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex aspect-video items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: "Failed to load map data" }) }) : !heatMapPoints || heatMapPoints.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex aspect-video items-center justify-center rounded-lg border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "mx-auto mb-2 h-12 w-12 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No demand data available" })
      ] }) }) : showDemandLayer ? /* @__PURE__ */ jsxRuntimeExports.jsx(DemandHeatMap, { locations: heatMapPoints }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex aspect-video items-center justify-center rounded-lg border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enable layers to view map data" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HotContentLinksSection, {})
  ] });
}
export {
  KenyaLandViewPage as default
};
