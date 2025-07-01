import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [adminToken, setAdminToken] = useState(null);
  const [managerId, setManagerId] = useState(localStorage.getItem("Id") || "");
  const [fullName, setFullName] = useState(localStorage.getItem("fullName")||"");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (role?.toLowerCase() === "admin") {
      setAdminToken(localStorage.getItem("Token"));
      setFullName(localStorage.getItem("fullName"));
      setManagerId(localStorage.getItem("Id"));
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
      value={{
        role,
        setRole,
        adminToken,
        setAdminToken,
        logout,
        loading,
        managerId,
        setManagerId,
        fullName,
        setFullName,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
