"use client";

import { User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const SignInButton = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-transparent"
      onClick={() => {
        toast.warning("Sign in functionality is not implemented yet.");
      }}
    >
      <User className="h-4 w-4 mr-0 sm:mr-2" />
      <span className="hidden sm:inline">Sign In</span>
    </Button>
  );
};
