import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Row, Schema } from "../models";
import SpenditTable from "./Table";

const meta: ComponentMeta<typeof SpenditTable> = {
  title: "Design System/SpenditTable",
  component: SpenditTable,
};
export default meta;

const schema: Schema = [
  {
    id: "ID",
    label: "ID",
  },
  {
    id: "FIRSTNAME",
    label: "First name",
  },
  {
    id: "LASTNAME",
    label: "Last name",
  },
  {
    id: "AGE",
    label: "Age",
    render(value: number) {
      return <div style={{ textAlign: "right" }}>{value}</div>;
    },
  },
  {
    id: "COUNTRY",
    label: "Country",
  },
];

const total = 300;
const pageSize = 10;
const currentPage = 0;

const data: Row[] = Array.from(new Array(total)).map((_, idx) => [
  idx + 1,
  faker.name.firstName(),
  faker.name.lastName(),
  parseInt(faker.random.numeric(2), 10),
  faker.address.country(),
]);

console.log(data);

export const Default: ComponentStoryObj<typeof SpenditTable> = {
  args: {
    schema,
    data,
    currentPage,
    pageSize,
    total,
  },
};

export const Async: ComponentStoryObj<typeof SpenditTable> = {
  args: {
    schema,
    data: [],
    currentPage,
    pageSize,
    total,
    loadData: () => Promise.resolve({ total, data }),
  },
};

export const AsyncPage: ComponentStoryObj<typeof SpenditTable> = {
  args: {
    schema,
    data: [],
    currentPage,
    pageSize,
    total,
    loadPage: (page: number, pageSize: number) => {
      return Promise.resolve({
        total: 3,
        data: data.slice(page * pageSize, (page + 1) * pageSize),
      });
    },
  },
};
