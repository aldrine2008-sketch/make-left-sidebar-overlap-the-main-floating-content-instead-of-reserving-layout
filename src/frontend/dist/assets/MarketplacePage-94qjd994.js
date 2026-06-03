import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, Q as Building2, L as Label, B as Button, az as ChevronUp, aA as ChevronDown } from "./index-BY4GfDKL.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { S as Switch } from "./switch-C0IfSf45.js";
import { c as useGetMarketplaceListings } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { S as ShieldCheck } from "./shield-check-CclAPn2H.js";
import "./card-Dw7-HZNo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5", key: "1uzm8b" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const SquareCheckBig = createLucideIcon("square-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode);
const SAFE_DEAL_ITEMS = [
  "Ownership documents verified",
  "No active disputes on record",
  "Independent valuation obtained",
  "Title search completed",
  "Legal representation engaged"
];
function MarketplacePage() {
  const [showVerifiedOnly, setShowVerifiedOnly] = reactExports.useState(false);
  const [expandedCard, setExpandedCard] = reactExports.useState(null);
  const [checkedItems, setCheckedItems] = reactExports.useState(
    {}
  );
  const {
    data: listings,
    isLoading,
    error
  } = useGetMarketplaceListings(
    showVerifiedOnly ? { verified: true } : void 0
  );
  const toggleCheck = (propId, itemIdx) => {
    setCheckedItems((prev) => {
      const existing = new Set(prev[propId] ?? []);
      if (existing.has(itemIdx)) existing.delete(itemIdx);
      else existing.add(itemIdx);
      return { ...prev, [propId]: existing };
    });
  };
  const toggleExpanded = (id) => {
    setExpandedCard((prev) => prev === id ? null : id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-7 w-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Smart Marketplace" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Verified land listings with fraud protection" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id: "verified-toggle",
            "data-ocid": "marketplace.verified_only.toggle",
            checked: showVerifiedOnly,
            onCheckedChange: setShowVerifiedOnly
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "verified-toggle", className: "text-sm cursor-pointer", children: "Verified Only" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "marketplace.error_state",
        className: "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
        children: error.message
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "marketplace.loading_state", className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-36 animate-pulse rounded-2xl bg-muted/40"
      },
      i
    )) }) : listings && listings.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: listings.map((property, idx) => {
      const isExpanded = expandedCard === property.id;
      const checked = checkedItems[property.id] ?? /* @__PURE__ */ new Set();
      const allChecked = checked.size === SAFE_DEAL_ITEMS.length;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        DepthCard,
        {
          "data-ocid": `marketplace.item.${idx + 1}`,
          className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold truncate", children: property.titleNumber }),
                  property.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1 text-xs", variant: "default", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3" }),
                    " Verified"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs", variant: "secondary", children: "Pending" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: property.location })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-primary", children: [
                  "KES ",
                  property.value.toLocaleString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  property.area,
                  " acres"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: property.status === "active" ? "default" : property.status === "disputed" ? "destructive" : "outline",
                  className: "capitalize",
                  children: property.status
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  "data-ocid": `marketplace.checklist_toggle.${idx + 1}`,
                  className: "text-xs gap-1",
                  onClick: () => toggleExpanded(property.id),
                  children: [
                    isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" }),
                    "Safe Deal Checklist",
                    allChecked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "✓" })
                  ]
                }
              )
            ] }),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 pt-3 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Complete before proceeding:" }),
              SAFE_DEAL_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `marketplace.checklist_item.${i + 1}`,
                  className: "flex items-center gap-2 w-full text-left rounded-lg px-2 py-1.5 hover:bg-white/5 transition-colors",
                  onClick: () => toggleCheck(property.id, i),
                  children: [
                    checked.has(i) ? /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "h-4 w-4 text-green-500 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-sm ${checked.has(i) ? "line-through text-muted-foreground" : ""}`,
                        children: item
                      }
                    )
                  ]
                },
                item
              ))
            ] })
          ] })
        },
        property.id
      );
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "marketplace.empty_state",
        className: "rounded-2xl border border-white/10 bg-card/40 p-12 text-center space-y-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-10 w-10 mx-auto text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: showVerifiedOnly ? "No verified listings available." : "No listings available yet." }),
          showVerifiedOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setShowVerifiedOnly(false),
              children: "Show all listings"
            }
          )
        ]
      }
    )
  ] });
}
export {
  MarketplacePage as default
};
