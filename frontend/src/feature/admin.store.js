import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../constant";

const initialState = {
  allUsers: [],
  allSellers: [],
  allProducts: [],
  allOrders: [],
  allFilterData: {},
  topUsers: [],
  topSeller: [],
};

export const getAllUsersData = createAsyncThunk(
  "admin/getAllUsersData",
  async () => {
    console.log("this");
    const responce = await axios.get(`${baseURL}/admin-dashboard/users`);

    console.log(responce.data);
    return responce.data;
  }
);

export const getTopUsersData = createAsyncThunk(
  "admin/getTopUsersData",
  async () => {
    const responce = await axios.get(
      `${baseURL}/admin-dashboard/topusersbyorder`
    );

    console.log("This is top Users: ", responce.data);
    return responce.data;
  }
);

export const getAllSellersData = createAsyncThunk(
  "admin/getAllSellersData",
  async () => {
    console.log("This");
    const responce = await axios.get(`${baseURL}/admin-dashboard/seller`);

    console.log(responce.data);
    return responce.data;
  }
);

export const getTopSellerData = createAsyncThunk(
  "admin/getTopSellerData",
  async () => {
    const responce = await axios.get(
      `${baseURL}/admin-dashboard/topsellerbyamount`
    );

    console.log("This is top Seller: ", responce.data);
    return responce.data;
  }
);

export const getAllProductsDetails = createAsyncThunk(
  "admin/getAllProductsDetails",
  async () => {
    console.log("This");
    const response = await axios.get(`${baseURL}/admin-dashboard/allproducts`);
    console.log(response.data);
    return response.data;
  }
);

export const getAllOrdersDetails = createAsyncThunk(
  "admin/getAllOrdersDetails",
  async () => {
    console.log("This");
    const response = await axios.get(`${baseURL}/admin-dashboard/allorders`);
    console.log(response.data);
    return response.data;
  }
);

export const getFilterDetails = createAsyncThunk(
  "admin/getFilterDetails",
  async () => {
    console.log("This filter");
    const response = await axios.get(`${baseURL}/admin-dashboard/allfilter`);

    console.log(response.data);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id) => {
    console.log(id);
    const response = await axios.delete(`${baseURL}/products/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const deleteUserForAdmin = createAsyncThunk(
  "admin/deleteUserForAdmin",
  async ({ token, userid }) => {
    try {
      console.log(`Token: ${token}, User Id: ${userid}`);
      const response = await axios.delete(
        `${baseURL}/admin-dashboard/deleteuser`,
        {
          data: { userid },
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

export const deleteSellerForAdmin = createAsyncThunk(
  "admin/deleteSellerForAdmin",
  async ({ token, sellerid }) => {
    try {
      const response = await axios.delete(
        `${baseURL}/admin-dashboard/deleteseller`,
        {
          data: { sellerid },
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

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersData.pending, (state, action) => {})
      .addCase(getAllUsersData.fulfilled, (state, action) => {
        state.allUsers = action.payload?.data?.responceData;
        console.log(state.allUsers);
      })
      .addCase(getAllUsersData.rejected, (state, action) => {})

      .addCase(getTopUsersData.pending, (state, action) => {})
      .addCase(getTopUsersData.fulfilled, (state, action) => {
        state.topUsers = action.payload?.data?.responceData;
        console.log(state.topUsers);
      })
      .addCase(getTopUsersData.rejected, (state, action) => {})

      .addCase(getAllSellersData.pending, (state, action) => {})
      .addCase(getAllSellersData.fulfilled, (state, action) => {
        state.allSellers = action.payload?.data?.responceData;
        console.log(state.allSellers);
      })
      .addCase(getAllSellersData.rejected, (state, action) => {})

      .addCase(getTopSellerData.pending, (state, action) => {})
      .addCase(getTopSellerData.fulfilled, (state, action) => {
        state.topSeller = action.payload?.data?.responceData;
        console.log(state.topSeller);
      })
      .addCase(getTopSellerData.rejected, (state, action) => {})

      .addCase(getAllProductsDetails.pending, (state, action) => {})
      .addCase(getAllProductsDetails.fulfilled, (state, action) => {
        state.allProducts = action.payload?.data?.responceData;
        console.log(state.allProducts);
      })
      .addCase(getAllProductsDetails.rejected, (state, action) => {})

      .addCase(getAllOrdersDetails.pending, (state, action) => {})
      .addCase(getAllOrdersDetails.fulfilled, (state, action) => {
        state.allOrders = action.payload?.data?.responceData;
        console.log(state.allOrders);
      })
      .addCase(getAllOrdersDetails.rejected, (state, action) => {})

      .addCase(getFilterDetails.pending, (state, action) => {})
      .addCase(getFilterDetails.fulfilled, (state, action) => {
        state.allFilterData = action.payload?.data?.responceData;
        console.log(state.allFilterData);
      })
      .addCase(getFilterDetails.rejected, (state, action) => {})

      .addCase(deleteProduct.pending, (state, action) => {})
      .addCase(deleteProduct.fulfilled, (state, action) => {})
      .addCase(deleteProduct.rejected, (state, action) => {})

      .addCase(deleteUserForAdmin.pending, (state, action) => {})
      .addCase(deleteUserForAdmin.fulfilled, (state, action) => {})
      .addCase(deleteUserForAdmin.rejected, (state, action) => {})

      .addCase(deleteSellerForAdmin.pending, (state, action) => {})
      .addCase(deleteSellerForAdmin.fulfilled, (state, action) => {})
      .addCase(deleteSellerForAdmin.rejected, (state, action) => {});
  },
});

export const adminReducer = adminSlice.reducer;
