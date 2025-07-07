"use client";

import { Button } from "@/components/ui/button";
import { getProviders, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function SignIn() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  useEffect(() => {
    const setProvidersData = async () => {
      const providersResponse = await getProviders();
      setProviders(providersResponse);
    };
    setProvidersData();
  }, []);

  const handleSignIn = async (providerId: string) => {
    await signIn(providerId, { callbackUrl });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Sign in to zTunes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Access your favorite albums, audiobooks, and podcasts
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
            {error === "AccessDenied" &&
              "Access denied. Please verify your email address."}
            {error === "Configuration" &&
              "There is a problem with the server configuration."}
            {error === "Verification" && "Unable to sign in. Please try again."}
            {error &&
              !["AccessDenied", "Configuration", "Verification"].includes(
                error
              ) &&
              "An error occurred during sign in. Please try again."}
          </div>
        )}

        <div className="space-y-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button
                  onClick={() => handleSignIn(provider.id)}
                  className="w-full"
                  variant="outline"
                >
                  Sign in with {provider.name}
                </Button>
              </div>
            ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
