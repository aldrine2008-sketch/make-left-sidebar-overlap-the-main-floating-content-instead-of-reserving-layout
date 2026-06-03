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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { FileText, Plus } from "lucide-react";
import { ApplicationStatus } from "../../backend";
import AccessDeniedScreen from "../../components/auth/AccessDeniedScreen";
import DepthCard from "../../components/cards/DepthCard";
import SkeletonBlock from "../../components/loading/SkeletonBlock";
import { useGetMyApplications } from "../../hooks/useQueries";

const statusColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.draft]: "bg-gray-500",
  [ApplicationStatus.submitted]: "bg-blue-500",
  [ApplicationStatus.underReview]: "bg-yellow-500",
  [ApplicationStatus.approved]: "bg-green-500",
  [ApplicationStatus.rejected]: "bg-red-500",
  [ApplicationStatus.cancelled]: "bg-gray-400",
};

export default function MyApplicationsPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: applications, isLoading } = useGetMyApplications();

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

  const formatDate = (timestamp: bigint): string => {
    return new Date(Number(timestamp) / 1000000).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">My Applications</h1>
          <p className="text-muted-foreground">
            Track and manage your land service applications
          </p>
        </div>
        <Button
          onClick={() => navigate({ to: "/applications/new" })}
          className="btn-lift"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      <DepthCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Applications
          </CardTitle>
          <CardDescription>
            {isLoading
              ? "Loading..."
              : `${applications?.length || 0} application(s)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-16 w-full" />
              <SkeletonBlock className="h-16 w-full" />
              <SkeletonBlock className="h-16 w-full" />
            </div>
          ) : applications && applications.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title Number</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
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
                      <TableCell>
                        <Badge className={statusColors[app.status]}>
                          {formatStatus(app.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(app.created)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate({ to: `/applications/${app.id}` })
                          }
                          className="btn-lift"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mb-4 text-muted-foreground">No applications yet</p>
              <Button
                onClick={() => navigate({ to: "/applications/new" })}
                className="btn-lift"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Application
              </Button>
            </div>
          )}
        </CardContent>
      </DepthCard>
    </div>
  );
}
