import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../constant";

const initialState = {
  allProducts: [],
  allOrders: [],
  totalFilters: {},
  deliveryStatus: {},
};

export const getAllSellerProducts = createAsyncThunk(
  "seller/getAllSellerProducts",
  async (sellerId) => {
    const response = await axios.post(
      `${baseURL}/seller-dashboard/products`,
      sellerId
    );

    if (!response.data.success) {
      toast.error("Something went wrong");
      return [];
    }

    toast.success("Data Fetched");
    return response.data;
  }
);

export const addProductForSeller = createAsyncThunk(
  "seller/addProductForSeller",
  async (productData) => {
    const response = await axios.post(`${baseURL}/products`, productData);
    console.log(response.data);
  }
);

export const updateProductForSeller = createAsyncThunk(
  "seller/updateProductForSeller",
  async (productData) => {
    const response = await axios.put(
      `${baseURL}/products/${productData._id}`,
      productData
    );
    console.log(response.data);
  }
);

export const getAllOrdersForSeller = createAsyncThunk(
  "seller/getAllOrdersForSeller",
  async (token) => {
    try {
      console.log("Seller order fetching");
      const response = await axios.get(`${baseURL}/order/sellerorders`, {
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

export const updateOrderStatusForSeller = createAsyncThunk(
  "seller/updateOrderStatusForSeller",
  async ({ token, orderid, status }) => {
    try {
      console.log(orderid, status);
      const response = await axios.put(
        `${baseURL}/order/update`,
        {
          orderid,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getTotalFilterForSeller = createAsyncThunk(
  "seller/",
  async (token) => {
    try {
      const response = await axios.get(
        `${baseURL}/seller-dashboard/totalstock`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getDeliveryStatusForSeller = createAsyncThunk(
  "seller/getDeliveryStatusForSeller",
  async (token) => {
    try {
      const response = await axios.get(
        `${baseURL}/seller-dashboard/deliverystatus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSellerProducts.pending, (state, action) => {})
      .addCase(getAllSellerProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload?.data?.responceData;
      })
      .addCase(getAllSellerProducts.rejected, (state, action) => {})

      .addCase(addProductForSeller.pending, (state, action) => {})
      .addCase(addProductForSeller.fulfilled, (state, action) => {
        console.log("product added");
      })
      .addCase(addProductForSeller.rejected, (state, action) => {})

      .addCase(getAllOrdersForSeller.pending, (state, action) => {})
      .addCase(getAllOrdersForSeller.fulfilled, (state, action) => {
        state.allOrders = action.payload?.data?.responceData || [];
        console.log("This is done");
      })
      .addCase(getAllOrdersForSeller.rejected, (state, action) => {})

      .addCase(getTotalFilterForSeller.pending, (state, action) => {})
      .addCase(getTotalFilterForSeller.fulfilled, (state, action) => {
        state.totalFilters = action.payload?.data?.responceData || {};
        console.log("This is done");
      })
      .addCase(getTotalFilterForSeller.rejected, (state, action) => {})

      .addCase(getDeliveryStatusForSeller.pending, (state, action) => {})
      .addCase(getDeliveryStatusForSeller.fulfilled, (state, action) => {
        state.deliveryStatus = action.payload?.data?.responceData || {};
        console.log("This is done");
      })
      .addCase(getDeliveryStatusForSeller.rejected, (state, action) => {})

      .addCase(updateOrderStatusForSeller.pending, (state, action) => {})
      .addCase(updateOrderStatusForSeller.fulfilled, (state, action) => {})
      .addCase(updateOrderStatusForSeller.rejected, (state, action) => {});
  },
});

export const sellerReducer = sellerSlice.reducer;
