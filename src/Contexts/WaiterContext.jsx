import { createContext, useContext, useEffect, useState } from "react";

const WaiterContext = createContext();

export const WaiterProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [waiterToken, setWaiterToken] = useState(localStorage.getItem("Token"));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (role?.toLowerCase() === "waiter") {
      setWaiterToken(localStorage.getItem("Token"));
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setWaiterToken(null);
  };

  return (
    <WaiterContext.Provider
      value={{ role, setRole, waiterToken, setWaiterToken, logout, loading }}
    >
      {children}
    </WaiterContext.Provider>
  );
};

export const useWaiter = () => useContext(WaiterContext);
