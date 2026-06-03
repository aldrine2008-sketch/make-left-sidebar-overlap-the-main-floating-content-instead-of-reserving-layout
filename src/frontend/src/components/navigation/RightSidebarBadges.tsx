import { cn } from "@/lib/utils";
import { useMotionSafe } from "@/utils/motion";

interface AlertBadgeProps {
  count: number;
  className?: string;
}

export function AlertBadge({ count, className }: AlertBadgeProps) {
  const motionSafe = useMotionSafe();

  if (count === 0) return null;

  return (
    <span
      className={cn(
        "flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-semibold text-accent-foreground",
        motionSafe && "animate-pulse",
        className,
      )}
      style={{
        animationDuration: motionSafe ? "2s" : "0s",
      }}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

interface NotificationDotProps {
  className?: string;
}

export function NotificationDot({ className }: NotificationDotProps) {
  const motionSafe = useMotionSafe();

  return (
    <span
      className={cn(
        "h-2 w-2 rounded-full bg-accent",
        motionSafe && "animate-pulse",
        className,
      )}
      style={{
        animationDuration: motionSafe ? "1.5s" : "0s",
      }}
    />
  );
}

interface RiskBadgeProps {
  level: "low" | "moderate" | "high";
  className?: string;
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const colors = {
    low: "bg-green-500/20 text-green-600 dark:text-green-400",
    moderate: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
    high: "bg-red-500/20 text-red-600 dark:text-red-400",
  };

  return (
    <span
      className={cn(
        "flex h-5 items-center justify-center rounded-full px-2 text-[10px] font-semibold uppercase",
        colors[level],
        className,
      )}
    >
      {level}
    </span>
  );
}
