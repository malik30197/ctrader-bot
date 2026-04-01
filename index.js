const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/trade", (req, res) => {
  const data = req.body;

  console.log("✅ Signal Received:", data);

  // 🔥 अभी सिर्फ log करेंगे (test purpose)
  console.log("👉 TRADE SHOULD OPEN:", data.symbol, data.action);

  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bot running"));
