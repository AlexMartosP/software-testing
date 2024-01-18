import { describe, expect, it, test } from "vitest";
import { responseFormatter } from "./responseFormatter";

const DUMMY_DATA = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    created_at: "2024-01-16 12:00:00",
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    created_at: "2024-01-16 12:30:00",
  },
  {
    id: 3,
    name: "Product 3",
    price: 39.99,
    created_at: "2024-01-16 13:00:00",
  },
  {
    id: 4,
    name: "Product 4",
    price: 49.99,
    created_at: "2024-01-16 13:30:00",
  },
  {
    id: 5,
    name: "Product 5",
    price: 59.99,
    created_at: "2024-01-16 14:00:00",
  },
];

const REAL_DATA = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    createdAt: "2024-01-16 12:00:00",
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    createdAt: "2024-01-16 12:30:00",
  },
  {
    id: 3,
    name: "Product 3",
    price: 39.99,
    createdAt: "2024-01-16 13:00:00",
  },
  {
    id: 4,
    name: "Product 4",
    price: 49.99,
    createdAt: "2024-01-16 13:30:00",
  },
  {
    id: 5,
    name: "Product 5",
    price: 59.99,
    createdAt: "2024-01-16 14:00:00",
  },
];

describe("responseFormatter", () => {
  it("should format db data to response body format", () => {
    const products = responseFormatter(DUMMY_DATA);

    expect(products).toEqual(REAL_DATA);
  });

  test("that emtpy data returns empty array", () => {
    expect(responseFormatter([])).toEqual([]);
  });

  it("should throw an error if input is in wrong format", () => {
    const wrongData = [
      {
        id: 2,
        name: "Test name",
        price: 123,
        createdAt: "some date",
      },
    ];

    const expectedData = [
      {
        id: 2,
        name: "Test name",
        price: 123,
        createdAt: undefined,
      },
    ];

    responseFormatter(wrongData);

    expect(responseFormatter(wrongData)).toEqual(expectedData);
  });
});
