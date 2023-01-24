import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import SpenditTable from "./Table";
import { DataLoader, Row, Schema } from "../models";

describe("SpenditTable", () => {
  let schema: Schema;
  let data: Row[];
  let loadData: DataLoader;
  let loadPage: DataLoader;

  beforeEach(() => {
    schema = [
      {
        id: "ID",
        label: "ID",
        render(value: number) {
          return <span>{value}</span>;
        },
      },
      {
        id: "SOMETHING",
        label: "Something",
      },
    ];

    data = [
      [123, "test-data-1"],
      [456, "test-data-2"],
      [789, "test-data-3"],
    ];
  });

  describe("data rendering", () => {
    it("should render the headings", async () => {
      render(
        <SpenditTable
          schema={schema}
          data={data}
          pageSize={2}
          total={3}
          currentPage={0}
        />
      );

      schema.forEach((definition) => {
        expect(screen.getByText(definition.label)).toBeInTheDocument();
      });
    });

    it("should render the rows", async () => {
      render(
        <SpenditTable
          schema={schema}
          data={data}
          pageSize={2}
          total={3}
          currentPage={0}
        />
      );

      [
        [123, "test-data-1"],
        [456, "test-data-2"],
      ].forEach((row) => {
        row.forEach((value) => {
          expect(screen.getByText(value)).toBeInTheDocument();
        });
      });
    });
  });

  describe("async data rendering", () => {
    beforeEach(() => {
      loadData = vi.fn().mockResolvedValue(data);
    });

    it("should render the rows", async () => {
      render(
        <SpenditTable
          schema={schema}
          data={[]}
          pageSize={2}
          total={3}
          currentPage={0}
          loadData={loadData}
        />
      );

      expect(loadData).toHaveBeenCalledWith();

      [
        [123, "test-data-1"],
        [456, "test-data-2"],
      ].forEach((row) => {
        row.forEach(async (value) => {
          await waitFor(() =>
            expect(screen.getByText(value)).toBeInTheDocument()
          );
        });
      });
    });
  });

  describe("async page rendering", () => {
    beforeEach(() => {
      loadPage = vi
        .fn()
        .mockImplementation((page: number, pageSize: number) => {
          return Promise.resolve({
            total: 3,
            data: data.slice(page * pageSize, (page + 1) * pageSize),
          });
        });
    });

    it("should render the rows", async () => {
      render(
        <SpenditTable
          schema={schema}
          data={[]}
          pageSize={2}
          total={3}
          currentPage={0}
          loadPage={loadPage}
        />
      );

      expect(loadPage).toHaveBeenCalledWith(0, 2);

      [
        [123, "test-data-1"],
        [456, "test-data-2"],
      ].forEach((row) => {
        row.forEach(async (value) => {
          await waitFor(() =>
            expect(screen.getByText(value)).toBeInTheDocument()
          );
        });
      });
    });
  });
});
