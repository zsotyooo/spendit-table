import { beforeEach, describe, it, expect, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import Pagination from "../Pagination/Pagination";
describe("Pagination", () => {
  let onPageChange: Mock;

  describe("page in the middle", () => {
    beforeEach(() => {
      onPageChange = vi.fn();
      render(
        <Pagination
          currentPage={10}
          pageSize={1}
          total={30}
          isBusy={false}
          onPageChange={onPageChange}
        />
      );
    });

    it("should render the buttons", async () => {
      expect(
        screen.queryByRole("button", { name: "7" })
      ).not.toBeInTheDocument();
      ["8", "9", "10", "11", "12", "13", "14"].forEach((page) =>
        expect(screen.queryByRole("button", { name: page })).toBeInTheDocument()
      );
      expect(
        screen.queryByRole("button", { name: "15" })
      ).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❮❮" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❮" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❯" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❯❯" })).toBeInTheDocument();
    });

    it("should call onPageChange when clicking a page", async () => {
      screen.getByRole("button", { name: "11" }).click();

      expect(onPageChange).toBeCalledTimes(1);
      expect(onPageChange).toBeCalledWith(10);
    });

    it("should call onPageChange when clicking the previous page", async () => {
      screen.getByRole("button", { name: "❮" }).click();

      expect(onPageChange).toBeCalledTimes(1);
      expect(onPageChange).toBeCalledWith(9);
    });

    it("should call onPageChange when clicking the first page", async () => {
      screen.getByRole("button", { name: "❮❮" }).click();

      expect(onPageChange).toBeCalledTimes(1);
      expect(onPageChange).toBeCalledWith(0);
    });

    it("should call onPageChange when clicking the next page", async () => {
      screen.getByRole("button", { name: "❯" }).click();

      expect(onPageChange).toBeCalledTimes(1);
      expect(onPageChange).toBeCalledWith(11);
    });

    it("should call onPageChange when clicking the last page", async () => {
      screen.getByRole("button", { name: "❯❯" }).click();

      expect(onPageChange).toBeCalledTimes(1);
      expect(onPageChange).toBeCalledWith(29);
    });
  });

  describe("first page", () => {
    beforeEach(() => {
      onPageChange = vi.fn();
      render(
        <Pagination
          currentPage={0}
          pageSize={1}
          total={30}
          isBusy={false}
          onPageChange={onPageChange}
        />
      );
    });

    it("should render the buttons", async () => {
      expect(
        screen.queryByRole("button", { name: "0" })
      ).not.toBeInTheDocument();
      ["1", "2", "3", "4", "5", "6", "7"].forEach((page) =>
        expect(screen.queryByRole("button", { name: page })).toBeInTheDocument()
      );
      expect(
        screen.queryByRole("button", { name: "8" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "❮❮" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "❮" })
      ).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❯" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❯❯" })).toBeInTheDocument();
    });
  });

  describe("near first page", () => {
    beforeEach(() => {
      onPageChange = vi.fn();
      render(
        <Pagination
          currentPage={2}
          pageSize={1}
          total={30}
          isBusy={false}
          onPageChange={onPageChange}
        />
      );
    });

    it("should render the buttons", async () => {
      expect(
        screen.queryByRole("button", { name: "0" })
      ).not.toBeInTheDocument();
      ["1", "2", "3", "4", "5", "6", "7"].forEach((page) =>
        expect(screen.queryByRole("button", { name: page })).toBeInTheDocument()
      );
      expect(
        screen.queryByRole("button", { name: "8" })
      ).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❮❮" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❮" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❯" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❯❯" })).toBeInTheDocument();
    });
  });

  describe("last page", () => {
    beforeEach(() => {
      onPageChange = vi.fn();
      render(
        <Pagination
          currentPage={29}
          pageSize={1}
          total={30}
          isBusy={false}
          onPageChange={onPageChange}
        />
      );
    });

    it("should render the buttons", async () => {
      expect(
        screen.queryByRole("button", { name: "23" })
      ).not.toBeInTheDocument();
      ["24", "25", "26", "27", "28", "29", "30"].forEach((page) =>
        expect(screen.queryByRole("button", { name: page })).toBeInTheDocument()
      );
      expect(
        screen.queryByRole("button", { name: "31" })
      ).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❮❮" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❮" })).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "❯" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "❯❯" })
      ).not.toBeInTheDocument();
    });
  });

  describe("near last page", () => {
    beforeEach(() => {
      onPageChange = vi.fn();
      render(
        <Pagination
          currentPage={28}
          pageSize={1}
          total={30}
          isBusy={false}
          onPageChange={onPageChange}
        />
      );
    });

    it("should render the buttons", async () => {
      expect(
        screen.queryByRole("button", { name: "23" })
      ).not.toBeInTheDocument();
      ["24", "25", "26", "27", "28", "29", "30"].forEach((page) =>
        expect(screen.queryByRole("button", { name: page })).toBeInTheDocument()
      );
      expect(
        screen.queryByRole("button", { name: "31" })
      ).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❮❮" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❮" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❯" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "❯❯" })).toBeInTheDocument();
    });
  });

  describe("busy", () => {
    beforeEach(() => {
      onPageChange = vi.fn();
      render(
        <Pagination
          currentPage={29}
          pageSize={1}
          total={30}
          isBusy={true}
          onPageChange={onPageChange}
        />
      );
    });

    it("should have only disabled buttons", async () => {
      (await screen.findAllByRole("button")).forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });
});
