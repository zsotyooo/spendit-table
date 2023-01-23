import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Poc from "./Poc";

describe("PoC", () => {
  it("should render the children", async () => {
    render(<Poc>Hello</Poc>);
    const div = await screen.queryByText("Hello");
    expect(div).toBeInTheDocument();
  });
});
