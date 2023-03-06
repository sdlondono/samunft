import { useEffect, useState } from "react";
import type { Owner } from "../types";

function useGetOwnersByAsset(tokenId: string, assetContractAddress: string) {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>({ name: "", message: "" });

  useEffect(() => {
    const getOwners = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.opensea.io/api/v1/asset/${assetContractAddress}/${tokenId}/owners`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setOwners(data.owners);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    getOwners();
  }, [tokenId, assetContractAddress]);
  return { owners, isLoading, error };
}

export default useGetOwnersByAsset;
