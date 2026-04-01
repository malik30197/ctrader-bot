const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// 🔴 YAHAN CHANGE KARNA HAI
const CTRADER_ACCESS_TOKEN = "T-rS9o_ofkEneAbW5ze5s7yYI7GAr3JLP2tIxrS9qKI";
const ACCOUNT_ID = "46801974";

// ===== TRADE OPEN =====
app.post("/trade", async (req, res) => {
  const data = req.body;

  console.log("Signal:", data);

  try {
    if (data.type === "OPEN") {

      await axios.post(
        "https://openapi.ctrader.com/tradingaccounts/" + ACCOUNT_ID + "/orders",
        {
          symbolName: data.symbol,
          tradeSide: data.action === "BUY" ? "Buy" : "Sell",
          volume: data.lot * 100000,
          stopLoss: data.sl,
          takeProfit: data.tp
        },
        {
          headers: {
            Authorization: "Bearer " + CTRADER_ACCESS_TOKEN,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Trade Opened");
    }

    res.send("OK");

  } catch (err) {
    console.log("Error:", err.response?.data || err.message);
    res.send("Error");
  }
});

// SERVER START
app.listen(3000, () => console.log("Bot running"));
