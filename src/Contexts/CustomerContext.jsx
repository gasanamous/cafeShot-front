import { createContext, useContext, useEffect, useState } from "react";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [customerToken, setCustomerToken] = useState(
    localStorage.getItem("TABLE_ACCESS_TOKEN")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role?.toLowerCase() === "customer")
      setCustomerToken(localStorage.getItem("TABLE_ACCESS_TOKEN"));
    setLoading(false);
  }, [role]);

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setCustomerToken(null);
  };

  return (
    <CustomerContext.Provider
      value={{ role, setRole, customerToken, logout, loading }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
