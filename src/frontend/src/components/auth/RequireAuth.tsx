import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { ReactNode } from "react";
import { useGetCallerUserProfile } from "../../hooks/useCurrentUser";
import SkeletonBlock from "../loading/SkeletonBlock";
import AccessDeniedScreen from "./AccessDeniedScreen";
import ProfileSetupDialog from "./ProfileSetupDialog";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;

  // Show loading while checking auth state
  if (isInitializing || (isAuthenticated && profileLoading && !isFetched)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-4 p-8">
          <SkeletonBlock className="h-8 w-3/4" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  // Not authenticated - show sign-in prompt
  if (!isAuthenticated) {
    return <AccessDeniedScreen />;
  }

  // Authenticated but no profile - show setup dialog
  const showProfileSetup =
    isAuthenticated && !profileLoading && isFetched && userProfile === null;
  if (showProfileSetup) {
    return <ProfileSetupDialog />;
  }

  // Authenticated with profile
  return <>{children}</>;
}
