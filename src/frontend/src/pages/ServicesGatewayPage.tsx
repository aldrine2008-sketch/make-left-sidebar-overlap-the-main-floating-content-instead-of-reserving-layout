import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRightLeft,
  Briefcase,
  Calculator,
  FileCheck,
  FileText,
  FolderOpen,
  IdCard,
  type LucideIcon,
  MessageCircle,
  Receipt,
  Search,
  Split,
} from "lucide-react";
import ServiceCard from "../components/services/ServiceCard";
import { servicesCatalog } from "../config/servicesCatalog";

// Map icon strings to Lucide components
const iconMap: Record<string, LucideIcon> = {
  search: Search,
  "file-text": FileText,
  "arrow-right-left": ArrowRightLeft,
  split: Split,
  "alert-triangle": AlertTriangle,
  calculator: Calculator,
  "id-card": IdCard,
  briefcase: Briefcase,
  receipt: Receipt,
  "file-check": FileCheck,
  "folder-open": FolderOpen,
  "message-circle": MessageCircle,
};

export default function ServicesGatewayPage() {
  const navigate = useNavigate();

  const handleRouteClick = (route: string) => {
    navigate({ to: route });
  };

  const handleUrlClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Government Services Gateway</h1>
        <p className="text-muted-foreground">
          Access a comprehensive range of land-related and government services
          in one place
        </p>
      </div>

      {servicesCatalog.map((category) => (
        <section key={category.category}>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">{category.category}</h2>
            <p className="text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service, _index) => (
              <ServiceCard
                key={service.title}
                icon={iconMap[service.icon] || FileText}
                title={service.title}
                description={service.description}
                hasRoute={!!service.route}
                hasUrl={!!service.url}
                onRouteClick={
                  service.route
                    ? () => handleRouteClick(service.route!)
                    : undefined
                }
                onUrlClick={
                  service.url ? () => handleUrlClick(service.url!) : undefined
                }
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
