import { u as useNavigate, r as reactExports, h as useSearchApplicationsByTitleNumber, i as useSearchApplicationsByLocation, k as useRecordSearch, j as jsxRuntimeExports, F as FileText, L as Label, I as Input, B as Button, S as Search, l as ApplicationStatus } from "./index-BY4GfDKL.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { d as Card, C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CY9grIeY.js";
import { M as MapPin } from "./map-pin-B7IvRxTD.js";
const statusColors = {
  [ApplicationStatus.draft]: "bg-gray-500",
  [ApplicationStatus.submitted]: "bg-blue-500",
  [ApplicationStatus.underReview]: "bg-yellow-500",
  [ApplicationStatus.approved]: "bg-green-500",
  [ApplicationStatus.rejected]: "bg-red-500",
  [ApplicationStatus.cancelled]: "bg-gray-400"
};
function LandSearchPage() {
  const navigate = useNavigate();
  const [titleNumber, setTitleNumber] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const [searchType, setSearchType] = reactExports.useState(
    null
  );
  const titleSearch = useSearchApplicationsByTitleNumber(
    searchType === "title" ? titleNumber : ""
  );
  const locationSearch = useSearchApplicationsByLocation(
    searchType === "location" ? location : ""
  );
  const recordSearchMutation = useRecordSearch();
  const results = searchType === "title" ? titleSearch.data : searchType === "location" ? locationSearch.data : [];
  const isLoading = titleSearch.isLoading || locationSearch.isLoading;
  const handleTitleSearch = (e) => {
    e.preventDefault();
    if (titleNumber.trim()) {
      setSearchType("title");
    }
  };
  const handleLocationSearch = (e) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation && trimmedLocation.length >= 2) {
      setSearchType("location");
      recordSearchMutation.mutate(trimmedLocation.toLowerCase());
    }
  };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Land Records Search" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Search for land records by title number or location to view ownership and registration details." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
            "Search by Title Number"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Enter the land title number to find specific records" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleTitleSearch, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "titleNumber", children: "Title Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "titleNumber",
                placeholder: "e.g., LR/12345/678",
                value: titleNumber,
                onChange: (e) => setTitleNumber(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "w-full",
              disabled: !titleNumber.trim() || isLoading,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4" }),
                "Search by Title"
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5" }),
            "Search by Location"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Enter a location name to find all records in that area" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLocationSearch, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "location", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "location",
                placeholder: "e.g., Nairobi, Mombasa",
                value: location,
                onChange: (e) => setLocation(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "w-full",
              disabled: !location.trim() || location.trim().length < 2 || isLoading,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4" }),
                "Search by Location"
              ]
            }
          )
        ] }) })
      ] })
    ] }),
    searchType && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Search Results" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: isLoading ? "Searching..." : results && results.length > 0 ? `Found ${results.length} record${results.length === 1 ? "" : "s"}` : "No records found" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }) }) : results && results.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Area (acres)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: results.map((record) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "cursor-pointer transition-colors hover:bg-accent/50",
            onClick: () => navigate({ to: `/record/${record.id}` }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: record.titleNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: record.location }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: record.area ? Number(record.area).toLocaleString() : "N/A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: statusColors[record.status], children: formatStatus(record.status) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: "View Details" }) })
            ]
          },
          record.id
        )) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No records found matching your search criteria." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: "Try adjusting your search terms." })
      ] }) })
    ] })
  ] });
}
export {
  LandSearchPage as default
};
