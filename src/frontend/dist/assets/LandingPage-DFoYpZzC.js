import { u as useNavigate, a as useInternetIdentity, b as useGetCallerUserProfile, j as jsxRuntimeExports, B as Button, S as Search, F as FileText, C as CircleCheckBig, c as Shield, d as Briefcase } from "./index-BY4GfDKL.js";
import { C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { G as GENERATED_ASSETS } from "./GeneratedAssets-CjCe1tUh.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { A as AnimatedKPI } from "./AnimatedKPI-CCJUgMs0.js";
import DashboardPage from "./DashboardPage-D9bnwvw5.js";
import { M as MapPin } from "./map-pin-B7IvRxTD.js";
import "./useSidebarDomainQueries-DBs6GC1m.js";
import "./triangle-alert-CJLPKK-P.js";
import "./plus-CPoLbfbP.js";
import "./calculator-CCf5Li8w.js";
function LandingPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;
  if (isAuthenticated && userProfile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardPage, {});
  }
  const features = [
    {
      icon: Search,
      title: "Land Records Search",
      description: "Search and verify land ownership records instantly with our comprehensive database.",
      action: () => navigate({ to: "/search" })
    },
    {
      icon: FileText,
      title: "Title Registration",
      description: "Register and manage title deeds digitally with full transparency and security.",
      action: () => navigate({ to: "/applications/new" }),
      requiresAuth: true
    },
    {
      icon: Shield,
      title: "Dispute Resolution",
      description: "File and track land disputes with evidence-based documentation and clear outcomes.",
      action: () => navigate({ to: "/applications" }),
      requiresAuth: true
    },
    {
      icon: Briefcase,
      title: "Government Services",
      description: "Access a wide range of land-related and government services in one place.",
      action: () => navigate({ to: "/services" })
    },
    {
      icon: MapPin,
      title: "GIS Documentation",
      description: "Upload geo-tagged photographic evidence to secure and verify land rights.",
      action: () => navigate({ to: "/applications/new" }),
      requiresAuth: true
    },
    {
      icon: CircleCheckBig,
      title: "Public Verification",
      description: "Verify the authenticity and status of land records with reference numbers.",
      action: () => navigate({ to: "/verify" })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "glass-surface relative overflow-hidden rounded-3xl p-12 md:p-16",
        style: {
          backgroundImage: `linear-gradient(135deg, oklch(var(--primary) / 0.15), oklch(var(--background) / 0.95), oklch(var(--accent) / 0.15)), url(${GENERATED_ASSETS.heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-fade-in", children: "Geo Sentinel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 text-lg text-muted-foreground md:text-xl", children: "Transparent, secure, and accessible land ownership and dispute management for all citizens. Eliminate middlemen, reduce corruption, and manage your land rights with confidence." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                onClick: () => navigate({ to: "/search" }),
                className: "btn-lift",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-5 w-5" }),
                  "Search Records"
                ]
              }
            ),
            isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                variant: "outline",
                onClick: () => navigate({ to: "/applications" }),
                className: "btn-lift",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-5 w-5" }),
                  "My Applications"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                variant: "outline",
                onClick: () => navigate({ to: "/verify" }),
                className: "btn-lift",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-2 h-5 w-5" }),
                  "Verify Record"
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-3xl font-bold", children: "Comprehensive Land Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Everything you need for land administration, registration, and dispute resolution" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: features.map((feature, _index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DepthCard,
        {
          onClick: feature.action,
          className: "group transition-all hover:border-primary/50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: feature.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: feature.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                className: "w-full group-hover:bg-primary/10 btn-lift",
                children: "Learn More"
              }
            ) })
          ]
        },
        feature.title
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "glass-surface rounded-3xl p-8 md:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-4xl font-bold text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedKPI, { value: 100, suffix: "%" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Digital Transparency" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-4xl font-bold text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedKPI, { value: 24, suffix: "/7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Service Availability" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-4xl font-bold text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedKPI, { value: 0 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Middlemen Required" })
      ] })
    ] }) })
  ] });
}
export {
  LandingPage as default
};
