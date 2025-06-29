import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import APIService from "../../utils/api";
import { useState } from "react";
import { useCustomer } from "../../Contexts/CustomerContext";

export default function FormDialog({ open, setOpen }) {
  const { setRole } = useCustomer();
  const [tableId, setTableId] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTableId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await APIService.post("/table/booktable", {
        tableId: tableId,
      });
      const token = response.data?.TABLE_ACCESS_TOKEN;
      localStorage.setItem("role", "customer");
      localStorage.setItem("TABLE_ACCESS_TOKEN", token);
      localStorage.setItem("tableId", tableId);
      localStorage.setItem("orderItems", "[]");

      setRole("customer");
    } catch (error) {
      console.log(error);
      console.log(error.response.data?.errMsg);
    } finally {
      handleClose();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Book Your Table</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To book a table, please either enter the key provided on the table or
          scan the QR code using your device's camera.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="tableId"
          name="tableId"
          label="tableId"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "var(--color1)",
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
              backgroundColor: "var(--color1)",
            },
          }}
        >
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
