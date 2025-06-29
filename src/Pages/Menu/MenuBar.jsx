import React from "react";
import style from "./Menu.module.css";
import { NavLink, useLocation } from "react-router-dom";

function MenuBar({ categories, onSelect = () => {} }) {
  const location = useLocation();

  return (
    <ul
      className={`${style.categorylist} lg:grid lg:grid-cols-5 lg:static tracking-wide absolute z-30 bg-primary top-12 right-0 w-1/2 py-2`}
    >
      {categories.map((category) => {
        const to =
          category === "all"
            ? "/Menu/all"
            : `/Menu/${encodeURIComponent(category)}`;
        const isActive = location.pathname == to;
        return (
          <li key={category} className="txt4  text-center w-full py-2">
            <NavLink
              className={`${isActive ? "!txt4  !underline" : ""}`}
              to={to}
              onClick={onSelect}
            >
              {category}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
export default MenuBar;
