import { cn } from "@/lib/utils";

interface SkeletonBlockProps {
  className?: string;
}

export default function SkeletonBlock({ className }: SkeletonBlockProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-muted motion-reduce:animate-none",
        className,
      )}
    />
  );
}
