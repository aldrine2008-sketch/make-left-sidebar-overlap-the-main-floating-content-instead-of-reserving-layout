import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../../utils/motion";

interface DataPoint {
  label: string;
  value: number;
}

interface AnimatedLineChartProps {
  data: DataPoint[];
  className?: string;
}

export default function AnimatedLineChart({
  data,
  className,
}: AnimatedLineChartProps) {
  const [animated, setAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((point.value - minValue) / range) * 80;
    return { x, y, ...point };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-48"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor="oklch(var(--primary))"
              stopOpacity="0.8"
            />
            <stop
              offset="100%"
              stopColor="oklch(var(--accent))"
              stopOpacity="0.8"
            />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "transition-all duration-1500 ease-out motion-reduce:transition-none",
            animated && !prefersReducedMotion ? "opacity-100" : "opacity-0",
          )}
          style={{
            strokeDasharray: prefersReducedMotion ? "none" : "200",
            strokeDashoffset: animated && !prefersReducedMotion ? "0" : "200",
          }}
        />
        {points.map((point, index) => (
          <circle
            key={`${point.x}-${point.y}`}
            cx={point.x}
            cy={point.y}
            r="2"
            fill="oklch(var(--primary))"
            className={cn(
              "transition-all duration-500 motion-reduce:transition-none",
              animated ? "opacity-100 scale-100" : "opacity-0 scale-0",
            )}
            style={{
              transitionDelay: `${index * 100 + 500}ms`,
              transformOrigin: `${point.x}px ${point.y}px`,
            }}
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        {data.map((point, index) => (
          <span key={point.label ?? index}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}
