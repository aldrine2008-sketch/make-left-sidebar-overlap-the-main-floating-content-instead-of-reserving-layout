import { m as useParams, u as useNavigate, n as useGetApplicationById, r as reactExports, j as jsxRuntimeExports, B as Button, F as FileText, o as Separator, U as User, l as ApplicationStatus } from "./index-BY4GfDKL.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { d as Card, C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { u as useRecordPropertyView } from "./useProfileVerification-DijSG4Cd.js";
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
function LandRecordDetailPage() {
  const { id } = useParams({ from: "/record/$id" });
  const navigate = useNavigate();
  const { data: record, isLoading, error } = useGetApplicationById(id);
  const recordView = useRecordPropertyView();
  reactExports.useEffect(() => {
    if (id) {
      recordView.mutate(id);
    }
  }, [id]);
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
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" }) });
  }
  if (error || !record) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Record Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "The land record you're looking for could not be found." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => navigate({ to: "/search" }),
          className: "w-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
            "Back to Search"
          ]
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => navigate({ to: "/search" }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Land Record Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          "Title Number: ",
          record.titleNumber
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
          "Record Information"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Title Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-lg font-semibold", children: record.titleNumber })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `mt-1 ${statusColors[record.status]}`, children: formatStatus(record.status) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
                record.location
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Area" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: record.area ? `${Number(record.area).toLocaleString()} acres` : "N/A" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Owner" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 font-mono text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
              record.owner.toString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Created" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
                new Date(
                  Number(record.created) / 1e6
                ).toLocaleDateString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Last Updated" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
                new Date(
                  Number(record.updated) / 1e6
                ).toLocaleDateString()
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Attachments" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: record.attachments.length > 0 ? `${record.attachments.length} file${record.attachments.length === 1 ? "" : "s"} attached` : "No attachments" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: record.attachments.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: record.attachments.map((attachment, index) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "w-full justify-start",
              asChild: true,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: attachment.getDirectURL(),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-4 w-4" }),
                    "Attachment ",
                    index + 1
                  ]
                }
              )
            },
            ((_a = attachment.getDirectURL) == null ? void 0 : _a.call(attachment)) ?? `attachment-${index}`
          );
        }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground", children: "No attachments available" }) })
      ] }) })
    ] })
  ] });
}
export {
  LandRecordDetailPage as default
};
