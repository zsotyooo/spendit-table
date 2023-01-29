import { Schema, SpenditTable } from "@spendit/table";
import { faker } from "@faker-js/faker";
import "./App.css";
import { useCallback, useMemo, useState } from "react";

function App() {
  type Data = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    country: string;
  };

  const [selectedRows, setSelectedRows] = useState<Data[]>([]);

  const schema = useMemo<Schema<Data>>(
    () => ({
      id: { label: "ID" },
      firstName: { label: "First Name" },
      lastName: { label: "Last Name" },
      age: {
        label: "Age",
        renderHead(value: string) {
          return <div style={{ textAlign: "right" }}>{value}</div>;
        },
        renderCell(value: number) {
          return <div style={{ textAlign: "right" }}>{value}</div>;
        },
      },
      country: { label: "Country" },
    }),
    []
  );

  const total = useMemo(() => 295, []);
  const pageSize = useMemo(() => 10, []);
  const currentPage = useMemo(() => 0, []);
  const selectable = useMemo(() => true, []);

  const data = useMemo<Data[]>(
    () =>
      // Creates 295 rows
      Array.from(new Array(total)).map((_, idx) => ({
        id: idx + 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: parseInt(faker.random.numeric(2), 10),
        country: faker.address.country(),
      })),
    []
  );

  const onSelectionChange = useCallback((rows: Data[]) => {
    setSelectedRows(rows);
  }, []);
  return (
    <div className="App">
      <h1>Spendit table</h1>
      <div>
        <SpenditTable<Data>
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
        <span>{selectedRows.map((row) => row.firstName).join(", ")}</span>
      </div>
    </div>
  );
}

export default App;
