import { ComponentMeta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ComponentProps } from "react";
import GlobalStyle from "../GlobalStyle";
import Pagination from "./Pagination";

const meta: ComponentMeta<typeof Pagination> = {
  title: "Design System/Pagination",
  component: Pagination,
  argTypes: {
    onPageChange: action("onPageChange"),
  },
};
export default meta;

const Template: Story<ComponentProps<typeof Pagination>> = (args) => (
  <GlobalStyle>
    <Pagination {...args} />
  </GlobalStyle>
);

export const Default = Template.bind({});
Default.args = {
  currentPage: 15,
  pageSize: 10,
  total: 295,
};

export const FistPage = Template.bind({});
FistPage.args = {
  currentPage: 0,
  pageSize: 10,
  total: 295,
};

export const NearBeginning = Template.bind({});
NearBeginning.args = {
  currentPage: 1,
  pageSize: 10,
  total: 295,
};

export const InTheMiddle = Template.bind({});
InTheMiddle.args = {
  currentPage: 5,
  pageSize: 10,
  total: 295,
};

export const NearEnding = Template.bind({});
NearEnding.args = {
  currentPage: 28,
  pageSize: 10,
  total: 295,
};

export const LastPage = Template.bind({});
LastPage.args = {
  currentPage: 29,
  pageSize: 10,
  total: 295,
};

export const CustomDistance = Template.bind({});
CustomDistance.args = {
  currentPage: 15,
  pageSize: 10,
  total: 295,
  distance: 1,
};
