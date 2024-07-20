import mongoose, { Document, Schema } from "mongoose";

interface IStockCryptoData extends Document {
  timestamp: Date;
  data: Record<string, any>;
}

const StockCryptoDataSchema: Schema = new Schema({
  timestamp: { type: Date, required: true },
  data: { type: Schema.Types.Mixed, required: true },
});

export const StockCryptoData = mongoose.model<IStockCryptoData>(
  "StockCryptoData",
  StockCryptoDataSchema
);
