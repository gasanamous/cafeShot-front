import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (role?.toLowerCase() === "admin") {
      setAdminToken(localStorage.getItem("Token"));
    }
    setLoading(false);
  }, [role]);

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setAdminToken(null);
  };

  return (
    <AdminContext.Provider
      value={{ role, setRole, adminToken,setAdminToken, logout, loading }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
