import { m as useParams, u as useNavigate, a as useInternetIdentity, w as useGetApplicationStatus, x as useSubmitApplication, y as useCancelApplication, j as jsxRuntimeExports, q as AccessDeniedScreen, l as ApplicationStatus, B as Button, F as FileText, v as ue } from "./index-BY4GfDKL.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { d as Card, C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { A as ArrowLeft } from "./arrow-left-DcPFt9Xd.js";
import { M as MapPin } from "./map-pin-B7IvRxTD.js";
import { C as Calendar } from "./calendar-DCibv7D4.js";
const statusColors = {
  [ApplicationStatus.draft]: "bg-gray-500",
  [ApplicationStatus.submitted]: "bg-blue-500",
  [ApplicationStatus.underReview]: "bg-yellow-500",
  [ApplicationStatus.approved]: "bg-green-500",
  [ApplicationStatus.rejected]: "bg-red-500",
  [ApplicationStatus.cancelled]: "bg-gray-400"
};
function ApplicationDetailPage() {
  const { id } = useParams({ from: "/applications/$id" });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: status, isLoading } = useGetApplicationStatus(id);
  const submitApplication = useSubmitApplication();
  const cancelApplication = useCancelApplication();
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDeniedScreen, {});
  }
  const formatStatus = (status2) => {
    switch (status2) {
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
        return status2;
    }
  };
  const handleSubmit = async () => {
    try {
      await submitApplication.mutateAsync(id);
      ue.success("Application submitted successfully");
    } catch (error) {
      ue.error("Failed to submit application");
      console.error(error);
    }
  };
  const handleCancel = async () => {
    try {
      await cancelApplication.mutateAsync(id);
      ue.success("Application cancelled");
      navigate({ to: "/applications" });
    } catch (error) {
      ue.error("Failed to cancel application");
      console.error(error);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }) });
  }
  const isDraft = status === ApplicationStatus.draft;
  const canCancel = status === ApplicationStatus.draft || status === ApplicationStatus.submitted;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => navigate({ to: "/applications" }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Application Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          "Application ID: ",
          id
        ] })
      ] }),
      status && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: statusColors[status], children: formatStatus(status) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Application Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Details about this application" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
                "Title Number"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
                "LR/",
                id,
                "/2024"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
                "Location"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Nairobi, Kenya" })
            ] })
          ] }) })
        ] }),
        isDraft && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/50 bg-primary/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Ready to Submit?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Review your application and submit it for processing" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleSubmit,
                disabled: submitApplication.isPending,
                className: "flex-1",
                children: submitApplication.isPending ? "Submitting..." : "Submit Application"
              }
            ),
            canCancel && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: handleCancel,
                disabled: cancelApplication.isPending,
                children: "Cancel"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Timeline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Application history" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Application Created" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: (/* @__PURE__ */ new Date()).toLocaleDateString() })
          ] })
        ] }) }) })
      ] }) })
    ] })
  ] });
}
export {
  ApplicationDetailPage as default
};
