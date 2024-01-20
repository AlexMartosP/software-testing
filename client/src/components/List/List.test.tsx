import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { List } from "./List";

describe("List", () => {
  it("should render a list of items", () => {
    const list = render(<List />);

    waitFor(() => expect(list.getAllByTestId("item").length).toBe(3));
  });
});
