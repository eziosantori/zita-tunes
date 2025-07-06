import Link from "next/link";
import { Button } from "../ui/button";
import { Heart, User } from "lucide-react";
import { Badge } from "../ui/badge";

const NavButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="/favorites">
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Heart className="h-4 w-4 mr-2" />
          Favorites
          <Badge
            variant="secondary"
            className="ml-2 h-5 px-1.5 text-xs bg-secondary text-primary-foreground"
          ></Badge>
        </Button>
      </Link>
      {/* Sign In button */}
      <Button variant="outline" size="sm" className="bg-transparent">
        <User className="h-4 w-4 mr-2" />
        Sign In
      </Button>
    </div>
  );
};

export default NavButtons;
// This component provides navigation buttons for the application.
// todo favotites handles (client side), sign in, sign out, etc.
