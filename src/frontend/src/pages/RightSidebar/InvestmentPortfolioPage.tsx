import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import DepthCard from "../../components/cards/DepthCard";
import AnimatedKPI from "../../components/charts/AnimatedKPI";
import { Badge } from "../../components/ui/badge";
import { useGetPortfolioSummary } from "../../hooks/useSidebarDomainQueries";

export default function InvestmentPortfolioPage() {
  const { data: portfolio, isLoading, error } = useGetPortfolioSummary();

  const totalProperties = portfolio?.properties.length ?? 0;

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <BarChart3 className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Investment Portfolio</h1>
          <p className="text-sm text-muted-foreground">
            Your land asset performance overview
          </p>
        </div>
      </div>

      {error && (
        <div
          data-ocid="portfolio.error_state"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {error.message}
        </div>
      )}

      {isLoading ? (
        <div data-ocid="portfolio.loading_state" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl bg-muted/40"
              />
            ))}
          </div>
          <div className="h-64 animate-pulse rounded-2xl bg-muted/40" />
        </div>
      ) : portfolio ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    Total Value
                  </span>
                </div>
                <AnimatedKPI
                  value={Number(portfolio.totalEstimatedValue)}
                  prefix="KES "
                  className="text-2xl font-bold"
                />
              </div>
            </DepthCard>
            <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-muted-foreground">
                    Annual Growth
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-500">
                  +{portfolio.annualGrowthRate.toFixed(1)}%
                </p>
              </div>
            </DepthCard>
          </div>

          <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
            <div className="p-5 space-y-3">
              <h2 className="font-semibold">Risk Distribution</h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Low Risk</p>
                  <AnimatedKPI
                    value={Number(portfolio.riskDistribution.low)}
                    className="text-xl font-bold text-green-500"
                  />
                </div>
                <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Medium</p>
                  <AnimatedKPI
                    value={Number(portfolio.riskDistribution.medium)}
                    className="text-xl font-bold text-yellow-500"
                  />
                </div>
                <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-center">
                  <AlertTriangle className="h-5 w-5 text-destructive mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">High Risk</p>
                  <AnimatedKPI
                    value={Number(portfolio.riskDistribution.high)}
                    className="text-xl font-bold text-destructive"
                  />
                </div>
              </div>
            </div>
          </DepthCard>

          {totalProperties > 0 ? (
            <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
              <div className="p-5 space-y-3">
                <h2 className="font-semibold">
                  Properties ({totalProperties})
                </h2>
                <div className="space-y-2">
                  {portfolio.properties.map((property, idx) => (
                    <div
                      key={property.id}
                      data-ocid={`portfolio.item.${idx + 1}`}
                      className="flex items-center justify-between rounded-xl bg-card/40 border border-white/10 px-4 py-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {property.titleNumber}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {property.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge
                          variant={
                            property.status === "active"
                              ? "default"
                              : property.status === "disputed"
                                ? "destructive"
                                : "outline"
                          }
                          className="capitalize text-xs"
                        >
                          {property.status}
                        </Badge>
                        <span className="text-sm font-semibold tabular-nums">
                          KES {property.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DepthCard>
          ) : (
            <div
              data-ocid="portfolio.empty_state"
              className="rounded-2xl border border-white/10 bg-card/40 p-10 text-center space-y-2"
            >
              <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground/40" />
              <p className="text-muted-foreground">
                No properties in your portfolio.
              </p>
              <p className="text-xs text-muted-foreground/60">
                Add properties to track your portfolio performance.
              </p>
            </div>
          )}
        </>
      ) : (
        <div
          data-ocid="portfolio.empty_state"
          className="rounded-2xl border border-white/10 bg-card/40 p-10 text-center space-y-2"
        >
          <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground/40" />
          <p className="text-muted-foreground">No portfolio data available.</p>
          <p className="text-xs text-muted-foreground/60">
            Your investment summary will appear here once properties are added.
          </p>
        </div>
      )}
    </div>
  );
}
