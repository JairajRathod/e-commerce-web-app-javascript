import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../constant";

const initialState = {
  allOrders: [],
  allCartItems: [],
};

export const getCustomerOrders = createAsyncThunk(
  "customer/getCustomerOrders",
  async (token) => {
    try {
      console.log(token);
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

export const addToCustomerCart = createAsyncThunk(
  "customer/addToCustomerCart",
  async ({ userId, productId }) => {
    try {
      console.log(userId, productId);
      const response = await axios.post(`${baseURL}/cart/add`, {
        userId,
        productId,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeToCustomerCart = createAsyncThunk(
  "customer/removeToCustomerCart",
  async ({ token, productId }) => {
    try {
      console.log(productId);
      const response = await axios.delete(`${baseURL}/cart/delete`, {
        data: {
          productId,
        },
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

export const getCustomerCartData = createAsyncThunk(
  "customer/getCustomerCartData",
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/cart/${id}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerOrders.pending, (state, action) => {})
      .addCase(getCustomerOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload?.data?.responceData;
        console.log(state.allOrders);
      })
      .addCase(getCustomerOrders.rejected, (state, action) => {})

      .addCase(getCustomerCartData.pending, (state, action) => {})
      .addCase(getCustomerCartData.fulfilled, (state, action) => {
        state.allCartItems = action.payload?.data?.responceData;
        console.log(state.allCartItems);
      })
      .addCase(getCustomerCartData.rejected, (state, action) => {});
  },
});

export const customerReducer = customerSlice.reducer;
