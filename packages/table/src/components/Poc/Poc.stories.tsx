import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import Poc from "./Poc";

const meta: ComponentMeta<typeof Poc> = {
  title: "Design System/Poc",
  component: Poc,
};
export default meta;

export const Primary: ComponentStoryObj<typeof Poc> = {
  args: {
    children: "Hello",
  },
};
