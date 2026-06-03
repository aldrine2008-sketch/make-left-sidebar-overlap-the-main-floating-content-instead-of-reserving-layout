import { useEffect, useState } from "react";

/**
 * Hook to detect if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Alias for backward compatibility
 */
export function useReducedMotion(): boolean {
  return usePrefersReducedMotion();
}

/**
 * Hook that returns true if motion is safe (user does NOT prefer reduced motion)
 */
export function useMotionSafe(): boolean {
  return !usePrefersReducedMotion();
}

/**
 * Get motion-safe duration (0 if reduced motion is preferred)
 * @param prefersReducedMotion - boolean indicating if user prefers reduced motion
 * @param duration - the duration in milliseconds
 */
export function getMotionDuration(
  prefersReducedMotion: boolean,
  duration: number,
): number;
/**
 * Get motion-safe duration (0 if reduced motion is preferred)
 * @param duration - the duration in milliseconds
 */
export function getMotionDuration(duration: number): number;
export function getMotionDuration(
  arg1: boolean | number,
  arg2?: number,
): number {
  // Handle both signatures for backward compatibility
  if (typeof arg1 === "boolean") {
    // getMotionDuration(prefersReducedMotion, duration)
    const prefersReducedMotion = arg1;
    const duration = arg2 ?? 0;
    return prefersReducedMotion ? 0 : duration;
  }
  // getMotionDuration(duration)
  const duration = arg1;
  if (typeof window === "undefined") return duration;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return prefersReducedMotion ? 0 : duration;
}

/**
 * Get motion-safe class name
 */
export function motionSafeClass(className: string): string {
  return `motion-safe:${className}`;
}
