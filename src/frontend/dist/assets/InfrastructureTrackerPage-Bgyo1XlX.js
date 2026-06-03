import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, aD as Construction, L as Label, a3 as Select, a4 as SelectTrigger, a5 as SelectValue, a6 as SelectContent, a7 as SelectItem } from "./index-BY4GfDKL.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { n as useGetInfrastructureTimeline } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { M as MapPin } from "./map-pin-B7IvRxTD.js";
import { C as Clock } from "./clock-DsOZz_96.js";
import { C as CircleCheck } from "./circle-check-BOrScxas.js";
import { Z as Zap } from "./zap-D6StZJ1k.js";
import "./card-Dw7-HZNo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
const KENYA_REGIONS = [
  "All Regions",
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Kiambu",
  "Machakos"
];
const STATUS_ORDER = ["In Progress", "Planned", "Completed"];
function StatusIcon({ status }) {
  if (status === "Completed")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-500" });
  if (status === "In Progress") return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-4 w-4 text-muted-foreground" });
}
function statusBadgeVariant(status) {
  if (status === "In Progress") return "default";
  if (status === "Completed") return "outline";
  return "secondary";
}
function typeIcon(type_) {
  if (type_.toLowerCase().includes("road")) return "🛣️";
  if (type_.toLowerCase().includes("water")) return "💧";
  if (type_.toLowerCase().includes("electric")) return "⚡";
  if (type_.toLowerCase().includes("school") || type_.toLowerCase().includes("education"))
    return "🏫";
  if (type_.toLowerCase().includes("hospital") || type_.toLowerCase().includes("health"))
    return "🏥";
  return "🏗️";
}
function InfrastructureTrackerPage() {
  const [selectedRegion, setSelectedRegion] = reactExports.useState("All Regions");
  const region = selectedRegion === "All Regions" ? null : selectedRegion;
  const {
    data: timeline,
    isLoading,
    error
  } = useGetInfrastructureTimeline(region);
  const grouped = (timeline ?? []).reduce((acc, item) => {
    const key = item.status;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
  const orderedGroups = STATUS_ORDER.filter(
    (s) => grouped[s] && grouped[s].length > 0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Construction, { className: "h-7 w-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Infrastructure Tracker" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Government & development projects near land" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "infra-region",
            className: "text-xs text-muted-foreground",
            children: "Region"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedRegion, onValueChange: setSelectedRegion, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              id: "infra-region",
              "data-ocid": "infrastructure.region.select",
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
        "data-ocid": "infrastructure.error_state",
        className: "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
        children: error.message
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "infrastructure.loading_state", className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-28 animate-pulse rounded-2xl bg-muted/40"
      },
      i
    )) }) : timeline && timeline.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: orderedGroups.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground", children: status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusBadgeVariant(status), className: "text-xs", children: grouped[status].length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative pl-5 border-l-2 border-white/10 space-y-3", children: grouped[status].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        DepthCard,
        {
          "data-ocid": `infrastructure.item.${idx + 1}`,
          className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: typeIcon(item.type) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs py-0", children: item.region })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: statusBadgeVariant(item.status),
                  className: "shrink-0 text-xs",
                  children: item.status
                }
              )
            ] }),
            item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: item.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Start: ",
                  item.startDate
                ] })
              ] }),
              item.endDate != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "End:",
                " ",
                new Date(
                  Number(item.endDate) / 1e6
                ).toLocaleDateString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto", children: [
                "Impact: ",
                item.impactRadius,
                "km"
              ] })
            ] })
          ] })
        },
        item.id
      )) })
    ] }, status)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "infrastructure.empty_state",
        className: "rounded-2xl border border-white/10 bg-card/40 p-12 text-center space-y-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Construction, { className: "h-10 w-10 mx-auto text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No infrastructure projects found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: selectedRegion !== "All Regions" ? `No projects tracked in ${selectedRegion} yet.` : "Government and development projects will appear here." })
        ]
      }
    )
  ] });
}
export {
  InfrastructureTrackerPage as default
};
