import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../constant";

const initialState = {
  currentUser: {},
  userExist: false,
  tokenDetails: "",
  forgotemail: "",
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email }) => {
    console.log(email);
    const response = await axios.post(`${baseURL}/register`, {
      email,
    });
    if (!response.data.success)
      return toast.error(response.error.detailMessage);
    toast.success("OTP Sended");
    return response.data;
  }
);

export const getOtpVerification = createAsyncThunk(
  "user/getOtpVerification",
  async (data) => {
    console.log(data);
    const response = await axios.post(`${baseURL}/otp`, data);
    console.log(response.data);
    // if (!response.success) return toast.error(response.error.detailMessage);
    if (response.data.success) {
      toast.success("User Verified");
      return response.data;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (details, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/login`, details);
      const data = response.data;

      if (!data.success) {
        toast.error(data.error?.detailMessage || "Login failed");
        return rejectWithValue(data);
      }

      toast.success("Logged in successfully");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.error?.detailMessage || "Something went wrong"
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email) => {
    const response = await axios.post(`${baseURL}/forgotpassword`, {
      email,
    });
    // console.log(response.data);
    if (!response.data?.success)
      return toast.error(response.data?.detailMessage);

    toast.success("OTP sended");
    return { data: response.data, email };
  }
);

export const forgotPasswordOtpVerification = createAsyncThunk(
  "user/forgotPasswordOtpVerification",
  async ({ email, otp }) => {
    const response = await axios.post(`${baseURL}/verificationforgotpassword`, {
      email,
      otp,
    });
    // console.log(response.data);
    if (!response.data?.success)
      return toast.error(response.data?.detailMessage);

    toast.success("OTP verification complete");
    return response.data;
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ email, password }) => {
    // console.log(email, password);
    const response = await axios.post(`${baseURL}/resetPassword`, {
      email,
      password,
    });
    // console.log(response.data);
    if (!response.data?.success)
      return toast.error(response.data?.detailMessage);

    toast.success("Password Updated");
    return response.data;
  }
);

export const updateProfileDetails = createAsyncThunk(
  "user/updateProfileDetails",
  async ({ token, fullname, phone }) => {
    // console.log(token, fullname, phone);
    const response = await axios.put(
      `${baseURL}/update`,
      {
        fullname,
        phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.success) {
      toast.error("Something went wrong");
      return [];
    }

    toast.success("Profile detaild Update");
    return response.data;
  }
);

export const tokenVerfication = createAsyncThunk(
  "user/tokenVerfication",
  async () => {
    const token = getFromLocalStorage();
    // console.log(token);
    if (!token) return null;
    try {
      const response = await axios.post(`${baseURL}/tokenverification`, {
        token: token,
      });
      // console.log(response.data);
      return { token, data: response?.data };
    } catch (err) {
      toast.error(err);
      return "";
    }
  }
);

function setToLocalStorage(token) {
  const storedToken = localStorage.setItem("token", token);
  console.log(storedToken);
}

function getFromLocalStorage() {
  const storedToken = localStorage.getItem("token");
  console.log(storedToken);
  return storedToken;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getToken: (state, action) => {
      const token = getFromLocalStorage();
      state.tokenDetails = token;
      state.userExist = true;
    },

    logoutUser: (state, action) => {
      setToLocalStorage("");
      state.currentUser = {};
      state.userExist = false;
      state.tokenDetails = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {})
      .addCase(registerUser.fulfilled, (state, action) => {})
      .addCase(registerUser.rejected, (state, action) => {})

      .addCase(loginUser.pending, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.tokenDetails = action?.payload?.data?.responceData?.token;
        state.currentUser = action?.payload?.data?.responceData?.userDetails;
        state.userExist = true;
        console.log(action?.payload?.data?.responceData?.token);
        setToLocalStorage(action?.payload?.data?.responceData?.token);
        toast.success("Login Success");
      })
      .addCase(loginUser.rejected, (state, action) => {})

      .addCase(getOtpVerification.pending, (state, action) => {})
      .addCase(getOtpVerification.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getOtpVerification.rejected, (state, action) => {})

      .addCase(tokenVerfication.pending, (state, action) => {})
      .addCase(tokenVerfication.fulfilled, (state, action) => {
        state.tokenDetails = action.payload?.token || "";
        state.userExist = true;
        state.currentUser = action.payload?.data?.data?.responceData || {};
      })
      .addCase(tokenVerfication.rejected, (state, action) => {
        console.log(action.payload);
      })

      .addCase(updateProfileDetails.pending, (state, action) => {})
      .addCase(updateProfileDetails.fulfilled, (state, action) => {})
      .addCase(updateProfileDetails.rejected, (state, action) => {})

      .addCase(forgotPassword.pending, (state, action) => {})
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotemail = action.payload.email;
        console.log(state.forgotemail);
      })
      .addCase(forgotPassword.rejected, (state, action) => {})

      .addCase(forgotPasswordOtpVerification.pending, (state, action) => {})
      .addCase(forgotPasswordOtpVerification.fulfilled, (state, action) => {})
      .addCase(forgotPasswordOtpVerification.rejected, (state, action) => {})

      .addCase(updatePassword.pending, (state, action) => {})
      .addCase(updatePassword.fulfilled, (state, action) => {})
      .addCase(updatePassword.rejected, (state, action) => {});
  },
});

export const userReducer = userSlice.reducer;
export const { getToken, logoutUser } = userSlice.actions;
