import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useMemo } from "react";
import APIService from "../../utils/api";
import dayjs from "dayjs";
import OrderStatusDropdown from "./OrderStatusDropdown";
import { useState } from "react";
import { useEffect } from "react";

function TableDialog({ open, setOpen, table }) {
  if (!table) return null;
  const { _id, floor, orders, status } = table;
  const [localOrders, setLocalOrders] = useState(orders);
  let sum = 0;
  console.log(table);
  const handleClose = () => {
    setOpen(false);
  };
  const cleanTable = async () => {
    const id = _id;
    const response = await APIService.patch(
      `/table/clean/${id}`,
      {},
      true,
      "waiter"
    );
    handleClose();
    window.dispatchEvent(new Event("tablessUpdated"));
  };
  const bookTable = async () => {
    //not working from the waiter view yet
    const id = _id;
    // const response = await APIService.patch(
    //   `/table/booktable`,
    //   {
    //     tableId: id,
    //   },
    //   true,
    //   "waiter"
    // );
    handleClose();
  };

  const totalPrice = useMemo(() => {
    return orders?.reduce((sum, order) => sum + order.totalPrice, 0);
  }, [orders]);

  const formatDateTime = (timestamp) => {
    return dayjs(timestamp).format("DD MMM YYYY, hh:mm:ss A");
  };
  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  return (
    <Dialog fullWidth className="relative" open={open} onClose={handleClose}>
      <DialogTitle
        className="txt4 font-extrabold flex justify-between"
        name="itemName"
      >
        {_id} — Floor {floor}
        <div className="flex justify-center items-center flex-col">
          <span className={`${status === "Booked" ? "txt3" : "txt4"}`}>
            {status}
          </span>
          {localOrders?.length > 0 && (
            <strong className="font-light">
              Total Price: {totalPrice.toFixed(2)} $
            </strong>
          )}
        </div>
      </DialogTitle>
      <DialogContent>
        <div className=" gap-2">
          <span className="w-full text-left py-2 txt4">
            {localOrders?.length > 0 ? (
              localOrders.map((order, index) => (
                <div key={index} className="mt-4 border-t pt-2">
                  <p className="text-sm txt3 mb-1 flex justify-between items-center">
                    <span className="txt3">
                      🕒 Ordered at: {formatDateTime(order.orderedAt)}
                    </span>
                    <span className="font-bold txt4 flex gap-3">
                      {order.status}{" "}
                      <img
                        className={`w-[20px] h-[20px] ${
                          order.status === "Pending" ? "animate-spin" : " "
                        }`}
                        src={`${import.meta.env.VITE_API}/utils/status/${
                          order.status
                        }.png`}
                      />
                    </span>
                  </p>
                  <p className="font-medium txt4">Items:</p>

                  <ul className="list-disc ml-5 mb-2">
                    {order.orderItems.map((item, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">{item.itemName}</span> ×{" "}
                        {item.quantity} — ${item.costPerUnit}
                        {item.decorations.length > 0 && (
                          <span className="text-sm text-gray-500">
                            {" "}
                            [Decorations: {item.decorations.join(", ")}]
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <OrderStatusDropdown
                    orderId={order._id}
                    currentStatus={order.status}
                    onStatusChange={(newStatus) => {
                      const updatedOrders = localOrders.map((o) =>
                        o._id === order._id ? { ...o, status: newStatus } : o
                      );
                      setLocalOrders(updatedOrders);
                    }}
                  />
                  <p className="text-right txt4 font-bold">
                    Total: ${order.totalPrice}
                  </p>
                </div>
              ))
            ) : (
              <></>
            )}
          </span>
        </div>
      </DialogContent>

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
        {status === "Booked" ? (
          <Button
            type="submit"
            onClick={cleanTable}
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "var(--color3)",
                color: "var(--color1)",
              },
            }}
          >
            clean Table
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={bookTable}
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "var(--color3)",
                color: "var(--color1)",
              },
            }}
          >
            Book Table
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default TableDialog;
