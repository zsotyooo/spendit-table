import { beforeEach, describe, it, expect, vi, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import SpenditTable from "./SpenditTable";
import { PageLoader, Schema } from "../../models";

type Data = {
  id: number;
  something: string;
};
describe("SpenditTable", () => {
  let schema: Schema<Data>;
  let data: Data[];
  let loadData: Promise<Data[]>;
  let loadPage: PageLoader<Data>;

  beforeEach(() => {
    schema = {
      id: {
        label: "id",
      },
      something: {
        label: "Something",
      },
    };

    data = [
      { id: 1, something: "test-data-1" },
      { id: 2, something: "test-data-2" },
      { id: 3, something: "test-data-3" },
      { id: 4, something: "test-data-4" },
      { id: 5, something: "test-data-5" },
      { id: 6, something: "test-data-6" },
      { id: 7, something: "test-data-7" },
      { id: 8, something: "test-data-8" },
      { id: 9, something: "test-data-9" },
    ];
  });

  describe("data rendering", () => {
    describe("default render values", () => {
      beforeEach(() => {
        render(
          <SpenditTable<Data>
            schema={schema}
            data={data}
            pageSize={2}
            currentPage={0}
          />
        );
      });

      it("should render the headings", async () => {
        Object.keys(schema).forEach((id) => {
          expect(screen.getByText(schema[id].label)).toBeInTheDocument();
        });
      });

      it("should render the rows", async () => {
        [
          [1, "test-data-1"],
          [2, "test-data-2"],
        ].forEach((row) => {
          row.forEach(async (value) => {
            await waitFor(() =>
              expect(screen.getByText(value)).toBeInTheDocument()
            );
          });
        });
      });

      it("should render the pagination", async () => {
        expect(
          screen.queryByRole("button", { name: "0" })
        ).not.toBeInTheDocument();
        ["1", "2", "3", "4", "5"].forEach((page) =>
          expect(
            screen.queryByRole("button", { name: page })
          ).toBeInTheDocument()
        );
        expect(
          screen.queryByRole("button", { name: "6" })
        ).not.toBeInTheDocument();
      });

      it("should render the rows after pagination", async () => {
        await screen.getByRole("button", { name: "2" }).click();
        [
          [3, "test-data-3"],
          [4, "test-data-4"],
        ].forEach((row) => {
          row.forEach(async (value) => {
            await waitFor(() =>
              expect(screen.getByText(value)).toBeInTheDocument()
            );
          });
        });
      });

      it("should render the pagination info", () => {
        expect(screen.getByText("Showing 1 to 2 of 9")).toBeInTheDocument();
      });
    });

    describe("custom render values", () => {
      beforeEach(() => {
        render(
          <SpenditTable<Data>
            schema={{
              ...schema,
              id: {
                label: "id",
                renderHead(value: string) {
                  return <span>{value.toUpperCase()}</span>;
                },
                renderCell(value: number) {
                  return <span>ID:{value}</span>;
                },
              },
            }}
            data={data}
            pageSize={2}
            currentPage={1}
            pagerPageDistance={1}
            infoText="from: %from% to: %to% total: %total%"
          />
        );
      });

      it("should render the custom ID heading", async () => {
        expect(screen.getByText("ID")).toBeInTheDocument();
      });

      it("should render the custom ID rows", async () => {
        expect(screen.getByText("ID:3")).toBeInTheDocument();
        expect(screen.getByText("ID:4")).toBeInTheDocument();
      });

      it("should render the pagination", async () => {
        expect(
          screen.queryByRole("button", { name: "0" })
        ).not.toBeInTheDocument();
        ["1", "2", "3"].forEach((page) =>
          expect(
            screen.queryByRole("button", { name: page })
          ).toBeInTheDocument()
        );
        expect(
          screen.queryByRole("button", { name: "4" })
        ).not.toBeInTheDocument();
      });

      it("should render the custom pagination info", () => {
        expect(screen.getByText("from: 3 to: 4 total: 9")).toBeInTheDocument();
      });
    });
  });

  describe("async data rendering", () => {
    beforeEach(() => {
      loadData = Promise.resolve(data);
      render(
        <SpenditTable<Data>
          schema={schema}
          data={loadData}
          pageSize={2}
          currentPage={0}
        />
      );
    });

    it("should render the rows", async () => {
      [
        [1, "test-data-1"],
        [2, "test-data-2"],
      ].forEach((row) => {
        row.forEach(async (value) => {
          await waitFor(() =>
            expect(screen.getByText(value)).toBeInTheDocument()
          );
        });
      });
    });

    it("should render the rows after pagination", async () => {
      await screen.getByRole("button", { name: "2" }).click();
      [[789, "test-data-3"]].forEach((row) => {
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
      render(
        <SpenditTable<Data>
          schema={schema}
          pageSize={2}
          currentPage={0}
          loadPage={loadPage}
        />
      );
    });

    it("should render the rows", async () => {
      expect(loadPage).toHaveBeenCalledWith(0, 2);

      [
        [1, "test-data-1"],
        [2, "test-data-2"],
      ].forEach((row) => {
        row.forEach(async (value) => {
          await waitFor(() =>
            expect(screen.getByText(value)).toBeInTheDocument()
          );
        });
      });
    });

    it("should render the rows after pagination", async () => {
      await screen.getByRole("button", { name: "2" }).click();
      expect(loadPage).toHaveBeenCalledWith(1, 2);
      [[789, "test-data-3"]].forEach((row) => {
        row.forEach(async (value) => {
          await waitFor(() =>
            expect(screen.getByText(value)).toBeInTheDocument()
          );
        });
      });
    });
  });

  describe("selection", () => {
    let onSelectionChange: Mock;
    beforeEach(() => {
      onSelectionChange = vi.fn();
      render(
        <SpenditTable
          schema={schema}
          data={data}
          pageSize={2}
          selectable
          onSelectionChange={onSelectionChange}
          currentPage={0}
        />
      );
    });

    it("should select all", async () => {
      const all = screen.getByTitle("Select all");
      await all.click();
      expect(onSelectionChange).toHaveBeenLastCalledWith([data[0], data[1]]);
    });

    it("should deselect all", async () => {
      const all = screen.getByTitle("Select all");
      await all.click();
      await all.click();
      expect(onSelectionChange).toHaveBeenLastCalledWith([]);
    });

    it("should select one row", async () => {
      const all = screen.getByTitle("Select row #1");
      await all.click();
      expect(onSelectionChange).toHaveBeenLastCalledWith([data[0]]);
    });
  });
});
