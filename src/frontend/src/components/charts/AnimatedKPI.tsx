import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../utils/motion";

interface AnimatedKPIProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedKPI({
  value,
  duration = 1000,
  suffix = "",
  prefix = "",
  className,
}: AnimatedKPIProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const frameRef = useRef<number | undefined>(undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — displayValue is the animated state being updated
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const startTime = Date.now();
    const startValue = displayValue;
    const diff = value - startValue;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);

      setDisplayValue(Math.floor(startValue + diff * easeOutQuad));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration, prefersReducedMotion]);

  return (
    <span className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
