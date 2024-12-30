import type { Meta, StoryObj } from "@storybook/react";

import LiquidChart from "..";
import { LIQUID_DEFAULT_VALUE } from "../core";

const meta = {
  title: "LiquidChart",
  component: LiquidChart,
  argTypes: {
    value: {
      control: "number",
    },
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LiquidChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    ...LIQUID_DEFAULT_VALUE,
  },
  decorators: [
    (story) => (
      <div
        style={{
          height: "300px",
          width: "300px",
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export const All = () => {
  return (
    <div>
      <LiquidChart
        waveCount={1.5}
        waveHeight={0.1}
        textSize={0.7}
        value={10}
        unit="%"
      />
      <LiquidChart
        waveAnimateTime={1000}
        waveCount={1.5}
        waveHeight={0.1}
        textSize={0.7}
        value={30}
        unit="kWh"
      />
      <LiquidChart waveCount={1.5} waveHeight={0.1} textSize={0.7} value={60} />
      <LiquidChart waveCount={1.5} waveHeight={0.1} textSize={0.7} value={85} />
      <div>Fixed Color</div>
      <LiquidChart fixedColor={"#123123"} value={50} />
    </div>
  );
};
