import { MotionPreference, ThemePreference } from "@/backend";
import SkeletonBlock from "@/components/loading/SkeletonBlock";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  useGetCallerUserSettings,
  useUpdateCallerUserSettings,
} from "@/hooks/useUserSettings";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: settings, isLoading } = useGetCallerUserSettings();
  const updateSettings = useUpdateCallerUserSettings();

  const [themePreference, setThemePreference] = useState<ThemePreference>(
    ThemePreference.light,
  );
  const [motionPreference, setMotionPreference] = useState<MotionPreference>(
    MotionPreference.default_,
  );
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [criticalAlertsOnly, setCriticalAlertsOnly] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);
  const [allowDataCollection, setAllowDataCollection] = useState(false);
  const [showPublicProfile, setShowPublicProfile] = useState(true);

  useEffect(() => {
    if (settings) {
      setThemePreference(settings.themePreference);
      setMotionPreference(settings.motionPreference);
      setEmailNotifications(settings.notifications.email);
      setPushNotifications(settings.notifications.push);
      setSmsNotifications(settings.notifications.sms);
      setCriticalAlertsOnly(settings.notifications.criticalAlertsOnly);
      setShareLocation(settings.privacy.shareLocation);
      setAllowDataCollection(settings.privacy.allowDataCollection);
      setShowPublicProfile(settings.privacy.showPublicProfile);
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync({
        themePreference,
        motionPreference,
        notifications: {
          email: emailNotifications,
          push: pushNotifications,
          sms: smsNotifications,
          criticalAlertsOnly,
        },
        privacy: {
          shareLocation,
          allowDataCollection,
          showPublicProfile,
        },
      });
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
      console.error("Settings save error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 py-8">
        <SkeletonBlock className="h-12 w-64" />
        <SkeletonBlock className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how the application looks and feels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={themePreference}
              onValueChange={(value) =>
                setThemePreference(value as ThemePreference)
              }
            >
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ThemePreference.light}>Light</SelectItem>
                <SelectItem value={ThemePreference.dark}>Dark</SelectItem>
                <SelectItem value={ThemePreference.futuristic}>
                  Futuristic
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motion">Motion</Label>
            <Select
              value={motionPreference}
              onValueChange={(value) =>
                setMotionPreference(value as MotionPreference)
              }
            >
              <SelectTrigger id="motion">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={MotionPreference.default_}>
                  Default
                </SelectItem>
                <SelectItem value={MotionPreference.reduced}>
                  Reduced
                </SelectItem>
                <SelectItem value={MotionPreference.advanced}>
                  Advanced
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Configure how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via SMS
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="critical-alerts">Critical Alerts Only</Label>
              <p className="text-sm text-muted-foreground">
                Only receive critical alerts
              </p>
            </div>
            <Switch
              id="critical-alerts"
              checked={criticalAlertsOnly}
              onCheckedChange={setCriticalAlertsOnly}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy & Security</CardTitle>
          <CardDescription>
            Manage your privacy and security preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="share-location">Share Location</Label>
              <p className="text-sm text-muted-foreground">
                Allow location sharing
              </p>
            </div>
            <Switch
              id="share-location"
              checked={shareLocation}
              onCheckedChange={setShareLocation}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-collection">Allow Data Collection</Label>
              <p className="text-sm text-muted-foreground">
                Help improve the service
              </p>
            </div>
            <Switch
              id="data-collection"
              checked={allowDataCollection}
              onCheckedChange={setAllowDataCollection}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="public-profile">Show Public Profile</Label>
              <p className="text-sm text-muted-foreground">
                Make your profile visible to others
              </p>
            </div>
            <Switch
              id="public-profile"
              checked={showPublicProfile}
              onCheckedChange={setShowPublicProfile}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="btn-lift"
        >
          {updateSettings.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
