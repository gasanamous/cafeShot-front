import React from "react";
import "./Card.css";
import "../../App.css";
import OrderItemDialog from "../OrderItemDialog/OrderItemDialog";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { toast } from "react-toastify";

export default function OrderItemCard({ orderItem }) {
  const { nameOfItem, addOns, quantity, price, itemImage } = orderItem;

  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleCancle() {
    const condition = await DeleteDialog({
      title: "Delete this item?",
      text: "This item will be removed from your order list.",
      confirmButtonText: "Yes, delete it!",
    });
    if (condition) {
      toast.success(`${nameOfItem} has been deleted Successfully`);
      let orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];
      orderItems = orderItems.filter(
        (item) => item.uniqueId !== orderItem.uniqueId
      );
      localStorage.setItem("orderItems", JSON.stringify(orderItems));
      window.dispatchEvent(new Event("orderItemsUpdated"));
    }
  }

  function orderItemOpen() {
    setDialogOpen(!dialogOpen);
  }

  const listOfaddOns = addOns.map((add, index) => {
    return <li key={index}>{add}</li>;
  });
  return (
    <div className="card">
      <div className="card__shine"></div>
      <div className="card__glow"></div>
      <div className="card__content">
        <button className="card__button_cancel" onClick={handleCancle}>
          <ClearIcon fontSize="small" />
        </button>

        <div className="card__badge">Quantity : {quantity}</div>
        <div className="card__image flex flex-col justify-center items-center ">
          <img
            src={`${import.meta.env.VITE_API}/utils/png/${itemImage}`}
            alt={itemImage}
            className="w-full object-cover"
          />
        </div>
        <div className="card__text">
          <p className="card__title">{nameOfItem}</p>
          <ul className="card__description">{listOfaddOns}</ul>
        </div>
        <div className="card__footer">
          <div className="card__price">{(price * quantity).toFixed(2)} $</div>
          <button
            className="card__button"
            type="button"
            onClick={orderItemOpen}
          >
            <svg height="16" width="16" viewBox="0 0 24 24">
              <path
                strokeWidth="2"
                stroke="currentColor"
                d="M4 12H20M12 4V20"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <OrderItemDialog
        open={dialogOpen}
        orderItem={orderItem}
        setOpen={setDialogOpen}
      />
    </div>
  );
}
