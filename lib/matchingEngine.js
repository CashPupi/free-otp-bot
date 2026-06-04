let orders = [];

export function addOrder(order) {
  orders.push(order);
  matchOrders();
}

function matchOrders() {
  const buys = orders.filter((o) => o.side === "BUY");
  const sells = orders.filter((o) => o.side === "SELL");

  for (const b of buys) {
    if (b.filled) continue;

    for (const s of sells) {
      if (s.filled) continue;

      if (b.price >= s.price) {
        console.log("TRADE EXECUTED:", b, s);

        b.filled = true;
        s.filled = true;
        break; // one buy matches one sell — stop looking for more sells
      }
    }
  }

  orders = orders.filter((o) => !o.filled);
}
