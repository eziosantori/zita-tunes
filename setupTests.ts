import '@testing-library/jest-dom';
import "jest-mock-extended";

// Global mock for next/navigation useRouter and useSearchParams
export const pushMock = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useSearchParamsMock = jest.fn(() => ({ get: (key: string) => null }));
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => useSearchParamsMock(),
}));

if (typeof window !== "undefined" && !window.IntersectionObserver) {
  // @ts-expect-error: Mock IntersectionObserver for Jest environment
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };
}