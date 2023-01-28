import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PageButton from "./PageButton";
describe("PageButton", () => {
  let onPageChange: Mock;
  describe("default", () => {
    beforeEach(() => {
      onPageChange = vi.fn();
      render(
        <PageButton
          currentPage={0}
          page={1}
          isBusy={false}
          onPageChange={onPageChange}
        >
          button
        </PageButton>
      );
    });

    it("should render a page button", async () => {
      expect(
        screen.getByRole("button", { name: "button" })
      ).toBeInTheDocument();
    });

    it("should call onPageChange with the page value", async () => {
      screen.getByRole("button", { name: "button" }).click();

      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("should not have is-current class", async () => {
      expect(screen.getByRole("button", { name: "button" })).not.toHaveClass(
        "is-current"
      );
    });
  });

  describe("current", () => {
    beforeEach(() => {
      onPageChange = vi.fn();
      render(
        <PageButton
          currentPage={1}
          page={1}
          isBusy={false}
          onPageChange={onPageChange}
        >
          button
        </PageButton>
      );
    });

    it("should have is-current class", async () => {
      expect(screen.getByRole("button", { name: "button" })).toHaveClass(
        "is-current"
      );
    });
  });

  describe("busy", () => {
    beforeEach(() => {
      onPageChange = vi.fn();
      render(
        <PageButton
          currentPage={1}
          page={1}
          isBusy={true}
          onPageChange={onPageChange}
        >
          button
        </PageButton>
      );
    });

    it("should be disabled", async () => {
      const button = screen.getByRole("button", { name: "button" });
      button.click();

      expect(button).toBeDisabled();
      expect(onPageChange).toHaveBeenCalledTimes(0);
    });
  });
});
