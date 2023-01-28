import { SpenditTable, Row } from "@spendit/table";
import { faker } from "@faker-js/faker";
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
        id: "firstName",
        label: "First name",
      },
      {
        id: "lastName",
        label: "Last name",
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
      {
        id: "Country",
        label: "Country",
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
        faker.name.firstName(),
        faker.name.lastName(),
        parseInt(faker.random.numeric(2), 10),
        faker.address.country(),
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
