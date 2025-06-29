import React from "react";
import { Navigate } from "react-router-dom";
import { useCustomer } from "../Contexts/CustomerContext";

const CustomerRoute = ({ children }) => {
  const { customerToken, loading } = useCustomer();
  const role = localStorage.getItem("role");

  if (loading) {
    return <div>Loading..</div>;
  }

  if (role !== "customer" || !customerToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CustomerRoute;
