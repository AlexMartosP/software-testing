import { useEffect, useState } from "react";
import { API_BASE } from "../../constants/api";
import { TProduct } from "../../types/productTypes";

export function useGetProducts() {
  const [data, setData] = useState<TProduct[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function get() {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/products`);

      const body = await response.json();

      if (!response.ok) {
        setError(body.error);
      } else {
        setError("");
        setData(body);
      }

      setIsLoading(false);

      return body;
    }

    get();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}
