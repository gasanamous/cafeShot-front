import React from "react";
import { Navigate } from "react-router-dom";
import { useWaiter } from "../Contexts/WaiterContext";

const WaiterRoute = ({ children }) => {
  const { waiterToken, loading } = useWaiter();
  const role = localStorage.getItem("role");

  if (loading) {
    return <div>Loading..</div>;
  }
  if (role !== "waiter" || !waiterToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default WaiterRoute;
