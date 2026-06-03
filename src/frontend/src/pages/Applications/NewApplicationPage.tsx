import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AccessDeniedScreen from "../../components/auth/AccessDeniedScreen";
import { useCreateApplication } from "../../hooks/useQueries";

export default function NewApplicationPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const createApplication = useCreateApplication();

  const [titleNumber, setTitleNumber] = useState("");
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");

  if (!identity) {
    return <AccessDeniedScreen />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titleNumber.trim() || !location.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const appId = await createApplication.mutateAsync({
        titleNumber: titleNumber.trim(),
        area: area ? BigInt(area) : null,
        location: location.trim(),
      });
      toast.success("Application created successfully");
      navigate({ to: `/applications/${appId}` });
    } catch (error) {
      toast.error("Failed to create application");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/applications" })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Application</h1>
          <p className="text-muted-foreground">
            Create a new land service application
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Application Details
          </CardTitle>
          <CardDescription>
            Fill in the details for your land service application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titleNumber">
                Title Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="titleNumber"
                placeholder="e.g., LR/12345/2024"
                value={titleNumber}
                onChange={(e) => setTitleNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (square meters)</Label>
              <Input
                id="area"
                type="number"
                placeholder="e.g., 5000"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                Location <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="location"
                placeholder="e.g., Nairobi, Westlands, Plot 123"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/applications" })}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createApplication.isPending}
                className="flex-1"
              >
                {createApplication.isPending
                  ? "Creating..."
                  : "Create Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
