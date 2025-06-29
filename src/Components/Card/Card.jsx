import React from "react";
import style from "./Card.module.css";
import { useState } from "react";
import MenuDialog from "../../Components/MenuDialog/MenuDialog";
import FormDialog from "../../Components/FormDialog/FormDialog";
import { useUser } from "../../Components/UserContext/UserContext";
import { IoAddOutline } from "react-icons/io5";

function Card({ menuItem }) {
  const { userToken } = useUser();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <li
      key={menuItem.productId}
      className={`${style.card} relative flex flex-col justify-first items-center shadow-md rounded-xl overflow-hidden max-w-[200px] h-full min-h-[300px] bg-primary-trans`}
    >
      <img
        src={`${import.meta.env.VITE_API}/utils/png/${menuItem.productImage}`}
        alt={menuItem.productName}
        className=""
      />
      <div className={` flex flex-col px-3 pt-3 w-full gap-1`}>
        <div className="flex justify-between w-full items-center txt4">
          <h3 className=" text-lg font-extrabold">{menuItem.productName}</h3>
          <span className=" font-extralight">
            {menuItem.costPerUnit.toFixed(2)} $
          </span>
        </div>
        <p className="font-light lg:line-clamp-2 line-clamp-3 txt4">
          {menuItem.description}
        </p>
      </div>

      <FormDialog open={open} setOpen={setOpen} />
      {userToken ? (
        <>
          <button
            className={`${style.addToOrder} text-center txt1 mt-auto  cursor-pointer lg:block hidden`}
            onClick={handleClickOpen}
          >
            Add To Order
          </button>
          <button
            className={`absolute txt1 mt-auto cursor-pointer lg:hidden block bg-secondary right-3 top-3 rounded-full`}
            onClick={handleClickOpen}
          >
            <IoAddOutline className="w-[25px] h-[25px] txt1" />
          </button>
          <MenuDialog open={open} setOpen={setOpen} menuItem={menuItem} />
        </>
      ) : (
        <button
          className={`${style.addToOrder} text-center txt1 cursor-pointer`}
          onClick={handleClickOpen}
        >
          Order Now
        </button>
      )}
    </li>
  );
}

export default Card;
