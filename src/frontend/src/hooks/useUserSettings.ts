import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { UserSettings } from "../backend";
import { MotionPreference, ThemePreference } from "../backend";

export function useGetCallerUserSettings() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<UserSettings>({
    queryKey: ["callerUserSettings"],
    queryFn: async () => {
      if (!actor) {
        // Return defaults if actor not available
        return {
          themePreference: ThemePreference.light,
          motionPreference: MotionPreference.default_,
          notifications: {
            email: true,
            push: true,
            sms: false,
            criticalAlertsOnly: false,
          },
          privacy: {
            shareLocation: false,
            allowDataCollection: false,
            showPublicProfile: true,
          },
        };
      }
      return actor.getCallerUserSettings();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateCallerUserSettings() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: UserSettings) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateCallerUserSettings(settings);
    },
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(["callerUserSettings"], updatedSettings);
      queryClient.invalidateQueries({ queryKey: ["callerUserSettings"] });
    },
  });
}

export function useClearUserSettings() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.clearUserSettings();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerUserSettings"] });
    },
  });
}
