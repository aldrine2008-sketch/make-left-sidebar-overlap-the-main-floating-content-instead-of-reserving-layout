import { aU as useActor, aV as useQueryClient, aW as useMutation, aX as useQuery, a as useInternetIdentity, aY as ExternalBlob, aZ as createActor } from "./index-BY4GfDKL.js";
function useGetCallerProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const query = useQuery({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched
  };
}
function useUpdateCallerProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    }
  });
}
function useUploadProfilePhoto() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      file,
      onProgress
    }) => {
      if (!actor) throw new Error("Actor not available");
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let blob = ExternalBlob.fromBytes(uint8Array);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }
      const currentProfile = await actor.getCallerUserProfile();
      if (!currentProfile) throw new Error("Profile not found");
      const updatedProfile = {
        ...currentProfile,
        photo: blob
      };
      await actor.saveCallerUserProfile(updatedProfile);
      return blob;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    }
  });
}
function useGetActivitySummary() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["activitySummary"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const [savedProperties, reports, transactions] = await Promise.all([
        actor.listSavedProperties(),
        actor.listPropertyReports(),
        actor.listTransactions()
      ]);
      let totalInvestment = 0;
      let totalReturns = 0;
      for (const txn of transactions) {
        if (txn.status === "completed") {
          totalInvestment += txn.price;
          totalReturns += txn.price * 1.1;
        }
      }
      const roiPercentage = totalInvestment > 0 ? (totalReturns - totalInvestment) / totalInvestment * 100 : 0;
      return {
        propertiesViewed: 0,
        // Backend doesn't track this yet
        searchesMade: 0,
        // Backend doesn't track this yet
        savedProperties: savedProperties.length,
        reportsGenerated: reports.length,
        investmentsTracked: transactions.length,
        roiSummary: roiPercentage,
        hasInsufficientData: transactions.length === 0
      };
    },
    enabled: !!actor && !actorFetching
  });
}
function useRecordPropertyView() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (propertyId) => {
      if (!actor) throw new Error("Actor not available");
      console.log("Property view recorded (not persisted):", propertyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activitySummary"] });
    }
  });
}
function useGetSecurityTelemetry() {
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["securityTelemetry"],
    queryFn: async () => {
      const baseScore = 70;
      const suggestions = [];
      if (!identity) {
        suggestions.push("Log in to enable security features");
      } else {
        suggestions.push(
          "Enable two-factor authentication (not yet available)"
        );
        suggestions.push("Verify your email address");
        suggestions.push("Verify your phone number");
      }
      return {
        securityScore: baseScore,
        suggestions,
        loginActivity: [],
        activeSessions: identity ? [
          {
            id: "1",
            device: "Current Browser",
            location: "Unknown",
            lastActive: Date.now(),
            current: true
          }
        ] : [],
        failedAttempts: 0,
        accountLocked: false,
        twoFactorEnabled: false
      };
    },
    enabled: !!identity
  });
}
function useUpdateSecurityPreference() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_preference) => {
      if (!actor) throw new Error("Actor not available");
      throw new Error("Two-factor authentication is not yet available");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["securityTelemetry"] });
    }
  });
}
function useListDocuments() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["documentsVault"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return [];
    },
    enabled: !!actor && !actorFetching
  });
}
function useUploadDocument() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      file,
      onProgress
    }) => {
      if (!actor) throw new Error("Actor not available");
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let blob = ExternalBlob.fromBytes(uint8Array);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }
      throw new Error("Document vault is not yet available");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentsVault"] });
    }
  });
}
function useGetCallerPreferences() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["callerPreferences"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerPreferences();
    },
    enabled: !!actor && !actorFetching
  });
}
function useUpdateCallerPreferences() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (preferences) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setCallerPreferences(preferences);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerPreferences"] });
    }
  });
}
function useExportUserData() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const [profile, preferences, savedProperties, reports, transactions] = await Promise.all([
        actor.getCallerUserProfile(),
        actor.getCallerPreferences(),
        actor.listSavedProperties(),
        actor.listPropertyReports(),
        actor.listTransactions()
      ]);
      const activitySummary = {
        propertiesViewed: 0,
        searchesMade: 0,
        savedProperties: savedProperties.length,
        reportsGenerated: reports.length,
        investmentsTracked: transactions.length,
        roiSummary: 0,
        hasInsufficientData: true
      };
      const exportData = {
        profile,
        preferences,
        activitySummary,
        documentsMetadata: [],
        exportDate: Date.now()
      };
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `land-registry-data-export-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return exportData;
    }
  });
}
function useDeleteAccount() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      throw new Error(
        "Account deletion is not yet available. Please contact support."
      );
    },
    onSuccess: () => {
      queryClient.clear();
    }
  });
}
export {
  useGetCallerProfile as a,
  useGetActivitySummary as b,
  useGetSecurityTelemetry as c,
  useListDocuments as d,
  useGetCallerPreferences as e,
  useUpdateCallerProfile as f,
  useUploadProfilePhoto as g,
  useUploadDocument as h,
  useUpdateCallerPreferences as i,
  useUpdateSecurityPreference as j,
  useExportUserData as k,
  useDeleteAccount as l,
  useRecordPropertyView as u
};
