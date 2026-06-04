"use client";

import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function Chart({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    const chart = createChart(ref.current, {
      layout: {
        background: { color: "#0b0e11" },
        textColor: "#d1d4dc",
      },
      width: ref.current.clientWidth,
      height: 400,
    });

    const candleSeries = chart.addCandlestickSeries();

    candleSeries.setData(data);

    return () => chart.remove();
  }, [data]);

  return <div ref={ref} />;
}
