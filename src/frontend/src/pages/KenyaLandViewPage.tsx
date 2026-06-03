import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Layers, Map as MapIcon } from "lucide-react";
import { useState } from "react";
import HotContentLinksSection from "../components/content/HotContentLinksSection";
import SkeletonBlock from "../components/loading/SkeletonBlock";
import DemandHeatMap from "../components/market/DemandHeatMap";
import { useGetDemandHeatMapPoints } from "../hooks/useQueries";

export default function KenyaLandViewPage() {
  const { data: heatMapPoints, isLoading, error } = useGetDemandHeatMapPoints();
  const [showDemandLayer, setShowDemandLayer] = useState(true);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold">
          <MapIcon className="h-8 w-8 text-primary" />
          Kenya Land View
        </h1>
        <p className="text-muted-foreground">
          Interactive map visualization of land demand and market activity
          across Kenya
        </p>
      </div>

      {/* Layer Controls */}
      <Card className="glass-surface">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <CardTitle>Map Layers</CardTitle>
          </div>
          <CardDescription>
            Toggle map layers to customize your view
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="demand-layer">Demand Heat Map</Label>
              <p className="text-xs text-muted-foreground">
                Show property demand intensity by location
              </p>
            </div>
            <Switch
              id="demand-layer"
              checked={showDemandLayer}
              onCheckedChange={setShowDemandLayer}
            />
          </div>
        </CardContent>
      </Card>

      {/* Map Panel */}
      <Card className="glass-surface">
        <CardHeader>
          <CardTitle>Land Demand Map</CardTitle>
          <CardDescription>
            Visualizing property demand across Kenya based on search activity
            and market trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <SkeletonBlock className="h-8 w-full" />
              <SkeletonBlock className="aspect-video w-full" />
            </div>
          ) : error ? (
            <div className="flex aspect-video items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10">
              <p className="text-sm text-destructive">
                Failed to load map data
              </p>
            </div>
          ) : !heatMapPoints || heatMapPoints.length === 0 ? (
            <div className="flex aspect-video items-center justify-center rounded-lg border bg-muted/20">
              <div className="text-center">
                <MapIcon className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No demand data available
                </p>
              </div>
            </div>
          ) : showDemandLayer ? (
            <DemandHeatMap locations={heatMapPoints} />
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg border bg-muted/20">
              <p className="text-sm text-muted-foreground">
                Enable layers to view map data
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hot Content Section */}
      <HotContentLinksSection />
    </div>
  );
}
