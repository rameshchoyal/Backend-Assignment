import axios from "axios";
import { StockCryptoData } from "./models/StockCryptoData";
import dotenv from "dotenv";
dotenv.config();

const cryptoList = ["bitcoin", "ethereum", "dogecoin", "litecoin", "ripple"];

const apiUrl = process.env.API_BASE_URL;

export const fetchAndStoreData = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/simple/price?ids=${cryptoList.join(",")}&vs_currencies=usd`
    );
    const data = response.data;

    const stockCryptoData = new StockCryptoData({
      // Storing the data in MongoDB
      timestamp: new Date(),
      data,
    });
    await stockCryptoData.save();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
