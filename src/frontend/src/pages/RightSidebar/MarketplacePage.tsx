import {
  Building2,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Square,
} from "lucide-react";
import { useState } from "react";
import DepthCard from "../../components/cards/DepthCard";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { useGetMarketplaceListings } from "../../hooks/useSidebarDomainQueries";

const SAFE_DEAL_ITEMS = [
  "Ownership documents verified",
  "No active disputes on record",
  "Independent valuation obtained",
  "Title search completed",
  "Legal representation engaged",
];

export default function MarketplacePage() {
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, Set<number>>>(
    {},
  );

  const {
    data: listings,
    isLoading,
    error,
  } = useGetMarketplaceListings(
    showVerifiedOnly ? { verified: true } : undefined,
  );

  const toggleCheck = (propId: string, itemIdx: number) => {
    setCheckedItems((prev) => {
      const existing = new Set(prev[propId] ?? []);
      if (existing.has(itemIdx)) existing.delete(itemIdx);
      else existing.add(itemIdx);
      return { ...prev, [propId]: existing };
    });
  };

  const toggleExpanded = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Smart Marketplace</h1>
            <p className="text-sm text-muted-foreground">
              Verified land listings with fraud protection
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="verified-toggle"
            data-ocid="marketplace.verified_only.toggle"
            checked={showVerifiedOnly}
            onCheckedChange={setShowVerifiedOnly}
          />
          <Label htmlFor="verified-toggle" className="text-sm cursor-pointer">
            Verified Only
          </Label>
        </div>
      </div>

      {error && (
        <div
          data-ocid="marketplace.error_state"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {error.message}
        </div>
      )}

      {isLoading ? (
        <div data-ocid="marketplace.loading_state" className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 animate-pulse rounded-2xl bg-muted/40"
            />
          ))}
        </div>
      ) : listings && listings.length > 0 ? (
        <div className="space-y-4">
          {listings.map((property, idx) => {
            const isExpanded = expandedCard === property.id;
            const checked = checkedItems[property.id] ?? new Set();
            const allChecked = checked.size === SAFE_DEAL_ITEMS.length;

            return (
              <DepthCard
                key={property.id}
                data-ocid={`marketplace.item.${idx + 1}`}
                className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold truncate">
                          {property.titleNumber}
                        </h3>
                        {property.status === "active" ? (
                          <Badge className="gap-1 text-xs" variant="default">
                            <ShieldCheck className="h-3 w-3" /> Verified
                          </Badge>
                        ) : (
                          <Badge className="text-xs" variant="secondary">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {property.location}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-primary">
                        KES {property.value.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {property.area} acres
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        property.status === "active"
                          ? "default"
                          : property.status === "disputed"
                            ? "destructive"
                            : "outline"
                      }
                      className="capitalize"
                    >
                      {property.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      data-ocid={`marketplace.checklist_toggle.${idx + 1}`}
                      className="text-xs gap-1"
                      onClick={() => toggleExpanded(property.id)}
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                      Safe Deal Checklist
                      {allChecked && <span className="text-green-500">✓</span>}
                    </Button>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-white/10 pt-3 space-y-2">
                      <p className="text-xs text-muted-foreground font-medium">
                        Complete before proceeding:
                      </p>
                      {SAFE_DEAL_ITEMS.map((item, i) => (
                        <button
                          key={item}
                          type="button"
                          data-ocid={`marketplace.checklist_item.${i + 1}`}
                          className="flex items-center gap-2 w-full text-left rounded-lg px-2 py-1.5 hover:bg-white/5 transition-colors"
                          onClick={() => toggleCheck(property.id, i)}
                        >
                          {checked.has(i) ? (
                            <CheckSquare className="h-4 w-4 text-green-500 shrink-0" />
                          ) : (
                            <Square className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                          <span
                            className={`text-sm ${checked.has(i) ? "line-through text-muted-foreground" : ""}`}
                          >
                            {item}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </DepthCard>
            );
          })}
        </div>
      ) : (
        <div
          data-ocid="marketplace.empty_state"
          className="rounded-2xl border border-white/10 bg-card/40 p-12 text-center space-y-2"
        >
          <Building2 className="h-10 w-10 mx-auto text-muted-foreground/40" />
          <p className="text-muted-foreground">
            {showVerifiedOnly
              ? "No verified listings available."
              : "No listings available yet."}
          </p>
          {showVerifiedOnly && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVerifiedOnly(false)}
            >
              Show all listings
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
