import express from "express";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";
import { addOrder } from "../lib/matchingEngine.js";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let price = 40000;

// 📊 Market Feed
setInterval(() => {
  price = 40000 + Math.random() * 2000;

  wss.clients.forEach((ws) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(
        JSON.stringify({
          type: "price",
          symbol: "BTCUSDT",
          price,
        })
      );
    }
  });
}, 1000);

// 💱 Place Order
app.post("/api/order", (req, res) => {
  const order = req.body;

  if (!order || !order.side || !order.price || !order.amount) {
    return res.status(400).json({ error: "Missing required order fields: side, price, amount" });
  }

  addOrder(order);
  res.json({ status: "accepted", order });
});

// 📊 Get price
app.get("/api/price", (req, res) => {
  res.json({ price });
});

server.listen(4000, () => console.log("API running on 4000"));
