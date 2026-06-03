import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ApplicationStatus, DomainRole } from "../../backend";
import AccessDeniedScreen from "../../components/auth/AccessDeniedScreen";
import DepthCard from "../../components/cards/DepthCard";
import SkeletonBlock from "../../components/loading/SkeletonBlock";
import { useGetCallerUserProfile } from "../../hooks/useCurrentUser";
import {
  useApproveApplication,
  useGetApplicationsByStatus,
  useRejectApplication,
} from "../../hooks/useQueries";

export default function ApplicationsQueuePage() {
  const navigate = useNavigate();
  const { data: userProfile } = useGetCallerUserProfile();
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const submittedApps = useGetApplicationsByStatus(ApplicationStatus.submitted);
  const underReviewApps = useGetApplicationsByStatus(
    ApplicationStatus.underReview,
  );
  const approveApplication = useApproveApplication();
  const rejectApplication = useRejectApplication();

  const isLandOfficerOrAdmin =
    userProfile?.role === DomainRole.landOfficer ||
    userProfile?.role === DomainRole.admin;

  if (!isLandOfficerOrAdmin) {
    return <AccessDeniedScreen />;
  }

  const handleApprove = async (appId: string) => {
    try {
      await approveApplication.mutateAsync(appId);
      toast.success("Application approved");
    } catch (error) {
      toast.error("Failed to approve application");
      console.error(error);
    }
  };

  const handleRejectClick = (appId: string) => {
    setSelectedAppId(appId);
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedAppId || !rejectReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    try {
      await rejectApplication.mutateAsync({
        appId: selectedAppId,
        reason: rejectReason,
      });
      toast.success("Application rejected");
      setRejectDialogOpen(false);
      setRejectReason("");
      setSelectedAppId(null);
    } catch (error) {
      toast.error("Failed to reject application");
      console.error(error);
    }
  };

  const formatDate = (timestamp: bigint): string => {
    return new Date(Number(timestamp) / 1000000).toLocaleDateString();
  };

  const renderApplicationsTable = (
    applications: any[] | undefined,
    isLoading: boolean,
  ) => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          <SkeletonBlock className="h-12 w-full" />
          <SkeletonBlock className="h-16 w-full" />
          <SkeletonBlock className="h-16 w-full" />
          <SkeletonBlock className="h-16 w-full" />
        </div>
      );
    }

    if (!applications || applications.length === 0) {
      return (
        <div className="py-12 text-center text-muted-foreground">
          <Clock className="mx-auto mb-4 h-12 w-12 opacity-50" />
          <p>No applications in this queue</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title Number</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow
                key={app.id}
                className="transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-medium">{app.id}</TableCell>
                <TableCell>{app.titleNumber}</TableCell>
                <TableCell>{app.location}</TableCell>
                <TableCell>{formatDate(app.created)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        navigate({ to: `/applications/${app.id}` })
                      }
                      className="btn-lift"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleApprove(app.id)}
                      disabled={approveApplication.isPending}
                      className="btn-lift"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRejectClick(app.id)}
                      disabled={rejectApplication.isPending}
                      className="btn-lift"
                    >
                      <XCircle className="mr-1 h-3 w-3" />
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Applications Queue</h1>
        <p className="text-muted-foreground">
          Review and process land service applications
        </p>
      </div>

      <Tabs defaultValue="submitted" className="space-y-4">
        <TabsList>
          <TabsTrigger value="submitted">
            Submitted ({submittedApps.data?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="underReview">
            Under Review ({underReviewApps.data?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submitted">
          <DepthCard>
            <CardHeader>
              <CardTitle>Submitted Applications</CardTitle>
              <CardDescription>
                Applications awaiting initial review
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderApplicationsTable(
                submittedApps.data,
                submittedApps.isLoading,
              )}
            </CardContent>
          </DepthCard>
        </TabsContent>

        <TabsContent value="underReview">
          <DepthCard>
            <CardHeader>
              <CardTitle>Under Review</CardTitle>
              <CardDescription>
                Applications currently being processed
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderApplicationsTable(
                underReviewApps.data,
                underReviewApps.isLoading,
              )}
            </CardContent>
          </DepthCard>
        </TabsContent>
      </Tabs>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this application
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="reason">Rejection Reason</Label>
            <Textarea
              id="reason"
              placeholder="Enter reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectReason.trim() || rejectApplication.isPending}
            >
              {rejectApplication.isPending
                ? "Rejecting..."
                : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
