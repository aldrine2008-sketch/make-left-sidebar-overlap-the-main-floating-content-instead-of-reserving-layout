import { aU as useActor, aX as useQuery, aV as useQueryClient, aW as useMutation, aZ as createActor } from "./index-BY4GfDKL.js";
function useGetDashboardStats() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 3e4
  });
}
function useCalculateValuation(input) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["valuation", input],
    queryFn: async () => {
      if (!actor || !input) return null;
      const result = await actor.calculateValuation(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !actorFetching && !!input
  });
}
function useCalculateInvestment(input) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["investment", input],
    queryFn: async () => {
      if (!actor || !input) return null;
      return actor.calculateInvestment(input);
    },
    enabled: !!actor && !actorFetching && !!input
  });
}
function useGetMarketAnalytics(region) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["marketAnalytics", region ?? null],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getMarketAnalytics(region ?? null);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 6e4
  });
}
function useGetMarketplaceListings(filters) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const verified = (filters == null ? void 0 : filters.verified) ?? null;
  const minPrice = (filters == null ? void 0 : filters.minPrice) ?? null;
  const maxPrice = (filters == null ? void 0 : filters.maxPrice) ?? null;
  return useQuery({
    queryKey: ["marketplaceListings", verified, minPrice, maxPrice],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMarketplaceListings(verified, minPrice, maxPrice);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 3e4
  });
}
function useGetRiskIntelligence(region) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["riskIntelligence", null],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getRiskIntelligenceSummary(null);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 6e4
  });
}
function useGetNotificationFeed(limit = 20) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["notificationFeed", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotificationFeed(BigInt(limit));
    },
    enabled: !!actor && !actorFetching,
    staleTime: 15e3
  });
}
function useMarkNotificationRead() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.markNotificationRead(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationFeed"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
}
function useGetPortfolioSummary() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["portfolioSummary"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getInvestmentPortfolioSummary();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 6e4
  });
}
function useGetInfrastructureTimeline(region) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["infrastructureTimeline", region ?? null],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInfrastructureTimeline(region ?? null);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 12e4
  });
}
function useGeneratePropertyReport() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (propertyId) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.generatePropertyReport(propertyId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyReports"] });
    }
  });
}
function useAdvanceTransactionStage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      transactionId,
      notes
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.advanceTransactionStage(transactionId, notes);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, { transactionId }) => {
      queryClient.invalidateQueries({
        queryKey: ["transactionStages", transactionId]
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    }
  });
}
function useGetTransactionStageHistory(transactionId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["transactionStages", transactionId],
    queryFn: async () => {
      if (!actor || !transactionId) return [];
      const result = await actor.getTransactionStageHistory(transactionId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !actorFetching && !!transactionId
  });
}
function useAddDisputeEvidence() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      disputeId,
      fileId,
      fileName,
      fileSize,
      description
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.addDisputeEvidence(
        disputeId,
        fileId,
        fileName,
        fileSize,
        description
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, { disputeId }) => {
      queryClient.invalidateQueries({
        queryKey: ["disputeEvidence", disputeId]
      });
      queryClient.invalidateQueries({
        queryKey: ["disputeTimeline", disputeId]
      });
    }
  });
}
function useGetDisputeEvidence(disputeId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["disputeEvidence", disputeId],
    queryFn: async () => {
      if (!actor || !disputeId) return [];
      const result = await actor.getDisputeEvidence(disputeId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !actorFetching && !!disputeId
  });
}
function useGetDisputeTimeline(disputeId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["disputeTimeline", disputeId],
    queryFn: async () => {
      if (!actor || !disputeId) return [];
      const result = await actor.getDisputeTimeline(disputeId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !actorFetching && !!disputeId
  });
}
function useListProperties() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProperties();
    },
    enabled: !!actor && !actorFetching
  });
}
function useCreateDispute() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dispute) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createDispute(dispute);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    }
  });
}
function useListTransactions() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTransactions();
    },
    enabled: !!actor && !actorFetching
  });
}
function useListSavedProperties() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["savedProperties"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSavedProperties();
    },
    enabled: !!actor && !actorFetching
  });
}
export {
  useGetTransactionStageHistory as a,
  useAdvanceTransactionStage as b,
  useGetMarketplaceListings as c,
  useGetMarketAnalytics as d,
  useCalculateValuation as e,
  useCalculateInvestment as f,
  useGetRiskIntelligence as g,
  useCreateDispute as h,
  useGetDisputeTimeline as i,
  useGetDisputeEvidence as j,
  useAddDisputeEvidence as k,
  useGeneratePropertyReport as l,
  useGetPortfolioSummary as m,
  useGetInfrastructureTimeline as n,
  useGetNotificationFeed as o,
  useMarkNotificationRead as p,
  useListProperties as q,
  useListTransactions as r,
  useListSavedProperties as s,
  useGetDashboardStats as u
};
