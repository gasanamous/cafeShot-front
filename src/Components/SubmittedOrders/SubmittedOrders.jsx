import SubmittedOrderCard from "./SubmittedOrderCard";
import "../../App.css"; // تأكد من صحة المسار
import { useEffect, useState } from "react";
import APIService from "../../utils/api";
import Swal from "sweetalert2";
import EditOrderDialog from "../EditOrderDialog/EditOrderDialog";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { LuRefreshCw } from "react-icons/lu";
import { toast } from "react-toastify";

export default function SubmittedOrders() {
  const [submittedOrders, setSubmittedOrders] = useState([]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);

  const getBill = async () => {
    try {
      const data = await APIService.get("/table/bill");
      setSubmittedOrders(data.orders);
    } catch (error) {
      console.error("Failed to fetch bill:", error);
      setSubmittedOrders([]);
    }
  };

  useEffect(() => {
    getBill();
    const updateOrders = () => getBill();
    window.addEventListener("ordersUpdated", updateOrders);
    return () => {
      window.removeEventListener("ordersUpdated", updateOrders);
    };
  }, []);

  const handleOpenEditDialog = (order) => {
    setOrderToEdit(order);
    setEditDialogOpen(true);
  };

  const handleUpdateOrder = async (orderId, updatedOrderData) => {
    console.log("", orderId);
    console.log("", updatedOrderData);
    try {
      await APIService.patch(`/order/edit/${orderId}`, updatedOrderData);

      setEditDialogOpen(false);
      setOrderToEdit(null);
      window.dispatchEvent(new Event("ordersUpdated"));
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to update order", "error");
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmed = await DeleteDialog({
      title: "Cancel this order?",
      text: "This item will be removed from your list.",
      confirmButtonText: "Yes, Cancel it!",
    });
    if (confirmed) {
      try {
        const res = await APIService.delete(`/order/cancel/${orderId}`);
        window.dispatchEvent(new Event("ordersUpdated"));
        toast.success(res?.data?.message || `Item deleted Successfully`);
      } catch (err) {
        Swal.fire("Error", err.message || "Failed to cancel order", "error");
      }
    }
  };
  const refresh = async () => {
    await getBill();
  };

  return (
    <section className="my-10 px-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-[28px] sm:text-[32px] font-semibold txt4 text-center sm:text-left">
          Submitted Orders
        </h1>
        <button onClick={refresh}>
          <LuRefreshCw />
        </button>
      </div>

      <div className="max-h-[500px] overflow-y-auto border border-[#AF8F6F] rounded-[20px] p-6 bg-[#faf9f7] shadow-inner">
        {submittedOrders.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No submitted orders yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {submittedOrders.map((order) => (
              <SubmittedOrderCard
                key={order._id}
                order={order}
                onEdit={() => handleOpenEditDialog(order)}
                onCancel={() => handleCancelOrder(order._id)}
              />
            ))}
          </div>
        )}
      </div>

      {orderToEdit && (
        <EditOrderDialog
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
          editableOrder={orderToEdit}
          onUpdate={handleUpdateOrder}
        />
      )}
    </section>
  );
}
