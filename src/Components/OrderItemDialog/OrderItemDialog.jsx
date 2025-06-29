import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function OrderItemDialog({ open, setOpen, orderItem }) {
  const [order, setOrder] = useState(orderItem) || {};
  const {
    itemId,
    nameOfItem,
    addOns = [],
    quantity,
    description,
    price,
    itemImage,
    possibleDecorations = [],
  } = orderItem;

  const [itemCounter, setItemCounter] = useState(quantity);
  const [descriptionInput, setDescriptionInput] = useState(description || "");
  const [selectedDecorations, setSelectedDecorations] = useState([...addOns]);

  useEffect(() => {
    setItemCounter(quantity);
    setSelectedDecorations([...addOns]);
    setDescriptionInput(description || "");
  }, [orderItem]);

  const handleDecorationChange = (e) => {
    const { id, checked } = e.target;
    setSelectedDecorations((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const incQty = () => setItemCounter(itemCounter + 1);
  const decQty = () => setItemCounter(itemCounter > 1 ? itemCounter - 1 : 1);

  const handleSubmit = () => {
    const item = {
      itemId,
      nameOfItem,
      quantity: itemCounter,
      addOns: selectedDecorations,
      possibleDecorations,
      description: descriptionInput,
      itemImage,
      price,
    };

    let orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];

    const existingIndex = orderItems.findIndex((i) => i.itemId === item.itemId);
    if (existingIndex !== -1) {
      orderItems[existingIndex] = item;
    } else {
      orderItems.push(item);
    }

    localStorage.setItem("orderItems", JSON.stringify(orderItems));
    window.dispatchEvent(new Event("orderItemsUpdated"));
    setOrder(item);
    handleClose();
  };

  return (
    <Dialog fullWidth className="relative" open={open} onClose={handleClose}>
      <DialogTitle className="txt4 font-extrabold">{nameOfItem}</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-2">
          <div className=" w-full txt4">
            <ul>
              {possibleDecorations.map((decoration) => (
                <li key={decoration}>
                  <Checkbox
                    id={decoration}
                    checked={selectedDecorations.includes(decoration)}
                    onChange={handleDecorationChange}
                  />
                  <label htmlFor={decoration}>{decoration}</label>
                </li>
              ))}
            </ul>
            <p>Your Notes: {description}</p>
          </div>
          <img
            src={`${import.meta.env.VITE_API}/utils/png/${itemImage}`} // src={`http://localhost:3000/utils/png/${productImage}`}
            className=" rounded-xl "
          />
        </div>

        <TextField
          margin="dense"
          id="description"
          name="description"
          label="add your notes"
          type="text"
          fullWidth
          variant="standard"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
      </DialogContent>
      <div className="absolute top-0 right-0 grid grid-cols-3">
        <Button onClick={decQty} disabled={itemCounter === 1}>
          <FaMinus />
        </Button>
        <span className="bg-primary p-2 txt4 text-center text-xl">
          {itemCounter}
        </span>

        <Button onClick={incQty}>
          <FaPlus />
        </Button>
      </div>

      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "var(--color3)",
              color: "var(--color1)",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          onClick={handleSubmit}
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "var(--color3)",
              color: "var(--color1)",
            },
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}