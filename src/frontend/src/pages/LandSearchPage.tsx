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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import { FileText, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { ApplicationStatus } from "../backend";
import {
  useRecordSearch,
  useSearchApplicationsByLocation,
  useSearchApplicationsByTitleNumber,
} from "../hooks/useQueries";

const statusColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.draft]: "bg-gray-500",
  [ApplicationStatus.submitted]: "bg-blue-500",
  [ApplicationStatus.underReview]: "bg-yellow-500",
  [ApplicationStatus.approved]: "bg-green-500",
  [ApplicationStatus.rejected]: "bg-red-500",
  [ApplicationStatus.cancelled]: "bg-gray-400",
};

export default function LandSearchPage() {
  const navigate = useNavigate();
  const [titleNumber, setTitleNumber] = useState("");
  const [location, setLocation] = useState("");
  const [searchType, setSearchType] = useState<"title" | "location" | null>(
    null,
  );

  const titleSearch = useSearchApplicationsByTitleNumber(
    searchType === "title" ? titleNumber : "",
  );
  const locationSearch = useSearchApplicationsByLocation(
    searchType === "location" ? location : "",
  );
  const recordSearchMutation = useRecordSearch();

  const results =
    searchType === "title"
      ? titleSearch.data
      : searchType === "location"
        ? locationSearch.data
        : [];
  const isLoading = titleSearch.isLoading || locationSearch.isLoading;

  const handleTitleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleNumber.trim()) {
      setSearchType("title");
    }
  };

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation && trimmedLocation.length >= 2) {
      setSearchType("location");
      // Record the search (normalized: trimmed and lowercased)
      recordSearchMutation.mutate(trimmedLocation.toLowerCase());
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
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Land Records Search</h1>
        <p className="text-muted-foreground">
          Search for land records by title number or location to view ownership
          and registration details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Search by Title Number
            </CardTitle>
            <CardDescription>
              Enter the land title number to find specific records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTitleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleNumber">Title Number</Label>
                <Input
                  id="titleNumber"
                  placeholder="e.g., LR/12345/678"
                  value={titleNumber}
                  onChange={(e) => setTitleNumber(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={!titleNumber.trim() || isLoading}
              >
                <Search className="mr-2 h-4 w-4" />
                Search by Title
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Search by Location
            </CardTitle>
            <CardDescription>
              Enter a location name to find all records in that area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLocationSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Nairobi, Mombasa"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !location.trim() || location.trim().length < 2 || isLoading
                }
              >
                <Search className="mr-2 h-4 w-4" />
                Search by Location
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {searchType && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              {isLoading
                ? "Searching..."
                : results && results.length > 0
                  ? `Found ${results.length} record${results.length === 1 ? "" : "s"}`
                  : "No records found"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : results && results.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title Number</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Area (acres)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((record) => (
                      <TableRow
                        key={record.id}
                        className="cursor-pointer transition-colors hover:bg-accent/50"
                        onClick={() => navigate({ to: `/record/${record.id}` })}
                      >
                        <TableCell className="font-medium">
                          {record.titleNumber}
                        </TableCell>
                        <TableCell>{record.location}</TableCell>
                        <TableCell>
                          {record.area
                            ? Number(record.area).toLocaleString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[record.status]}>
                            {formatStatus(record.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>No records found matching your search criteria.</p>
                <p className="mt-2 text-sm">Try adjusting your search terms.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
