import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import type { Schema } from "../../models";
import SpenditTable from "./SpenditTable";
import { action } from "@storybook/addon-actions";

type Data = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  country: string;
};

const meta: ComponentMeta<typeof SpenditTable> = {
  title: "Design System/SpenditTable",
  component: SpenditTable,
  argTypes: {
    onSelectionChange: action("onSelectionChange"),
  },
};
export default meta;

const schema: Schema<Data> = {
  id: { label: "ID" },
  firstName: { label: "First Name" },
  lastName: { label: "Last Name" },
  age: {
    label: "Age",
    renderHead(value: string) {
      // eslint-disable-next-line prettier/prettier
      return <div style={{ textAlign: "right" }}>{value}</div>;
    },
    renderCell(value: number) {
      return <div style={{ textAlign: "right" }}>{value}</div>;
    },
  },
  country: { label: "Country" },
};

const total = 75;
const pageSize = 10;
const currentPage = 0;
const selectable = true;

const data = Array.from(new Array(total)).map((_, idx) => ({
  id: idx + 1,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: parseInt(faker.random.numeric(2), 10),
  country: faker.address.country(),
}));

export const Default: ComponentStoryObj<typeof SpenditTable<Data>> = {
  args: {
    schema,
    data,
    currentPage,
    pageSize,
    selectable,
  },
};

export const NonSelectable: ComponentStoryObj<typeof SpenditTable<Data>> = {
  args: {
    schema,
    data,
    currentPage,
    pageSize,
    selectable: false,
  },
};

export const Async: ComponentStoryObj<typeof SpenditTable<Data>> = {
  args: {
    schema,
    data: new Promise((resolve) => {
      setTimeout(() => resolve(data), 3000);
    }),
    currentPage,
    pageSize,
    selectable,
  },
};

export const AsyncPage: ComponentStoryObj<typeof SpenditTable<Data>> = {
  args: {
    schema,
    currentPage,
    pageSize,
    selectable,
    loadPage: (page: number, pageSize: number) => {
      return new Promise((resolve) => {
        setTimeout(
          () =>
            resolve({
              total,
              data: data.slice(page * pageSize, (page + 1) * pageSize),
            }),
          3000
        );
      });
    },
  },
};

export const CustomPageDistance: ComponentStoryObj<typeof SpenditTable<Data>> = {
  args: {
    schema,
    data,
    currentPage: 3,
    pageSize,
    selectable,
    pagerPageDistance: 1,
  },
};

export const AsyncError: ComponentStoryObj<typeof SpenditTable<Data>> = {
  args: {
    schema,
    data: new Promise((_resolve, reject) => {
      setTimeout(() => reject(), 3000);
    }),
    currentPage,
    pageSize,
    selectable,
  },
};

export const AsyncPageError: ComponentStoryObj<typeof SpenditTable<Data>> = {
  args: {
    schema,
    currentPage,
    pageSize,
    selectable,
    loadPage: () => {
      return new Promise((_resolve, reject) => {
        setTimeout(() => reject(), 3000);
      });
    },
  },
};
