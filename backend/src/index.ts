import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { StockCryptoData } from "./models/StockCryptoData";
import { fetchAndStoreData } from "./poller";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  setInterval(fetchAndStoreData, 5000);
});

app.get("/data/:crypto", async (req, res) => {
  try {
    const { crypto } = req.params;
    const data = await StockCryptoData.find({
      [`data.${crypto}`]: { $exists: true },
    })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
