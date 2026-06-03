import { e as createLucideIcon, r as reactExports, W as useReducedMotion, j as jsxRuntimeExports, P as cn, aF as Root, aG as Trigger, af as useComposedRefs, aH as WarningProvider, aI as Content, ak as composeEventHandlers, aJ as Title, aK as Description, aL as Close, aM as createDialogScope, aN as Portal, aO as Overlay, aP as createSlottable, aj as createContextScope, aQ as buttonVariants, a as useInternetIdentity, A as Alert, g as AlertDescription, s as SkeletonBlock, _ as TrendingUp, U as User, c as Shield, d as Briefcase, F as FileText, aR as Settings, S as Search, B as Button, o as Separator, L as Label, I as Input, C as CircleCheckBig, aS as AccountStatus, a3 as Select, a4 as SelectTrigger, a5 as SelectValue, a6 as SelectContent, a7 as SelectItem, aT as RiskType, v as ue } from "./index-BY4GfDKL.js";
import { A as AnimatedKPI } from "./AnimatedKPI-CCJUgMs0.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { P as Progress } from "./progress-CuKB3Dga.js";
import { S as Switch } from "./switch-C0IfSf45.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-mmhG8-YG.js";
import { a as useGetCallerProfile, b as useGetActivitySummary, c as useGetSecurityTelemetry, d as useListDocuments, e as useGetCallerPreferences, f as useUpdateCallerProfile, g as useUploadProfilePhoto, h as useUploadDocument, i as useUpdateCallerPreferences, j as useUpdateSecurityPreference, k as useExportUserData, l as useDeleteAccount } from "./useProfileVerification-DijSG4Cd.js";
import { q as useListProperties, r as useListTransactions, s as useListSavedProperties } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { S as Save } from "./save-B5GHFNce.js";
import { F as FileCheck } from "./file-check-Dzg6Bm3u.js";
import { D as DollarSign } from "./dollar-sign-CP1Vs9qv.js";
import { D as Download } from "./download-BZJSUSw1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function AnimatedDonutChart({
  data,
  className
}) {
  const [animated, setAnimated] = reactExports.useState(false);
  const prefersReducedMotion = useReducedMotion();
  const total = data.reduce((sum, item) => sum + item.value, 0);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);
  let currentAngle = -90;
  const segments = data.map((segment) => {
    const percentage = segment.value / total * 100;
    const angle = percentage / 100 * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return {
      ...segment,
      percentage,
      startAngle,
      endAngle: currentAngle
    };
  });
  const radius = 40;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-6", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "w-32 h-32", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "circle",
        {
          cx: "50",
          cy: "50",
          r: radius,
          fill: "none",
          stroke: "oklch(var(--muted))",
          strokeWidth
        }
      ),
      segments.map((segment, index) => {
        const dashArray = segment.percentage / 100 * circumference;
        const rotation = segment.startAngle + 90;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "50",
            cy: "50",
            r: radius,
            fill: "none",
            stroke: segment.color,
            strokeWidth,
            strokeDasharray: `${dashArray} ${circumference}`,
            strokeDashoffset: animated && !prefersReducedMotion ? 0 : circumference,
            transform: `rotate(${rotation} 50 50)`,
            className: cn(
              "transition-all duration-1000 ease-out motion-reduce:transition-none"
            ),
            style: {
              transitionDelay: `${index * 200}ms`
            }
          },
          segment.label ?? index
        );
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: segments.map((segment, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-3 w-3 rounded-sm",
              style: { backgroundColor: segment.color }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: segment.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            segment.percentage.toFixed(1),
            "%"
          ] })
        ]
      },
      segment.label ?? index
    )) })
  ] });
}
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger2, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function ProfileVerificationPage() {
  const { identity } = useInternetIdentity();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched
  } = useGetCallerProfile();
  const { data: activitySummary, isLoading: _activityLoading } = useGetActivitySummary();
  const { data: securityTelemetry, isLoading: securityLoading } = useGetSecurityTelemetry();
  const { data: documents, isLoading: documentsLoading } = useListDocuments();
  const { data: preferences, isLoading: preferencesLoading } = useGetCallerPreferences();
  const { data: properties } = useListProperties();
  const { data: transactions } = useListTransactions();
  const { data: savedProperties } = useListSavedProperties();
  const updateProfile = useUpdateCallerProfile();
  const uploadPhoto = useUploadProfilePhoto();
  const uploadDocument = useUploadDocument();
  const updatePreferences = useUpdateCallerPreferences();
  useUpdateSecurityPreference();
  const exportData = useExportUserData();
  const deleteAccount = useDeleteAccount();
  const [photoUploadProgress, setPhotoUploadProgress] = reactExports.useState(0);
  const [_documentUploadProgress, setDocumentUploadProgress] = reactExports.useState(0);
  const [editingIdentity, setEditingIdentity] = reactExports.useState(false);
  const [identityForm, setIdentityForm] = reactExports.useState({
    fullName: "",
    email: "",
    phone: "",
    nationalId: "",
    passportNumber: "",
    dateOfBirth: "",
    ethnicity: ""
  });
  const [preferencesForm, setPreferencesForm] = reactExports.useState(null);
  reactExports.useEffect(() => {
    var _a, _b, _c, _d;
    if (userProfile && !identityForm.fullName) {
      setIdentityForm({
        fullName: userProfile.name,
        email: "",
        phone: "",
        nationalId: ((_a = userProfile.identityFields) == null ? void 0 : _a.nationalId) || "",
        passportNumber: ((_b = userProfile.identityFields) == null ? void 0 : _b.passportNumber) || "",
        dateOfBirth: ((_c = userProfile.identityFields) == null ? void 0 : _c.dateOfBirth) || "",
        ethnicity: ((_d = userProfile.identityFields) == null ? void 0 : _d.ethnicity) || ""
      });
    }
    if (preferences && !preferencesForm) {
      setPreferencesForm(preferences);
    }
  }, [userProfile, preferences]);
  const handlePhotoUpload = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      ue.error("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Image must be less than 5MB");
      return;
    }
    try {
      setPhotoUploadProgress(0);
      await uploadPhoto.mutateAsync({
        file,
        onProgress: (percentage) => setPhotoUploadProgress(percentage)
      });
      ue.success("Profile photo updated successfully");
      setPhotoUploadProgress(0);
    } catch (error) {
      console.error("Photo upload error:", error);
      ue.error("Failed to upload photo");
      setPhotoUploadProgress(0);
    }
  };
  const handleIdentitySave = async () => {
    if (!userProfile) return;
    try {
      await updateProfile.mutateAsync({
        ...userProfile,
        name: identityForm.fullName,
        identityFields: {
          nationalId: identityForm.nationalId,
          passportNumber: identityForm.passportNumber,
          dateOfBirth: identityForm.dateOfBirth,
          ethnicity: identityForm.ethnicity
        }
      });
      ue.success("Identity information updated");
      setEditingIdentity(false);
    } catch (error) {
      console.error("Identity update error:", error);
      ue.error("Failed to update identity");
    }
  };
  const handleDocumentUpload = async (e, category) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      ue.error("File must be less than 10MB");
      return;
    }
    try {
      setDocumentUploadProgress(0);
      await uploadDocument.mutateAsync({
        file,
        category,
        onProgress: (percentage) => setDocumentUploadProgress(percentage)
      });
      ue.success("Document uploaded successfully");
      setDocumentUploadProgress(0);
    } catch (error) {
      console.error("Document upload error:", error);
      ue.error(error.message || "Failed to upload document");
      setDocumentUploadProgress(0);
    }
  };
  const handlePreferencesSave = async () => {
    if (!preferencesForm) return;
    try {
      await updatePreferences.mutateAsync(preferencesForm);
      ue.success("Preferences saved successfully");
    } catch (error) {
      console.error("Preferences save error:", error);
      ue.error("Failed to save preferences");
    }
  };
  const handleExportData = async () => {
    try {
      await exportData.mutateAsync();
      ue.success("Data exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      ue.error("Failed to export data");
    }
  };
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount.mutateAsync();
      ue.success("Account deletion requested");
    } catch (error) {
      console.error("Delete account error:", error);
      ue.error(error.message || "Failed to delete account");
    }
  };
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Please log in to view your profile" })
    ] }) });
  }
  if (profileLoading || !profileFetched) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-8 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-64 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-64 w-full" })
    ] });
  }
  if (!userProfile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Profile not found. Please complete profile setup." })
    ] }) });
  }
  const totalInvestment = (transactions == null ? void 0 : transactions.reduce((sum, t) => sum + t.price, 0)) || 0;
  const portfolioData = [
    {
      label: "Properties",
      value: (properties == null ? void 0 : properties.length) || 0,
      color: "oklch(var(--chart-1))"
    },
    {
      label: "Saved",
      value: (savedProperties == null ? void 0 : savedProperties.length) || 0,
      color: "oklch(var(--chart-2))"
    },
    {
      label: "Transactions",
      value: (transactions == null ? void 0 : transactions.length) || 0,
      color: "oklch(var(--chart-3))"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full overflow-y-auto p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Profile & Verification" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your identity, security, and preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "activity", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-3 lg:grid-cols-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "activity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "mr-2 h-4 w-4" }),
          "Activity"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "identity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "mr-2 h-4 w-4" }),
          "Identity"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "security", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "mr-2 h-4 w-4" }),
          "Security"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "portfolio", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "mr-2 h-4 w-4" }),
          "Portfolio"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "documents", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-4 w-4" }),
          "Documents"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "preferences", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "mr-2 h-4 w-4" }),
          "Preferences"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "activity", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
              "Properties Viewed"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedKPI,
              {
                value: (activitySummary == null ? void 0 : activitySummary.propertiesViewed) || 0,
                className: "text-2xl font-bold mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
              "Searches Made"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedKPI,
              {
                value: (activitySummary == null ? void 0 : activitySummary.searchesMade) || 0,
                className: "text-2xl font-bold mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
              "Saved Properties"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedKPI,
              {
                value: (activitySummary == null ? void 0 : activitySummary.savedProperties) || 0,
                className: "text-2xl font-bold mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "h-4 w-4" }),
              "Reports Generated"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedKPI,
              {
                value: (activitySummary == null ? void 0 : activitySummary.reportsGenerated) || 0,
                className: "text-2xl font-bold mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4" }),
              "Investments Tracked"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedKPI,
              {
                value: (activitySummary == null ? void 0 : activitySummary.investmentsTracked) || 0,
                className: "text-2xl font-bold mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
              "ROI Summary"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedKPI,
              {
                value: (activitySummary == null ? void 0 : activitySummary.roiSummary) || 0,
                suffix: "%",
                className: "text-2xl font-bold mt-2"
              }
            )
          ] })
        ] }),
        (activitySummary == null ? void 0 : activitySummary.hasInsufficientData) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Insufficient data for detailed analytics. Continue using the platform to see more insights." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "identity", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Profile Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setEditingIdentity(!editingIdentity),
                children: editingIdentity ? "Cancel" : "Edit"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full theme-gradient flex items-center justify-center text-white text-2xl font-bold", children: userProfile.name.charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "photo-upload",
                    className: "absolute bottom-0 right-0 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-primary p-1.5 text-primary-foreground shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "photo-upload",
                          type: "file",
                          accept: "image/*",
                          className: "hidden",
                          onChange: handlePhotoUpload,
                          disabled: uploadPhoto.isPending
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: userProfile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: userProfile.role })
              ] })
            ] }),
            photoUploadProgress > 0 && photoUploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: photoUploadProgress, className: "w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fullName", children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "fullName",
                    value: identityForm.fullName,
                    onChange: (e) => setIdentityForm({
                      ...identityForm,
                      fullName: e.target.value
                    }),
                    disabled: !editingIdentity
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nationalId", children: "National ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "nationalId",
                    value: identityForm.nationalId,
                    onChange: (e) => setIdentityForm({
                      ...identityForm,
                      nationalId: e.target.value
                    }),
                    disabled: !editingIdentity
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "passportNumber", children: "Passport Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "passportNumber",
                    value: identityForm.passportNumber,
                    onChange: (e) => setIdentityForm({
                      ...identityForm,
                      passportNumber: e.target.value
                    }),
                    disabled: !editingIdentity
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dateOfBirth", children: "Date of Birth" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "dateOfBirth",
                    type: "date",
                    value: identityForm.dateOfBirth,
                    onChange: (e) => setIdentityForm({
                      ...identityForm,
                      dateOfBirth: e.target.value
                    }),
                    disabled: !editingIdentity
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ethnicity", children: "Ethnicity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ethnicity",
                    value: identityForm.ethnicity,
                    onChange: (e) => setIdentityForm({
                      ...identityForm,
                      ethnicity: e.target.value
                    }),
                    disabled: !editingIdentity
                  }
                )
              ] })
            ] }),
            editingIdentity && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleIdentitySave,
                disabled: updateProfile.isPending,
                children: updateProfile.isPending ? "Saving..." : "Save Changes"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Verification Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Email Verification" }),
              userProfile.emailVerified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "default", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-1 h-3 w-3" }),
                "Verified"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Not Verified" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Phone Verification" }),
              userProfile.phoneVerified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "default", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-1 h-3 w-3" }),
                "Verified"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Not Verified" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Account Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: userProfile.accountStatus === AccountStatus.active ? "default" : "outline",
                  children: userProfile.accountStatus
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "security", className: "space-y-6", children: securityLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-64 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Security Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold", children: [
              (securityTelemetry == null ? void 0 : securityTelemetry.securityScore) || 0,
              "/100"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              value: (securityTelemetry == null ? void 0 : securityTelemetry.securityScore) || 0,
              className: "mb-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: securityTelemetry == null ? void 0 : securityTelemetry.suggestions.map((suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-2 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: suggestion })
              ]
            },
            suggestion
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Active Sessions" }),
          (securityTelemetry == null ? void 0 : securityTelemetry.activeSessions) && securityTelemetry.activeSessions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: securityTelemetry.activeSessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 rounded-lg bg-muted/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: session.device }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: session.location }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Last active:",
                    " ",
                    new Date(session.lastActive).toLocaleString()
                  ] })
                ] }),
                session.current && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", children: "Current" })
              ]
            },
            session.id
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No active sessions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Login Activity" }),
          (securityTelemetry == null ? void 0 : securityTelemetry.loginActivity) && securityTelemetry.loginActivity.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: securityTelemetry.loginActivity.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: event.device }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: event.location })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: new Date(event.timestamp).toLocaleString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: event.success ? "default" : "destructive",
                      children: event.success ? "Success" : "Failed"
                    }
                  )
                ] })
              ]
            },
            event.timestamp
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No login history available" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "portfolio", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Portfolio Distribution" }),
          portfolioData.some((d) => d.value > 0) ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedDonutChart, { data: portfolioData }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64 text-muted-foreground", children: "No portfolio data available" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Investment Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Investment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold", children: [
                "KES ",
                totalInvestment.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Properties Owned" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: (properties == null ? void 0 : properties.length) || 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Transactions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: (transactions == null ? void 0 : transactions.length) || 0 })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "documents", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Upload Documents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Document vault is not yet available. This feature is coming soon." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "id-document", children: "ID Document" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "id-document",
                  type: "file",
                  onChange: (e) => handleDocumentUpload(e, "id"),
                  disabled: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "proof-of-address", children: "Proof of Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "proof-of-address",
                  type: "file",
                  onChange: (e) => handleDocumentUpload(e, "address"),
                  disabled: true
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Uploaded Documents" }),
          documentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-32 w-full" }) : documents && documents.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: documents.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 rounded-lg bg-muted/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: doc.filename }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: doc.category })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: doc.status === "verified" ? "default" : "outline",
                    children: doc.status
                  }
                )
              ]
            },
            doc.id
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No documents uploaded yet" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "preferences", className: "space-y-6", children: [
        preferencesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-64 w-full" }) : preferencesForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Notification Preferences" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notify-price-drops", children: "Price Drop Alerts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "notify-price-drops",
                    checked: preferencesForm.notifyPriceDrops,
                    onCheckedChange: (checked) => setPreferencesForm({
                      ...preferencesForm,
                      notifyPriceDrops: checked
                    })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notify-disputes", children: "Dispute Notifications" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "notify-disputes",
                    checked: preferencesForm.notifyDisputes,
                    onCheckedChange: (checked) => setPreferencesForm({
                      ...preferencesForm,
                      notifyDisputes: checked
                    })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notify-new-listings", children: "New Listing Alerts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "notify-new-listings",
                    checked: preferencesForm.notifyNewListings,
                    onCheckedChange: (checked) => setPreferencesForm({
                      ...preferencesForm,
                      notifyNewListings: checked
                    })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notify-infrastructure", children: "Infrastructure Updates" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "notify-infrastructure",
                    checked: preferencesForm.notifyInfrastructureUpdates,
                    onCheckedChange: (checked) => setPreferencesForm({
                      ...preferencesForm,
                      notifyInfrastructureUpdates: checked
                    })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notify-market-trends", children: "Market Trend Alerts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "notify-market-trends",
                    checked: preferencesForm.notifyMarketTrends,
                    onCheckedChange: (checked) => setPreferencesForm({
                      ...preferencesForm,
                      notifyMarketTrends: checked
                    })
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "AI Personalization" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "risk-tolerance", children: "Risk Tolerance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: preferencesForm.riskTolerance,
                    onValueChange: (value) => setPreferencesForm({
                      ...preferencesForm,
                      riskTolerance: value
                    }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "risk-tolerance", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: RiskType.low, children: "Low" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: RiskType.medium, children: "Medium" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: RiskType.high, children: "High" })
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "preferred-land-type", children: "Preferred Land Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "preferred-land-type",
                    value: preferencesForm.aiPersonalization.preferredLandType,
                    onChange: (e) => setPreferencesForm({
                      ...preferencesForm,
                      aiPersonalization: {
                        ...preferencesForm.aiPersonalization,
                        preferredLandType: e.target.value
                      }
                    })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "growth-expectation", children: "Growth Expectation (%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "growth-expectation",
                    type: "number",
                    value: Number(
                      preferencesForm.aiPersonalization.growthExpectation
                    ),
                    onChange: (e) => setPreferencesForm({
                      ...preferencesForm,
                      aiPersonalization: {
                        ...preferencesForm.aiPersonalization,
                        growthExpectation: BigInt(e.target.value || 0)
                      }
                    })
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handlePreferencesSave,
              disabled: updatePreferences.isPending,
              children: updatePreferences.isPending ? "Saving..." : "Save Preferences"
            }
          )
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Privacy Center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "w-full justify-start",
                onClick: handleExportData,
                disabled: exportData.isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
                  exportData.isPending ? "Exporting..." : "Export My Data"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "destructive",
                  className: "w-full justify-start",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                    "Delete Account"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Are you absolutely sure?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete your account and remove your data from our servers." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      onClick: handleDeleteAccount,
                      disabled: deleteAccount.isPending,
                      children: deleteAccount.isPending ? "Deleting..." : "Delete Account"
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProfileVerificationPage as default
};
