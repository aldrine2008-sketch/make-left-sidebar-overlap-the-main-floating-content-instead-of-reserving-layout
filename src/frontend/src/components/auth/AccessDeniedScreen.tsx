import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { LogIn, ShieldAlert } from "lucide-react";

export default function AccessDeniedScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Alert className="max-w-lg border-primary/50 bg-primary/5">
        <ShieldAlert className="h-5 w-5 text-primary" />
        <AlertTitle className="text-lg font-semibold">
          Sign In Required
        </AlertTitle>
        <AlertDescription className="mt-2 space-y-4">
          <p>
            You need to sign in to access this page. Please sign in with
            Internet Identity to continue.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate({ to: "/login" })}
              className="btn-lift"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            <Button onClick={() => navigate({ to: "/" })} variant="outline">
              Return to Home
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
