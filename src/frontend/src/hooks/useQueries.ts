import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { Principal } from "@dfinity/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ApplicationStatus,
  DemandHeatMapPoint,
  LandApplicationView,
  MarketTrendData,
  Transaction,
} from "../backend";
import { ApplicationStatus as AppStatus, type ExternalBlob } from "../backend";

export function useGetMyApplications() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<LandApplicationView[]>({
    queryKey: ["myApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.checkApplicationStatus(Principal.fromText("2vxsx-fae"));
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetApplicationById(appId: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<LandApplicationView | null>({
    queryKey: ["application", appId],
    queryFn: async () => {
      if (!actor || !appId) return null;
      // Search by title number to find the application
      // This is a workaround since there's no direct getApplicationById method
      const allApps = await actor.getApplicationsByStatusInternal(
        AppStatus.approved,
      );
      const app = allApps.find((a) => a.id === appId);
      if (app) return app;

      // Try other statuses
      const statuses: ApplicationStatus[] = [
        AppStatus.draft,
        AppStatus.submitted,
        AppStatus.underReview,
        AppStatus.rejected,
        AppStatus.cancelled,
      ];
      for (const status of statuses) {
        const apps = await actor.getApplicationsByStatusInternal(status);
        const found = apps.find((a) => a.id === appId);
        if (found) return found;
      }

      return null;
    },
    enabled: !!actor && !actorFetching && !!appId,
  });
}

export function useSearchApplicationsByTitleNumber(titleNumber: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<LandApplicationView[]>({
    queryKey: ["searchApplications", "titleNumber", titleNumber],
    queryFn: async () => {
      if (!actor || !titleNumber) return [];
      return actor.searchApplicationsByTitleNumber(titleNumber);
    },
    enabled: !!actor && !actorFetching && !!titleNumber,
  });
}

export function useSearchApplicationsByLocation(location: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<LandApplicationView[]>({
    queryKey: ["searchApplications", "location", location],
    queryFn: async () => {
      if (!actor || !location) return [];
      return actor.searchApplicationsByLocation(location);
    },
    enabled: !!actor && !actorFetching && !!location,
  });
}

export function useGetApplicationsByStatus(status: ApplicationStatus) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<LandApplicationView[]>({
    queryKey: ["applications", "status", status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApplicationsByStatusInternal(status);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetApplicationStatus(appId: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ApplicationStatus>({
    queryKey: ["applicationStatus", appId],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getApplicationStatus(appId);
    },
    enabled: !!actor && !actorFetching && !!appId,
  });
}

export function useCreateApplication() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      titleNumber: string;
      area: bigint | null;
      location: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createApplication(
        data.titleNumber,
        data.area,
        data.location,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
    },
  });
}

export function useSubmitApplication() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitApplication(appId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useApproveApplication() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.approveApplication(appId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useRejectApplication() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      appId,
      reason,
    }: { appId: string; reason: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.rejectApplication(appId, reason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useCancelApplication() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.cancelApplication(appId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
    },
  });
}

export function useUploadAttachment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      appId,
      blob,
    }: { appId: string; blob: ExternalBlob }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.uploadAttachment(appId, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

// Transaction Queries
export function useGetTransaction(id: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Transaction | null>({
    queryKey: ["transaction", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getTransaction(id);
    },
    enabled: !!actor && !actorFetching && !!id,
  });
}

export function useListTransactions() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTransactions();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Market Trend Queries
export function useGetAllMarketTrends() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<MarketTrendData[]>({
    queryKey: ["marketTrends"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMarketTrends();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetTopSearches(limit: number) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<[string, bigint][]>({
    queryKey: ["topSearches", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopSearches(BigInt(limit));
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetDemandHeatMapPoints() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<DemandHeatMapPoint[]>({
    queryKey: ["demandHeatMapPoints"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDemandHeatMapPoints();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useRecordSearch() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (location: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.recordSearch(location);
    },
  });
}
