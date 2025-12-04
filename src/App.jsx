import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Fav from "./pages/Fav";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import DashboardSummary from "./components/userDashboard/DashboardSummary";
import OrderHistory from "./components/userDashboard/OrderHistory";
import UserProfile from "./components/userDashboard/UserProfile";
import UserAddresses from "./components/userDashboard/UserAddresses";
import UserPaymentMethods from "./components/userDashboard/UserPaymentMethods";
import UserPreferences from "./components/userDashboard/UserPreferences";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
  <Route path="/search" element={<SearchResults />} />
        <Route path="/men" element={<Products defaultTab="men" />} />
        <Route path="/women" element={<Products defaultTab="women" />} />
        <Route path="/accessories" element={<Products defaultTab="accessories" />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardSummary />} />
          <Route path="summary" element={<DashboardSummary />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="addresses" element={<UserAddresses />} />
          <Route path="payment-methods" element={<UserPaymentMethods />} />
          <Route path="preferences" element={<UserPreferences />} />
        </Route>
        <Route path="/favoritos" element={<Fav />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
