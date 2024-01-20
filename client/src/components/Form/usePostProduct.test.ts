import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, delay, http } from "msw";
import { API_BASE } from "../../constants/api";
import { useCreateProduct } from "./usePostProduct";
import { act, cleanup, renderHook } from "@testing-library/react";
import { TCreateProductBody } from "../../types/productTypes";

const mockProduct = {
  name: "TEST_PRODUCT",
  price: 19.99,
  createdAt: new Date().toISOString(),
};

const mockResponse = { id: "TEST_ID", ...mockProduct };

const handlers = [
  http.post(`${API_BASE}/products`, async (i) => {
    const body = (await i.request.json()) as TCreateProductBody;

    delay();

    if (body && body.name === "TEST_ERROR") {
      return new HttpResponse(JSON.stringify({ error: "WRONG_FORMAT" }), {
        status: 400,
      });
    }

    return HttpResponse.json(mockResponse);
  }),
];

const server = setupServer(...handlers);

describe("useCreateProduct", () => {
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

  it("should make a request on mutate", async () => {
    const { result } = renderHook(useCreateProduct);

    const response = await result.current.mutate(mockProduct);

    expect(response).toEqual(mockResponse);
  });

  it("should be loading on mutate", () => {
    const { result } = renderHook(useCreateProduct);

    act(() => {
      result.current.mutate(mockProduct);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("should be error on wrong format", async () => {
    const { result } = renderHook(useCreateProduct);

    await act(async () => {
      await result.current.mutate({ ...mockProduct, name: "TEST_ERROR" });
    });

    expect(result.current.error).toBe("WRONG_FORMAT");
  });
});
