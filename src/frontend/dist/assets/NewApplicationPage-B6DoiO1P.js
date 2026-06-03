import { u as useNavigate, a as useInternetIdentity, t as useCreateApplication, r as reactExports, j as jsxRuntimeExports, q as AccessDeniedScreen, B as Button, F as FileText, L as Label, I as Input, v as ue } from "./index-BY4GfDKL.js";
import { d as Card, C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { T as Textarea } from "./textarea-0FUjE7nH.js";
import { A as ArrowLeft } from "./arrow-left-DcPFt9Xd.js";
function NewApplicationPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const createApplication = useCreateApplication();
  const [titleNumber, setTitleNumber] = reactExports.useState("");
  const [area, setArea] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDeniedScreen, {});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titleNumber.trim() || !location.trim()) {
      ue.error("Please fill in all required fields");
      return;
    }
    try {
      const appId = await createApplication.mutateAsync({
        titleNumber: titleNumber.trim(),
        area: area ? BigInt(area) : null,
        location: location.trim()
      });
      ue.success("Application created successfully");
      navigate({ to: `/applications/${appId}` });
    } catch (error) {
      ue.error("Failed to create application");
      console.error(error);
    }
  };
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "New Application" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Create a new land service application" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
          "Application Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Fill in the details for your land service application" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "titleNumber", children: [
            "Title Number ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "titleNumber",
              placeholder: "e.g., LR/12345/2024",
              value: titleNumber,
              onChange: (e) => setTitleNumber(e.target.value),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "area", children: "Area (square meters)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "area",
              type: "number",
              placeholder: "e.g., 5000",
              value: area,
              onChange: (e) => setArea(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "location", children: [
            "Location ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "location",
              placeholder: "e.g., Nairobi, Westlands, Plot 123",
              value: location,
              onChange: (e) => setLocation(e.target.value),
              required: true,
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => navigate({ to: "/applications" }),
              className: "flex-1",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: createApplication.isPending,
              className: "flex-1",
              children: createApplication.isPending ? "Creating..." : "Create Application"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
export {
  NewApplicationPage as default
};
