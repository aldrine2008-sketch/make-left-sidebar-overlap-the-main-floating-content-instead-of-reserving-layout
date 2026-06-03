import { u as useNavigate, a as useInternetIdentity, p as useGetMyApplications, j as jsxRuntimeExports, q as AccessDeniedScreen, B as Button, F as FileText, s as SkeletonBlock, l as ApplicationStatus } from "./index-BY4GfDKL.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CY9grIeY.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { P as Plus } from "./plus-CPoLbfbP.js";
const statusColors = {
  [ApplicationStatus.draft]: "bg-gray-500",
  [ApplicationStatus.submitted]: "bg-blue-500",
  [ApplicationStatus.underReview]: "bg-yellow-500",
  [ApplicationStatus.approved]: "bg-green-500",
  [ApplicationStatus.rejected]: "bg-red-500",
  [ApplicationStatus.cancelled]: "bg-gray-400"
};
function MyApplicationsPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: applications, isLoading } = useGetMyApplications();
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDeniedScreen, {});
  }
  const formatStatus = (status) => {
    switch (status) {
      case ApplicationStatus.draft:
        return "Draft";
      case ApplicationStatus.submitted:
        return "Submitted";
      case ApplicationStatus.underReview:
        return "Under Review";
      case ApplicationStatus.approved:
        return "Approved";
      case ApplicationStatus.rejected:
        return "Rejected";
      case ApplicationStatus.cancelled:
        return "Cancelled";
      default:
        return status;
    }
  };
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp) / 1e6).toLocaleDateString();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-3xl font-bold", children: "My Applications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Track and manage your land service applications" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => navigate({ to: "/applications/new" }),
          className: "btn-lift",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
            "New Application"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
          "Applications"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: isLoading ? "Loading..." : `${(applications == null ? void 0 : applications.length) || 0} application(s)` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-12 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-16 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-16 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-16 w-full" })
      ] }) : applications && applications.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: applications.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "transition-colors hover:bg-muted/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: app.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: app.titleNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: app.location }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: statusColors[app.status], children: formatStatus(app.status) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatDate(app.created) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => navigate({ to: `/applications/${app.id}` }),
                  className: "btn-lift",
                  children: "View"
                }
              ) })
            ]
          },
          app.id
        )) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-muted-foreground", children: "No applications yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => navigate({ to: "/applications/new" }),
            className: "btn-lift",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
              "Create Your First Application"
            ]
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  MyApplicationsPage as default
};
