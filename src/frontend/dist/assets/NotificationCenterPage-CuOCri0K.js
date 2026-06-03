import { e as createLucideIcon, j as jsxRuntimeExports, aE as Bell, B as Button, aB as Check, v as ue } from "./index-BY4GfDKL.js";
import { D as DepthCard } from "./DepthCard-IUqub2F7.js";
import { B as Badge } from "./badge-DyKf8p1H.js";
import { o as useGetNotificationFeed, p as useMarkNotificationRead } from "./useSidebarDomainQueries-DBs6GC1m.js";
import { T as TriangleAlert } from "./triangle-alert-CJLPKK-P.js";
import { P as Plus } from "./plus-CPoLbfbP.js";
import "./card-Dw7-HZNo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
function relativeTime(ns) {
  const ms = Number(ns) / 1e6;
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 6e4);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
function NotificationIcon({ type }) {
  if (type === "alert" || type === "dispute")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-destructive" });
  if (type === "price_drop" || type === "market")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-yellow-500" });
  if (type === "new_listing")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 text-green-500" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-primary" });
}
function groupByType(items) {
  return items.reduce((acc, item) => {
    const key = item.type;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
function NotificationCenterPage() {
  const { data: feed, isLoading, error } = useGetNotificationFeed(20);
  const markRead = useMarkNotificationRead();
  const handleMarkRead = async (id) => {
    try {
      await markRead.mutateAsync(id);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to mark as read"
      );
    }
  };
  const unreadCount = (feed == null ? void 0 : feed.filter((n) => !n.read).length) ?? 0;
  const grouped = groupByType(feed ?? []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-7 w-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Notification Center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Alerts, price changes, and updates" })
        ] })
      ] }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          "data-ocid": "notifications.unread_count",
          variant: "destructive",
          className: "text-sm px-3",
          children: [
            unreadCount,
            " unread"
          ]
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "notifications.error_state",
        className: "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
        children: error.message
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "notifications.loading_state", className: "space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-20 animate-pulse rounded-2xl bg-muted/40"
      },
      i
    )) }) : feed && feed.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: Object.entries(grouped).map(([groupType, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationIcon, { type: groupType }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold capitalize text-muted-foreground", children: groupType.replace(/_/g, " ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          items.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        DepthCard,
        {
          "data-ocid": `notifications.item.${idx + 1}`,
          className: `bg-card/60 backdrop-blur-md border rounded-2xl transition-all ${!item.read ? "border-primary/30 bg-primary/5" : "border-white/10 opacity-70"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationIcon, { type: item.type }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-sm ${!item.read ? "font-semibold" : ""} truncate`,
                  children: item.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: item.body }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: relativeTime(item.timestamp) })
            ] }),
            !item.read && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                "data-ocid": `notifications.mark_read_button.${idx + 1}`,
                className: "h-7 w-7 shrink-0",
                onClick: () => handleMarkRead(item.id),
                disabled: markRead.isPending,
                "aria-label": "Mark as read",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        },
        item.id
      )) })
    ] }, groupType)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "notifications.empty_state",
        className: "rounded-2xl border border-white/10 bg-card/40 p-12 text-center space-y-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-10 w-10 mx-auto text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No notifications yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "You'll be alerted on price drops, new listings, and risk events." })
        ]
      }
    )
  ] });
}
export {
  NotificationCenterPage as default
};
