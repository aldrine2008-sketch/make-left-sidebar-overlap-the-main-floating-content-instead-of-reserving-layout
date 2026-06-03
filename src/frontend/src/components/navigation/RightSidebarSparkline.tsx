import { cn } from "@/lib/utils";
import { useMotionSafe } from "@/utils/motion";

interface RightSidebarSparklineProps {
  data?: number[];
  className?: string;
}

export default function RightSidebarSparkline({
  data = [30, 45, 35, 60, 50, 70, 65],
  className,
}: RightSidebarSparklineProps) {
  const motionSafe = useMotionSafe();

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 30"
      className={cn("h-6 w-16", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("text-accent", motionSafe && "animate-pulse")}
        style={{
          animationDuration: motionSafe ? "3s" : "0s",
        }}
      />
    </svg>
  );
}
