"use client";

export default function OrderBook({ bids, asks }) {
  return (
    <div style={{ display: "flex", gap: "16px", background: "#0b0e11", color: "#d1d4dc", padding: "16px", fontFamily: "monospace" }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ color: "#0ecb81", marginBottom: "8px" }}>Bids</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2b2f36" }}>
              <th style={{ textAlign: "left", padding: "4px 8px" }}>Price</th>
              <th style={{ textAlign: "right", padding: "4px 8px" }}>Size</th>
              <th style={{ textAlign: "right", padding: "4px 8px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {bids.map(([price, size], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #1a1d23" }}>
                <td style={{ textAlign: "left", padding: "4px 8px", color: "#0ecb81" }}>{price}</td>
                <td style={{ textAlign: "right", padding: "4px 8px" }}>{size}</td>
                <td style={{ textAlign: "right", padding: "4px 8px" }}>
                  {(parseFloat(price) * parseFloat(size)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ color: "#f6465d", marginBottom: "8px" }}>Asks</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2b2f36" }}>
              <th style={{ textAlign: "left", padding: "4px 8px" }}>Price</th>
              <th style={{ textAlign: "right", padding: "4px 8px" }}>Size</th>
              <th style={{ textAlign: "right", padding: "4px 8px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {asks.map(([price, size], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #1a1d23" }}>
                <td style={{ textAlign: "left", padding: "4px 8px", color: "#f6465d" }}>{price}</td>
                <td style={{ textAlign: "right", padding: "4px 8px" }}>{size}</td>
                <td style={{ textAlign: "right", padding: "4px 8px" }}>
                  {(parseFloat(price) * parseFloat(size)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
