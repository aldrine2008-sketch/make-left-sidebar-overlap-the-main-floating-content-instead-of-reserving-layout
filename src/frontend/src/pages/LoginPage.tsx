import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Fingerprint, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { useMotionSafe } from "../utils/motion";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginStatus, identity } = useInternetIdentity();
  const [error, setError] = useState<string | null>(null);
  const motionSafe = useMotionSafe();

  const isLoggingIn = loginStatus === "logging-in";

  const handleLogin = async () => {
    setError(null);
    try {
      await login();
      // On success, navigate to home
      navigate({ to: "/" });
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to sign in. Please try again.");
    }
  };

  // If already authenticated, redirect
  if (identity) {
    navigate({ to: "/" });
    return null;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 ${
          motionSafe ? "animate-gradient-shift" : ""
        }`}
      />

      {/* Glassmorphism card */}
      <div className="glass-surface-strong relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-primary/20 p-8 shadow-depth backdrop-blur-xl">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
            <ShieldCheck className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in with Internet Identity to access your land management
            dashboard
          </p>
        </div>

        {/* Features list */}
        <div className="space-y-3 rounded-xl bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Secure Authentication</p>
              <p className="text-xs text-muted-foreground">
                Powered by Internet Computer
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Fingerprint className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Privacy First</p>
              <p className="text-xs text-muted-foreground">
                Your data stays secure and private
              </p>
            </div>
          </div>
        </div>

        {/* Login button */}
        <Button
          onClick={handleLogin}
          disabled={isLoggingIn}
          size="lg"
          className="w-full btn-lift text-base"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <ShieldCheck className="mr-2 h-5 w-5" />
              Sign in with Internet Identity
            </>
          )}
        </Button>

        {/* Error message */}
        {error && (
          <Alert variant="destructive" role="alert">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Footer info */}
        <div className="space-y-2 text-center text-xs text-muted-foreground">
          <p>New to Internet Identity?</p>
          <p>
            You'll be guided to create an account during sign-in.{" "}
            <a
              href="https://identity.ic0.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
