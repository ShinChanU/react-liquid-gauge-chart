import { TLiquidChart } from "./types";

// 기본 셋팅
export const LIQUID_DEFAULT_VALUE = {
  minValue: 0, // 게이지의 최소값
  maxValue: 100, // 게이지의 최대값
  waveHeight: 0.1, // 파동 원의 높이 (반지름의 백분율)
  waveCount: 1, // 파동 원의 너비당 전체 파동의 개수
  waveRiseTime: 1000, // 파동이 0에서 최종 높이까지 상승하는 시간 (밀리초)
  waveAnimateTime: 5000, // 전체 파동이 파동 원에 들어가는 시간 (밀리초)
  waveRise: true, // 파동이 0에서 최종 높이까지 상승할지 또는 처음부터 최종 높이에 있을지 제어
  waveHeightScaling: true, // 낮은 채우기 비율과 높은 채우기 비율에서 파동 크기 스케일링 제어
  waveAnimate: true, // 파동이 스크롤될지 또는 정적일지 제어
  waveOffset: 0, // 파동의 초기 오프셋 양 (0 = 오프셋 없음, 1 = 전체 파동 오프셋)
  textVertPosition: 0.5, // 파동 원 내에서 백분율 텍스트의 높이 (0 = 하단, 1 = 상단)
  textSize: 1, // 파동 원 내 텍스트의 상대적 높이 (1 = 50%)
  valueCountUp: true, // true일 경우, 로딩 시 표시된 값이 0에서 최종 값으로 카운트됨. false일 경우, 최종 값이 바로 표시됨
  textColor: "#fff", // 파동이 텍스트를 덮지 않을 때 값 텍스트의 색상
  waveTextColor: "#fff", // 파동이 텍스트를 덮을 때 값 텍스트의 색상
  outerFillGradient: { start: "#0B84A5", end: "#083D77" }, // 파동이 덮지 않은 부분의 색상 추가
  colorRange: {
    gradient1: { start: "#90BE6D", end: "#43AA8B" },
    gradient2: { start: "#4CC9F0", end: "#4361EE" },
    gradient3: { start: "#FFCA3A", end: "#F9A620" },
    gradient4: { start: "#FF5A5F", end: "#D7263D" },
  },
  outerSvgPathKey: "water_drop",
  size: 300, // square Container, width and height (px)
} as const satisfies TLiquidChart;

export const LIQUID_SVG_PATH = {
  water_drop:
    "M24 47C18.6957 47 13.6086 45.0614 9.85786 41.6108C6.10714 38.1601 4 33.48 4 28.6C4 20.5454 10.775 14.1031 16.7325 8.199L24 1L31.2675 8.199C37.225 14.1054 44 20.5477 44 28.6C44 33.48 41.8929 38.1601 38.1421 41.6108C34.3914 45.0614 29.3043 47 24 47Z",
} as const;
