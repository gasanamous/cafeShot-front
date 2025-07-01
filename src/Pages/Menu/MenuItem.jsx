import React from "react";
import style from "./Menu.module.css";
import { useState } from "react";
import MenuDialog from "../../Components/MenuDialog/MenuDialog";
import FormDialog from "../../Components/FormDialog/FormDialog";
import { IoAddOutline } from "react-icons/io5";
import { useCustomer } from "../../Contexts/CustomerContext";

function MenuItem({ menuItem }) {
  const { customerToken } = useCustomer();
  const [open, setOpen] = useState(false);
  const isManager = localStorage.getItem("Token");
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <li
      key={menuItem.productId}
      className={`${style.card} relative flex  justify-first shadow-md  overflow-hidden  min-h-[100px]`}
    >
      <img
        src={`${import.meta.env.VITE_API}/utils/png/${menuItem.itemImage}`}
        alt={menuItem.itemName}
        className="w-[100px] h-[100px]"
      />
      <div
        className={`${style.description} flex flex-col px-3 pt-3 w-full gap-1`}
      >
        <div className="flex justify-between w-full items-center">
          <h3 className="txt4 text-lg font-extrabold">{menuItem.itemName}</h3>
          <span className="txt4 font-extralight">
            {menuItem.costPerUnit.toFixed(2)} $
          </span>
        </div>
        <p className="txt3 font-light lg:line-clamp-2 line-clamp-3 ">
          {menuItem.description}
        </p>
      </div>

      {customerToken ? (
        <>
          <button
            className={`mb-auto txt4 block bg-primary rounded-bl-xl cursor-pointer`}
            onClick={handleClickOpen}
          >
            <IoAddOutline className="w-[40px] h-[40px] txt4  block bg-primary rounded-bl-2xl p-1" />
          </button>
          <MenuDialog open={open} setOpen={setOpen} menuItem={menuItem} />
        </>
      ) : isManager ? (
        <></>
      ) : (
        <>
          <IoAddOutline
            onClick={handleClickOpen}
            className="w-[40px] h-[40px] txt4 block bg-primary rounded-bl-xl p-1 cursor-pointer"
          />
          <FormDialog open={open} setOpen={setOpen} />
        </>
      )}
    </li>
  );
}

export default MenuItem;
