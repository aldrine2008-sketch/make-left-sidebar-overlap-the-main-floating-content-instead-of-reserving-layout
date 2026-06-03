import { $ as useGetCallerUserSettings, a0 as useUpdateCallerUserSettings, r as reactExports, a1 as ThemePreference, a2 as MotionPreference, j as jsxRuntimeExports, s as SkeletonBlock, L as Label, a3 as Select, a4 as SelectTrigger, a5 as SelectValue, a6 as SelectContent, a7 as SelectItem, o as Separator, B as Button, v as ue } from "./index-BY4GfDKL.js";
import { d as Card, C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent } from "./card-Dw7-HZNo.js";
import { S as Switch } from "./switch-C0IfSf45.js";
import { L as LoaderCircle } from "./loader-circle-CUt6rkL4.js";
import { S as Save } from "./save-B5GHFNce.js";
function SettingsPage() {
  const { data: settings, isLoading } = useGetCallerUserSettings();
  const updateSettings = useUpdateCallerUserSettings();
  const [themePreference, setThemePreference] = reactExports.useState(
    ThemePreference.light
  );
  const [motionPreference, setMotionPreference] = reactExports.useState(
    MotionPreference.default_
  );
  const [emailNotifications, setEmailNotifications] = reactExports.useState(true);
  const [pushNotifications, setPushNotifications] = reactExports.useState(true);
  const [smsNotifications, setSmsNotifications] = reactExports.useState(false);
  const [criticalAlertsOnly, setCriticalAlertsOnly] = reactExports.useState(false);
  const [shareLocation, setShareLocation] = reactExports.useState(false);
  const [allowDataCollection, setAllowDataCollection] = reactExports.useState(false);
  const [showPublicProfile, setShowPublicProfile] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (settings) {
      setThemePreference(settings.themePreference);
      setMotionPreference(settings.motionPreference);
      setEmailNotifications(settings.notifications.email);
      setPushNotifications(settings.notifications.push);
      setSmsNotifications(settings.notifications.sms);
      setCriticalAlertsOnly(settings.notifications.criticalAlertsOnly);
      setShareLocation(settings.privacy.shareLocation);
      setAllowDataCollection(settings.privacy.allowDataCollection);
      setShowPublicProfile(settings.privacy.showPublicProfile);
    }
  }, [settings]);
  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync({
        themePreference,
        motionPreference,
        notifications: {
          email: emailNotifications,
          push: pushNotifications,
          sms: smsNotifications,
          criticalAlertsOnly
        },
        privacy: {
          shareLocation,
          allowDataCollection,
          showPublicProfile
        }
      });
      ue.success("Settings saved successfully");
    } catch (error) {
      ue.error("Failed to save settings");
      console.error("Settings save error:", error);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl space-y-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-12 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { className: "h-96 w-full" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl space-y-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage your account preferences and settings" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Appearance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Customize how the application looks and feels" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "theme", children: "Theme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: themePreference,
              onValueChange: (value) => setThemePreference(value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "theme", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ThemePreference.light, children: "Light" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ThemePreference.dark, children: "Dark" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ThemePreference.futuristic, children: "Futuristic" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "motion", children: "Motion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: motionPreference,
              onValueChange: (value) => setMotionPreference(value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "motion", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: MotionPreference.default_, children: "Default" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: MotionPreference.reduced, children: "Reduced" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: MotionPreference.advanced, children: "Advanced" })
                ] })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Configure how you receive notifications" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email-notifications", children: "Email Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Receive notifications via email" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "email-notifications",
              checked: emailNotifications,
              onCheckedChange: setEmailNotifications
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "push-notifications", children: "Push Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Receive push notifications" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "push-notifications",
              checked: pushNotifications,
              onCheckedChange: setPushNotifications
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sms-notifications", children: "SMS Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Receive notifications via SMS" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "sms-notifications",
              checked: smsNotifications,
              onCheckedChange: setSmsNotifications
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "critical-alerts", children: "Critical Alerts Only" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Only receive critical alerts" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "critical-alerts",
              checked: criticalAlertsOnly,
              onCheckedChange: setCriticalAlertsOnly
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Privacy & Security" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Manage your privacy and security preferences" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "share-location", children: "Share Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Allow location sharing" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "share-location",
              checked: shareLocation,
              onCheckedChange: setShareLocation
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "data-collection", children: "Allow Data Collection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Help improve the service" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "data-collection",
              checked: allowDataCollection,
              onCheckedChange: setAllowDataCollection
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "public-profile", children: "Show Public Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Make your profile visible to others" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "public-profile",
              checked: showPublicProfile,
              onCheckedChange: setShowPublicProfile
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleSave,
        disabled: updateSettings.isPending,
        className: "btn-lift",
        children: updateSettings.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Saving..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
          "Save Settings"
        ] })
      }
    ) })
  ] });
}
export {
  SettingsPage as default
};
