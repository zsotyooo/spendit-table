# SpendIt Table

It's a coding challenge task for SpendIt.

## Start

You need yarn and node 16.

Install:
```bash
> yarn
```

Build:
```
> yarn build
```

Start storybook and playground:
```
> yarn dev
```

## SpenditTable Component

It's a React component that renders a table with pagination.

### Example usage:

Component:

```js
import { SpenditTable, Row } from "@spendit/table";
import "./App.css";
import { useCallback, useMemo, useState } from "react";

function App() {
  const [selectedRows, setSelectedRows] = useState<Row[]>([]);

  const schema = useMemo(
    () => [
      {
        id: "id",
        label: "ID",
      },
      {
        id: "name",
        label: "Name",
      },
      {
        id: "Age",
        label: "Age",
        renderHead(value: string) {
          return <div style={{ textAlign: "right" }}>{value}</div>;
        },
        render(value: number) {
          return <div style={{ textAlign: "right" }}>{value}</div>;
        },
      },
    ],
    []
  );
  const total = useMemo(() => 295, []);
  const pageSize = useMemo(() => 10, []);
  const currentPage = useMemo(() => 0, []);
  const selectable = useMemo(() => true, []);

  const data = useMemo<Row[]>(
    () =>
      // Creates 295 rows
      Array.from(new Array(total)).map((_, idx) => [
        idx + 1,
        `Name ${idx + 1}`,
        idx + 10,
      ]),
    []
  );

  const onSelectionChange = useCallback((rows: Row[]) => {
    setSelectedRows(rows);
  }, []);
  return (
    <div className="App">
      <h1>Spendit table</h1>
      <div>
        <SpenditTable
          schema={schema}
          data={data}
          currentPage={currentPage}
          pageSize={pageSize}
          selectable={selectable}
          onSelectionChange={onSelectionChange}
        />
      </div>
      <div>
        <strong>Selected items: </strong>
        <br />
        <span>{selectedRows.map((row) => row[1]).join(", ")}</span>
      </div>
    </div>
  );
}

export default App;
```

Change styles:
```css
.spendit-table {
  --spt-border-color: #d6d3d1;
  --spt-text-color: #1c1917;
  --spt-cell-padding: 0.5rem 0.75rem;
  --spt-pagination-padding: 0.5rem 0;
  --spt-pagination-button-padding: 0.25rem 0.5rem;
  --spt-pagination-button-margin: 0 0.125rem;
  --spt-pagination-button-text-color: #1c1917;
  --spt-pagination-button-background: #d6d3d1;
  --spt-pagination-button-text-color-hover: #1c1917;
  --spt-pagination-button-background-hover: #a8a29e;
  --spt-pagination-current-button-text-color: #ffffff;
  --spt-pagination-current-button-background: #0ea5e9;
  --spt-checkbox-accent-color: #0ea5e9;
}
```

### Modes

- **Synchronous mode:** Pass all the data to the `data` property.
- **Asynchronous mode:** Pass a `Promise` that resolves all the data to the `data` property.
- **Asynchronous page mode**: It loads the data for the actual page only. Pass a function to the `loadData` property that resolves the page data and the total. E.g.: `(page: number, pageSize: number) => Promise.resolve({rows: [[1, 'a', 'c'], [2, 'e', 'f']], total: 100})`. Use an empty array for the `data` property.

### Properties

- **`{Schema} schema` - The schema of the table.** (see in the example above)
- **`{Row[] | Promise<Row[]>} data` - The data or a promise that resolves the data to display in the table. When provided, do not provide the `pageLoader` property.** E.g.: `[[1, 'a', 'c'], [2, 'e', 'f']]`
- `{(page: number, pageSize: number): Promise<{rows: Row[], total: number}>} loadPage` - A function that takes a page number and page size and returns a promise that resolves to an array of rows and a total. When provided, do not provide the `data` property.
- **`{number} currentPage` - The current page number.**
- **`{number} pageSize` - The number of rows to display per page.**
- `{boolean} selectable` - Whether the rows should be selectable or not.
- `{(rows: Row[]): void} onSelectionChange` - It calls this callback when the user selects or deselects a row.
- `{string} infoText` - A string is displayed as the pagination info. It defaults to "Showing %from% to %to% of %total%".
- `{number} pagerPageDistance` - The number of pages shown after and before the actual page. The difference is added to the opposite side if the distance goes out of range.

## Tech stack
- **Yarn** to handle the workspaces and the hoisting of the packages.
- **turbo** to speed up the build time.
- **React 18**
- **Styled components** to ship the component library together with the styles.
- **Storybook** for the style-guide (and style-guide-driven development)
- **Vite** for fast bundling.
- **Vitest** for unit testing the main edge cases.
