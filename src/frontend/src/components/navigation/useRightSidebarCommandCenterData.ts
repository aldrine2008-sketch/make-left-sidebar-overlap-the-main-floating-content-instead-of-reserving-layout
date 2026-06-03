import {
  useGetAllMarketTrends,
  useGetDemandHeatMapPoints,
  useGetTopSearches,
} from "@/hooks/useQueries";

export function useRightSidebarCommandCenterData() {
  const { data: marketTrends, isLoading: trendsLoading } =
    useGetAllMarketTrends();
  const { data: topSearches, isLoading: searchesLoading } =
    useGetTopSearches(5);
  const { data: heatMapPoints, isLoading: heatMapLoading } =
    useGetDemandHeatMapPoints();

  const isLoading = trendsLoading || searchesLoading || heatMapLoading;

  // Calculate live market summary
  const totalLocations = marketTrends?.length || 0;
  const avgDemandScore =
    marketTrends && marketTrends.length > 0
      ? Math.round(
          marketTrends.reduce(
            (sum, trend) => sum + Number(trend.demandScore),
            0,
          ) / marketTrends.length,
        )
      : 0;

  // Count alerts (locations with high demand or recent searches)
  const alertCount =
    (topSearches?.length || 0) +
    (heatMapPoints?.filter((p) => Number(p.demandScore) > 70)?.length || 0);

  // Mini data preview - top searched location
  const topLocation =
    topSearches && topSearches.length > 0 ? topSearches[0][0] : null;
  const topLocationSearches =
    topSearches && topSearches.length > 0 ? Number(topSearches[0][1]) : 0;

  return {
    isLoading,
    summary: {
      totalLocations,
      avgDemandScore,
    },
    alertCount,
    miniPreview: {
      topLocation,
      topLocationSearches,
    },
  };
}
