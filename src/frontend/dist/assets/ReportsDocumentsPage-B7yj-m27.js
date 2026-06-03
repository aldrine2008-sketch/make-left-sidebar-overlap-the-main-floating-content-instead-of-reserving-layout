import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, F as FileText, L as Label, I as Input, B as Button, v as ue } from "./index-BY4GfDKL.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { l as useGeneratePropertyReport } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { L as LoaderCircle } from "./loader-circle-CUt6rkL4.js";
import { D as Download } from "./download-BZJSUSw1.js";
import "./card-Dw7-HZNo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    { d: "M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3", key: "ms7g94" }
  ],
  ["path", { d: "m9 18-1.5-1.5", key: "1j6qii" }],
  ["circle", { cx: "5", cy: "14", r: "3", key: "ufru5t" }]
];
const FileSearch = createLucideIcon("file-search", __iconNode);
function downloadReport(entry) {
  const content = entry.report.content;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `report-${entry.propertyId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
function ReportSection({ line }) {
  const isHeader = line.startsWith("==") || line.startsWith("--") || line.toUpperCase() === line.trim();
  if (isHeader) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 pb-1 border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: line.replace(/[=\-]/g, "").trim() }) });
  }
  if (!line.trim()) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: line });
}
function ReportsDocumentsPage() {
  const [propertyId, setPropertyId] = reactExports.useState("");
  const [history, setHistory] = reactExports.useState([]);
  const [activeReport, setActiveReport] = reactExports.useState(null);
  const generateReport = useGeneratePropertyReport();
  const handleGenerate = async (e) => {
    e.preventDefault();
    const pid = propertyId.trim();
    if (!pid) return;
    try {
      const report = await generateReport.mutateAsync(pid);
      const entry = {
        propertyId: pid,
        report,
        generatedAt: /* @__PURE__ */ new Date()
      };
      setHistory((prev) => [entry, ...prev]);
      setActiveReport(entry);
      setPropertyId("");
      ue.success(`Report generated for ${pid}`);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to generate report"
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-7 w-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Reports & Documents" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Generate comprehensive property intelligence reports" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileSearch, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Generate Property Report" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleGenerate, className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "report-pid",
              className: "text-xs text-muted-foreground",
              children: "Property ID"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "report-pid",
              "data-ocid": "reports.property_id.input",
              placeholder: "e.g. PROP-001 or title number",
              value: propertyId,
              onChange: (e) => setPropertyId(e.target.value),
              required: true,
              disabled: generateReport.isPending
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "reports.generate.submit_button",
            disabled: generateReport.isPending || !propertyId.trim(),
            className: "gap-2",
            children: generateReport.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              "Generating..."
            ] }) : "Generate Report"
          }
        ) })
      ] }),
      generateReport.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "reports.error_state",
          className: "rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
          children: generateReport.error.message
        }
      )
    ] }) }),
    history.length > 0 && !activeReport && /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Session History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: history.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `reports.history.item.${idx + 1}`,
          className: "flex items-center justify-between w-full rounded-xl bg-card/40 border border-white/10 px-4 py-2 hover:bg-white/5 transition-colors",
          onClick: () => setActiveReport(entry),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: entry.propertyId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: entry.generatedAt.toLocaleTimeString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" })
          ]
        },
        entry.generatedAt.getTime()
      )) })
    ] }) }),
    activeReport ? /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold", children: [
            "Report: ",
            activeReport.propertyId
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Generated ",
            activeReport.generatedAt.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          history.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              "data-ocid": "reports.back_button",
              onClick: () => setActiveReport(null),
              children: "← History"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "reports.download.button",
              className: "gap-2",
              onClick: () => downloadReport(activeReport),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                "Download"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "reports.report.panel",
          className: "max-h-[60vh] overflow-y-auto rounded-xl bg-card/30 border border-white/10 p-4 space-y-1",
          children: activeReport.report.content.split("\n").map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReportSection,
            {
              line
            },
            `report-line-${i}-${line.slice(0, 8)}`
          ))
        }
      )
    ] }) }) : history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "reports.empty_state",
        className: "rounded-2xl border border-white/10 bg-card/40 p-12 text-center space-y-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileSearch, { className: "h-10 w-10 mx-auto text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Enter a property ID to generate a comprehensive report." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Reports include ownership history, dispute records, market value, and nearby infrastructure." })
        ]
      }
    ) : null
  ] });
}
export {
  ReportsDocumentsPage as default
};
