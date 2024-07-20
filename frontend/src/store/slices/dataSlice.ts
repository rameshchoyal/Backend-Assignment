import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface DataState {
  stockData: any[];
  selectedCrypto: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: DataState = {
  stockData: [],
  selectedCrypto: "bitcoin",
  status: "idle",
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (crypto: string) => {
    const response = await axios.get(`http://localhost:3000/data/${crypto}`);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCrypto(state, action: PayloadAction<string>) {
      state.selectedCrypto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = "succeeded";
        state.stockData = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setCrypto } = dataSlice.actions;
export default dataSlice.reducer;
