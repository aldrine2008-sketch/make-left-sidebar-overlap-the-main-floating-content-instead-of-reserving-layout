import { useRouterState } from "@tanstack/react-router";
import { type ReactNode, useEffect, useRef } from "react";
import { useReducedMotion } from "../../utils/motion";

interface RouteTransitionProps {
  children: ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  const routerState = useRouterState();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const previousPath = useRef(routerState.location.pathname);

  useEffect(() => {
    const currentPath = routerState.location.pathname;

    if (previousPath.current !== currentPath && containerRef.current) {
      if (!prefersReducedMotion) {
        containerRef.current.classList.remove("route-enter");
        void containerRef.current.offsetWidth; // Force reflow
        containerRef.current.classList.add("route-enter");
      }
      previousPath.current = currentPath;
    }
  }, [routerState.location.pathname, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="route-transition">
      {children}
    </div>
  );
}
