import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, c as Shield, az as ChevronUp, aA as ChevronDown, F as FileText } from "./index-BY4GfDKL.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { g as useGetRiskIntelligence, h as useCreateDispute, i as useGetDisputeTimeline, j as useGetDisputeEvidence, k as useAddDisputeEvidence } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { P as Plus } from "./plus-CPoLbfbP.js";
import { C as Clock } from "./clock-DsOZz_96.js";
import "./card-Dw7-HZNo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function RiskScoreMeter({ score }) {
  const color = score < 3 ? "#22c55e" : score < 6 ? "#f59e0b" : "#ef4444";
  const angle = score / 10 * 180;
  const r = 40;
  const cx = 50;
  const cy = 50;
  const startX = cx - r;
  const startY = cy;
  const endX = cx + r * Math.cos(Math.PI * angle / 180 - Math.PI);
  const endY = cy + r * Math.sin(Math.PI * angle / 180 - Math.PI) * -1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 60", className: "w-32 h-20", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${cx + r} ${startY}`,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "8",
          strokeLinecap: "round",
          className: "text-border/30"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: `M ${startX} ${startY} A ${r} ${r} 0 ${angle > 180 ? 1 : 0} 1 ${endX} ${endY}`,
          fill: "none",
          stroke: color,
          strokeWidth: "8",
          strokeLinecap: "round"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "text",
        {
          x: "50",
          y: "52",
          textAnchor: "middle",
          fontSize: "14",
          fill: color,
          fontWeight: "bold",
          children: score.toFixed(1)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Overall Risk Score / 10" })
  ] });
}
function DisputeDetail({ disputeId }) {
  const { data: timeline } = useGetDisputeTimeline(disputeId);
  const { data: evidence } = useGetDisputeEvidence(disputeId);
  const addEvidence = useAddDisputeEvidence();
  const [form, setForm] = reactExports.useState({
    fileId: "",
    fileName: "",
    description: "",
    fileSize: "0"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/20 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-2", children: "Timeline" }),
      !(timeline == null ? void 0 : timeline.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No timeline events." }) : timeline.map(
        (e, _i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-2 text-xs mb-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Clock,
                {
                  size: 10,
                  className: "mt-0.5 text-muted-foreground shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: e.eventType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-2", children: e.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: new Date(Number(e.timestamp) / 1e6).toLocaleString() })
              ] })
            ]
          },
          `timeline-${e.eventType}-${e.timestamp}`
        )
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground mb-2", children: [
        "Evidence (",
        (evidence == null ? void 0 : evidence.length) ?? 0,
        " files)"
      ] }),
      evidence == null ? void 0 : evidence.map(
        (ev) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 text-xs mb-1 p-2 rounded-lg bg-card/30",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ev.fileName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-auto", children: [
                Math.round(Number(ev.fileSize) / 1024),
                "KB"
              ] })
            ]
          },
          ev.id
        )
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold", children: "Upload Evidence" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "w-full text-xs p-2 rounded-lg bg-input border border-border/30",
          placeholder: "File ID",
          value: form.fileId,
          onChange: (e) => setForm((f) => ({ ...f, fileId: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "w-full text-xs p-2 rounded-lg bg-input border border-border/30",
          placeholder: "File name",
          value: form.fileName,
          onChange: (e) => setForm((f) => ({ ...f, fileName: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "w-full text-xs p-2 rounded-lg bg-input border border-border/30",
          placeholder: "Description",
          value: form.description,
          onChange: (e) => setForm((f) => ({ ...f, description: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => addEvidence.mutate({
            disputeId,
            fileId: form.fileId,
            fileName: form.fileName,
            fileSize: BigInt(Number.parseInt(form.fileSize) || 0),
            description: form.description
          }),
          className: "flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 12 }),
            " ",
            addEvidence.isPending ? "Uploading..." : "Upload"
          ]
        }
      )
    ] })
  ] });
}
function RiskIntelligencePage() {
  var _a, _b, _c;
  const { data: risk, isLoading } = useGetRiskIntelligence();
  const createDispute = useCreateDispute();
  const [expanded, setExpanded] = reactExports.useState(null);
  const [showNewForm, setShowNewForm] = reactExports.useState(false);
  const [newDispute, setNewDispute] = reactExports.useState({ propertyId: "", reason: "" });
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3 animate-pulse", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 rounded-2xl bg-card/40" }, i)) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 20, className: "text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold", children: "Risk Intelligence" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "p-4 flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskScoreMeter, { score: (risk == null ? void 0 : risk.riskScore) ?? 0 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-red-500", children: Number((risk == null ? void 0 : risk.fraudAlertCount) ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Fraud Alerts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-amber-500", children: ((_a = risk == null ? void 0 : risk.highRiskProperties) == null ? void 0 : _a.length) ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "High Risk Properties" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-primary", children: ((_b = risk == null ? void 0 : risk.recentDisputes) == null ? void 0 : _b.length) ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Active Disputes" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Dispute Tracker" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowNewForm((f) => !f),
            className: "flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
              " New Dispute"
            ]
          }
        )
      ] }),
      showNewForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 rounded-xl bg-card/30 border border-border/20 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "w-full text-xs p-2 rounded-lg bg-input border border-border/30",
            placeholder: "Property ID",
            value: newDispute.propertyId,
            onChange: (e) => setNewDispute((d) => ({ ...d, propertyId: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: "w-full text-xs p-2 rounded-lg bg-input border border-border/30 resize-none",
            rows: 2,
            placeholder: "Reason for dispute",
            value: newDispute.reason,
            onChange: (e) => setNewDispute((d) => ({ ...d, reason: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              createDispute.mutate({
                id: crypto.randomUUID(),
                propertyId: newDispute.propertyId,
                reason: newDispute.reason,
                status: { open: null },
                created: BigInt(0),
                updated: BigInt(0),
                initiator: "",
                comments: []
              });
              setShowNewForm(false);
            },
            className: "text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90",
            children: createDispute.isPending ? "Filing..." : "File Dispute"
          }
        )
      ] }),
      !((_c = risk == null ? void 0 : risk.recentDisputes) == null ? void 0 : _c.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-4", children: "No active disputes." }) : risk.recentDisputes.map(
        (d) => {
          const statusColor = d.status === "open" ? "text-red-500 bg-red-500/10" : d.status === "underReview" ? "text-amber-500 bg-amber-500/10" : "text-emerald-500 bg-emerald-500/10";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "border border-border/20 rounded-xl p-3 mb-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono", children: d.propertyId }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: d.reason })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor}`,
                      children: d.status
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpanded((prev) => prev === d.id ? null : d.id),
                    className: "flex items-center gap-1 text-[10px] text-muted-foreground mt-2 hover:text-foreground",
                    children: [
                      expanded === d.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 10 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 10 }),
                      expanded === d.id ? "Hide" : "View",
                      " details"
                    ]
                  }
                ),
                expanded === d.id && /* @__PURE__ */ jsxRuntimeExports.jsx(DisputeDetail, { disputeId: d.id })
              ]
            },
            d.id
          );
        }
      )
    ] })
  ] });
}
export {
  RiskIntelligencePage as default
};
