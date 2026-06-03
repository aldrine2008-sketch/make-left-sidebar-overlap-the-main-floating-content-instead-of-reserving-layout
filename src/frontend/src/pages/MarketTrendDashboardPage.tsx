import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  ExternalLink,
  MapPin,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiTiktok, SiX } from "react-icons/si";
import DepthCard from "../components/cards/DepthCard";
import AnimatedKPI from "../components/charts/AnimatedKPI";
import AnimatedLineChart from "../components/charts/AnimatedLineChart";
import SkeletonBlock from "../components/loading/SkeletonBlock";
import DemandHeatMap from "../components/market/DemandHeatMap";
import { hotContentLinks } from "../config/hotContentLinks";
import {
  useGetAllMarketTrends,
  useGetDemandHeatMapPoints,
  useGetTopSearches,
} from "../hooks/useQueries";

export default function MarketTrendDashboardPage() {
  const { data: marketTrends, isLoading: trendsLoading } =
    useGetAllMarketTrends();
  const { data: topSearches, isLoading: searchesLoading } =
    useGetTopSearches(10);
  const { data: demandHeatMapPoints, isLoading: demandPointsLoading } =
    useGetDemandHeatMapPoints();

  // Calculate average price per acre across all locations
  const averagePricePerAcre =
    marketTrends && marketTrends.length > 0
      ? Math.round(
          marketTrends.reduce((sum, trend) => {
            const latestPrice =
              trend.priceTrend.length > 0
                ? trend.priceTrend[trend.priceTrend.length - 1].price
                : 0;
            return sum + latestPrice;
          }, 0) / marketTrends.length,
        )
      : 0;

  // Get trending locations (sorted by demand score)
  const trendingLocations = marketTrends
    ? [...marketTrends]
        .sort((a, b) => Number(b.demandScore) - Number(a.demandScore))
        .slice(0, 5)
    : [];

  if (trendsLoading || searchesLoading) {
    return (
      <div className="space-y-6">
        <SkeletonBlock className="h-12 w-full" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SkeletonBlock className="h-32" />
          <SkeletonBlock className="h-32" />
          <SkeletonBlock className="h-32" />
          <SkeletonBlock className="h-32" />
        </div>
        <SkeletonBlock className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-3xl font-bold">Market Trend Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time insights into land prices, demand, and market activity
          across Kenya
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DepthCard>
          <CardHeader className="pb-3">
            <CardDescription>Average Price/Acre</CardDescription>
            <CardTitle className="flex items-baseline gap-2">
              <span className="text-sm font-normal text-muted-foreground">
                KES
              </span>
              <AnimatedKPI value={averagePricePerAcre} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Market average</span>
            </div>
          </CardContent>
        </DepthCard>

        <DepthCard>
          <CardHeader className="pb-3">
            <CardDescription>Active Locations</CardDescription>
            <CardTitle>
              <AnimatedKPI value={marketTrends?.length || 0} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Tracked regions</span>
            </div>
          </CardContent>
        </DepthCard>

        <DepthCard>
          <CardHeader className="pb-3">
            <CardDescription>Total Searches</CardDescription>
            <CardTitle>
              <AnimatedKPI
                value={
                  topSearches?.reduce(
                    (sum, [, count]) => sum + Number(count),
                    0,
                  ) || 0
                }
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>User queries</span>
            </div>
          </CardContent>
        </DepthCard>

        <DepthCard>
          <CardHeader className="pb-3">
            <CardDescription>Trending Now</CardDescription>
            <CardTitle className="truncate text-lg">
              {trendingLocations[0]?.location || "N/A"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>Highest demand</span>
            </div>
          </CardContent>
        </DepthCard>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Price Trends</TabsTrigger>
          <TabsTrigger value="demand">Demand Map</TabsTrigger>
          <TabsTrigger value="searches">Top Searches</TabsTrigger>
          <TabsTrigger value="social">Hot Content</TabsTrigger>
        </TabsList>

        {/* Price Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {trendingLocations.slice(0, 4).map((trend) => {
              const chartData = trend.priceTrend.map((point) => ({
                label: new Date(
                  Number(point.timestamp) / 1000000,
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                }),
                value: point.price,
              }));

              return (
                <DepthCard key={trend.location}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {trend.location}
                      </CardTitle>
                      <Badge variant="outline">
                        Demand: {Number(trend.demandScore)}
                      </Badge>
                    </div>
                    <CardDescription>Price trend over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatedLineChart data={chartData} />
                  </CardContent>
                </DepthCard>
              );
            })}
          </div>
        </TabsContent>

        {/* Demand Map Tab */}
        <TabsContent value="demand">
          <DepthCard>
            <CardHeader>
              <CardTitle>Demand Heat Map</CardTitle>
              <CardDescription>
                Geographic visualization of land demand across regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {demandPointsLoading ? (
                <SkeletonBlock className="h-96 w-full" />
              ) : (
                <DemandHeatMap locations={demandHeatMapPoints || []} />
              )}
            </CardContent>
          </DepthCard>
        </TabsContent>

        {/* Top Searches Tab */}
        <TabsContent value="searches">
          <DepthCard>
            <CardHeader>
              <CardTitle>Most Searched Locations</CardTitle>
              <CardDescription>
                Popular locations based on user search activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSearches && topSearches.length > 0 ? (
                  topSearches.map(([location, count], index) => (
                    <div
                      key={location}
                      className="flex items-center justify-between rounded-lg border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium capitalize">{location}</p>
                          <p className="text-sm text-muted-foreground">
                            {Number(count)} searches
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        <Search className="mr-1 h-3 w-3" />
                        {Number(count)}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">
                    No search data available
                  </p>
                )}
              </div>
            </CardContent>
          </DepthCard>
        </TabsContent>

        {/* Hot Content Tab */}
        <TabsContent value="social">
          <DepthCard>
            <CardHeader>
              <CardTitle>Hot Content</CardTitle>
              <CardDescription>
                Trending land-related content on social media
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={hotContentLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border bg-gradient-to-br from-background to-muted/30 p-6 transition-all hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <SiTiktok className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">TikTok</p>
                    <p className="text-sm text-muted-foreground">
                      Trending land videos
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href={hotContentLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border bg-gradient-to-br from-background to-muted/30 p-6 transition-all hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <SiInstagram className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Instagram</p>
                    <p className="text-sm text-muted-foreground">
                      Land property posts
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href={hotContentLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border bg-gradient-to-br from-background to-muted/30 p-6 transition-all hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <SiX className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">X (Twitter)</p>
                    <p className="text-sm text-muted-foreground">
                      Land market discussions
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href={hotContentLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border bg-gradient-to-br from-background to-muted/30 p-6 transition-all hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    <SiFacebook className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Facebook</p>
                    <p className="text-sm text-muted-foreground">
                      Community groups
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </CardContent>
          </DepthCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
