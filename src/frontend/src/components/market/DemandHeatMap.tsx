import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { DemandHeatMapPoint } from "../../backend";
import { getMotionDuration, useReducedMotion } from "../../utils/motion";
import { GENERATED_ASSETS } from "../branding/GeneratedAssets";

interface DemandHeatMapProps {
  locations: DemandHeatMapPoint[];
}

export default function DemandHeatMap({ locations }: DemandHeatMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [_dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const prefersReducedMotion = useReducedMotion();
  const duration = getMotionDuration(prefersReducedMotion, 300);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Normalize demand scores to 0-100 range for visualization
  const maxDemand = Math.max(...locations.map((l) => Number(l.demandScore)), 1);
  const normalizedLocations = locations.map((loc) => ({
    ...loc,
    normalizedDemand: (Number(loc.demandScore) / maxDemand) * 100,
  }));

  // Calculate coordinate bounds for locations that have coordinates
  const locationsWithCoords = normalizedLocations.filter(
    (loc) => loc.coordinates,
  );
  const coordBounds =
    locationsWithCoords.length > 0
      ? {
          minLat: Math.min(
            ...locationsWithCoords.map((l) => l.coordinates!.latitude),
          ),
          maxLat: Math.max(
            ...locationsWithCoords.map((l) => l.coordinates!.latitude),
          ),
          minLon: Math.min(
            ...locationsWithCoords.map((l) => l.coordinates!.longitude),
          ),
          maxLon: Math.max(
            ...locationsWithCoords.map((l) => l.coordinates!.longitude),
          ),
        }
      : null;

  // Generate pseudo-random but stable positions based on location name (fallback)
  const getPositionForLocation = (locationName: string, index: number) => {
    let hash = 0;
    for (let i = 0; i < locationName.length; i++) {
      hash = (hash << 5) - hash + locationName.charCodeAt(i);
      hash = hash & hash;
    }

    const x = 15 + ((Math.abs(hash) % 70) + ((index * 7) % 70));
    const y = 15 + ((Math.abs(hash >> 8) % 70) + ((index * 11) % 70));

    return { x, y };
  };

  // Map coordinates to position percentage
  const getCoordinatePosition = (coords: {
    latitude: number;
    longitude: number;
  }) => {
    if (!coordBounds) return null;

    // Handle collapsed ranges (all points have same coordinate)
    const latRange = coordBounds.maxLat - coordBounds.minLat;
    const lonRange = coordBounds.maxLon - coordBounds.minLon;

    const x =
      lonRange === 0
        ? 50
        : ((coords.longitude - coordBounds.minLon) / lonRange) * 80 + 10; // Map to 10-90%

    // Invert latitude so larger latitude renders nearer the top
    const y =
      latRange === 0
        ? 50
        : ((coordBounds.maxLat - coords.latitude) / latRange) * 80 + 10; // Map to 10-90%

    return { x, y };
  };

  // Get position for a location (coordinate-based or fallback)
  const getPosition = (
    location: (typeof normalizedLocations)[0],
    index: number,
  ) => {
    if (location.coordinates) {
      const coordPos = getCoordinatePosition(location.coordinates);
      if (coordPos) return coordPos;
    }
    return getPositionForLocation(location.location, index);
  };

  // Get color based on demand intensity
  const getHeatColor = (normalizedDemand: number): string => {
    if (normalizedDemand >= 75) return "hsl(var(--destructive))";
    if (normalizedDemand >= 50) return "hsl(var(--warning))";
    if (normalizedDemand >= 25) return "hsl(var(--primary))";
    return "hsl(var(--muted-foreground))";
  };

  const getHeatSize = (normalizedDemand: number): number => {
    return 20 + (normalizedDemand / 100) * 40; // 20px to 60px
  };

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 rounded-lg border bg-muted/30 p-3">
        <span className="text-sm font-medium">Demand Level:</span>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "hsl(var(--muted-foreground))" }}
          />
          <span className="text-xs text-muted-foreground">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "hsl(var(--primary))" }}
          />
          <span className="text-xs text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "hsl(var(--warning))" }}
          />
          <span className="text-xs text-muted-foreground">High</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "hsl(var(--destructive))" }}
          />
          <span className="text-xs text-muted-foreground">Very High</span>
        </div>
      </div>

      {/* Heat Map */}
      <div
        ref={containerRef}
        className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted/20"
        style={{
          backgroundImage: `url(${GENERATED_ASSETS.mapTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-background/60" />

        {/* Heat markers */}
        <TooltipProvider>
          {normalizedLocations.map((location, index) => {
            const pos = getPosition(location, index);
            const size = getHeatSize(location.normalizedDemand);
            const color = getHeatColor(location.normalizedDemand);

            return (
              <Tooltip key={location.location}>
                <TooltipTrigger asChild>
                  <div
                    className="absolute cursor-pointer"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: "translate(-50%, -50%)",
                      transition: `all ${duration}ms ease-out`,
                    }}
                  >
                    {/* Pulsing outer ring */}
                    <div
                      className="absolute inset-0 animate-ping rounded-full opacity-30"
                      style={{
                        backgroundColor: color,
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDuration: "2s",
                      }}
                    />
                    {/* Main marker */}
                    <div
                      className="relative flex items-center justify-center rounded-full opacity-80 transition-all hover:scale-110 hover:opacity-100"
                      style={{
                        backgroundColor: color,
                        width: `${size}px`,
                        height: `${size}px`,
                      }}
                    >
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold">{location.location}</p>
                    <p className="text-xs text-muted-foreground">
                      Demand Score: {Number(location.demandScore)}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>

        {/* Empty state */}
        {locations.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No demand data available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
