import { r as reactExports, w as useGetApplicationStatus, j as jsxRuntimeExports, L as Label, I as Input, B as Button, S as Search, A as Alert, g as AlertDescription, C as CircleCheckBig, l as ApplicationStatus } from "./index-BY4GfDKL.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { d as Card, C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { S as ShieldCheck } from "./shield-check-CclAPn2H.js";
const statusColors = {
  [ApplicationStatus.draft]: "bg-gray-500",
  [ApplicationStatus.submitted]: "bg-blue-500",
  [ApplicationStatus.underReview]: "bg-yellow-500",
  [ApplicationStatus.approved]: "bg-green-500",
  [ApplicationStatus.rejected]: "bg-red-500",
  [ApplicationStatus.cancelled]: "bg-gray-400"
};
function VerificationPage() {
  const [referenceNumber, setReferenceNumber] = reactExports.useState("");
  const [searchTriggered, setSearchTriggered] = reactExports.useState(false);
  const {
    data: status,
    isLoading,
    error
  } = useGetApplicationStatus(searchTriggered ? referenceNumber : "");
  const handleSearch = (e) => {
    e.preventDefault();
    if (referenceNumber.trim()) {
      setSearchTriggered(true);
    }
  };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-8 w-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Public Verification" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Verify the authenticity and status of land records using a reference number" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Verify Record" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Enter an application or record reference number to check its status" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reference", children: "Reference Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "reference",
              placeholder: "e.g., 1, 2, 3...",
              value: referenceNumber,
              onChange: (e) => {
                setReferenceNumber(e.target.value);
                setSearchTriggered(false);
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: !referenceNumber.trim() || isLoading,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4" }),
              isLoading ? "Verifying..." : "Verify"
            ]
          }
        )
      ] }) })
    ] }),
    searchTriggered && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: error ? /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Record not found. Please check the reference number and try again." }) }) : status ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/50 bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-primary" }),
          "Verification Result"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Record found and verified" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Reference Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: referenceNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Current Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: statusColors[status], children: formatStatus(status) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDescription, { children: [
          "This record has been verified as authentic. The information shown is current as of ",
          (/* @__PURE__ */ new Date()).toLocaleString(),
          "."
        ] }) })
      ] })
    ] }) : null })
  ] });
}
export {
  VerificationPage as default
};
