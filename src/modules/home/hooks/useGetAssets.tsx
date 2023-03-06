import { useEffect, useState, useCallback } from "react";
import { Asset } from "../types";
const apiURL = "https://api.opensea.io/api/v1/assets";

function useGetAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>({ name: "", message: "" });

  const getAssets = useCallback(async (address: string) => {
    setIsLoading(true);
    setError({ name: "", message: "" });
    try {
      const response = await fetch(`${apiURL}?owner=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.assets?.length || data.assets.length === 0) {
        setError({ name: "No assets found", message: "No assets found" });
        return;
      }
      setAssets(data.assets);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { assets, isLoading, error, getAssets };
}

export default useGetAssets;
