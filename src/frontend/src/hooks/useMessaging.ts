import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@dfinity/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type {
  ConversationSummary,
  Message,
  SendMessageResponse,
  VerifiedUserProfile,
} from "../backend";

export function useConversations() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ConversationSummary[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConversations();
    },
    enabled: !!actor && !actorFetching,
    refetchOnWindowFocus: true,
  });
}

export function useConversationMessages(partner: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Message[]>({
    queryKey: ["conversationMessages", partner?.toString()],
    queryFn: async () => {
      if (!actor || !partner) return [];
      return actor.getConversationMessages(partner);
    },
    enabled: !!actor && !actorFetching && !!partner,
    refetchInterval: 30000, // Poll every 30 seconds
    refetchOnWindowFocus: true,
  });
}

export function useSendMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      receiver,
      content,
    }: { receiver: Principal; content: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.sendMessage(receiver, content);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({
        queryKey: ["conversationMessages", variables.receiver.toString()],
      });
    },
  });
}

export function useMarkAllMessagesAsRead() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.markAllMessagesAsRead(conversationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["conversationMessages"] });
    },
  });
}

export function useSearchUsers(searchTerm: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return useQuery<Array<[Principal, VerifiedUserProfile]>>({
    queryKey: ["searchUsers", debouncedTerm],
    queryFn: async () => {
      if (!actor || !debouncedTerm || debouncedTerm.trim() === "") return [];
      return actor.searchUsers(debouncedTerm);
    },
    enabled: !!actor && !actorFetching && debouncedTerm.trim().length > 0,
  });
}
