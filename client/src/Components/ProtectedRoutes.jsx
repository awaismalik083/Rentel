// src/Components/PrivateRoutes.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token"); // Or Cookies.get('token')
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
