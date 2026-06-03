import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@dfinity/principal";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Plus, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ConversationSummary } from "../backend";
import RequireAuth from "../components/auth/RequireAuth";
import SkeletonBlock from "../components/loading/SkeletonBlock";
import NewConversationDialog from "../components/messaging/NewConversationDialog";
import { useGetUserProfile } from "../hooks/useCurrentUser";
import {
  useConversationMessages,
  useConversations,
  useMarkAllMessagesAsRead,
  useSendMessage,
} from "../hooks/useMessaging";

export default function MessagesPage() {
  return (
    <RequireAuth>
      <MessagesPageContent />
    </RequireAuth>
  );
}

function MessagesPageContent() {
  const { identity } = useInternetIdentity();
  const { data: conversations = [], isLoading: conversationsLoading } =
    useConversations();
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationSummary | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Principal | null>(
    null,
  );
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);

  const handleSelectConversation = (conversation: ConversationSummary) => {
    setSelectedConversation(conversation);
    const partner =
      conversation.participantA.toString() ===
      identity?.getPrincipal().toString()
        ? conversation.participantB
        : conversation.participantA;
    setSelectedPartner(partner);
  };

  const handleNewConversation = (partner: Principal) => {
    // Check if conversation already exists
    const existing = conversations.find(
      (c) =>
        c.participantA.toString() === partner.toString() ||
        c.participantB.toString() === partner.toString(),
    );

    if (existing) {
      handleSelectConversation(existing);
    } else {
      setSelectedPartner(partner);
      setSelectedConversation(null);
    }
    setIsNewConversationOpen(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold drop-shadow-lg">Messages</h1>
        <p className="text-foreground/80 drop-shadow">
          Connect with other users
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Conversation List */}
        <Card className="glass-card rounded-2xl lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">
              Conversations
            </CardTitle>
            <Button
              size="sm"
              onClick={() => setIsNewConversationOpen(true)}
              className="btn-lift glass-surface rounded-xl"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {conversationsLoading ? (
                <div className="space-y-2 p-4">
                  <SkeletonBlock className="h-16 w-full" />
                  <SkeletonBlock className="h-16 w-full" />
                  <SkeletonBlock className="h-16 w-full" />
                </div>
              ) : conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <MessageSquare className="mb-4 h-12 w-12 text-foreground/60" />
                  <p className="text-sm text-foreground/70">
                    No conversations yet
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-surface mt-4 rounded-xl"
                    onClick={() => setIsNewConversationOpen(true)}
                  >
                    Start a conversation
                  </Button>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {conversations.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      isSelected={selectedConversation?.id === conversation.id}
                      onSelect={() => handleSelectConversation(conversation)}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="glass-card rounded-2xl lg:col-span-2">
          {selectedPartner ? (
            <ChatInterface
              partner={selectedPartner}
              conversationId={selectedConversation?.id}
            />
          ) : (
            <div className="flex h-[680px] flex-col items-center justify-center p-8 text-center">
              <MessageSquare className="mb-4 h-16 w-16 text-foreground/60" />
              <h3 className="mb-2 text-lg font-semibold">
                Select a conversation
              </h3>
              <p className="text-sm text-foreground/70">
                Choose a conversation from the list or start a new one
              </p>
            </div>
          )}
        </Card>
      </div>

      <NewConversationDialog
        open={isNewConversationOpen}
        onOpenChange={setIsNewConversationOpen}
        onSelectUser={handleNewConversation}
      />
    </div>
  );
}

interface ConversationItemProps {
  conversation: ConversationSummary;
  isSelected: boolean;
  onSelect: () => void;
}

function ConversationItem({
  conversation,
  isSelected,
  onSelect,
}: ConversationItemProps) {
  const { identity } = useInternetIdentity();
  const partner =
    conversation.participantA.toString() === identity?.getPrincipal().toString()
      ? conversation.participantB
      : conversation.participantA;
  const { data: partnerProfile } = useGetUserProfile(partner);

  const timestamp = Number(conversation.lastMessageTimestamp);
  const timeAgo = formatDistanceToNow(new Date(timestamp / 1000000), {
    addSuffix: true,
  });

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl p-3 text-left transition-all ${
        isSelected
          ? "glass-surface border-l-4 border-primary shadow-lg"
          : "hover:glass-surface"
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 ring-2 ring-white/30">
          <AvatarFallback className="theme-gradient text-white">
            {partnerProfile?.name?.charAt(0).toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="truncate font-semibold">
              {partnerProfile?.name || "Unknown User"}
            </p>
            {Number(conversation.unreadMessagesCount) > 0 && (
              <Badge
                variant="default"
                className="ml-2 bg-primary/90 text-white shadow-md"
              >
                {conversation.unreadMessagesCount.toString()}
              </Badge>
            )}
          </div>
          <p className="truncate text-xs text-foreground/60">{timeAgo}</p>
        </div>
      </div>
    </button>
  );
}

interface ChatInterfaceProps {
  partner: Principal;
  conversationId?: string;
}

function ChatInterface({ partner, conversationId }: ChatInterfaceProps) {
  const { identity } = useInternetIdentity();
  const { data: partnerProfile } = useGetUserProfile(partner);
  const { data: messages = [], isLoading: messagesLoading } =
    useConversationMessages(partner);
  const sendMessageMutation = useSendMessage();
  const markAsReadMutation = useMarkAllMessagesAsRead();
  const [messageText, setMessageText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — messages drives scroll-to-bottom, not a stale closure
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (conversationId && messages.length > 0) {
      const hasUnread = messages.some(
        (msg) =>
          msg.receiver.toString() === identity?.getPrincipal().toString() &&
          !msg.read,
      );
      if (hasUnread) {
        markAsReadMutation.mutate(conversationId);
      }
    }
  }, [conversationId, messages, identity, markAsReadMutation]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || sendMessageMutation.isPending) return;

    try {
      await sendMessageMutation.mutateAsync({
        receiver: partner,
        content: messageText.trim(),
      });
      setMessageText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <>
      <CardHeader className="glass-surface rounded-t-2xl border-b border-white/20">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-white/30">
            <AvatarFallback className="theme-gradient text-white">
              {partnerProfile?.name?.charAt(0).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">
              {partnerProfile?.name || "Unknown User"}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        <ScrollArea className="h-[520px] p-4" ref={scrollRef}>
          {messagesLoading ? (
            <div className="space-y-4">
              <SkeletonBlock className="h-16 w-3/4" />
              <SkeletonBlock className="ml-auto h-16 w-3/4" />
              <SkeletonBlock className="h-16 w-3/4" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <MessageSquare className="mb-4 h-12 w-12 text-foreground/60" />
              <p className="text-sm text-foreground/70">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isSent =
                  message.sender.toString() ===
                  identity?.getPrincipal().toString();
                const timestamp = Number(message.timestamp);
                const timeStr = new Date(
                  timestamp / 1000000,
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={message.id}
                    className={`flex ${isSent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`glass-message max-w-[75%] rounded-2xl px-4 py-3 shadow-md ${
                        isSent ? "rounded-br-sm" : "rounded-bl-sm"
                      }`}
                    >
                      <p className="break-words text-sm font-medium text-foreground">
                        {message.content}
                      </p>
                      <p className="mt-1 text-xs text-foreground/60">
                        {timeStr}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Message Input */}
        <form
          onSubmit={handleSendMessage}
          className="glass-surface rounded-b-2xl border-t border-white/20 p-4"
        >
          <div className="flex gap-2">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              disabled={sendMessageMutation.isPending}
              className="glass-surface flex-1 rounded-xl border-white/30 bg-white/10 focus-visible:ring-primary/50"
            />
            <Button
              type="submit"
              disabled={!messageText.trim() || sendMessageMutation.isPending}
              className="btn-lift glass-surface rounded-xl bg-primary/80 hover:bg-primary"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  );
}
