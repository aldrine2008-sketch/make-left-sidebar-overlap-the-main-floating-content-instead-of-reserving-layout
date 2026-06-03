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
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, FileText, MapPin, User } from "lucide-react";
import { useEffect } from "react";
import { ApplicationStatus } from "../backend";
import { useRecordPropertyView } from "../hooks/useProfileVerification";
import { useGetApplicationById } from "../hooks/useQueries";

const statusColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.draft]: "bg-gray-500",
  [ApplicationStatus.submitted]: "bg-blue-500",
  [ApplicationStatus.underReview]: "bg-yellow-500",
  [ApplicationStatus.approved]: "bg-green-500",
  [ApplicationStatus.rejected]: "bg-red-500",
  [ApplicationStatus.cancelled]: "bg-gray-400",
};

export default function LandRecordDetailPage() {
  const { id } = useParams({ from: "/record/$id" });
  const navigate = useNavigate();
  const { data: record, isLoading, error } = useGetApplicationById(id);
  const recordView = useRecordPropertyView();

  // Record property view when page loads
  // biome-ignore lint/correctness/useExhaustiveDependencies: recordView.mutate is stable
  useEffect(() => {
    if (id) {
      recordView.mutate(id);
    }
  }, [id]);

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Record Not Found</CardTitle>
            <CardDescription>
              The land record you're looking for could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate({ to: "/search" })}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/search" })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Land Record Details</h1>
          <p className="text-muted-foreground">
            Title Number: {record.titleNumber}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Record Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Title Number
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {record.titleNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge className={`mt-1 ${statusColors[record.status]}`}>
                    {formatStatus(record.status)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Location
                  </p>
                  <p className="mt-1 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {record.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Area
                  </p>
                  <p className="mt-1">
                    {record.area
                      ? `${Number(record.area).toLocaleString()} acres`
                      : "N/A"}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Owner
                </p>
                <p className="mt-1 flex items-center gap-1 font-mono text-sm">
                  <User className="h-4 w-4" />
                  {record.owner.toString()}
                </p>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Created
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    {new Date(
                      Number(record.created) / 1000000,
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    {new Date(
                      Number(record.updated) / 1000000,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
              <CardDescription>
                {record.attachments.length > 0
                  ? `${record.attachments.length} file${record.attachments.length === 1 ? "" : "s"} attached`
                  : "No attachments"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {record.attachments.length > 0 ? (
                <div className="space-y-2">
                  {record.attachments.map((attachment, index) => (
                    <Button
                      key={attachment.getDirectURL?.() ?? `attachment-${index}`}
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href={attachment.getDirectURL()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Attachment {index + 1}
                      </a>
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  No attachments available
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
