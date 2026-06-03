import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AuditEntry,
  DashboardStats,
  DisputeEvidence,
  DisputeTimelineEvent,
  DisputeView,
  GeneratedPropertyReport,
  InfrastructureProject,
  InfrastructureTimelineItem,
  InvestmentInput,
  InvestmentResult,
  MarketAnalytics,
  MarketTrend,
  Notification,
  NotificationFeedItem,
  PortfolioSummary,
  Property,
  PropertyReport,
  RiskSummary,
  SavedProperty,
  Transaction,
  TransactionStageEntry,
  Valuation,
  ValuationInput,
  ValuationResult,
  VerificationRecord,
  VerificationStatus,
} from "../backend";

// ─── Dashboard ───────────────────────────────────────────────────────────────
export function useGetDashboardStats() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });
}

// ─── AI Valuation ─────────────────────────────────────────────────────────────
export function useCalculateValuation(input: ValuationInput | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ValuationResult | null>({
    queryKey: ["valuation", input],
    queryFn: async () => {
      if (!actor || !input) return null;
      const result = await actor.calculateValuation(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !actorFetching && !!input,
  });
}

export function useCalculateInvestment(input: InvestmentInput | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<InvestmentResult | null>({
    queryKey: ["investment", input],
    queryFn: async () => {
      if (!actor || !input) return null;
      return actor.calculateInvestment(input);
    },
    enabled: !!actor && !actorFetching && !!input,
  });
}

// ─── Market Analytics ─────────────────────────────────────────────────────────
export function useGetMarketAnalytics(region?: string | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<MarketAnalytics>({
    queryKey: ["marketAnalytics", region ?? null],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getMarketAnalytics(region ?? null);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 60_000,
  });
}

// ─── Marketplace ──────────────────────────────────────────────────────────────
export function useGetMarketplaceListings(filters?: {
  verified?: boolean;
  minPrice?: number;
  maxPrice?: number;
}) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const verified = filters?.verified ?? null;
  const minPrice = filters?.minPrice ?? null;
  const maxPrice = filters?.maxPrice ?? null;

  return useQuery<Property[]>({
    queryKey: ["marketplaceListings", verified, minPrice, maxPrice],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMarketplaceListings(verified, minPrice, maxPrice);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });
}

// ─── Risk Intelligence ────────────────────────────────────────────────────────
export function useGetRiskIntelligence(region?: string | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<RiskSummary>({
    queryKey: ["riskIntelligence", region ?? null],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getRiskIntelligenceSummary(region ?? null);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 60_000,
  });
}

// ─── Notifications ────────────────────────────────────────────────────────────
export function useGetNotificationFeed(limit = 20) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<NotificationFeedItem[]>({
    queryKey: ["notificationFeed", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotificationFeed(BigInt(limit));
    },
    enabled: !!actor && !actorFetching,
    staleTime: 15_000,
  });
}

export function useMarkNotificationRead() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.markNotificationRead(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationFeed"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

// ─── Investment Portfolio ─────────────────────────────────────────────────────
export function useGetPortfolioSummary() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<PortfolioSummary>({
    queryKey: ["portfolioSummary"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getInvestmentPortfolioSummary();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 60_000,
  });
}

// ─── Infrastructure ───────────────────────────────────────────────────────────
export function useGetInfrastructureTimeline(region?: string | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<InfrastructureTimelineItem[]>({
    queryKey: ["infrastructureTimeline", region ?? null],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInfrastructureTimeline(region ?? null);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 120_000,
  });
}

// ─── Reports ──────────────────────────────────────────────────────────────────
export function useGeneratePropertyReport() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propertyId: string) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.generatePropertyReport(propertyId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyReports"] });
    },
  });
}

// ─── Title Verification ───────────────────────────────────────────────────────
export function useGetTitleVerificationHistory(propertyId: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<VerificationRecord[]>({
    queryKey: ["titleVerification", propertyId],
    queryFn: async () => {
      if (!actor || !propertyId) return [];
      const result = await actor.getTitleVerificationHistory(propertyId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !actorFetching && !!propertyId,
  });
}

export function useSubmitForVerification() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propertyId: string) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.submitForVerification(propertyId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, propertyId) => {
      queryClient.invalidateQueries({
        queryKey: ["titleVerification", propertyId],
      });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
}

export function useOfficerVerifyTitle() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      propertyId,
      status,
      notes,
    }: {
      propertyId: string;
      status: VerificationStatus;
      notes: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.officerVerifyTitle(propertyId, status, notes);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, { propertyId }) => {
      queryClient.invalidateQueries({
        queryKey: ["titleVerification", propertyId],
      });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
}

// ─── Transactions ─────────────────────────────────────────────────────────────
export function useAdvanceTransactionStage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      transactionId,
      notes,
    }: {
      transactionId: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.advanceTransactionStage(transactionId, notes);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, { transactionId }) => {
      queryClient.invalidateQueries({
        queryKey: ["transactionStages", transactionId],
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

export function useGetTransactionStageHistory(transactionId: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<TransactionStageEntry[]>({
    queryKey: ["transactionStages", transactionId],
    queryFn: async () => {
      if (!actor || !transactionId) return [];
      const result = await actor.getTransactionStageHistory(transactionId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !actorFetching && !!transactionId,
  });
}

// ─── Dispute Evidence ─────────────────────────────────────────────────────────
export function useAddDisputeEvidence() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      disputeId,
      fileId,
      fileName,
      fileSize,
      description,
    }: {
      disputeId: string;
      fileId: string;
      fileName: string;
      fileSize: bigint;
      description: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.addDisputeEvidence(
        disputeId,
        fileId,
        fileName,
        fileSize,
        description,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, { disputeId }) => {
      queryClient.invalidateQueries({
        queryKey: ["disputeEvidence", disputeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["disputeTimeline", disputeId],
      });
    },
  });
}

export function useGetDisputeEvidence(disputeId: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<DisputeEvidence[]>({
    queryKey: ["disputeEvidence", disputeId],
    queryFn: async () => {
      if (!actor || !disputeId) return [];
      const result = await actor.getDisputeEvidence(disputeId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !actorFetching && !!disputeId,
  });
}

export function useGetDisputeTimeline(disputeId: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<DisputeTimelineEvent[]>({
    queryKey: ["disputeTimeline", disputeId],
    queryFn: async () => {
      if (!actor || !disputeId) return [];
      const result = await actor.getDisputeTimeline(disputeId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !actorFetching && !!disputeId,
  });
}

// ─── Audit Log ────────────────────────────────────────────────────────────────
export function useGetAuditLog({
  entityId,
  actionType,
  limit = 50,
}: {
  entityId?: string | null;
  actionType?: string | null;
  limit?: number;
} = {}) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<AuditEntry[]>({
    queryKey: ["auditLog", entityId ?? null, actionType ?? null, limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAuditLog(
        entityId ?? null,
        actionType ?? null,
        BigInt(limit),
      );
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });
}

// Properties
export function useListProperties() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProperties();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetProperty(id: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Property | null>({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProperty(id);
    },
    enabled: !!actor && !actorFetching && !!id,
  });
}

// Valuations
export function useListValuations() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Valuation[]>({
    queryKey: ["valuations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listValuations();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateValuation() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (valuation: Valuation) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createValuation(valuation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["valuations"] });
    },
  });
}

export function useDeleteValuation() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteValuation(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["valuations"] });
    },
  });
}

// Disputes
export function useListDisputes() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<DisputeView[]>({
    queryKey: ["disputes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDisputes();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateDispute() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dispute: DisputeView) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createDispute(dispute);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    },
  });
}

export function useUpdateDispute() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dispute: DisputeView) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateDispute(dispute);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    },
  });
}

export function useDeleteDispute() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteDispute(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    },
  });
}

// Market Trends (new domain-specific)
export function useListMarketTrends() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<MarketTrend[]>({
    queryKey: ["marketTrendsList"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMarketTrends();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Property Reports
export function useListPropertyReports() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<PropertyReport[]>({
    queryKey: ["propertyReports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPropertyReports();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreatePropertyReport() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (report: PropertyReport) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPropertyReport(report);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyReports"] });
    },
  });
}

export function useDeletePropertyReport() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePropertyReport(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyReports"] });
    },
  });
}

// Notifications
export function useListNotifications() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listNotifications();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateNotification() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notification: Notification) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateNotification(notification);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useDeleteNotification() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteNotification(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

// Infrastructure Projects
export function useListInfrastructureProjects() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<InfrastructureProject[]>({
    queryKey: ["infrastructureProjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listInfrastructureProjects();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateInfrastructureProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: InfrastructureProject) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createInfrastructureProject(project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infrastructureProjects"] });
    },
  });
}

export function useUpdateInfrastructureProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: InfrastructureProject) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateInfrastructureProject(project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infrastructureProjects"] });
    },
  });
}

export function useDeleteInfrastructureProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteInfrastructureProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infrastructureProjects"] });
    },
  });
}

// Transactions
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

// Saved Properties
export function useListSavedProperties() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<SavedProperty[]>({
    queryKey: ["savedProperties"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSavedProperties();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateSavedProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (savedProperty: SavedProperty) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createSavedProperty(savedProperty);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedProperties"] });
    },
  });
}

export function useDeleteSavedProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteSavedProperty(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedProperties"] });
    },
  });
}
