"use client";

import { LogOut, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export const SignInButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button variant="outline" size="sm" className="bg-transparent" disabled>
        <User className="h-4 w-4 mr-0 sm:mr-2" />
        <span className="hidden sm:inline">Loading...</span>
      </Button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden md:inline text-sm text-muted-foreground">
          {session.user?.name || session.user?.email}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4 mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-transparent"
      onClick={() => signIn()}
    >
      <User className="h-4 w-4 mr-0 sm:mr-2" />
      <span className="hidden sm:inline">Sign In</span>
    </Button>
  );
};
