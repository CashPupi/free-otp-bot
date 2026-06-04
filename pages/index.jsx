"use client";

import { useEffect, useState } from "react";
import Chart from "../components/Chart";
import OrderBook from "../components/OrderBook";
import TradePanel from "../components/TradePanel";

const MOCK_BIDS = [
  ["40400", "0.5"],
  ["40300", "1.2"],
  ["40200", "2.0"],
];

const MOCK_ASKS = [
  ["40500", "0.8"],
  ["40600", "0.3"],
  ["40700", "1.5"],
];

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => [
        ...prev,
        {
          time: Math.floor(Date.now() / 1000),
          open: 40000,
          high: 40500,
          low: 39800,
          close: 40000 + Math.random() * 500,
        },
      ]);
    }, 2000);

    return () => clearInterval(id);
  }, []);

  function handleTrade({ side, amount, price }) {
    console.log("Trade placed:", side, amount, "@", price);
  }

  return (
    <main
      style={{
        background: "#0b0e11",
        minHeight: "100vh",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        fontFamily: "monospace",
      }}
    >
      <Chart data={data} />

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: 2, minWidth: "280px" }}>
          <OrderBook bids={MOCK_BIDS} asks={MOCK_ASKS} />
        </div>
        <div style={{ flex: 1, minWidth: "240px" }}>
          <TradePanel onTrade={handleTrade} />
        </div>
      </div>
    </main>
  );
}
