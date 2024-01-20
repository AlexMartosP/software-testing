import { afterEach, describe, expect, it, vi } from "vitest";
import { Item } from "./Item";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockConsole = vi.spyOn(console, "log");

describe("Item", () => {
  afterEach(cleanup);

  it("should render name", () => {
    const item = render(<Item id="Id" name="Test name" price="Some price" />);

    expect(item.getByText("Test name")).toBeDefined();
  });

  it("should render price", () => {
    const item = render(<Item id="Id" name="Test name" price="Some price" />);

    expect(item.getByText("Some price")).toBeDefined();
  });

  it("should call console on click", async () => {
    const item = render(<Item id="Id" name="Test name" price="Some price" />);

    const button = item.getByText("X");

    await userEvent.click(button);

    expect(mockConsole).toHaveBeenCalledOnce();
  });
});
