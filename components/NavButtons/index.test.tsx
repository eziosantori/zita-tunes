import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavButtons from "./index";

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("lucide-react", () => ({
  Heart: () => <svg data-testid="heart-icon" />,
  User: () => <svg data-testid="user-icon" />,
  LogOut: () => <svg data-testid="logout-icon" />,
}));

jest.mock("@/store/favorites-store", () => ({
  useFavoritesStore: () => ({
    favorites: [],
  }),
}));

jest.mock("./BadgeCount");
jest.mock("./SignInButton");
jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: null,
    status: "unauthenticated",
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe("NavButtons", () => {
  it("renders Favorites and Sign In buttons", () => {
    render(<NavButtons />);
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders Heart and User icons", () => {
    render(<NavButtons />);
    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("Favorites button links to /favorites", () => {
    render(<NavButtons />);
    const link = screen.getByRole("link", { name: /favorites/i });
    expect(link).toHaveAttribute("href", "/favorites");
  });
});
