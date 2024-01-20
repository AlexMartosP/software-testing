import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { API_BASE } from "../../constants/api";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { useGetProducts } from "./useGetProducts";

const mockProducts = [
  { id: 1, name: "Product 1", price: 19.99, createdAt: "2024-01-16 12:00:00" },
  { id: 2, name: "Product 2", price: 29.99, createdAt: "2024-01-16 12:30:00" },
  { id: 3, name: "Product 3", price: 39.99, createdAt: "2024-01-16 13:00:00" },
  { id: 4, name: "Product 4", price: 49.99, createdAt: "2024-01-16 13:30:00" },
  { id: 5, name: "Product 5", price: 59.99, createdAt: "2024-01-16 14:00:00" },
];

const handlers = [
  http.get(`${API_BASE}/products`, () => {
    return HttpResponse.json(mockProducts);
  }),
];

const server = setupServer(...handlers);

describe("useGetProducts", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.restoreHandlers();
    cleanup();
  });

  afterAll(() => {
    server.close();
  });

  it("should return an array of products", () => {
    const { result } = renderHook(useGetProducts);

    waitFor(() => expect(result.current.data).toEqual(mockProducts));
  });
});
