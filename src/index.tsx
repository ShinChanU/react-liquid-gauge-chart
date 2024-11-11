import { useEffect, useId, useMemo, useRef } from "react";
import { LIQUID_DEFAULT_VALUE, loadLiquidChart, TLiquidChart } from "./core";

type TProps = {
  value: number;
} & Partial<TLiquidChart>;

const LiquidChart = ({ value, ...configProps }: TProps) => {
  const elementId = useId();

  const gaugeRef = useRef<SVGSVGElement>(null);
  const gaugeConfig = useMemo(
    () => ({ ...LIQUID_DEFAULT_VALUE, ...configProps }),
    [configProps]
  );

  useEffect(() => {
    if (gaugeRef.current) {
      loadLiquidChart({
        value,
        config: gaugeConfig,
        element: gaugeRef.current,
      }); // 게이지 로드 함수 호출
    }
  }, [gaugeConfig, value]);

  return (
    <svg
      id={elementId}
      style={{
        height: `${gaugeConfig.size}px`,
        width: `${gaugeConfig.size}px`,
      }}
      ref={gaugeRef}
      viewBox={"0 0 48 48"}
    />
  );
};

export default LiquidChart;
