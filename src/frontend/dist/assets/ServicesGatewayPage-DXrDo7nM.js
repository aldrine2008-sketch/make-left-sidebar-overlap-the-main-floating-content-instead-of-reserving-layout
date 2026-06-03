import { e as createLucideIcon, j as jsxRuntimeExports, B as Button, u as useNavigate, d as Briefcase, F as FileText, S as Search } from "./index-BY4GfDKL.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { E as ExternalLink } from "./external-link-CpOvHv9p.js";
import { F as FileCheck } from "./file-check-Dzg6Bm3u.js";
import { C as Calculator } from "./calculator-CCf5Li8w.js";
import { T as TriangleAlert } from "./triangle-alert-CJLPKK-P.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "m16 3 4 4-4 4", key: "1x1c3m" }],
  ["path", { d: "M20 7H4", key: "zbl0bi" }],
  ["path", { d: "m8 21-4-4 4-4", key: "h9nckh" }],
  ["path", { d: "M4 17h16", key: "g4d7ey" }]
];
const ArrowRightLeft = createLucideIcon("arrow-right-left", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 10h2", key: "8sgtl7" }],
  ["path", { d: "M16 14h2", key: "epxaof" }],
  ["path", { d: "M6.17 15a3 3 0 0 1 5.66 0", key: "n6f512" }],
  ["circle", { cx: "9", cy: "11", r: "2", key: "yxgjnd" }],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2", key: "qneu4z" }]
];
const IdCard = createLucideIcon("id-card", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 3h5v5", key: "1806ms" }],
  ["path", { d: "M8 3H3v5", key: "15dfkv" }],
  ["path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3", key: "1qrqzj" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }]
];
const Split = createLucideIcon("split", __iconNode);
function ServiceCard({
  icon: Icon,
  title,
  description,
  hasRoute,
  hasUrl,
  onRouteClick,
  onUrlClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { className: "group transition-all hover:border-primary/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
        hasUrl && !hasRoute && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-1 h-3 w-3" }),
          "External"
        ] }),
        hasRoute && hasUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Hybrid" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
      hasRoute && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          className: "w-full group-hover:bg-primary/10 btn-lift",
          onClick: onRouteClick,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "mr-2 h-4 w-4" }),
            "Open in app"
          ]
        }
      ),
      hasUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: hasRoute ? "outline" : "ghost",
          className: "w-full group-hover:bg-primary/10 btn-lift",
          onClick: onUrlClick,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
            "Open external"
          ]
        }
      )
    ] })
  ] });
}
const servicesCatalog = [
  {
    category: "Land Services",
    description: "Core land administration and registration services",
    services: [
      {
        title: "Land Records Search",
        description: "Search and view land ownership records",
        icon: "search",
        route: "/search"
      },
      {
        title: "Title Deed Registration",
        description: "Register new title deeds and land ownership",
        icon: "file-text",
        route: "/applications/new"
      },
      {
        title: "Land Transfer",
        description: "Transfer land ownership between parties",
        icon: "arrow-right-left",
        route: "/applications/new"
      },
      {
        title: "Subdivision Application",
        description: "Apply for land subdivision approval",
        icon: "split",
        route: "/applications/new"
      },
      {
        title: "Boundary Dispute",
        description: "File a land boundary dispute case",
        icon: "alert-triangle",
        route: "/applications/new"
      },
      {
        title: "Land Valuation",
        description: "Request official land valuation services",
        icon: "calculator",
        route: "/applications/new",
        url: "https://lands.go.ke/valuation"
      }
    ]
  },
  {
    category: "Citizen Services",
    description: "General government services for citizens",
    services: [
      {
        title: "ID Registration",
        description: "Register for national identification",
        icon: "id-card",
        url: "https://ecitizen.go.ke"
      },
      {
        title: "Business Registration",
        description: "Register a new business entity",
        icon: "briefcase",
        url: "https://ecitizen.go.ke"
      },
      {
        title: "Tax Services",
        description: "File taxes and view tax records",
        icon: "receipt",
        url: "https://itax.kra.go.ke"
      },
      {
        title: "Permits & Licenses",
        description: "Apply for various permits and licenses",
        icon: "file-check",
        url: "https://ecitizen.go.ke"
      },
      {
        title: "Public Records",
        description: "Access public records and documents",
        icon: "folder-open",
        route: "/verify"
      },
      {
        title: "Feedback & Support",
        description: "Submit feedback or get support",
        icon: "message-circle",
        url: "https://ecitizen.go.ke"
      }
    ]
  }
];
const iconMap = {
  search: Search,
  "file-text": FileText,
  "arrow-right-left": ArrowRightLeft,
  split: Split,
  "alert-triangle": TriangleAlert,
  calculator: Calculator,
  "id-card": IdCard,
  briefcase: Briefcase,
  receipt: Receipt,
  "file-check": FileCheck,
  "folder-open": FolderOpen,
  "message-circle": MessageCircle
};
function ServicesGatewayPage() {
  const navigate = useNavigate();
  const handleRouteClick = (route) => {
    navigate({ to: route });
  };
  const handleUrlClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Government Services Gateway" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Access a comprehensive range of land-related and government services in one place" })
    ] }),
    servicesCatalog.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold", children: category.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: category.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: category.services.map((service, _index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ServiceCard,
        {
          icon: iconMap[service.icon] || FileText,
          title: service.title,
          description: service.description,
          hasRoute: !!service.route,
          hasUrl: !!service.url,
          onRouteClick: service.route ? () => handleRouteClick(service.route) : void 0,
          onUrlClick: service.url ? () => handleUrlClick(service.url) : void 0
        },
        service.title
      )) })
    ] }, category.category))
  ] });
}
export {
  ServicesGatewayPage as default
};
