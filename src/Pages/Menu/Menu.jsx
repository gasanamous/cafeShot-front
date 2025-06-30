import React, { useEffect, useMemo, useState } from "react";
import MenuBar from "./MenuBar";
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from "./MenuItem";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import APIService from "../../utils/api";
import Loader from "../../Components/Loader/Loader";

function Menu() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate("/Menu/All", { replace: true });
    }
  }, [category]);
  const categories = ["All", "Food", "Hot drink", "Iced drink", "Other"];
  const [menuItems, setMenuItems] = useState([]);

  const getMenuItems = async () => {
    setLoading(true);
    try {
      const data = await APIService.get(`/menu`);
      setMenuItems(data?.menu);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const subCategory = useMemo(() => {
    if (category === "All") {
      return menuItems;
    }
    return menuItems?.filter((menuItem) => menuItem.category === category);
  }, [menuItems, category]);

  const groupedMenu = menuItems?.reduce((acc, item) => {
    const cat = item.category.toLowerCase();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <div className="container flex flex-col p-3 items-center lg:gap-4 gap-12 min-h-lvh mt-6">
      <div className="txt4  flex w-full justify-between items-start lg:flex-col relative">
        <div className="fontLogo">
          <h2 className="font-extrabold text-3xl">Our Menu</h2>
          <p className="font-light text-xl">{category}</p>
        </div>

        {isSmallScreen ? (
          <div className="">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-sm flex items-center gap-2 border-2 rounded-2xl px-4 py-2"
            >
              <MdOutlineKeyboardArrowDown /> {category}
            </button>
            {showDropdown && (
              <div className="">
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                ></div>
                <div className="z-20">
                  <MenuBar
                    categories={categories}
                    onSelect={() => setShowDropdown(false)}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <MenuBar categories={categories} />
          </div>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : category === "All" ? (
        groupedMenu &&
        Object.entries(groupedMenu).map(([category, items]) => (
          <div key={`${category}`} className="w-full mb-8">
            <h2 className="txt4 text-2xl mb-4 capitalize">{category}</h2>
            <ul className="w-full grid  lg:grid-cols-3 md:grid-cols-2  grid-cols-1 lg:gap-y-5 gap-3">
              {items.map((menuItem) => (
                <MenuItem
                  key={menuItem._id}
                  menuItem={menuItem}
                  isSmallScreen={isSmallScreen}
                />
              ))}
            </ul>
          </div>
        ))
      ) : loading ? (
        <Loader />
      ) : subCategory?.length > 0 ? (
        <ul className="w-full grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 lg:gap-y-5 gap-3">
          {subCategory.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              isSmallScreen={isSmallScreen}
            />
          ))}
        </ul>
      ) : (
        <div className="h-lvh txt1">Nothing to Show</div>
      )}
    </div>
  );
}

export default Menu;
