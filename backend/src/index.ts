import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { StockCryptoData } from "./models/StockCryptoData";
import { fetchAndStoreData } from "./poller";
require("dotenv").config();

const app = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

app.use(cors());

const mongodbUri: string = process.env.MONGODB_URI as string;

if (!mongodbUri) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

mongoose
  .connect(mongodbUri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

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
