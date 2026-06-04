"use client";

import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function Chart({ data }) {
  const ref = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    chartRef.current = createChart(ref.current, {
      layout: {
        background: { color: "#0b0e11" },
        textColor: "#d1d4dc",
      },
      width: ref.current.clientWidth,
      height: 400,
    });

    seriesRef.current = chartRef.current.addCandlestickSeries();

    return () => {
      chartRef.current.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current) {
      seriesRef.current.setData(data);
    }
  }, [data]);

  return <div ref={ref} role="img" aria-label="Candlestick chart" />;
}
