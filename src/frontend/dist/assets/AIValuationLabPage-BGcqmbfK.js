import { r as reactExports, j as jsxRuntimeExports, aC as Brain, L as Label, I as Input, B as Button, _ as TrendingUp } from "./index-BY4GfDKL.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { A as AnimatedKPI } from "./AnimatedKPI-CCJUgMs0.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { P as Progress } from "./progress-CuKB3Dga.js";
import { e as useCalculateValuation, f as useCalculateInvestment } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { C as CircleCheck } from "./circle-check-BOrScxas.js";
import { C as Calculator } from "./calculator-CCf5Li8w.js";
import "./card-Dw7-HZNo.js";
function AIValuationLabPage() {
  const [location, setLocation] = reactExports.useState("");
  const [landSize, setLandSize] = reactExports.useState("");
  const [roadAccess, setRoadAccess] = reactExports.useState(false);
  const [amenities, setAmenities] = reactExports.useState("");
  const [valuationInput, setValuationInput] = reactExports.useState(
    null
  );
  const [buyingPrice, setBuyingPrice] = reactExports.useState("");
  const [growthRate, setGrowthRate] = reactExports.useState("");
  const [years, setYears] = reactExports.useState("");
  const [investmentInput, setInvestmentInput] = reactExports.useState(null);
  const {
    data: valuation,
    isLoading: valuationLoading,
    error: valuationError
  } = useCalculateValuation(valuationInput);
  const {
    data: investment,
    isLoading: investmentLoading,
    error: investmentError
  } = useCalculateInvestment(investmentInput);
  const handleValuationSubmit = (e) => {
    e.preventDefault();
    if (!location.trim() || !landSize.trim()) return;
    const amenityList = amenities.split(",").map((a) => a.trim()).filter(Boolean);
    setValuationInput({
      location: location.trim(),
      landSizeAcres: Number.parseFloat(landSize),
      roadAccess,
      nearbyAmenities: amenityList
    });
  };
  const handleInvestmentSubmit = (e) => {
    e.preventDefault();
    if (!buyingPrice.trim() || !growthRate.trim() || !years.trim()) return;
    setInvestmentInput({
      buyingPriceKES: Number.parseFloat(buyingPrice),
      annualGrowthRatePercent: Number.parseFloat(growthRate),
      investmentYears: BigInt(Number.parseInt(years, 10))
    });
  };
  const potentialBadgeVariant = (potential) => {
    if (potential === "High" || potential === "Excellent") return "default";
    if (potential === "Low" || potential === "Poor") return "destructive";
    return "secondary";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen p-6 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-7 w-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "AI Valuation Lab" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Intelligent land valuation & investment analysis" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Quick Valuation" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleValuationSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "v-location", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "v-location",
                "data-ocid": "valuation.location.input",
                placeholder: "e.g. Nairobi, Westlands",
                value: location,
                onChange: (e) => setLocation(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "v-size", children: "Land Size (acres)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "v-size",
                "data-ocid": "valuation.land_size.input",
                type: "number",
                step: "0.01",
                min: "0",
                placeholder: "e.g. 0.5",
                value: landSize,
                onChange: (e) => setLandSize(e.target.value),
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "v-amenities", children: "Nearby Amenities (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "v-amenities",
              "data-ocid": "valuation.amenities.input",
              placeholder: "e.g. School, Hospital, Tarmac road",
              value: amenities,
              onChange: (e) => setAmenities(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "v-road",
              "data-ocid": "valuation.road_access.checkbox",
              type: "checkbox",
              className: "h-4 w-4 rounded border-border accent-primary",
              checked: roadAccess,
              onChange: (e) => setRoadAccess(e.target.checked)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "v-road", className: "cursor-pointer", children: "Road Access Available" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "valuation.submit_button",
            className: "w-full",
            disabled: valuationLoading,
            children: valuationLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" }),
              "Calculating..."
            ] }) : "Calculate Valuation"
          }
        )
      ] }),
      valuationError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "valuation.error_state",
          className: "rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
          children: valuationError.message
        }
      ),
      valuation && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "valuation.success_state",
          className: "mt-4 space-y-4 border-t border-white/10 pt-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: "Valuation Result" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary/5 border border-primary/20 p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Estimated Market Value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AnimatedKPI,
                {
                  value: Number(valuation.estimatedValueKES),
                  prefix: "KES ",
                  className: "text-3xl font-bold text-primary"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card/40 border border-white/10 p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Potential" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: potentialBadgeVariant(
                      valuation.investmentPotential
                    ),
                    children: valuation.investmentPotential
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card/40 border border-white/10 p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Growth Forecast" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-green-500", children: [
                  "+",
                  valuation.growthForecastPercent.toFixed(1),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card/40 border border-white/10 p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Confidence" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold", children: [
                  valuation.confidenceScore.toFixed(0),
                  "%"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Confidence Score" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  valuation.confidenceScore.toFixed(0),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: valuation.confidenceScore, className: "h-2" })
            ] }),
            valuation.comparableProperties.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Comparable Properties" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: valuation.comparableProperties.map((cp) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: cp }, cp)) })
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DepthCard, { className: "bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Investment Calculator" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleInvestmentSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "i-price", children: "Buying Price (KES)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "i-price",
                "data-ocid": "investment.buying_price.input",
                type: "number",
                min: "0",
                placeholder: "e.g. 5000000",
                value: buyingPrice,
                onChange: (e) => setBuyingPrice(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "i-rate", children: "Annual Growth Rate (%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "i-rate",
                "data-ocid": "investment.growth_rate.input",
                type: "number",
                step: "0.1",
                min: "0",
                placeholder: "e.g. 8.5",
                value: growthRate,
                onChange: (e) => setGrowthRate(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "i-years", children: "Investment Years" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "i-years",
                "data-ocid": "investment.years.input",
                type: "number",
                min: "1",
                placeholder: "e.g. 5",
                value: years,
                onChange: (e) => setYears(e.target.value),
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "investment.submit_button",
            className: "w-full",
            disabled: investmentLoading,
            children: investmentLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" }),
              "Calculating ROI..."
            ] }) : "Calculate ROI"
          }
        )
      ] }),
      investmentError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "investment.error_state",
          className: "rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
          children: investmentError.message
        }
      ),
      investment && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "investment.success_state",
          className: "mt-4 space-y-4 border-t border-white/10 pt-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: "ROI Analysis" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary/5 border border-primary/20 p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Projected Value" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AnimatedKPI,
                  {
                    value: Number(investment.projectedValueKES),
                    prefix: "KES ",
                    className: "text-lg font-bold text-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-green-500/5 border border-green-500/20 p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Profit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AnimatedKPI,
                  {
                    value: Number(investment.profitKES),
                    prefix: "KES ",
                    className: "text-lg font-bold text-green-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card/40 border border-white/10 p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "ROI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold", children: [
                  investment.roiPercent.toFixed(1),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card/40 border border-white/10 p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Break-even" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold", children: [
                  investment.breakEvenYears.toFixed(1),
                  " yrs"
                ] })
              ] })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  AIValuationLabPage as default
};
