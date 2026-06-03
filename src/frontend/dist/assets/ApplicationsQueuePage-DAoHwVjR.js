import { e as createLucideIcon, u as useNavigate, b as useGetCallerUserProfile, r as reactExports, z as useGetApplicationsByStatus, l as ApplicationStatus, D as useApproveApplication, E as useRejectApplication, G as DomainRole, j as jsxRuntimeExports, q as AccessDeniedScreen, H as Dialog, J as DialogContent, K as DialogHeader, M as DialogTitle, N as DialogDescription, L as Label, O as DialogFooter, B as Button, v as ue, s as SkeletonBlock, C as CircleCheckBig } from "./index-BY4GfDKL.js";
import { C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CY9grIeY.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-mmhG8-YG.js";
import { T as Textarea } from "./textarea-0FUjE7nH.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { C as Clock } from "./clock-DsOZz_96.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function ApplicationsQueuePage() {
  var _a, _b;
  const navigate = useNavigate();
  const { data: userProfile } = useGetCallerUserProfile();
  const [rejectDialogOpen, setRejectDialogOpen] = reactExports.useState(false);
  const [selectedAppId, setSelectedAppId] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const submittedApps = useGetApplicationsByStatus(ApplicationStatus.submitted);
  const underReviewApps = useGetApplicationsByStatus(
    ApplicationStatus.underReview
  );
  const approveApplication = useApproveApplication();
  const rejectApplication = useRejectApplication();
  const isLandOfficerOrAdmin = (userProfile == null ? void 0 : userProfile.role) === DomainRole.landOfficer || (userProfile == null ? void 0 : userProfile.role) === DomainRole.admin;
  if (!isLandOfficerOrAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDeniedScreen, {});
  }
  const handleApprove = async (appId) => {
    try {
      await approveApplication.mutateAsync(appId);
      ue.success("Application approved");
    } catch (error) {
      ue.error("Failed to approve application");
      console.error(error);
    }
  };
  const handleRejectClick = (appId) => {
    setSelectedAppId(appId);
    setRejectDialogOpen(true);
  };
  const handleRejectConfirm = async () => {
    if (!selectedAppId || !rejectReason.trim()) {
      ue.error("Please provide a reason for rejection");
      return;
    }
    try {
      await rejectApplication.mutateAsync({
        appId: selectedAppId,
        reason: rejectReason
      });
      ue.success("Application rejected");
      setRejectDialogOpen(false);
      setRejectReason("");
      setSelectedAppId(null);
    } catch (error) {
      ue.error("Failed to reject application");
      console.error(error);
    }
  };
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp) / 1e6).toLocaleDateString();
  };
  const renderApplicationsTable = (applications, isLoading) => {
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-12 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-16 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-16 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-16 w-full" })
      ] });
    }
    if (!applications || applications.length === 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mx-auto mb-4 h-12 w-12 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No applications in this queue" })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Submitted" }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatDate(app.created) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => navigate({ to: `/applications/${app.id}` }),
                  className: "btn-lift",
                  children: "View"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "default",
                  onClick: () => handleApprove(app.id),
                  disabled: approveApplication.isPending,
                  className: "btn-lift",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-1 h-3 w-3" }),
                    "Approve"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "destructive",
                  onClick: () => handleRejectClick(app.id),
                  disabled: rejectApplication.isPending,
                  className: "btn-lift",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mr-1 h-3 w-3" }),
                    "Reject"
                  ]
                }
              )
            ] }) })
          ]
        },
        app.id
      )) })
    ] }) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Applications Queue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Review and process land service applications" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "submitted", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "submitted", children: [
          "Submitted (",
          ((_a = submittedApps.data) == null ? void 0 : _a.length) || 0,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "underReview", children: [
          "Under Review (",
          ((_b = underReviewApps.data) == null ? void 0 : _b.length) || 0,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "submitted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Submitted Applications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Applications awaiting initial review" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: renderApplicationsTable(
          submittedApps.data,
          submittedApps.isLoading
        ) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "underReview", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DepthCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Under Review" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Applications currently being processed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: renderApplicationsTable(
          underReviewApps.data,
          underReviewApps.isLoading
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: rejectDialogOpen, onOpenChange: setRejectDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reject Application" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Please provide a reason for rejecting this application" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reason", children: "Rejection Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "reason",
            placeholder: "Enter reason for rejection...",
            value: rejectReason,
            onChange: (e) => setRejectReason(e.target.value),
            rows: 4
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setRejectDialogOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            onClick: handleRejectConfirm,
            disabled: !rejectReason.trim() || rejectApplication.isPending,
            children: rejectApplication.isPending ? "Rejecting..." : "Reject Application"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ApplicationsQueuePage as default
};
