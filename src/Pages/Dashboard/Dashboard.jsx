import React, { useState, useRef, useEffect } from "react";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";
import { RiApps2AddFill } from "react-icons/ri";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import StaffManagement from "./StaffManagement";
import MenuItemsManagement from "./MenuItemsManagement";
import GeneralInfo from "./GeneralInfo";
import TablesManagement from "./TablesManagement";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(localStorage.getItem("page")||"General Info");
  const pages = [
    { name: "General Info", icon: RiApps2AddFill },
    { name: "Staff Management", icon: BsFillPeopleFill },
    { name: "Menu Items Management", icon: MdOutlineRestaurantMenu },
    { name: "Tables Management", icon: MdOutlineInventory },
  ];
  const sidebarRef = useRef(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const closeDrawer = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        closeDrawer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      <button
        onClick={toggleDrawer}
        type="button"
        className="items-center p-2 z-30 text-sm rounded-lg sm:hidden absolute right-0"
      >
        {!open && <HiMiniBars3BottomRight className="txt4 mt-2 h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed inset-0 bg-primary-trans z-20 sm:hidden" />
      )}

      <aside
        ref={sidebarRef}
        className={`lg:sticky fixed top-0 left-0 z-30 w-64 h-full transition-transform duration-300 ease-in-out bg-primary-trans ${
          open ? "mt-12 translate-x-0" : "-translate-x-full"
        } sm:relative sm:translate-x-0 sm:z-0`}
        aria-label="Sidebar"
      >
        <div className=" px-3 py-4 bg-primary-trans txt4 h-full">
          <ul className="space-y-3 font-medium cursor-pointer">
            {pages.map(({ name, icon: Icon }) => (
              <li
                onClick={() => {
                  setPage(`${name}`);
                  localStorage.setItem("page", name);
                }}
                className={` rounded-lg flex items-center p-2 ${
                  page == `${name}`
                    ? "[background-color:var(--color3)] txt1"
                    : ""
                }`}
              >
                <Icon className="text-xl text-secondary" />
                <span className="flex-1 ms-3 whitespace-nowrap">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="txt1 flex flex-col items-start w-full mt-3 p-2 sm:mt-4 overflow-x-hidden">
        <div className="w-full max-w-full">
          <div className="flex flex-wrap lg:justify-between items-center gap-4 txt4 fontLogo text-xl sm:text-2xl">
            <h2 className="break-words">Dashboard / {page}</h2>
          </div>

          <div className="rounded-lg mt-4 w-full max-w-full overflow-hidden">
            {page === "General Info" ? (
              <GeneralInfo />
            ) : page === "Staff Management" ? (
              <StaffManagement />
            ) : page === "Menu Items Management" ? (
              <MenuItemsManagement />
            ) : (
              page === "Tables Management" && <TablesManagement />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
