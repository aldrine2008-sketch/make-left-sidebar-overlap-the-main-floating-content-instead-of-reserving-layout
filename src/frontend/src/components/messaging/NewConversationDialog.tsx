import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Principal } from "@dfinity/principal";
import { Search } from "lucide-react";
import { useState } from "react";
import type { VerifiedUserProfile } from "../../backend";
import { useSearchUsers } from "../../hooks/useMessaging";
import SkeletonBlock from "../loading/SkeletonBlock";

interface NewConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectUser: (user: Principal) => void;
}

export default function NewConversationDialog({
  open,
  onOpenChange,
  onSelectUser,
}: NewConversationDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchResults = [], isLoading } = useSearchUsers(searchTerm);

  const handleSelectUser = (user: Principal) => {
    onSelectUser(user);
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
          <DialogDescription>
            Search for a user to start a conversation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="pl-9"
            />
          </div>

          <ScrollArea className="h-[300px]">
            {isLoading ? (
              <div className="space-y-2">
                <SkeletonBlock className="h-14 w-full" />
                <SkeletonBlock className="h-14 w-full" />
                <SkeletonBlock className="h-14 w-full" />
              </div>
            ) : searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Search className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "No users found" : "Start typing to search"}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {searchResults.map(([principal, profile]) => (
                  <button
                    type="button"
                    key={principal.toString()}
                    onClick={() => handleSelectUser(principal)}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="theme-gradient text-white">
                        {profile.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-medium">{profile.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {principal.toString().slice(0, 20)}...
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
