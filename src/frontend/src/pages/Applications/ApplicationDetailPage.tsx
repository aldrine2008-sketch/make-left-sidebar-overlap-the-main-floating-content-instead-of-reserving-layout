import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, FileText, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import { ApplicationStatus } from "../../backend";
import AccessDeniedScreen from "../../components/auth/AccessDeniedScreen";
import {
  useCancelApplication,
  useGetApplicationStatus,
  useSubmitApplication,
} from "../../hooks/useQueries";

const statusColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.draft]: "bg-gray-500",
  [ApplicationStatus.submitted]: "bg-blue-500",
  [ApplicationStatus.underReview]: "bg-yellow-500",
  [ApplicationStatus.approved]: "bg-green-500",
  [ApplicationStatus.rejected]: "bg-red-500",
  [ApplicationStatus.cancelled]: "bg-gray-400",
};

export default function ApplicationDetailPage() {
  const { id } = useParams({ from: "/applications/$id" });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: status, isLoading } = useGetApplicationStatus(id);
  const submitApplication = useSubmitApplication();
  const cancelApplication = useCancelApplication();

  if (!identity) {
    return <AccessDeniedScreen />;
  }

  const formatStatus = (status: ApplicationStatus): string => {
    switch (status) {
      case ApplicationStatus.draft:
        return "Draft";
      case ApplicationStatus.submitted:
        return "Submitted";
      case ApplicationStatus.underReview:
        return "Under Review";
      case ApplicationStatus.approved:
        return "Approved";
      case ApplicationStatus.rejected:
        return "Rejected";
      case ApplicationStatus.cancelled:
        return "Cancelled";
      default:
        return status;
    }
  };

  const handleSubmit = async () => {
    try {
      await submitApplication.mutateAsync(id);
      toast.success("Application submitted successfully");
    } catch (error) {
      toast.error("Failed to submit application");
      console.error(error);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelApplication.mutateAsync(id);
      toast.success("Application cancelled");
      navigate({ to: "/applications" });
    } catch (error) {
      toast.error("Failed to cancel application");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const isDraft = status === ApplicationStatus.draft;
  const canCancel =
    status === ApplicationStatus.draft ||
    status === ApplicationStatus.submitted;

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
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Application Details</h1>
          <p className="text-muted-foreground">Application ID: {id}</p>
        </div>
        {status && (
          <Badge className={statusColors[status]}>{formatStatus(status)}</Badge>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Information</CardTitle>
              <CardDescription>Details about this application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Title Number
                  </div>
                  <div className="font-medium">LR/{id}/2024</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                  <div className="font-medium">Nairobi, Kenya</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {isDraft && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle>Ready to Submit?</CardTitle>
                <CardDescription>
                  Review your application and submit it for processing
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button
                  onClick={handleSubmit}
                  disabled={submitApplication.isPending}
                  className="flex-1"
                >
                  {submitApplication.isPending
                    ? "Submitting..."
                    : "Submit Application"}
                </Button>
                {canCancel && (
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={cancelApplication.isPending}
                  >
                    Cancel
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>Application history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Application Created</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
