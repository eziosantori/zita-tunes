import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Return true if the user is authenticated
      // You can add more complex logic here based on roles, etc.
      return !!token;
    },
  },
});

// Specify which routes should be protected
export const config = {
  matcher: [
    // Protect specific routes - uncomment and modify as needed
    "/favorites/:path*",
    // "/profile/:path*",
    // "/admin/:path*",
  ],
};
