"use client";
import { useState } from "react";

const inputStyle = {
  width: "100%",
  background: "#1a1d23",
  border: "1px solid #2b2f36",
  color: "#d1d4dc",
  padding: "8px 12px",
  borderRadius: "4px",
  fontSize: "14px",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  marginBottom: "4px",
  fontSize: "12px",
  color: "#848e9c",
};

export default function TradePanel({ onTrade }) {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const total = (parseFloat(price) * parseFloat(amount) || 0).toFixed(2);

  function handleTrade(side) {
    if (!amount || !price) return;
    onTrade?.({ side, amount: parseFloat(amount), price: parseFloat(price) });
  }

  return (
    <div
      style={{
        background: "#0b0e11",
        color: "#d1d4dc",
        padding: "16px",
        borderRadius: "4px",
        fontFamily: "monospace",
        maxWidth: "320px",
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <label style={labelStyle}>Price</label>
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={labelStyle}>Amount</label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "16px", fontSize: "12px", color: "#848e9c" }}>
        Total:{" "}
        <span style={{ color: "#d1d4dc" }}>{total}</span>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => handleTrade("buy")}
          style={{
            flex: 1,
            padding: "10px",
            background: "#0ecb81",
            color: "#0b0e11",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Buy
        </button>
        <button
          onClick={() => handleTrade("sell")}
          style={{
            flex: 1,
            padding: "10px",
            background: "#f6465d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Sell
        </button>
      </div>
    </div>
  );
}
