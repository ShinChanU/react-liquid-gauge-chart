import { LIQUID_SVG_PATH } from "./constants";

type TLiquidColorSet = { end: string; start: string };

export type TOuterSvgPathKey = keyof typeof LIQUID_SVG_PATH;

export type TLiquidChart = {
  colorRange: {
    gradient1: TLiquidColorSet;
    gradient2: TLiquidColorSet;
    gradient3: TLiquidColorSet;
    gradient4: TLiquidColorSet;
  };
  fixedColor?: string | TLiquidColorSet;
  maxValue: number;
  minValue: number;
  outerFillGradient: TLiquidColorSet;
  outerSvgPathKey: TOuterSvgPathKey;
  textColor: string;
  textSize: number;
  textVertPosition: number;
  unit?: string;
  valueCountUp: boolean;
  waveAnimate: boolean;
  waveAnimateTime: number;
  waveCount: number;
  waveHeight: number;
  waveHeightScaling: boolean;
  waveOffset: number;
  waveRise: boolean;
  waveRiseTime: number;
  waveTextColor: string;
  size: number;
};
