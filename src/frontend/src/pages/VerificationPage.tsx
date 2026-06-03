import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
import { CheckCircle, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { ApplicationStatus } from "../backend";
import { useGetApplicationStatus } from "../hooks/useQueries";

const statusColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.draft]: "bg-gray-500",
  [ApplicationStatus.submitted]: "bg-blue-500",
  [ApplicationStatus.underReview]: "bg-yellow-500",
  [ApplicationStatus.approved]: "bg-green-500",
  [ApplicationStatus.rejected]: "bg-red-500",
  [ApplicationStatus.cancelled]: "bg-gray-400",
};

export default function VerificationPage() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const {
    data: status,
    isLoading,
    error,
  } = useGetApplicationStatus(searchTriggered ? referenceNumber : "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (referenceNumber.trim()) {
      setSearchTriggered(true);
    }
  };

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

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Public Verification</h1>
        <p className="text-muted-foreground">
          Verify the authenticity and status of land records using a reference
          number
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verify Record</CardTitle>
          <CardDescription>
            Enter an application or record reference number to check its status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reference">Reference Number</Label>
              <Input
                id="reference"
                placeholder="e.g., 1, 2, 3..."
                value={referenceNumber}
                onChange={(e) => {
                  setReferenceNumber(e.target.value);
                  setSearchTriggered(false);
                }}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!referenceNumber.trim() || isLoading}
            >
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {searchTriggered && !isLoading && (
        <div>
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Record not found. Please check the reference number and try
                again.
              </AlertDescription>
            </Alert>
          ) : status ? (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Verification Result
                </CardTitle>
                <CardDescription>Record found and verified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Reference Number
                    </div>
                    <div className="font-medium">{referenceNumber}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Current Status
                    </div>
                    <Badge className={statusColors[status]}>
                      {formatStatus(status)}
                    </Badge>
                  </div>
                </div>
                <Alert>
                  <AlertDescription>
                    This record has been verified as authentic. The information
                    shown is current as of {new Date().toLocaleString()}.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ) : null}
        </div>
      )}
    </div>
  );
}
