import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  Briefcase,
  Camera,
  CheckCircle,
  DollarSign,
  Download,
  Eye,
  FileCheck,
  FileText,
  Lock,
  Save,
  Search,
  Settings,
  Shield,
  Trash2,
  TrendingUp,
  Upload,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AccountStatus, DomainRole, RiskType } from "../../backend";
import AnimatedDonutChart from "../../components/charts/AnimatedDonutChart";
import AnimatedKPI from "../../components/charts/AnimatedKPI";
import SkeletonBlock from "../../components/loading/SkeletonBlock";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Slider } from "../../components/ui/slider";
import { Switch } from "../../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  useDeleteAccount,
  useExportUserData,
  useGetActivitySummary,
  useGetCallerPreferences,
  useGetCallerProfile,
  useGetSecurityTelemetry,
  useListDocuments,
  useUpdateCallerPreferences,
  useUpdateCallerProfile,
  useUpdateSecurityPreference,
  useUploadDocument,
  useUploadProfilePhoto,
} from "../../hooks/useProfileVerification";
import {
  useListProperties,
  useListSavedProperties,
  useListTransactions,
} from "../../hooks/useSidebarDomainQueries";

export default function ProfileVerificationPage() {
  const { identity } = useInternetIdentity();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerProfile();
  const { data: activitySummary, isLoading: _activityLoading } =
    useGetActivitySummary();
  const { data: securityTelemetry, isLoading: securityLoading } =
    useGetSecurityTelemetry();
  const { data: documents, isLoading: documentsLoading } = useListDocuments();
  const { data: preferences, isLoading: preferencesLoading } =
    useGetCallerPreferences();
  const { data: properties } = useListProperties();
  const { data: transactions } = useListTransactions();
  const { data: savedProperties } = useListSavedProperties();

  const updateProfile = useUpdateCallerProfile();
  const uploadPhoto = useUploadProfilePhoto();
  const uploadDocument = useUploadDocument();
  const updatePreferences = useUpdateCallerPreferences();
  const _updateSecurityPref = useUpdateSecurityPreference();
  const exportData = useExportUserData();
  const deleteAccount = useDeleteAccount();

  const [photoUploadProgress, setPhotoUploadProgress] = useState(0);
  const [_documentUploadProgress, setDocumentUploadProgress] = useState(0);
  const [editingIdentity, setEditingIdentity] = useState(false);
  const [identityForm, setIdentityForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationalId: "",
    passportNumber: "",
    dateOfBirth: "",
    ethnicity: "",
  });

  const [preferencesForm, setPreferencesForm] = useState<any>(null);

  // Initialize forms when data loads
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional one-time init
  useEffect(() => {
    if (userProfile && !identityForm.fullName) {
      setIdentityForm({
        fullName: userProfile.name,
        email: "",
        phone: "",
        nationalId: userProfile.identityFields?.nationalId || "",
        passportNumber: userProfile.identityFields?.passportNumber || "",
        dateOfBirth: userProfile.identityFields?.dateOfBirth || "",
        ethnicity: userProfile.identityFields?.ethnicity || "",
      });
    }
    if (preferences && !preferencesForm) {
      setPreferencesForm(preferences);
    }
  }, [userProfile, preferences]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      setPhotoUploadProgress(0);
      await uploadPhoto.mutateAsync({
        file,
        onProgress: (percentage) => setPhotoUploadProgress(percentage),
      });
      toast.success("Profile photo updated successfully");
      setPhotoUploadProgress(0);
    } catch (error) {
      console.error("Photo upload error:", error);
      toast.error("Failed to upload photo");
      setPhotoUploadProgress(0);
    }
  };

  const handleIdentitySave = async () => {
    if (!userProfile) return;

    try {
      await updateProfile.mutateAsync({
        ...userProfile,
        name: identityForm.fullName,
        identityFields: {
          nationalId: identityForm.nationalId,
          passportNumber: identityForm.passportNumber,
          dateOfBirth: identityForm.dateOfBirth,
          ethnicity: identityForm.ethnicity,
        },
      });
      toast.success("Identity information updated");
      setEditingIdentity(false);
    } catch (error) {
      console.error("Identity update error:", error);
      toast.error("Failed to update identity");
    }
  };

  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    category: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be less than 10MB");
      return;
    }

    try {
      setDocumentUploadProgress(0);
      await uploadDocument.mutateAsync({
        file,
        category,
        onProgress: (percentage) => setDocumentUploadProgress(percentage),
      });
      toast.success("Document uploaded successfully");
      setDocumentUploadProgress(0);
    } catch (error: any) {
      console.error("Document upload error:", error);
      toast.error(error.message || "Failed to upload document");
      setDocumentUploadProgress(0);
    }
  };

  const handlePreferencesSave = async () => {
    if (!preferencesForm) return;

    try {
      await updatePreferences.mutateAsync(preferencesForm);
      toast.success("Preferences saved successfully");
    } catch (error) {
      console.error("Preferences save error:", error);
      toast.error("Failed to save preferences");
    }
  };

  const handleExportData = async () => {
    try {
      await exportData.mutateAsync();
      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount.mutateAsync();
      toast.success("Account deletion requested");
    } catch (error: any) {
      console.error("Delete account error:", error);
      toast.error(error.message || "Failed to delete account");
    }
  };

  if (!identity) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please log in to view your profile
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (profileLoading || !profileFetched) {
    return (
      <div className="space-y-4 p-6">
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="h-64 w-full" />
        <SkeletonBlock className="h-64 w-full" />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Profile not found. Please complete profile setup.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Portfolio data
  const totalInvestment =
    transactions?.reduce((sum, t) => sum + t.price, 0) || 0;
  const portfolioData = [
    {
      label: "Properties",
      value: properties?.length || 0,
      color: "oklch(var(--chart-1))",
    },
    {
      label: "Saved",
      value: savedProperties?.length || 0,
      color: "oklch(var(--chart-2))",
    },
    {
      label: "Transactions",
      value: transactions?.length || 0,
      color: "oklch(var(--chart-3))",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile & Verification</h1>
        <p className="text-sm text-muted-foreground">
          Manage your identity, security, and preferences
        </p>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="activity">
            <TrendingUp className="mr-2 h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="identity">
            <User className="mr-2 h-4 w-4" />
            Identity
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            <Briefcase className="mr-2 h-4 w-4" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Activity Dashboard */}
        <TabsContent value="activity" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                Properties Viewed
              </div>
              <AnimatedKPI
                value={activitySummary?.propertiesViewed || 0}
                className="text-2xl font-bold mt-2"
              />
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                Searches Made
              </div>
              <AnimatedKPI
                value={activitySummary?.searchesMade || 0}
                className="text-2xl font-bold mt-2"
              />
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Save className="h-4 w-4" />
                Saved Properties
              </div>
              <AnimatedKPI
                value={activitySummary?.savedProperties || 0}
                className="text-2xl font-bold mt-2"
              />
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileCheck className="h-4 w-4" />
                Reports Generated
              </div>
              <AnimatedKPI
                value={activitySummary?.reportsGenerated || 0}
                className="text-2xl font-bold mt-2"
              />
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Investments Tracked
              </div>
              <AnimatedKPI
                value={activitySummary?.investmentsTracked || 0}
                className="text-2xl font-bold mt-2"
              />
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                ROI Summary
              </div>
              <AnimatedKPI
                value={activitySummary?.roiSummary || 0}
                suffix="%"
                className="text-2xl font-bold mt-2"
              />
            </div>
          </div>

          {activitySummary?.hasInsufficientData && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Insufficient data for detailed analytics. Continue using the
                platform to see more insights.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* Identity Management */}
        <TabsContent value="identity" className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Profile Information</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingIdentity(!editingIdentity)}
              >
                {editingIdentity ? "Cancel" : "Edit"}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full theme-gradient flex items-center justify-center text-white text-2xl font-bold">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </div>
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 cursor-pointer"
                  >
                    <div className="rounded-full bg-primary p-1.5 text-primary-foreground shadow-lg">
                      <Camera className="h-3 w-3" />
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                      disabled={uploadPhoto.isPending}
                    />
                  </label>
                </div>
                <div>
                  <p className="font-semibold">{userProfile.name}</p>
                  <Badge variant="outline">{userProfile.role}</Badge>
                </div>
              </div>

              {photoUploadProgress > 0 && photoUploadProgress < 100 && (
                <Progress value={photoUploadProgress} className="w-full" />
              )}

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={identityForm.fullName}
                    onChange={(e) =>
                      setIdentityForm({
                        ...identityForm,
                        fullName: e.target.value,
                      })
                    }
                    disabled={!editingIdentity}
                  />
                </div>
                <div>
                  <Label htmlFor="nationalId">National ID</Label>
                  <Input
                    id="nationalId"
                    value={identityForm.nationalId}
                    onChange={(e) =>
                      setIdentityForm({
                        ...identityForm,
                        nationalId: e.target.value,
                      })
                    }
                    disabled={!editingIdentity}
                  />
                </div>
                <div>
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input
                    id="passportNumber"
                    value={identityForm.passportNumber}
                    onChange={(e) =>
                      setIdentityForm({
                        ...identityForm,
                        passportNumber: e.target.value,
                      })
                    }
                    disabled={!editingIdentity}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={identityForm.dateOfBirth}
                    onChange={(e) =>
                      setIdentityForm({
                        ...identityForm,
                        dateOfBirth: e.target.value,
                      })
                    }
                    disabled={!editingIdentity}
                  />
                </div>
                <div>
                  <Label htmlFor="ethnicity">Ethnicity</Label>
                  <Input
                    id="ethnicity"
                    value={identityForm.ethnicity}
                    onChange={(e) =>
                      setIdentityForm({
                        ...identityForm,
                        ethnicity: e.target.value,
                      })
                    }
                    disabled={!editingIdentity}
                  />
                </div>
              </div>

              {editingIdentity && (
                <Button
                  onClick={handleIdentitySave}
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Verification</span>
                {userProfile.emailVerified ? (
                  <Badge variant="default">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline">Not Verified</Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Phone Verification</span>
                {userProfile.phoneVerified ? (
                  <Badge variant="default">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline">Not Verified</Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Account Status</span>
                <Badge
                  variant={
                    userProfile.accountStatus === AccountStatus.active
                      ? "default"
                      : "outline"
                  }
                >
                  {userProfile.accountStatus}
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Control Panel */}
        <TabsContent value="security" className="space-y-6">
          {securityLoading ? (
            <SkeletonBlock className="h-64 w-full" />
          ) : (
            <>
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Security Score</h3>
                  <div className="text-3xl font-bold">
                    {securityTelemetry?.securityScore || 0}/100
                  </div>
                </div>
                <Progress
                  value={securityTelemetry?.securityScore || 0}
                  className="mb-4"
                />
                <div className="space-y-2">
                  {securityTelemetry?.suggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
                {securityTelemetry?.activeSessions &&
                securityTelemetry.activeSessions.length > 0 ? (
                  <div className="space-y-3">
                    {securityTelemetry.activeSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div>
                          <p className="font-medium">{session.device}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.location}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last active:{" "}
                            {new Date(session.lastActive).toLocaleString()}
                          </p>
                        </div>
                        {session.current && (
                          <Badge variant="default">Current</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No active sessions
                  </p>
                )}
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">Login Activity</h3>
                {securityTelemetry?.loginActivity &&
                securityTelemetry.loginActivity.length > 0 ? (
                  <div className="space-y-2">
                    {securityTelemetry.loginActivity.map((event) => (
                      <div
                        key={event.timestamp}
                        className="flex items-center justify-between text-sm"
                      >
                        <div>
                          <p>{event.device}</p>
                          <p className="text-muted-foreground">
                            {event.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p>{new Date(event.timestamp).toLocaleString()}</p>
                          <Badge
                            variant={event.success ? "default" : "destructive"}
                          >
                            {event.success ? "Success" : "Failed"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No login history available
                  </p>
                )}
              </div>
            </>
          )}
        </TabsContent>

        {/* Portfolio Analytics */}
        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">
                Portfolio Distribution
              </h3>
              {portfolioData.some((d) => d.value > 0) ? (
                <AnimatedDonutChart data={portfolioData} />
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  No portfolio data available
                </div>
              )}
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Investment Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Investment
                  </p>
                  <p className="text-2xl font-bold">
                    KES {totalInvestment.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Properties Owned
                  </p>
                  <p className="text-2xl font-bold">
                    {properties?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">
                    {transactions?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Documents Vault */}
        <TabsContent value="documents" className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Upload Documents</h3>
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Document vault is not yet available. This feature is coming
                soon.
              </AlertDescription>
            </Alert>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="id-document">ID Document</Label>
                <Input
                  id="id-document"
                  type="file"
                  onChange={(e) => handleDocumentUpload(e, "id")}
                  disabled={true}
                />
              </div>
              <div>
                <Label htmlFor="proof-of-address">Proof of Address</Label>
                <Input
                  id="proof-of-address"
                  type="file"
                  onChange={(e) => handleDocumentUpload(e, "address")}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
            {documentsLoading ? (
              <SkeletonBlock className="h-32 w-full" />
            ) : documents && documents.length > 0 ? (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{doc.filename}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.category}
                      </p>
                    </div>
                    <Badge
                      variant={
                        doc.status === "verified" ? "default" : "outline"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No documents uploaded yet
              </p>
            )}
          </div>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="space-y-6">
          {preferencesLoading ? (
            <SkeletonBlock className="h-64 w-full" />
          ) : preferencesForm ? (
            <>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-price-drops">
                      Price Drop Alerts
                    </Label>
                    <Switch
                      id="notify-price-drops"
                      checked={preferencesForm.notifyPriceDrops}
                      onCheckedChange={(checked) =>
                        setPreferencesForm({
                          ...preferencesForm,
                          notifyPriceDrops: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-disputes">
                      Dispute Notifications
                    </Label>
                    <Switch
                      id="notify-disputes"
                      checked={preferencesForm.notifyDisputes}
                      onCheckedChange={(checked) =>
                        setPreferencesForm({
                          ...preferencesForm,
                          notifyDisputes: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-new-listings">
                      New Listing Alerts
                    </Label>
                    <Switch
                      id="notify-new-listings"
                      checked={preferencesForm.notifyNewListings}
                      onCheckedChange={(checked) =>
                        setPreferencesForm({
                          ...preferencesForm,
                          notifyNewListings: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-infrastructure">
                      Infrastructure Updates
                    </Label>
                    <Switch
                      id="notify-infrastructure"
                      checked={preferencesForm.notifyInfrastructureUpdates}
                      onCheckedChange={(checked) =>
                        setPreferencesForm({
                          ...preferencesForm,
                          notifyInfrastructureUpdates: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-market-trends">
                      Market Trend Alerts
                    </Label>
                    <Switch
                      id="notify-market-trends"
                      checked={preferencesForm.notifyMarketTrends}
                      onCheckedChange={(checked) =>
                        setPreferencesForm({
                          ...preferencesForm,
                          notifyMarketTrends: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">
                  AI Personalization
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                    <Select
                      value={preferencesForm.riskTolerance}
                      onValueChange={(value) =>
                        setPreferencesForm({
                          ...preferencesForm,
                          riskTolerance: value,
                        })
                      }
                    >
                      <SelectTrigger id="risk-tolerance">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={RiskType.low}>Low</SelectItem>
                        <SelectItem value={RiskType.medium}>Medium</SelectItem>
                        <SelectItem value={RiskType.high}>High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="preferred-land-type">
                      Preferred Land Type
                    </Label>
                    <Input
                      id="preferred-land-type"
                      value={
                        preferencesForm.aiPersonalization.preferredLandType
                      }
                      onChange={(e) =>
                        setPreferencesForm({
                          ...preferencesForm,
                          aiPersonalization: {
                            ...preferencesForm.aiPersonalization,
                            preferredLandType: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="growth-expectation">
                      Growth Expectation (%)
                    </Label>
                    <Input
                      id="growth-expectation"
                      type="number"
                      value={Number(
                        preferencesForm.aiPersonalization.growthExpectation,
                      )}
                      onChange={(e) =>
                        setPreferencesForm({
                          ...preferencesForm,
                          aiPersonalization: {
                            ...preferencesForm.aiPersonalization,
                            growthExpectation: BigInt(e.target.value || 0),
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePreferencesSave}
                disabled={updatePreferences.isPending}
              >
                {updatePreferences.isPending ? "Saving..." : "Save Preferences"}
              </Button>
            </>
          ) : null}

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Privacy Center</h3>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleExportData}
                disabled={exportData.isPending}
              >
                <Download className="mr-2 h-4 w-4" />
                {exportData.isPending ? "Exporting..." : "Export My Data"}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={deleteAccount.isPending}
                    >
                      {deleteAccount.isPending
                        ? "Deleting..."
                        : "Delete Account"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
