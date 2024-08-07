import { createAppAsyncThunk } from "@/libs/redux/createAppAsyncThunk";

export const incrementAsync = createAppAsyncThunk(
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);