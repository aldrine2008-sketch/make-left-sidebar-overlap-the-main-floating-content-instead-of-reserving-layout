import { ay as useListTransactions, j as jsxRuntimeExports, R as ArrowLeftRight, r as reactExports, b as useGetCallerUserProfile, G as DomainRole, az as ChevronUp, aA as ChevronDown, aB as Check } from "./index-BY4GfDKL.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { a as useGetTransactionStageHistory, b as useAdvanceTransactionStage } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { C as Clock } from "./clock-DsOZz_96.js";
import "./card-Dw7-HZNo.js";
const STAGES = [
  { key: "proposed", label: "Proposed" },
  { key: "escrow", label: "Escrow" },
  { key: "stampDuty", label: "Stamp Duty" },
  { key: "recorded", label: "Recorded" },
  { key: "completed", label: "Completed" }
];
function StageProgress({ currentStage }) {
  const currentIdx = STAGES.findIndex((s) => s.key === currentStage);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 my-3", children: STAGES.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${i < currentIdx ? "bg-emerald-500 border-emerald-500 text-white" : i === currentIdx ? "bg-primary border-primary text-primary-foreground animate-pulse" : "bg-card/40 border-border/30 text-muted-foreground"}`,
        children: i < currentIdx ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) : i + 1
      }
    ),
    i < STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-0.5 w-8 mx-0.5 transition-all ${i < currentIdx ? "bg-emerald-500" : "bg-border/30"}`
      }
    )
  ] }, s.key)) });
}
function TransactionCard({ tx }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const { data: stageHistory } = useGetTransactionStageHistory(tx.id);
  const advanceStage = useAdvanceTransactionStage();
  const { data: userProfile } = useGetCallerUserProfile();
  const isOfficerOrAdmin = (userProfile == null ? void 0 : userProfile.role) === DomainRole.landOfficer || (userProfile == null ? void 0 : userProfile.role) === DomainRole.admin;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { className: "p-5 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Property" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-sm", children: tx.propertyId })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-primary", children: [
          "KES ",
          Number(tx.price).toLocaleString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StageProgress, { currentStage: tx.status }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-3", children: [
      "Current stage:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium capitalize", children: tx.status })
    ] }),
    isOfficerOrAdmin && tx.status !== "completed" && tx.status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => advanceStage.mutate({
          transactionId: tx.id,
          notes: "Advanced via dashboard"
        }),
        disabled: advanceStage.isPending,
        className: "text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors mb-3",
        children: advanceStage.isPending ? "Advancing..." : "Advance to Next Stage"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setExpanded((e) => !e),
        className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
        children: [
          expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 12 }),
          expanded ? "Hide history" : "Show stage history"
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2 border-t border-border/20 pt-3", children: !(stageHistory == null ? void 0 : stageHistory.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No stage history yet." }) : stageHistory.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-2 text-xs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Clock,
            {
              size: 10,
              className: "mt-0.5 text-muted-foreground shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium capitalize", children: entry.stage }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-2", children: entry.notes }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: new Date(
              Number(entry.timestamp) / 1e6
            ).toLocaleString() })
          ] })
        ]
      },
      String(entry.timestamp)
    )) })
  ] });
}
function TransactionWorkflowPage() {
  const { data: transactions, isLoading } = useListTransactions();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-4 animate-pulse", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-2xl bg-card/40" }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { size: 24, className: "text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Transaction Workflow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track land transaction stages and progression" })
      ] })
    ] }),
    !(transactions == null ? void 0 : transactions.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArrowLeftRight,
        {
          size: 40,
          className: "mx-auto mb-3 text-muted-foreground/40"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No transactions found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Transactions appear when land transfers are initiated." })
    ] }) : transactions.map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionCard, { tx }, tx.id))
  ] });
}
export {
  TransactionWorkflowPage as default
};
