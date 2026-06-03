import { AlertTriangle, Bell, Check, Plus, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import type { NotificationFeedItem } from "../../backend";
import DepthCard from "../../components/cards/DepthCard";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  useGetNotificationFeed,
  useMarkNotificationRead,
} from "../../hooks/useSidebarDomainQueries";

function relativeTime(ns: bigint): string {
  const ms = Number(ns) / 1_000_000;
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function NotificationIcon({ type }: { type: string }) {
  if (type === "alert" || type === "dispute")
    return <AlertTriangle className="h-4 w-4 text-destructive" />;
  if (type === "price_drop" || type === "market")
    return <TrendingDown className="h-4 w-4 text-yellow-500" />;
  if (type === "new_listing")
    return <Plus className="h-4 w-4 text-green-500" />;
  return <Bell className="h-4 w-4 text-primary" />;
}

function groupByType(
  items: NotificationFeedItem[],
): Record<string, NotificationFeedItem[]> {
  return items.reduce<Record<string, NotificationFeedItem[]>>((acc, item) => {
    const key = item.type;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

export default function NotificationCenterPage() {
  const { data: feed, isLoading, error } = useGetNotificationFeed(20);
  const markRead = useMarkNotificationRead();

  const handleMarkRead = async (id: string) => {
    try {
      await markRead.mutateAsync(id);
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to mark as read",
      );
    }
  };

  const unreadCount = feed?.filter((n) => !n.read).length ?? 0;
  const grouped = groupByType(feed ?? []);

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Bell className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Notification Center</h1>
            <p className="text-sm text-muted-foreground">
              Alerts, price changes, and updates
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Badge
            data-ocid="notifications.unread_count"
            variant="destructive"
            className="text-sm px-3"
          >
            {unreadCount} unread
          </Badge>
        )}
      </div>

      {error && (
        <div
          data-ocid="notifications.error_state"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {error.message}
        </div>
      )}

      {isLoading ? (
        <div data-ocid="notifications.loading_state" className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-2xl bg-muted/40"
            />
          ))}
        </div>
      ) : feed && feed.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(grouped).map(([groupType, items]) => (
            <div key={groupType} className="space-y-2">
              <div className="flex items-center gap-2">
                <NotificationIcon type={groupType} />
                <h2 className="text-sm font-semibold capitalize text-muted-foreground">
                  {groupType.replace(/_/g, " ")}
                </h2>
                <span className="text-xs text-muted-foreground">
                  ({items.length})
                </span>
              </div>
              <div className="space-y-2">
                {items.map((item, idx) => (
                  <DepthCard
                    key={item.id}
                    data-ocid={`notifications.item.${idx + 1}`}
                    className={`bg-card/60 backdrop-blur-md border rounded-2xl transition-all ${
                      !item.read
                        ? "border-primary/30 bg-primary/5"
                        : "border-white/10 opacity-70"
                    }`}
                  >
                    <div className="p-4 flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        <NotificationIcon type={item.type} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm ${!item.read ? "font-semibold" : ""} truncate`}
                        >
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {item.body}
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          {relativeTime(item.timestamp)}
                        </p>
                      </div>
                      {!item.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          data-ocid={`notifications.mark_read_button.${idx + 1}`}
                          className="h-7 w-7 shrink-0"
                          onClick={() => handleMarkRead(item.id)}
                          disabled={markRead.isPending}
                          aria-label="Mark as read"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </DepthCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          data-ocid="notifications.empty_state"
          className="rounded-2xl border border-white/10 bg-card/40 p-12 text-center space-y-2"
        >
          <Bell className="h-10 w-10 mx-auto text-muted-foreground/40" />
          <p className="text-muted-foreground">No notifications yet.</p>
          <p className="text-xs text-muted-foreground/60">
            You'll be alerted on price drops, new listings, and risk events.
          </p>
        </div>
      )}
    </div>
  );
}
