import OrderItemCard from "./OrderItemCard";
import "../../../src/App.css";
import { useState } from "react";
import { useEffect } from "react";
import APIService from "../../utils/api";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { toast } from "react-toastify";

export default function CurrentOrder() {
  let sum = 0.0;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listOfCurrentOrder, setListOfCurrentOrder] = useState(
    JSON.parse(localStorage.getItem("orderItems")) || []
  );
  let orderStatus = "Pending";

  const listOfOrderItemCard = listOfCurrentOrder.map((order) => {
    sum += order.quantity * order.price;
    return <OrderItemCard orderItem={order} />;
  });

  useEffect(() => {
    const updateOrderItems = () => {
      const items = JSON.parse(localStorage.getItem("orderItems")) || [];
      setListOfCurrentOrder(items);
    };

    window.addEventListener("orderItemsUpdated", updateOrderItems);
    window.dispatchEvent(new Event("ordersUpdated"));

    return () => {
      window.removeEventListener("orderItemsUpdated", updateOrderItems);
    };
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const orderData = {
      orderItems: listOfCurrentOrder.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        decorations: item.addOns || [],
        description: item.description || null,
      })),
    };
    try {
      const response = await APIService.post(
        "/order/new",
        orderData,
        true,
        "customer"
      );
      localStorage.setItem("orderItems", "[]");
      window.dispatchEvent(new Event("orderItemsUpdated"));
      window.dispatchEvent(new Event("ordersUpdated"));
    } catch (error) {}finally{
      setLoading(false);
    }
  };
  const handleCancelSession = async () => {
    const confirmed = await DeleteDialog({
      title: "Cancel Reservation?",
      text: "This will cancel all orders and end your session.",
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#30261e",
      cancelButtonColor: "#704123",
    });

    if (confirmed) {
      try {
        const res = await APIService.get("/table/bill");
        const orders = res?.orders || [];

        for (const order of orders) {
          await APIService.delete(`/order/cancel/${order._id}`);
        }
        localStorage.removeItem("orderItems");
        localStorage.removeItem("TABLE_ACCESS_TOKEN");
        localStorage.removeItem("role");

        window.dispatchEvent(new Event("orderItemsUpdated"));

        window.location.href = "/";
        toast.success("Reservation cancelled Successfully");
      } catch (error) {
        Swal.fire(
          "Error",
          error.message || "Failed to cancel session",
          "error"
        );
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center items-center gap-3 flex-col sm:flex-row txt4 sm:justify-between sm:items-center py-6">
        <h1 className="text-[25px] sm:text-[30px]">Current Order</h1>
        <button
          onClick={handleCancelSession}
          className=" bg-red-100 hover:bg-red-200 text-red-800 font-semibold text-sm px-4 py-1.5 border border-red-300 rounded-xl shadow-sm"
        >
          Cancel Reservation
        </button>

        {listOfCurrentOrder.length > 0 && (
          <div className="flex flex-row lg:flex-col gap-5 lg:gap-3 justify-center text-xl">
            <h1>
              <strong>Total Price:</strong> {sum.toFixed(2)} $
            </h1>
            <h2 className="txt3 font-extrabold flex gap-4 items-center">
              {orderStatus}
              <img
                className={`w-[20px] h-[20px] ${
                  orderStatus === "Pending" ? "animate-spin" : " "
                }`}
                src={`${
                  import.meta.env.VITE_API
                }/utils/status/${orderStatus}.png`}
              />
            </h2>
          </div>
        )}
      </div>
      {listOfCurrentOrder.length > 0 ? (
        <>
          <div className="flex p-2.5 justify-center items-center flex-row flex-wrap gap-3">
            {listOfOrderItemCard}
          </div>
          {orderStatus === "Pending" && (
            <button
              disabled={loading}
              className="bg-secondary txt1 rounded-sm p-1 cursor-pointer  block mx-auto m-10"
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="loaderButton"></span>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          )}
        </>
      ) : (
        <div className="w-full text-2xl flex justify-center">
          <a
            className="flex justify-center items-center w-fit gap-3 border-2 rounded-bl-3xl  rounded-tr-3xl rounded-xl p-3 hover:scale-110 shadow-[0_0_10px_rgba(0,0,0,0.1)] border-[#AF8F6F]"
            href="Menu/All"
          >
            Create New Order <MdOutlinePlaylistAdd />
          </a>
        </div>
      )}
    </div>
  );
}
