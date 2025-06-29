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
import { toast } from "react-toastify";

export default function MenuDialog({ open, setOpen, menuItem }) {
  const [itemCounter, setItemCounter] = useState(1);
  const [selectedDecorations, setSelectedDecorations] = useState([]);
  const [descriptionInput, setDescriptionInput] = useState("");
  const orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];

  const handleDecorationChange = (e) => {
    const { id, checked } = e.target;
    console.log(id, checked);
    if (checked) {
      setSelectedDecorations((prev) => [...prev, id]);
    } else {
      setSelectedDecorations((prev) => prev.filter((item) => item !== id));
    }
  };
  const {
    _id,
    itemName,
    itemImage,
    description,
    costPerUnit,
    possibleDecorations,
  } = menuItem;
  const handleClose = () => {
    setOpen(false);
    setItemCounter(1);
    setSelectedDecorations([]);
    setDescriptionInput("");
  };
  const incQty = () => {
    setItemCounter(itemCounter + 1);
  };
  const decQty = () => {
    setItemCounter(itemCounter > 1 ? itemCounter - 1 : 1);
  };
  const handleSubmit = (e) => {
    const item = {
      uniqueId: Date.now() + _id,
      itemId: _id,
      nameOfItem: itemName,
      quantity: itemCounter,
      addOns: selectedDecorations,
      possibleDecorations: possibleDecorations,
      description: descriptionInput,
      itemImage: itemImage,
      price: costPerUnit,
    };

    orderItems.push(item);
    toast.success(`${itemName} added Successfully!`);

    localStorage.setItem("orderItems", JSON.stringify(orderItems));
    handleClose();
  };
  return (
    <Dialog fullWidth className="relative" open={open} onClose={handleClose}>
      <DialogTitle className="txt4 font-extrabold" name="itemName">
        {itemName}
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-2">
          <div className=" w-full txt4">
            <p>"{description}"</p>
            <label htmlFor="possibleDecorations">possible Decorations:</label>

            <ul>
              {possibleDecorations.map((decor) => (
                <li key={decor}>
                  <Checkbox id={decor} onChange={handleDecorationChange} />
                  <label htmlFor={decor}>{decor}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <img
              src={`${import.meta.env.VITE_API}/utils/png/${itemImage}`}
              className=" rounded-xl "
            />
            <span className="w-full text-left py-2 txt4">
              <strong>Total Price: </strong>
              {(costPerUnit * itemCounter).toFixed(2)} $
            </span>
          </div>
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
        <Button onClick={decQty} disabled={itemCounter == 1}>
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
          Add to Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}
