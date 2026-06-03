import { BarChart3, MapPin, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import DepthCard from "../../components/cards/DepthCard";
import AnimatedKPI from "../../components/charts/AnimatedKPI";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useGetMarketAnalytics } from "../../hooks/useSidebarDomainQueries";

const KENYA_REGIONS = [
  "All Regions",
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Kiambu",
  "Machakos",
  "Nyeri",
  "Meru",
];

export default function MarketAnalyticsPage() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const region = selectedRegion === "All Regions" ? null : selectedRegion;

  const { data: analytics, isLoading, error } = useGetMarketAnalytics(region);

  const maxPrice = analytics
    ? Math.max(...analytics.pricesByRegion.map(([, v]) => v), 1)
    : 1;

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <TrendingUp className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Market Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Live land market intelligence for Kenya
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Label
            htmlFor="region-filter"
            className="text-xs text-muted-foreground"
          >
            Region
          </Label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger
              id="region-filter"
              data-ocid="market.region.select"
              className="w-40 bg-card/60 backdrop-blur-md border-white/10"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {KENYA_REGIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div
          data-ocid="market.error_state"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {error.message}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl bg-muted/40"
            />
          ))}
        </div>
      ) : analytics ? (
        <div className="grid grid-cols-2 gap-4">
          <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Active Listings
                </span>
              </div>
              <AnimatedKPI
                value={Number(analytics.activeListings)}
                className="text-3xl font-bold"
              />
            </div>
          </DepthCard>
          <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Tracked Regions
                </span>
              </div>
              <AnimatedKPI
                value={analytics.pricesByRegion.length}
                className="text-3xl font-bold"
              />
            </div>
          </DepthCard>
        </div>
      ) : null}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded-xl bg-muted/40"
            />
          ))}
        </div>
      ) : analytics && analytics.pricesByRegion.length > 0 ? (
        <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">
                Average Price by Region (KES/acre)
              </h2>
            </div>
            <div className="space-y-3">
              {analytics.pricesByRegion.map(([regionName, price]) => (
                <div key={regionName} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{regionName}</span>
                    <span className="text-muted-foreground">
                      KES {price.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{
                        width: `${Math.min((price / maxPrice) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DepthCard>
      ) : analytics ? (
        <div
          data-ocid="market.prices.empty_state"
          className="rounded-2xl border border-white/10 bg-card/40 p-8 text-center text-muted-foreground"
        >
          No price data available for the selected region.
        </div>
      ) : null}

      {analytics && analytics.appreciationRates.length > 0 && (
        <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <h2 className="font-semibold">Appreciation Rates</h2>
            </div>
            <div className="space-y-2">
              {analytics.appreciationRates.map(([regionName, rate]) => (
                <div
                  key={regionName}
                  className="flex items-center justify-between rounded-xl bg-card/40 border border-white/10 px-4 py-2"
                >
                  <span className="text-sm font-medium">{regionName}</span>
                  <Badge
                    variant={
                      rate > 10 ? "default" : rate > 5 ? "secondary" : "outline"
                    }
                    className="tabular-nums"
                  >
                    +{rate.toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </DepthCard>
      )}

      {analytics && analytics.topRegions.length > 0 && (
        <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Top Regions by Demand</h2>
            </div>
            <div className="space-y-2">
              {analytics.topRegions.map((regionName, idx) => (
                <div
                  key={regionName}
                  className="flex items-center gap-3 rounded-xl bg-card/40 border border-white/10 px-4 py-2"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium flex-1">
                    {regionName}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    Hot
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </DepthCard>
      )}
    </div>
  );
}
