import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import type { Row, Schema } from "../../models";
import SpenditTable from "./SpenditTable";
import { action } from "@storybook/addon-actions";

const meta: ComponentMeta<typeof SpenditTable> = {
  title: "Design System/SpenditTable",
  component: SpenditTable,
  argTypes: {
    onSelectionChange: action("onSelectionChange"),
  },
};
export default meta;

const schema: Schema = [
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
];

const total = 75;
const pageSize = 10;
const currentPage = 0;
const selectable = true;

const data: Row[] = Array.from(new Array(total)).map((_, idx) => [
  idx + 1,
  faker.name.firstName(),
  faker.name.lastName(),
  parseInt(faker.random.numeric(2), 10),
  faker.address.country(),
]);

export const Default: ComponentStoryObj<typeof SpenditTable> = {
  args: {
    schema,
    data,
    currentPage,
    pageSize,
    selectable,
  },
};

export const NonSelectable: ComponentStoryObj<typeof SpenditTable> = {
  args: {
    schema,
    data,
    currentPage,
    pageSize,
    selectable: false,
  },
};

export const Async: ComponentStoryObj<typeof SpenditTable> = {
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

export const AsyncPage: ComponentStoryObj<typeof SpenditTable> = {
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

export const CustomPageDistance: ComponentStoryObj<typeof SpenditTable> = {
  args: {
    schema,
    data,
    currentPage: 3,
    pageSize,
    selectable,
    pagerPageDistance: 1,
  },
};

export const AsyncError: ComponentStoryObj<typeof SpenditTable> = {
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

export const AsyncPageError: ComponentStoryObj<typeof SpenditTable> = {
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
