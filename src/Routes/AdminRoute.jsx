import React from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "../Contexts/AdminContext";

const AdminRoute = ({ children }) => {
  const { adminToken, loading } = useAdmin();
  const role = localStorage.getItem("role");

  if (loading) {
    return <div>Loading..</div>;
  }
  if (role !== "admin" || !adminToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
