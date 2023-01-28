import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Checkbox from "./Checkbox";
describe("Checkbox", () => {
  let onSelectionChange: Mock;
  describe("unchecked", () => {
    beforeEach(() => {
      onSelectionChange = vi.fn();
      render(
        <Checkbox
          checked={false}
          isBusy={false}
          dataIndex={123}
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

      expect(onSelectionChange).toHaveBeenCalledWith(true, 123);
    });
  });

  describe("checked", () => {
    beforeEach(() => {
      onSelectionChange = vi.fn();
      render(
        <Checkbox
          checked={true}
          isBusy={false}
          dataIndex={123}
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

      expect(onSelectionChange).toHaveBeenCalledWith(false, 123);
    });
  });

  describe("busy", () => {
    beforeEach(() => {
      onSelectionChange = vi.fn();
      render(
        <Checkbox
          checked={true}
          isBusy={true}
          dataIndex={123}
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
