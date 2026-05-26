# react-liquid-gauge-chart

<p align="center">
  <img src="https://github.com/user-attachments/assets/496aba28-857d-45b5-9709-45ab45b8537e" height="300px" />
</p>

> React liquid(물결) 게이지 차트 컴포넌트 · D3 기반, 커스터마이저블 · React liquid gauge chart component built on D3

[![npm](https://img.shields.io/npm/v/react-liquid-gauge-chart.svg)](https://www.npmjs.com/package/react-liquid-gauge-chart)
[![peer react](https://img.shields.io/badge/react-%5E17%20%7C%7C%20%5E18-61DAFB?logo=react)](https://react.dev)
[![types](https://img.shields.io/badge/types-included-3178C6?logo=typescript&logoColor=white)](#)

## Install

```bash
npm install react-liquid-gauge-chart
# or
yarn add react-liquid-gauge-chart
# or
pnpm add react-liquid-gauge-chart
```

## Quick Example

```tsx
import LiquidChart from "react-liquid-gauge-chart";

export default function Demo() {
  return (
    <LiquidChart
      minValue={0}
      maxValue={1000}
      value={500}
      unit="%"
      waveCount={1.5}
      waveHeight={0.1}
      textSize={0.7}
    />
  );
}
```

## Props

주요 props만 간략히. 전체 타입은 [`src/core/types.ts`](src/core/types.ts) 참고.

| Prop | Type | 설명 |
|------|------|------|
| `value` | `number` | 현재 값 (필수) |
| `minValue` / `maxValue` | `number` | 표시 범위 |
| `unit` | `string?` | 값 뒤에 붙는 단위 (예: `%`, `kWh`) |
| `size` | `number` | 차트 크기 (px) |
| `waveCount` | `number` | 한 화면 안의 파동 개수 |
| `waveHeight` | `number` | 파동 높이 비율 |
| `waveAnimate` | `boolean` | 파동 애니메이션 on/off |
| `waveAnimateTime` | `number` | 파동 한 주기 시간(ms) |
| `waveRise` / `waveRiseTime` | `boolean` / `number` | 값 변화 시 수면이 차오르는 효과 |
| `valueCountUp` | `boolean` | 값 카운트업 애니메이션 |
| `colorRange` | `{ gradient1..4 }` | 값 구간별 그라데이션 색상 |
| `fixedColor` | `string \| ColorSet?` | 고정 색상 (있으면 colorRange 무시) |
| `outerFillGradient` | `ColorSet` | 바깥 영역 그라데이션 |
| `outerSvgPathKey` | `TOuterSvgPathKey` | 바깥 윤곽 SVG 패스 키 |
| `textColor` / `waveTextColor` | `string` | 텍스트 색상 (수면 위/아래) |
| `textSize` / `textVertPosition` | `number` | 텍스트 크기·세로 위치 |
| `format` | `(value) => string \| number` | 값 포맷터 |

## Storybook

로컬에서 모든 props를 컨트롤로 만져볼 수 있습니다.

```bash
pnpm install
pnpm storybook   # http://localhost:6006
```

## Tech Stack

`TypeScript` `React 18` `D3 v7` `Vite` `tsup` `Storybook 8`

UMD + ES module dual build, `.d.ts` 타입 포함.

## Development

```bash
pnpm install
pnpm dev          # vite dev server
pnpm build        # tsc + vite build → dist/
pnpm storybook    # storybook dev
pnpm lint
```
