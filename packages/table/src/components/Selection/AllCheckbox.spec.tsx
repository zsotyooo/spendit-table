import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AllCheckbox from "./AllCheckbox";
describe("AllCheckbox", () => {
  let onSelectionChange: Mock;
  describe("unchecked", () => {
    beforeEach(() => {
      onSelectionChange = vi.fn();
      render(
        <AllCheckbox
          checked={false}
          isBusy={false}
          onSelectionChange={onSelectionChange}
        />
      );
    });

    it("should render unchecked", async () => {
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("should call onSelectionChange when changed", async () => {
      const checkbox = await screen.getByRole("checkbox");
      checkbox.click();

      expect(onSelectionChange).toHaveBeenCalledWith(true);
    });
  });

  describe("checked", () => {
    beforeEach(() => {
      onSelectionChange = vi.fn();
      render(
        <AllCheckbox
          checked={true}
          isBusy={false}
          onSelectionChange={onSelectionChange}
        />
      );
    });

    it("should render checked", async () => {
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("should call onSelectionChange when changed", async () => {
      const checkbox = await screen.getByRole("checkbox");
      checkbox.click();

      expect(onSelectionChange).toHaveBeenCalledWith(false);
    });
  });

  describe("busy", () => {
    beforeEach(() => {
      onSelectionChange = vi.fn();
      render(
        <AllCheckbox
          checked={true}
          isBusy={true}
          onSelectionChange={onSelectionChange}
        />
      );
    });

    it("should call not onSelectionChange when clicked", async () => {
      const checkbox = await screen.getByRole("checkbox");

      expect(checkbox).toBeDisabled();
      checkbox.click();

      expect(onSelectionChange).not.toHaveBeenCalled();
    });
  });
});
