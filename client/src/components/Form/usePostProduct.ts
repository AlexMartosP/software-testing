import { useState } from "react";
import { API_BASE } from "../../constants/api";
import { TCreateProductBody } from "../../types/productTypes";

export function useCreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function mutate(product: TCreateProductBody) {
    setIsLoading(true);
    const response = await fetch(`${API_BASE}/products`, {
      method: "POST",
      body: JSON.stringify(product),
    });

    const body = await response.json();

    if (!response.ok) {
      setError(body.error);
    } else {
      setError("");
    }

    setIsLoading(false);

    return body;
  }

  return {
    mutate,
    isLoading,
    error,
  };
}
