import { useMemo } from "react";
import { RiFileList3Line } from "react-icons/ri";

function TableCard({ table, key, handleOpen }) {
  if (!table) return null;
  const { _id, status, floor, orders } = table;
  let sum = 0;
  const totalPrice = useMemo(() => {
      return orders?.reduce((sum, order) => sum + order.totalPrice, 0);
    }, [orders]);
  return (
    <div
      onClick={handleOpen}
      key={key}
      className={`p-4 rounded-xl shadow-md hover:scale-105 ${
        status === "Booked" ? "bg-primary" : "bg-gray-100"
      }`}
    >
      <h2 className="text-xl font-semibold mb-2 flex">
        {_id} — Floor {floor}
        <span className={`ml-auto ${status === "Booked" ? "txt3" : "txt4"}`}>
          {status}
        </span>
      </h2>

      {orders?.length > 0 ? (
        <div className="mt-4 border-t pt-2 flex gap-3 items-center">
          <RiFileList3Line />
          <p className="">
            {orders.length} {orders.length > 1 ? "Orders" : "Order"}
          </p>
          <sapn className="ml-auto">Total Price: {totalPrice}$</sapn>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TableCard;
