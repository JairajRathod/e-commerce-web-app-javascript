import { BrowserRouter, Route, Routes } from "react-router";
import {
  AdminDashboard,
  AdminOrders,
  AdminProducts,
  AdminSellers,
  AdminUsers,
  DefaultDashboard,
  DefaultHomeScreen,
  LoginScreen,
  ProductDetailsScreen,
  ProfileCart,
  ProfileDetails,
  ProfileOrders,
  ProfileScreen,
  SellerDashboard,
  SellerHome,
  SellerOrders,
  SellerProducts,
  SellerProfile,
  SignupScreen,
} from "./screens/screenExport.js";
import { ToastContainer } from "react-toastify";
import Layout from "./screens/layout/layout.jsx";
import AdminHome from "./screens/adminScreens/AdminHome.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getToken, tokenVerfication } from "./feature/users.store.js";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AuthProtectedRoute from "./routes/AuthProtectedRoute.jsx";
import OrderScreen from "./screens/defaultScreens/OrderScreen.jsx";
import AdminProfile from "./screens/adminScreens/AdminProfile.jsx";
import ForgotPassword from "./screens/auth/ForgotPassword.jsx";
import OtpVerification from "./screens/auth/OtpVerification.jsx";
import UpdatePassword from "./screens/auth/UpdatePassword.jsx";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  async function tokenVerficationFunction() {
    await dispatch(tokenVerfication());
  }

  useEffect(() => {
    tokenVerficationFunction();
    console.log("current User : ", currentUser.role);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path=""
              element={
                <AuthProtectedRoute>
                  <SignupScreen />
                </AuthProtectedRoute>
              }
            />
            <Route
              path="login"
              element={
                <AuthProtectedRoute>
                  <LoginScreen />
                </AuthProtectedRoute>
              }
            />
            <Route
              path="forgot-password"
              element={
                <AuthProtectedRoute>
                  <ForgotPassword />
                </AuthProtectedRoute>
              }
            />
            <Route path="otp-verification" element={<OtpVerification />} />
            <Route path="update-password" element={<UpdatePassword />} />

            <Route
              path="dashboard"
              element={
                // <ProtectedRoute allowdRole={"user"}>
                <DefaultDashboard />
                // </ProtectedRoute>
              }
            >
              <Route path="home" element={<DefaultHomeScreen />} />
              <Route path="details/:id" element={<ProductDetailsScreen />} />
              <Route path="buynow" element={<OrderScreen />} />
              <Route path="profile" element={<ProfileDetails />} />
              <Route path="orders" element={<ProfileOrders />} />
              <Route path="cart" element={<ProfileCart />} />
            </Route>
            <Route
              path="admin-dashboard"
              element={
                // <ProtectedRoute allowdRole={"admin"}>
                <AdminDashboard />
                // </ProtectedRoute>
              }
            >
              <Route path="home" element={<AdminHome />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="sellers" element={<AdminSellers />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
            <Route
              path="seller-dashboard"
              element={
                // <ProtectedRoute allowdRole={"seller"}>
                <SellerDashboard />
                // </ProtectedRoute>
              }
            >
              <Route path="home" element={<SellerHome />} />
              <Route path="products" element={<SellerProducts />} />
              <Route path="orders" element={<SellerOrders />} />
              <Route path="profile" element={<SellerProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
