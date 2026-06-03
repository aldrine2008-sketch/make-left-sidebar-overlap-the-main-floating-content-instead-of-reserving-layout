import { MotionPreference, ThemePreference } from "@/backend";
import { useGetCallerUserSettings } from "@/hooks/useUserSettings";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function UserSettingsBootstrapper() {
  const { identity } = useInternetIdentity();
  const { data: settings, isLoading } = useGetCallerUserSettings();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!identity || isLoading || !settings) return;

    // Map backend ThemePreference to next-themes theme names
    const themeMap: Record<ThemePreference, string> = {
      [ThemePreference.light]: "light",
      [ThemePreference.dark]: "dark",
      [ThemePreference.futuristic]: "futuristic",
    };

    const themeName = themeMap[settings.themePreference] || "light";
    setTheme(themeName);

    // Apply motion preference via CSS class on document root
    const root = document.documentElement;
    root.classList.remove("motion-reduce", "motion-default", "motion-advanced");

    if (settings.motionPreference === MotionPreference.reduced) {
      root.classList.add("motion-reduce");
    } else if (settings.motionPreference === MotionPreference.advanced) {
      root.classList.add("motion-advanced");
    } else {
      root.classList.add("motion-default");
    }
  }, [identity, settings, isLoading, setTheme]);

  return null;
}
