import { Brain, Calculator, CheckCircle2, TrendingUp } from "lucide-react";
import { useState } from "react";
import type { InvestmentInput, ValuationInput } from "../../backend";
import DepthCard from "../../components/cards/DepthCard";
import AnimatedKPI from "../../components/charts/AnimatedKPI";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import {
  useCalculateInvestment,
  useCalculateValuation,
} from "../../hooks/useSidebarDomainQueries";

export default function AIValuationLabPage() {
  // Valuation form state
  const [location, setLocation] = useState("");
  const [landSize, setLandSize] = useState("");
  const [roadAccess, setRoadAccess] = useState(false);
  const [amenities, setAmenities] = useState("");
  const [valuationInput, setValuationInput] = useState<ValuationInput | null>(
    null,
  );

  // Investment form state
  const [buyingPrice, setBuyingPrice] = useState("");
  const [growthRate, setGrowthRate] = useState("");
  const [years, setYears] = useState("");
  const [investmentInput, setInvestmentInput] =
    useState<InvestmentInput | null>(null);

  const {
    data: valuation,
    isLoading: valuationLoading,
    error: valuationError,
  } = useCalculateValuation(valuationInput);
  const {
    data: investment,
    isLoading: investmentLoading,
    error: investmentError,
  } = useCalculateInvestment(investmentInput);

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !landSize.trim()) return;
    const amenityList = amenities
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);
    setValuationInput({
      location: location.trim(),
      landSizeAcres: Number.parseFloat(landSize),
      roadAccess,
      nearbyAmenities: amenityList,
    });
  };

  const handleInvestmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyingPrice.trim() || !growthRate.trim() || !years.trim()) return;
    setInvestmentInput({
      buyingPriceKES: Number.parseFloat(buyingPrice),
      annualGrowthRatePercent: Number.parseFloat(growthRate),
      investmentYears: BigInt(Number.parseInt(years, 10)),
    });
  };

  const potentialBadgeVariant = (
    potential: string,
  ): "default" | "secondary" | "destructive" => {
    if (potential === "High" || potential === "Excellent") return "default";
    if (potential === "Low" || potential === "Poor") return "destructive";
    return "secondary";
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <Brain className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Valuation Lab</h1>
          <p className="text-sm text-muted-foreground">
            Intelligent land valuation & investment analysis
          </p>
        </div>
      </div>

      <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Quick Valuation</h2>
          </div>
          <form onSubmit={handleValuationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="v-location">Location</Label>
                <Input
                  id="v-location"
                  data-ocid="valuation.location.input"
                  placeholder="e.g. Nairobi, Westlands"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-size">Land Size (acres)</Label>
                <Input
                  id="v-size"
                  data-ocid="valuation.land_size.input"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="e.g. 0.5"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="v-amenities">
                Nearby Amenities (comma-separated)
              </Label>
              <Input
                id="v-amenities"
                data-ocid="valuation.amenities.input"
                placeholder="e.g. School, Hospital, Tarmac road"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                id="v-road"
                data-ocid="valuation.road_access.checkbox"
                type="checkbox"
                className="h-4 w-4 rounded border-border accent-primary"
                checked={roadAccess}
                onChange={(e) => setRoadAccess(e.target.checked)}
              />
              <Label htmlFor="v-road" className="cursor-pointer">
                Road Access Available
              </Label>
            </div>
            <Button
              type="submit"
              data-ocid="valuation.submit_button"
              className="w-full"
              disabled={valuationLoading}
            >
              {valuationLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Calculating...
                </span>
              ) : (
                "Calculate Valuation"
              )}
            </Button>
          </form>

          {valuationError && (
            <div
              data-ocid="valuation.error_state"
              className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            >
              {valuationError.message}
            </div>
          )}

          {valuation && (
            <div
              data-ocid="valuation.success_state"
              className="mt-4 space-y-4 border-t border-white/10 pt-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-sm">Valuation Result</span>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">
                  Estimated Market Value
                </p>
                <AnimatedKPI
                  value={Number(valuation.estimatedValueKES)}
                  prefix="KES "
                  className="text-3xl font-bold text-primary"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-card/40 border border-white/10 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Potential
                  </p>
                  <Badge
                    variant={potentialBadgeVariant(
                      valuation.investmentPotential,
                    )}
                  >
                    {valuation.investmentPotential}
                  </Badge>
                </div>
                <div className="rounded-xl bg-card/40 border border-white/10 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Growth Forecast
                  </p>
                  <p className="font-bold text-green-500">
                    +{valuation.growthForecastPercent.toFixed(1)}%
                  </p>
                </div>
                <div className="rounded-xl bg-card/40 border border-white/10 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Confidence
                  </p>
                  <p className="font-bold">
                    {valuation.confidenceScore.toFixed(0)}%
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Confidence Score</span>
                  <span>{valuation.confidenceScore.toFixed(0)}%</span>
                </div>
                <Progress value={valuation.confidenceScore} className="h-2" />
              </div>
              {valuation.comparableProperties.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Comparable Properties
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {valuation.comparableProperties.map((cp) => (
                      <Badge key={cp} variant="outline" className="text-xs">
                        {cp}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DepthCard>

      <DepthCard className="bg-card/60 backdrop-blur-md border border-white/10 rounded-2xl">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Investment Calculator</h2>
          </div>
          <form onSubmit={handleInvestmentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="i-price">Buying Price (KES)</Label>
                <Input
                  id="i-price"
                  data-ocid="investment.buying_price.input"
                  type="number"
                  min="0"
                  placeholder="e.g. 5000000"
                  value={buyingPrice}
                  onChange={(e) => setBuyingPrice(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="i-rate">Annual Growth Rate (%)</Label>
                <Input
                  id="i-rate"
                  data-ocid="investment.growth_rate.input"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g. 8.5"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="i-years">Investment Years</Label>
                <Input
                  id="i-years"
                  data-ocid="investment.years.input"
                  type="number"
                  min="1"
                  placeholder="e.g. 5"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              data-ocid="investment.submit_button"
              className="w-full"
              disabled={investmentLoading}
            >
              {investmentLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Calculating ROI...
                </span>
              ) : (
                "Calculate ROI"
              )}
            </Button>
          </form>

          {investmentError && (
            <div
              data-ocid="investment.error_state"
              className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            >
              {investmentError.message}
            </div>
          )}

          {investment && (
            <div
              data-ocid="investment.success_state"
              className="mt-4 space-y-4 border-t border-white/10 pt-4"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-sm">ROI Analysis</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl bg-primary/5 border border-primary/20 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Projected Value
                  </p>
                  <AnimatedKPI
                    value={Number(investment.projectedValueKES)}
                    prefix="KES "
                    className="text-lg font-bold text-primary"
                  />
                </div>
                <div className="rounded-2xl bg-green-500/5 border border-green-500/20 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Profit</p>
                  <AnimatedKPI
                    value={Number(investment.profitKES)}
                    prefix="KES "
                    className="text-lg font-bold text-green-500"
                  />
                </div>
                <div className="rounded-2xl bg-card/40 border border-white/10 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">ROI</p>
                  <p className="text-lg font-bold">
                    {investment.roiPercent.toFixed(1)}%
                  </p>
                </div>
                <div className="rounded-2xl bg-card/40 border border-white/10 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Break-even
                  </p>
                  <p className="text-lg font-bold">
                    {investment.breakEvenYears.toFixed(1)} yrs
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DepthCard>
    </div>
  );
}
