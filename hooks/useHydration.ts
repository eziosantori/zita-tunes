import { useEffect, useState } from "react";

/**
 * Hook to handle hydration mismatch between server and client
 * Returns true once the component has hydrated on the client
 */
export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};
