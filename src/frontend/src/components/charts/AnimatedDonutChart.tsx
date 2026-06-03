import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../../utils/motion";

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface AnimatedDonutChartProps {
  data: DonutSegment[];
  className?: string;
}

export default function AnimatedDonutChart({
  data,
  className,
}: AnimatedDonutChartProps) {
  const [animated, setAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  let currentAngle = -90;
  const segments = data.map((segment) => {
    const percentage = (segment.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    return {
      ...segment,
      percentage,
      startAngle,
      endAngle: currentAngle,
    };
  });

  const radius = 40;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <svg viewBox="0 0 100 100" className="w-32 h-32" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="oklch(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {segments.map((segment, index) => {
          const dashArray = (segment.percentage / 100) * circumference;
          const _dashOffset = circumference - dashArray;
          const rotation = segment.startAngle + 90;

          return (
            <circle
              key={segment.label ?? index}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashArray} ${circumference}`}
              strokeDashoffset={
                animated && !prefersReducedMotion ? 0 : circumference
              }
              transform={`rotate(${rotation} 50 50)`}
              className={cn(
                "transition-all duration-1000 ease-out motion-reduce:transition-none",
              )}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            />
          );
        })}
      </svg>
      <div className="space-y-2">
        {segments.map((segment, index) => (
          <div
            key={segment.label ?? index}
            className="flex items-center gap-2 text-sm"
          >
            <div
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-muted-foreground">{segment.label}</span>
            <span className="font-medium">
              {segment.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
