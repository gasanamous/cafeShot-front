import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import ViewTable from "../../Components/ViewTable/ViewTable";
import AdminAddForm from "../../Components/AdminAddForm/AdminAddForm";
import APIService from "../../utils/api";
import Loader from "../../Components/Loader/Loader";

function MenuItemsManagement() {
  const headerToEdit = [
    { name: "itemName", type: "text", required: true },
    { name: "description", type: "text" },
    { name: "possibleDecorations", type: "text", required: true },
    { name: "itemImage", type: "file", required: true },
    {
      name: "series",
      type: "select",
      options: ["Drink", "Food", "Dessert", "Other"],
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        "Hot drink",
        "Iced drink",
        "Food",
        "Western dessert",
        "Eastern dessert",
      ],
      required: true,
    },
    { name: "costPerUnit", type: "number", required: true },
  ];
  const headerToView = [
    { name: "itemName", type: "text" },
    { name: "description", type: "text" },
    { name: "possibleDecorations", type: "text" },
    { name: "itemImage", type: "text" },
    { name: "series", type: "text" },
    { name: "category", type: "text" },
    { name: "costPerUnit", type: "text" },
    { name: "howManyOrdered", type: "text" },
  ];
  const [openForm, setOpenForm] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMenuItems = async () => {
    setLoading(true);
    try {
      const data = await APIService.get(`/menu`);
      setMenuItems(data?.menu);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    getMenuItems();
    const update = () => {
      getMenuItems();
    };

    window.addEventListener("update", update);

    return () => {
      window.removeEventListener("update", update);
    };
  }, [openForm]);
  const handleOpenAction = () => {
    setOpenForm(true);
  };
  const handleCloseAction = () => {
    setOpenForm(false);
  };
  return (
    <div className="w-full overflow-hidden flex flex-col gap-3">
      <button
        onClick={handleOpenAction}
        className="flex txt3 border rounded-2xl p-2 justify-center items-center bg-primary gap-2 w-fit ml-auto"
      >
        Add New
        <IoAddCircleOutline className="w-[30px] h-[30px] cursor-pointer" />
      </button>
      <AdminAddForm
        open={openForm}
        onClose={handleCloseAction}
        header={headerToEdit}
        item="menu"
      />
      {loading ? (
        <Loader />
      ) : (
        <ViewTable
          headerToView={headerToView}
          headerToEdit={headerToEdit}
          array={menuItems}
          item="menu"
        />
      )}
    </div>
  );
}

export default MenuItemsManagement;
