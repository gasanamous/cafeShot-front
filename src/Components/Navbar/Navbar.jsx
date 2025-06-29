import React, { useState } from "react";
import style from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FiCoffee } from "react-icons/fi";
import { useMediaQuery, useTheme } from "@mui/material";
import { PiListBold } from "react-icons/pi";
import { useCustomer } from "../../Contexts/CustomerContext";
import { useAdmin } from "../../Contexts/AdminContext";
import { useWaiter } from "../../Contexts/WaiterContext";

function Navbar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { customerToken } = useCustomer();
  const { adminToken, logout: adminLogout } = useAdmin();
  const { waiterToken, logout: waiterLogout } = useWaiter();

  const userRole = localStorage.getItem("role")?.toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    adminLogout?.();
    waiterLogout?.();
    navigate("/");
    window.location.reload();
  };

  const renderDropdown = (path, label) => (
    <ul className="absolute bg-primary shadow-md p-2 mt-2 rounded hidden group-open:block">
      <li>
        <NavLink to={path} className="block px-4 py-1 txt3">
          {label}
        </NavLink>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="block px-4 py-1 txt3 text-left w-full"
        >
          Logout
        </button>
      </li>
    </ul>
  );

  return (
    <nav className="bg-primary w-full py-3 box-shadow z-50 h-12 flex items-center justify-center">
      <div className="container flex flex-row items-center justify-between gap-6">
        <NavLink
          to="/"
          className="flex flex-row txt4 gap-4 items-center !no-underline fontLogo"
        >
          <FiCoffee />
          <span>Coffee shot</span>
        </NavLink>

        {isSmallScreen && (
          <PiListBold
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-[25px] h-[25px] txt4"
          />
        )}

        {menuOpen && (
          <div
            className="fixed inset-0 z-10 bg-secondary-trans top-12"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

        <ul
          className={`${
            isSmallScreen && menuOpen
              ? `${style.mobileNavbar}`
              : "lg:flex lg:gap-10 hidden lg:flex-row"
          }`}
        >
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/About">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/Menu">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/LocationContact">Location & Contact</NavLink>
          </li>

          {isSmallScreen && (
            <>
              {customerToken && (
                <li>
                  <NavLink to="/Order" className="txt4">
                    Orders
                  </NavLink>
                </li>
              )}

              {(adminToken || waiterToken) && (
                <li>
                  <details className="txt4">
                    <summary className="cursor-pointer">
                      Welcome {userRole}
                    </summary>
                    <ul className="pl-4">
                      <li>
                        <NavLink to={adminToken ? "/DashBoard" : "/CafeTables"}>
                          {adminToken ? "Dashboard" : "CafeTables"}
                        </NavLink>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="txt4">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </details>
                </li>
              )}
            </>
          )}
        </ul>

        {!isSmallScreen &&
          (customerToken ? (
            <NavLink
              to="/Order"
              className="txt1 bg-secondary rounded-xl px-4 py-2"
            >
              Orders
            </NavLink>
          ) : (
            (adminToken || waiterToken) && (
              <details className="relative group">
                <summary className="cursor-pointer txt1 bg-secondary rounded-xl px-4 py-2">
                  Welcome {userRole}
                </summary>
                {adminToken
                  ? renderDropdown("/DashBoard", "Dashboard")
                  : renderDropdown("/CafeTables", "CafeTables")}
              </details>
            )
          ))}
      </div>
    </nav>
  );
}

export default Navbar;
