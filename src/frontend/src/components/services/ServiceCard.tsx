import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, ExternalLink, type LucideIcon } from "lucide-react";
import DepthCard from "../cards/DepthCard";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  hasRoute?: boolean;
  hasUrl?: boolean;
  onRouteClick?: () => void;
  onUrlClick?: () => void;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  hasRoute,
  hasUrl,
  onRouteClick,
  onUrlClick,
}: ServiceCardProps) {
  return (
    <DepthCard className="group transition-all hover:border-primary/50">
      <CardHeader>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
            <Icon className="h-6 w-6" />
          </div>
          {hasUrl && !hasRoute && (
            <Badge variant="outline" className="text-xs">
              <ExternalLink className="mr-1 h-3 w-3" />
              External
            </Badge>
          )}
          {hasRoute && hasUrl && (
            <Badge variant="outline" className="text-xs">
              Hybrid
            </Badge>
          )}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {hasRoute && (
          <Button
            variant="ghost"
            className="w-full group-hover:bg-primary/10 btn-lift"
            onClick={onRouteClick}
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Open in app
          </Button>
        )}
        {hasUrl && (
          <Button
            variant={hasRoute ? "outline" : "ghost"}
            className="w-full group-hover:bg-primary/10 btn-lift"
            onClick={onUrlClick}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open external
          </Button>
        )}
      </CardContent>
    </DepthCard>
  );
}
