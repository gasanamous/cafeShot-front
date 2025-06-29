import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SubmittedOrderCard({ order, onEdit, onCancel }) {
  const { items, totalPrice, orderedAt, status } = order;
  const isPending = status === "Pending";

  return (
    <div className="border border-[#AF8F6F] rounded-xl shadow-md bg-white my-4 p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h1 className="txt4 text-lg font-semibold text-[#5C4033]">
            {orderedAt}
          </h1>
          <h3 className="txt3 ml-1 text-sm text-gray-700">
            {items.length} items — {totalPrice.toFixed(2)}$
          </h3>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 text-sm txt3">
            <span>{status}</span>
            <img
              className={`w-[20px] h-[20px] ${isPending ? "animate-spin" : ""}`}
              src={`${import.meta.env.VITE_API}/utils/status/${status}.png`}
              alt={status}
            />
          </div>

          {isPending && (
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-[#f0e5d8] text-[#5C4033] rounded hover:bg-[#e4d4be] transition"
              >
                <EditIcon fontSize="small" />
                Edit
              </button>
              <button
                onClick={onCancel}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-[#f8d7da] text-red-700 rounded hover:bg-[#f5c2c7] transition"
              >
                <DeleteIcon fontSize="small" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <ul className="w-full">
        {items?.map((item) => (
          <li
            key={item._id}
            className="w-full flex justify-between gap-5 py-2 border-t border-dashed border-gray-200"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-[#3B3B3B]">
                {item.quantity} x {item.itemName}
              </span>

              {item.description && (
                <span className="text-sm text-gray-500 italic">
                  "{item.description}"
                </span>
              )}

              {item.decorations?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.decorations.map((decor, i) => (
                    <span
                      key={i}
                      className="bg-secondary txt1 text-xs font-medium px-2 py-[2px] rounded-full shadow-sm"
                    >
                      {decor}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <span className="font-bold text-[#5C4033] text-lg">
              {(item.price).toFixed(2)}$
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
