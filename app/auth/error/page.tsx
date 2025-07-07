"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return {
          title: "Configuration Error",
          description:
            "There is a problem with the authentication configuration. Please contact support.",
        };
      case "AccessDenied":
        return {
          title: "Access Denied",
          description:
            "You do not have permission to sign in. Please ensure your email is verified.",
        };
      case "Verification":
        return {
          title: "Verification Error",
          description:
            "The verification token has expired or is invalid. Please try signing in again.",
        };
      case "Default":
      default:
        return {
          title: "Authentication Error",
          description:
            "An unexpected error occurred during authentication. Please try again.",
        };
    }
  };

  const { title, description } = getErrorMessage(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <svg
              className="h-6 w-6 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push("/auth/signin")}
            className="w-full"
          >
            Try signing in again
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="w-full"
          >
            Return to home
          </Button>
        </div>
      </div>
    </div>
  );
}
