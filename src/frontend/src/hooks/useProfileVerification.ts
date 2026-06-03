import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ExternalBlob,
  Preferences,
  VerifiedUserProfile,
} from "../backend";
import { ExternalBlob as BlobClass } from "../backend";

// Activity Summary Types
export interface ActivitySummary {
  propertiesViewed: number;
  searchesMade: number;
  savedProperties: number;
  reportsGenerated: number;
  investmentsTracked: number;
  roiSummary: number;
  hasInsufficientData: boolean;
}

// Security Telemetry Types
export interface SecurityTelemetry {
  securityScore: number;
  suggestions: string[];
  loginActivity: LoginEvent[];
  activeSessions: DeviceSession[];
  failedAttempts: number;
  accountLocked: boolean;
  twoFactorEnabled: boolean;
}

export interface LoginEvent {
  timestamp: number;
  device: string;
  location: string;
  success: boolean;
}

export interface DeviceSession {
  id: string;
  device: string;
  location: string;
  lastActive: number;
  current: boolean;
}

// Document Types
export interface DocumentMetadata {
  id: string;
  category: string;
  filename: string;
  uploadDate: number;
  status: "pending" | "verified" | "rejected";
  notes?: string;
  blob: ExternalBlob;
}

// Privacy Export Type
export interface PrivacyExport {
  profile: VerifiedUserProfile | null;
  preferences: Preferences;
  activitySummary: ActivitySummary;
  documentsMetadata: DocumentMetadata[];
  exportDate: number;
}

// Profile & Identity
export function useGetCallerProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const query = useQuery<VerifiedUserProfile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useUpdateCallerProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: VerifiedUserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useUploadProfilePhoto() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      onProgress,
    }: { file: File; onProgress?: (percentage: number) => void }) => {
      if (!actor) throw new Error("Actor not available");

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      let blob = BlobClass.fromBytes(uint8Array);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }

      // Get current profile
      const currentProfile = await actor.getCallerUserProfile();
      if (!currentProfile) throw new Error("Profile not found");

      // Update profile with new photo
      const updatedProfile: VerifiedUserProfile = {
        ...currentProfile,
        photo: blob,
      };

      await actor.saveCallerUserProfile(updatedProfile);
      return blob;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

// Activity Tracking & Summary
export function useGetActivitySummary() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ActivitySummary>({
    queryKey: ["activitySummary"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");

      // Fetch all relevant data
      const [savedProperties, reports, transactions] = await Promise.all([
        actor.listSavedProperties(),
        actor.listPropertyReports(),
        actor.listTransactions(),
      ]);

      // Calculate ROI from transactions
      let totalInvestment = 0;
      let totalReturns = 0;
      for (const txn of transactions) {
        if (txn.status === "completed") {
          totalInvestment += txn.price;
          totalReturns += txn.price * 1.1; // Simplified ROI calculation
        }
      }

      const roiPercentage =
        totalInvestment > 0
          ? ((totalReturns - totalInvestment) / totalInvestment) * 100
          : 0;

      return {
        propertiesViewed: 0, // Backend doesn't track this yet
        searchesMade: 0, // Backend doesn't track this yet
        savedProperties: savedProperties.length,
        reportsGenerated: reports.length,
        investmentsTracked: transactions.length,
        roiSummary: roiPercentage,
        hasInsufficientData: transactions.length === 0,
      };
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useRecordPropertyView() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propertyId: string) => {
      if (!actor) throw new Error("Actor not available");
      // Backend doesn't have this method yet
      console.log("Property view recorded (not persisted):", propertyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activitySummary"] });
    },
  });
}

export function useRecordSearch() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (searchQuery: string) => {
      if (!actor) throw new Error("Actor not available");
      await actor.recordSearch(searchQuery);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activitySummary"] });
    },
  });
}

// Security Telemetry
export function useGetSecurityTelemetry() {
  const { identity } = useInternetIdentity();

  return useQuery<SecurityTelemetry>({
    queryKey: ["securityTelemetry"],
    queryFn: async () => {
      // Backend doesn't store security telemetry yet
      const baseScore = 70;
      const suggestions: string[] = [];

      if (!identity) {
        suggestions.push("Log in to enable security features");
      } else {
        suggestions.push(
          "Enable two-factor authentication (not yet available)",
        );
        suggestions.push("Verify your email address");
        suggestions.push("Verify your phone number");
      }

      return {
        securityScore: baseScore,
        suggestions,
        loginActivity: [],
        activeSessions: identity
          ? [
              {
                id: "1",
                device: "Current Browser",
                location: "Unknown",
                lastActive: Date.now(),
                current: true,
              },
            ]
          : [],
        failedAttempts: 0,
        accountLocked: false,
        twoFactorEnabled: false,
      };
    },
    enabled: !!identity,
  });
}

export function useUpdateSecurityPreference() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_preference: { twoFactorEnabled: boolean }) => {
      if (!actor) throw new Error("Actor not available");
      // Backend doesn't store this yet
      throw new Error("Two-factor authentication is not yet available");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["securityTelemetry"] });
    },
  });
}

// Documents Vault
export function useListDocuments() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<DocumentMetadata[]>({
    queryKey: ["documentsVault"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      // Backend doesn't have document vault yet
      return [];
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUploadDocument() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      onProgress,
    }: {
      file: File;
      category: string;
      notes?: string;
      onProgress?: (percentage: number) => void;
    }) => {
      if (!actor) throw new Error("Actor not available");

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      let blob = BlobClass.fromBytes(uint8Array);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }

      // Backend doesn't have document vault yet
      throw new Error("Document vault is not yet available");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documentsVault"] });
    },
  });
}

// Preferences
export function useGetCallerPreferences() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Preferences>({
    queryKey: ["callerPreferences"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerPreferences();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateCallerPreferences() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: Preferences) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setCallerPreferences(preferences);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerPreferences"] });
    },
  });
}

// Privacy Operations
export function useExportUserData() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");

      // Fetch all user data
      const [profile, preferences, savedProperties, reports, transactions] =
        await Promise.all([
          actor.getCallerUserProfile(),
          actor.getCallerPreferences(),
          actor.listSavedProperties(),
          actor.listPropertyReports(),
          actor.listTransactions(),
        ]);

      // Calculate activity summary
      const activitySummary: ActivitySummary = {
        propertiesViewed: 0,
        searchesMade: 0,
        savedProperties: savedProperties.length,
        reportsGenerated: reports.length,
        investmentsTracked: transactions.length,
        roiSummary: 0,
        hasInsufficientData: true,
      };

      const exportData: PrivacyExport = {
        profile,
        preferences,
        activitySummary,
        documentsMetadata: [],
        exportDate: Date.now(),
      };

      // Create downloadable JSON
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `land-registry-data-export-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return exportData;
    },
  });
}

export function useDeleteAccount() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      // Backend doesn't have delete account yet
      throw new Error(
        "Account deletion is not yet available. Please contact support.",
      );
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
