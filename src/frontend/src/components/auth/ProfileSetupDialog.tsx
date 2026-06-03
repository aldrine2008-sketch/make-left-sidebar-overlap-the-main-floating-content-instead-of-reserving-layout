import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, UserCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AccountStatus, DomainRole, RiskType } from "../../backend";
import { useSaveCallerUserProfile } from "../../hooks/useCurrentUser";

export default function ProfileSetupDialog() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<DomainRole>(DomainRole.citizen);
  const [error, setError] = useState<string | null>(null);
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter your full name");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Name must be at least 2 characters long");
      return;
    }

    try {
      await saveProfile.mutateAsync({
        name: trimmedName,
        role,
        accountStatus: AccountStatus.active,
        emailVerified: false,
        phoneVerified: false,
        riskType: RiskType.medium,
      });
      toast.success("Profile created successfully! Welcome to Land Registry.");
    } catch (error) {
      console.error("Profile creation error:", error);
      setError("Failed to create profile. Please try again.");
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <UserCircle className="h-6 w-6 text-primary" />
            Complete Your Profile
          </DialogTitle>
          <DialogDescription className="text-base">
            Welcome! To get started with the Land Registry system, please
            provide your details below. This helps us personalize your
            experience and ensure secure access.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              required
              className="text-base"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              This will be displayed on your profile
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-base">
              Your Role *
            </Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as DomainRole)}
            >
              <SelectTrigger id="role" className="text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DomainRole.citizen}>
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    <span>Citizen</span>
                  </div>
                </SelectItem>
                <SelectItem value={DomainRole.landOfficer}>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Land Officer</span>
                  </div>
                </SelectItem>
                <SelectItem value={DomainRole.admin}>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Administrator</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Select the role that best describes you
            </p>
          </div>

          {error && (
            <Alert variant="destructive" role="alert">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full btn-lift"
            size="lg"
            disabled={saveProfile.isPending}
          >
            {saveProfile.isPending ? "Creating Profile..." : "Complete Setup"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
