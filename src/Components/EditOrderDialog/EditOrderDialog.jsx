import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { FaPlus, FaMinus } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EditOrderDialog({
  open,
  setOpen,
  editableOrder,
  onUpdate,
}) {
  if (!editableOrder) return null;

  const [editedItems, setEditedItems] = useState([]);
  useEffect(() => {
    if (editableOrder?.items) {
      setEditedItems(
        editableOrder.items.map((item) => ({
          ...item,
          decorations: item.decorations || [],
          description: item.description || "",
        }))
      );
    }
  }, [editableOrder]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuantityChange = (index, newQuantity) => {
    setEditedItems((prevItems) => {
      const updated = [...prevItems];
      updated[index].quantity = Math.max(1, newQuantity);
      return updated;
    });
  };

  const handleDescriptionChange = (index, newText) => {
    setEditedItems((prevItems) => {
      const updated = [...prevItems];
      updated[index].description = newText;
      return updated;
    });
  };

  const handleDecorationToggle = (index, decoration) => {
    setEditedItems((prevItems) => {
      const updated = [...prevItems];
      const currentItem = { ...updated[index] };
      const decorations = currentItem.decorations || [];

      if (decorations.includes(decoration)) {
        currentItem.decorations = decorations.filter((d) => d !== decoration);
      } else {
        currentItem.decorations = [...decorations, decoration];
      }

      updated[index] = currentItem;
      return updated;
    });
  };

  const handleRemoveItem = (indexToRemove) => {
    setEditedItems((items) =>
      items.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = () => {
    const updatedOrderData = {
      orderItems: editedItems.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        decorations: item.decorations || [],
        description: item.description || "",
      })),
    };
    onUpdate(editableOrder._id, updatedOrderData);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>Edit Order — {editableOrder?.orderedAt}</DialogTitle>
      <DialogContent dividers>
        {editedItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            This order has no items.
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {editedItems.map((item, index) => (
              <li
                key={index}
                className="p-4 border txt4 rounded-lg shadow-sm bg-[#fdfcfb]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4">
                  <div className="flex-grow flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <p className="font-semibold text-lg">{item.itemName}</p>
                      <p className="text-sm text-gray-600">
                        Unit: {item.costPerUnit.toFixed(2)}$, Total:{" "}
                        {(item.costPerUnit * item.quantity).toFixed(2)}$
                      </p>
                    </div>

                    <TextField
                      label="Edit Notes / Description"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={item.description}
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                      className="my-4"
                    />

                    <div className="flex flex-wrap gap-2 mt-1">
                      {(item.itemId?.possibleDecorations || []).map((decor) => (
                        <FormControlLabel
                          key={decor}
                          control={
                            <Checkbox
                              checked={item.decorations.includes(decor)}
                              onChange={() =>
                                handleDecorationToggle(index, decor)
                              }
                            />
                          }
                          label={decor}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(index, item.quantity - 1)
                      }
                    >
                      <FaMinus />
                    </IconButton>
                    <span className="font-bold text-lg">{item.quantity}</span>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(index, item.quantity + 1)
                      }
                    >
                      <FaPlus />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
