import * as d3 from "d3";
import { LIQUID_SVG_PATH } from "./constants";
import { THelperParams } from "./THelperParams";

export const loadLiquidChart = ({
  config,
  element,
  value,
  elementId,
}: THelperParams) => {
  d3.select(element).selectAll("g").remove(); // remove before render group

  const gauge = d3.select(element); // 게이지 요소 선택

  const radius = 24; // viewBox 기준으로 반지름 계산
  const locationX = 0; // viewBox가 (0,0)부터 시작하므로 위치 조정 불필요
  const locationY = 0;
  const fillPercent =
    (value - config.minValue) / (config.maxValue - config.minValue); // 채우기 비율 계산 (0에서 1 사이의 값)
  const waveHeightScale = config.waveHeightScaling
    ? d3.scaleLinear().range([0, config.waveHeight, 0]).domain([0, 50, 100])
    : d3
        .scaleLinear()
        .range([config.waveHeight, config.waveHeight])
        .domain([0, 100]);
  const textPixels = (config.textSize * radius) / 2; // 텍스트 크기 설정
  const textFinalValue = Math.round(value); // 최종 값 설정
  const textStartValue = config.valueCountUp ? config.minValue : textFinalValue; // 시작 값 설정
  const unitText = config.unit ?? ""; // 단위 텍스트 설정
  const waveHeight = radius * waveHeightScale(fillPercent * 100); // 파동 높이 계산
  const containerPath = LIQUID_SVG_PATH[config.outerSvgPathKey]; // 컨테이너 svg path (현재는 물방울만)

  // 파동의 길이와 개수 계산
  const waveLength = (radius * 2) / config.waveCount;
  const waveClipCount = 1 + config.waveCount;
  const waveClipWidth = waveLength * waveClipCount;

  // 값을 정수로 표시하는 반올림 함수
  const onFormatValue = (value: number) => {
    if (config.format) {
      return config.format(value);
    }

    return Math.round(value);
  };

  // 클립 파동 영역을 구성하기 위한 데이터
  const data: { x: number; y: number }[] = [];
  for (let i = 0; i <= 40 * waveClipCount; i++) {
    data.push({ x: i / (40 * waveClipCount), y: i / 40 });
  }

  // 클립 경로의 크기를 제어하는 스케일
  const waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
  const waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);

  // 클립 경로의 위치를 제어하는 스케일
  const waveRiseScale = d3
    .scaleLinear()
    .range([radius * 2 + waveHeight, waveHeight])
    .domain([0, 1]);

  const waveAnimateScale = d3
    .scaleLinear()
    .range([0, waveClipWidth - radius * 2]) // 클립 영역을 한 파동 밀고 나서 다시 스냅백
    .domain([0, 1]);

  // 게이지 내 텍스트 위치를 제어하는 스케일
  const textRiseScaleY = d3
    .scaleLinear()
    .range([radius * 2, textPixels * 0.7])
    .domain([0, 1]);

  const createGradientId = (gradientId: string) => {
    return `${gradientId}-${elementId}`;
  };

  //
  // 그라디언트 정의 함수
  const defineGradient = (
    defs: d3.Selection<SVGDefsElement, unknown, HTMLElement, unknown>,
    id: string,
    start: string,
    end: string
  ) => {
    const gradient = defs
      .append("linearGradient")
      .attr("id", createGradientId(id))
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", start);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", end);
  };

  // 색상 선택 함수
  const getColor = (value: number) => {
    if (config.fixedColor) {
      return `url(#${createGradientId("gradient1")})`;
    }
    if (value <= 25) return `url(#${createGradientId("gradient1")})`;
    if (value <= 50) return `url(#${createGradientId("gradient2")})`;
    if (value <= 75) return `url(#${createGradientId("gradient3")})`;
    return `url(#${createGradientId("gradient4")})`;
  };

  // 게이지 그룹 생성
  const gaugeGroup = gauge
    .append("g")
    .attr("transform", `translate(${locationX},${locationY})`);
  const defs = gaugeGroup.append("defs") as unknown as d3.Selection<
    SVGDefsElement,
    unknown,
    HTMLElement,
    unknown
  >;

  // fixed gradient
  if (config.fixedColor) {
    if (typeof config.fixedColor === "string") {
      defineGradient(defs, "gradient1", config.fixedColor, config.fixedColor);
    } else {
      defineGradient(
        defs,
        "gradient1",
        config.fixedColor.start,
        config.fixedColor.end
      );
    }
  } else {
    defineGradient(
      defs,
      "gradient1",
      config.colorRange.gradient1.start,
      config.colorRange.gradient1.end
    );
    defineGradient(
      defs,
      "gradient2",
      config.colorRange.gradient2.start,
      config.colorRange.gradient2.end
    );
    defineGradient(
      defs,
      "gradient3",
      config.colorRange.gradient3.start,
      config.colorRange.gradient3.end
    );
    defineGradient(
      defs,
      "gradient4",
      config.colorRange.gradient4.start,
      config.colorRange.gradient4.end
    );
  }

  defineGradient(
    defs,
    "outerFillGradient",
    config.outerFillGradient.start,
    config.outerFillGradient.end
  );

  //
  // 게이지 외부 물방울 도형 생성
  gaugeGroup
    .append("path")
    .attr("d", containerPath)
    .attr("stroke-width", 1)
    .attr("transform", `translate(${0},${0})`)
    .style("fill", `url(#${createGradientId("outerFillGradient")})`);

  // 텍스트 생성
  const text1 = gaugeGroup
    .append("text")
    .text(textStartValue + unitText)
    .attr("class", "liquidFillGaugeText")
    .attr("text-anchor", "middle")
    .attr("font-size", textPixels + "px")
    .style("fill", config.textColor)
    .attr(
      "transform",
      `translate(${radius},${textRiseScaleY(config.textVertPosition!)})`
    );

  // 클립 영역 생성
  const clipArea = d3
    .area<{ x: number; y: number }>()
    .x((d) => waveScaleX(d.x))
    .y0((d) =>
      waveScaleY(
        Math.sin(
          Math.PI * 2 * config.waveOffset! * -1 +
            Math.PI * 2 * (1 - config.waveCount!) +
            d.y * 2 * Math.PI
        )
      )
    )
    .y1(() => radius * 2 + waveHeight);

  const waveGroup = gaugeGroup
    .append("defs")
    .append("clipPath")
    .attr("id", "clipWave" + element.id);
  const wave = waveGroup
    .append("path")
    .datum(data)
    .attr("d", clipArea)
    .attr("T", 0);

  //
  // 게이지 내부 물방울 파동 도형 생성
  const fillWaveGroup = gaugeGroup
    .append("g")
    .attr("clip-path", "url(#clipWave" + element.id + ")");

  fillWaveGroup
    .append("path")
    .attr("d", containerPath)
    .attr("stroke-width", 1)
    .attr("transform", `translate(${0},${0})`)
    .style("fill", getColor(textFinalValue));

  // 파동 텍스트 생성
  const text2 = fillWaveGroup
    .append("text")
    .text(textStartValue + unitText)
    .attr("class", "liquidFillGaugeText")
    .attr("text-anchor", "middle")
    .attr("font-size", textPixels + "px")
    .style("fill", config.waveTextColor)
    .attr(
      "transform",
      `translate(${radius},${textRiseScaleY(config.textVertPosition!)})`
    );

  // 값 증가 애니메이션 설정
  if (config.valueCountUp) {
    const textTween = function (this: SVGTextElement) {
      const i = d3.interpolate(
        parseFloat(this.textContent!.replace("%", "")),
        textFinalValue
      );
      return function (this: SVGTextElement, t: number) {
        this.textContent = onFormatValue(i(t)) + unitText;
      };
    };
    text1.transition().duration(config.waveRiseTime!).tween("text", textTween);
    text2.transition().duration(config.waveRiseTime!).tween("text", textTween);
  }

  const waveGroupXPosition = radius * 2 - waveClipWidth;

  if (config.waveRise) {
    waveGroup
      .attr("transform", `translate(${waveGroupXPosition},${waveRiseScale(0)})`)
      .transition()
      .duration(config.waveRiseTime!)
      .attr(
        "transform",
        `translate(${waveGroupXPosition},${waveRiseScale(fillPercent)})`
      )
      .on("start", () => {
        wave.attr("transform", "translate(1,0)");
      });
  } else {
    waveGroup.attr(
      "transform",
      `translate(${waveGroupXPosition},${waveRiseScale(fillPercent)})`
    );
    waveGroup.attr(
      "transform",
      `translate(${waveGroupXPosition},${waveRiseScale(fillPercent)})`
    );
  }

  if (config.waveAnimate) animateWave();

  // 파동 애니메이션 함수
  function animateWave() {
    wave.attr(
      "transform",
      `translate(${waveAnimateScale(parseFloat(wave.attr("T")!))},0)`
    );
    wave
      .transition()
      .duration(config.waveAnimateTime! * (1 - Number(wave.attr("T"))))
      .ease(d3.easeLinear)
      .attr("transform", `translate(${waveAnimateScale(1)},0)`)
      .attr("T", 1)
      .on("end", () => {
        wave.attr("T", 0);
        animateWave();
      });
  }
};
