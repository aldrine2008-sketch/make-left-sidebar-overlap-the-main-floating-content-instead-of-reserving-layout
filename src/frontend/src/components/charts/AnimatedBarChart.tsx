import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../../utils/motion";

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface AnimatedBarChartProps {
  data: BarData[];
  maxValue?: number;
  className?: string;
}

export default function AnimatedBarChart({
  data,
  maxValue,
  className,
}: AnimatedBarChartProps) {
  const [animated, setAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const max = maxValue || Math.max(...data.map((d) => d.value));

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("space-y-4", className)}>
      {data.map((item, index) => (
        <div key={item.label ?? index} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{item.label}</span>
            <span className="text-muted-foreground">{item.value}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out motion-reduce:transition-none",
                item.color || "bg-primary",
              )}
              style={{
                width:
                  animated && !prefersReducedMotion
                    ? `${(item.value / max) * 100}%`
                    : prefersReducedMotion
                      ? `${(item.value / max) * 100}%`
                      : "0%",
                transitionDelay: `${index * 100}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
