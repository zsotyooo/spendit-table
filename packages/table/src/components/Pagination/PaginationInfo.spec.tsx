import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PaginationInfo from "../Pagination/PaginationInfo";
describe("PaginationInfo", () => {
  describe("page in the middle", () => {
    it("should render the info", async () => {
      render(
        <PaginationInfo
          currentPage={10}
          pageSize={10}
          total={295}
          isBusy={false}
        />
      );
      expect(screen.getByText("Showing 101 to 110 of 295")).toBeInTheDocument();
    });

    it("should render the info with custom text", async () => {
      render(
        <PaginationInfo
          currentPage={10}
          pageSize={10}
          total={295}
          isBusy={false}
          text="from: %from% to: %to% total: %total%"
        />
      );
      expect(
        screen.getByText("from: 101 to: 110 total: 295")
      ).toBeInTheDocument();
    });
  });

  describe("last page complete", () => {
    it("should render the info", async () => {
      render(
        <PaginationInfo
          currentPage={29}
          pageSize={10}
          total={300}
          isBusy={false}
        />
      );
      expect(screen.getByText("Showing 291 to 300 of 300")).toBeInTheDocument();
    });
  });

  describe("last page incomplete", () => {
    it("should render the info", async () => {
      render(
        <PaginationInfo
          currentPage={29}
          pageSize={10}
          total={295}
          isBusy={false}
        />
      );
      expect(screen.getByText("Showing 291 to 295 of 295")).toBeInTheDocument();
    });
  });
});
