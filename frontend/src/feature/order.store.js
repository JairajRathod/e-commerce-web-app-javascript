import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../constant";

const initialState = {
  customerAllOrders: [],
  sellerAllOrder: [],
};

export const addCustomerOrder = createAsyncThunk(
  "order/addCustomerOrder",
  async ({
    token,
    productId,
    quantity,
    subtotal,
    total,
    address,
    paymenttype,
  }) => {
    try {
      const response = await axios.post(
        `${baseURL}/order/add`,
        {
          productId,
          quantity,
          subtotal,
          total,
          address,
          paymenttype,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.data?.success) toast.success("Product Buyed");
    } catch (err) {
      console.log(err);
    }
  }
);

export const getCustomerOrders = createAsyncThunk(
  "order/getCustomerOrders",
  async (token) => {
    try {
      const response = await axios.get(`${baseURL}/order/userorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCustomerOrder.pending, (state, action) => {})
      .addCase(addCustomerOrder.fulfilled, (state, action) => {})
      .addCase(addCustomerOrder.rejected, (state, action) => {})

      .addCase(getCustomerOrders.pending, (state, action) => {})
      .addCase(getCustomerOrders.fulfilled, (state, action) => {
        state.customerAllOrders = action.payload?.data?.responceData;
        console.log(state.customerAllOrders);
      })
      .addCase(getCustomerOrders.rejected, (state, action) => {});
  },
});

export const orderReducer = orderSlice.reducer;
