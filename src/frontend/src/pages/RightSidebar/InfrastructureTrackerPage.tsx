import {
  CheckCircle2,
  Circle,
  Clock,
  Construction,
  MapPin,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type { InfrastructureTimelineItem } from "../../backend";
import DepthCard from "../../components/cards/DepthCard";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useGetInfrastructureTimeline } from "../../hooks/useSidebarDomainQueries";

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
];

const STATUS_ORDER = ["In Progress", "Planned", "Completed"];

function StatusIcon({ status }: { status: string }) {
  if (status === "Completed")
    return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  if (status === "In Progress") return <Zap className="h-4 w-4 text-primary" />;
  return <Circle className="h-4 w-4 text-muted-foreground" />;
}

function statusBadgeVariant(
  status: string,
): "default" | "secondary" | "outline" {
  if (status === "In Progress") return "default";
  if (status === "Completed") return "outline";
  return "secondary";
}

function typeIcon(type_: string) {
  if (type_.toLowerCase().includes("road")) return "🛣️";
  if (type_.toLowerCase().includes("water")) return "💧";
  if (type_.toLowerCase().includes("electric")) return "⚡";
  if (
    type_.toLowerCase().includes("school") ||
    type_.toLowerCase().includes("education")
  )
    return "🏫";
  if (
    type_.toLowerCase().includes("hospital") ||
    type_.toLowerCase().includes("health")
  )
    return "🏥";
  return "🏗️";
}

export default function InfrastructureTrackerPage() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const region = selectedRegion === "All Regions" ? null : selectedRegion;

  const {
    data: timeline,
    isLoading,
    error,
  } = useGetInfrastructureTimeline(region);

  const grouped = (timeline ?? []).reduce<
    Record<string, InfrastructureTimelineItem[]>
  >((acc, item) => {
    const key = item.status;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const orderedGroups = STATUS_ORDER.filter(
    (s) => grouped[s] && grouped[s].length > 0,
  );

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Construction className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Infrastructure Tracker</h1>
            <p className="text-sm text-muted-foreground">
              Government & development projects near land
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Label
            htmlFor="infra-region"
            className="text-xs text-muted-foreground"
          >
            Region
          </Label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger
              id="infra-region"
              data-ocid="infrastructure.region.select"
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
          data-ocid="infrastructure.error_state"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {error.message}
        </div>
      )}

      {isLoading ? (
        <div data-ocid="infrastructure.loading_state" className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-muted/40"
            />
          ))}
        </div>
      ) : timeline && timeline.length > 0 ? (
        <div className="space-y-6">
          {orderedGroups.map((status) => (
            <div key={status} className="space-y-3">
              <div className="flex items-center gap-2">
                <StatusIcon status={status} />
                <h2 className="text-sm font-semibold text-muted-foreground">
                  {status}
                </h2>
                <Badge variant={statusBadgeVariant(status)} className="text-xs">
                  {grouped[status].length}
                </Badge>
              </div>

              <div className="relative pl-5 border-l-2 border-white/10 space-y-3">
                {grouped[status].map((item, idx) => (
                  <DepthCard
                    key={item.id}
                    data-ocid={`infrastructure.item.${idx + 1}`}
                    className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl"
                  >
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">
                            {typeIcon(item.type)}
                          </span>
                          <div>
                            <p className="font-semibold text-sm">{item.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <Badge variant="outline" className="text-xs py-0">
                                {item.region}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={statusBadgeVariant(item.status)}
                          className="shrink-0 text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>

                      {item.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Start: {item.startDate}</span>
                        </div>
                        {item.endDate != null && (
                          <span>
                            End:{" "}
                            {new Date(
                              Number(item.endDate) / 1_000_000,
                            ).toLocaleDateString()}
                          </span>
                        )}
                        <span className="ml-auto">
                          Impact: {item.impactRadius}km
                        </span>
                      </div>
                    </div>
                  </DepthCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          data-ocid="infrastructure.empty_state"
          className="rounded-2xl border border-white/10 bg-card/40 p-12 text-center space-y-2"
        >
          <Construction className="h-10 w-10 mx-auto text-muted-foreground/40" />
          <p className="text-muted-foreground">
            No infrastructure projects found.
          </p>
          <p className="text-xs text-muted-foreground/60">
            {selectedRegion !== "All Regions"
              ? `No projects tracked in ${selectedRegion} yet.`
              : "Government and development projects will appear here."}
          </p>
        </div>
      )}
    </div>
  );
}
