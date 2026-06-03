import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DepthCardProps {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
  onClick?: () => void;
}

export default function DepthCard({
  children,
  className,
  onClick,
}: DepthCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border border-border bg-card",
        "transition-colors duration-150",
        "hover:bg-card/80",
        onClick && "cursor-pointer",
        className,
      )}
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}
