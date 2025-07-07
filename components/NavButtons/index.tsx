import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { BadgeCount } from "./BadgeCount";
import { SignInButton } from "./SignInButton";

const NavButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="/favorites">
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Heart className="h-4 w-4 mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Favorites</span>
          <BadgeCount />
        </Button>
      </Link>
      {/* Sign In button */}
      <SignInButton />
    </div>
  );
};

export default NavButtons;
// This component provides navigation buttons for the application.
// todo favotites handles (client side), sign in, sign out, etc.
