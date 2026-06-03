import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  CheckCircle,
  FileText,
  MapPin,
  Search,
  Shield,
} from "lucide-react";
import { GENERATED_ASSETS } from "../components/branding/GeneratedAssets";
import DepthCard from "../components/cards/DepthCard";
import AnimatedKPI from "../components/charts/AnimatedKPI";
import { useGetCallerUserProfile } from "../hooks/useCurrentUser";
import DashboardPage from "./DashboardPage";

export default function LandingPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  // Show dashboard for authenticated users
  if (isAuthenticated && userProfile) {
    return <DashboardPage />;
  }

  const features = [
    {
      icon: Search,
      title: "Land Records Search",
      description:
        "Search and verify land ownership records instantly with our comprehensive database.",
      action: () => navigate({ to: "/search" }),
    },
    {
      icon: FileText,
      title: "Title Registration",
      description:
        "Register and manage title deeds digitally with full transparency and security.",
      action: () => navigate({ to: "/applications/new" }),
      requiresAuth: true,
    },
    {
      icon: Shield,
      title: "Dispute Resolution",
      description:
        "File and track land disputes with evidence-based documentation and clear outcomes.",
      action: () => navigate({ to: "/applications" }),
      requiresAuth: true,
    },
    {
      icon: Briefcase,
      title: "Government Services",
      description:
        "Access a wide range of land-related and government services in one place.",
      action: () => navigate({ to: "/services" }),
    },
    {
      icon: MapPin,
      title: "GIS Documentation",
      description:
        "Upload geo-tagged photographic evidence to secure and verify land rights.",
      action: () => navigate({ to: "/applications/new" }),
      requiresAuth: true,
    },
    {
      icon: CheckCircle,
      title: "Public Verification",
      description:
        "Verify the authenticity and status of land records with reference numbers.",
      action: () => navigate({ to: "/verify" }),
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section
        className="glass-surface relative overflow-hidden rounded-3xl p-12 md:p-16"
        style={{
          backgroundImage: `linear-gradient(135deg, oklch(var(--primary) / 0.15), oklch(var(--background) / 0.95), oklch(var(--accent) / 0.15)), url(${GENERATED_ASSETS.heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="relative z-10 max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-fade-in">
            Geo Sentinel
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Transparent, secure, and accessible land ownership and dispute
            management for all citizens. Eliminate middlemen, reduce corruption,
            and manage your land rights with confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() => navigate({ to: "/search" })}
              className="btn-lift"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Records
            </Button>
            {isAuthenticated ? (
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: "/applications" })}
                className="btn-lift"
              >
                <FileText className="mr-2 h-5 w-5" />
                My Applications
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: "/verify" })}
                className="btn-lift"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Verify Record
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold">
            Comprehensive Land Services
          </h2>
          <p className="text-muted-foreground">
            Everything you need for land administration, registration, and
            dispute resolution
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, _index) => (
            <DepthCard
              key={feature.title}
              onClick={feature.action}
              className="group transition-all hover:border-primary/50"
            >
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-primary/10 btn-lift"
                >
                  Learn More
                </Button>
              </CardContent>
            </DepthCard>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="glass-surface rounded-3xl p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">
              <AnimatedKPI value={100} suffix="%" />
            </div>
            <div className="text-sm text-muted-foreground">
              Digital Transparency
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">
              <AnimatedKPI value={24} suffix="/7" />
            </div>
            <div className="text-sm text-muted-foreground">
              Service Availability
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">
              <AnimatedKPI value={0} />
            </div>
            <div className="text-sm text-muted-foreground">
              Middlemen Required
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
