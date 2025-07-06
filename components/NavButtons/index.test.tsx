import { render, screen } from "@testing-library/react";
import NavButtons from "./index";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

jest.mock("lucide-react", () => ({
  Heart: () => <svg data-testid="heart-icon" />,
  User: () => <svg data-testid="user-icon" />,
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

  it("renders a Badge in the Favorites button", () => {
    const { container } = render(<NavButtons />);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge).toBeInTheDocument();
  });

  it("Favorites button links to /favorites", () => {
    render(<NavButtons />);
    const link = screen.getByRole("link", { name: /favorites/i });
    expect(link).toHaveAttribute("href", "/favorites");
  });
});
