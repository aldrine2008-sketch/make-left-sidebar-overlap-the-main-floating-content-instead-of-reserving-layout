import { j as jsxRuntimeExports, _ as TrendingUp } from "./index-BY4GfDKL.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { A as AnimatedKPI } from "./AnimatedKPI-CCJUgMs0.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { m as useGetPortfolioSummary } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { C as ChartColumn } from "./chart-column-B6lWExek.js";
import { D as DollarSign } from "./dollar-sign-CP1Vs9qv.js";
import { C as CircleCheck } from "./circle-check-BOrScxas.js";
import { T as TriangleAlert } from "./triangle-alert-CJLPKK-P.js";
import "./card-Dw7-HZNo.js";
function InvestmentPortfolioPage() {
  const { data: portfolio, isLoading, error } = useGetPortfolioSummary();
  const totalProperties = (portfolio == null ? void 0 : portfolio.properties.length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-7 w-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Investment Portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your land asset performance overview" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "portfolio.error_state",
        className: "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
        children: error.message
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "portfolio.loading_state", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-24 animate-pulse rounded-2xl bg-muted/40"
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 animate-pulse rounded-2xl bg-muted/40" })
    ] }) : portfolio ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total Value" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnimatedKPI,
            {
              value: Number(portfolio.totalEstimatedValue),
              prefix: "KES ",
              className: "text-2xl font-bold"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-green-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Annual Growth" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-green-500", children: [
            "+",
            portfolio.annualGrowthRate.toFixed(1),
            "%"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Risk Distribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-green-500 mx-auto mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Low Risk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedKPI,
              {
                value: Number(portfolio.riskDistribution.low),
                className: "text-xl font-bold text-green-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-yellow-500 mx-auto mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Medium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedKPI,
              {
                value: Number(portfolio.riskDistribution.medium),
                className: "text-xl font-bold text-yellow-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-destructive mx-auto mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "High Risk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedKPI,
              {
                value: Number(portfolio.riskDistribution.high),
                className: "text-xl font-bold text-destructive"
              }
            )
          ] })
        ] })
      ] }) }),
      totalProperties > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold", children: [
          "Properties (",
          totalProperties,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: portfolio.properties.map((property, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `portfolio.item.${idx + 1}`,
            className: "flex items-center justify-between rounded-xl bg-card/40 border border-white/10 px-4 py-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: property.titleNumber }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: property.location })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: property.status === "active" ? "default" : property.status === "disputed" ? "destructive" : "outline",
                    className: "capitalize text-xs",
                    children: property.status
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold tabular-nums", children: [
                  "KES ",
                  property.value.toLocaleString()
                ] })
              ] })
            ]
          },
          property.id
        )) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "portfolio.empty_state",
          className: "rounded-2xl border border-white/10 bg-card/40 p-10 text-center space-y-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-10 w-10 mx-auto text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No properties in your portfolio." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Add properties to track your portfolio performance." })
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "portfolio.empty_state",
        className: "rounded-2xl border border-white/10 bg-card/40 p-10 text-center space-y-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-10 w-10 mx-auto text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No portfolio data available." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Your investment summary will appear here once properties are added." })
        ]
      }
    )
  ] });
}
export {
  InvestmentPortfolioPage as default
};
