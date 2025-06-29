import { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import APIService from "../../utils/api";

export default function OrderStatusDropdown({
  orderId,
  currentStatus,
  onStatusChange,
}) {
  const [status, setStatus] = useState(currentStatus);
  const statuses = ["Pending", "Preparing", "Served", "Canceled", "Paid"];

  const handleChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      await APIService.patch(
        `/order/status/${orderId}`,
        {
          newOrderStatus: newStatus,
        },
        true,
        "waiter"
      );
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      setStatus(currentStatus);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`status-select-${orderId}`}>Status</InputLabel>
      <Select
        labelId={`status-select-${orderId}`}
        value={status}
        label="Status"
        onChange={handleChange}
      >
        {statuses.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
