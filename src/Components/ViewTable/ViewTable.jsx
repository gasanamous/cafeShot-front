import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import AdminDialog from "../AdminDialog/AdminDialog";
import { MdDelete } from "react-icons/md";
import { SiCcleaner } from "react-icons/si";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

function ViewTable({ array, headerToView, headerToEdit, item }) {
  if (!array || array.length === 0) {
    return <p className="text-center">No data available</p>;
  }

  const isImageFile = (filename) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [action, setAction] = useState("");

  const handleOpenAction = (index, action) => {
    setOpen(true);
    setEditData(array[index]);
    setAction(action);
  };

  const handleCloseAction = () => {
    setOpen(false);
    setEditData(null);
  };
  const filteredArray = array.filter((obj) =>
    headerToView.some((col) => {
      const value = obj[col.name];
      if (typeof value === "string" || typeof value === "number") {
        return value
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } else if (Array.isArray(value)) {
        return value.join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );
  return (
    <div className="overflow-auto h-[65vh] txt3">
      <div className="p-2">
        <label>Search {item}: </label>
        <input
          type="text"
          placeholder="Type to search by name, status, or anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2  p-2 border rounded-md"
        />
      </div>
      <table className="w-full text-center">
        <thead>
          <tr className="bg-primary  tracking-wider sticky top-0 txt3">
            {headerToView.map((col) => (
              <th key={col.name}>{col.name}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredArray.map((object, index) => (
            <tr
              className="border-b-2 border-dashed text-sm transition-colors txt3"
              key={index}
            >
              {headerToView.map((col) => (
                <td key={`${col.name}-${index}`}>
                  {Array.isArray(object[col.name]) ? (
                    object[col.name].length > 0 ? (
                      <ul>
                        {object[col.name].map((item, idx) => (
                          <li key={idx}>
                            {typeof item === "object"
                              ? JSON.stringify(item)
                              : item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <>--</>
                    )
                  ) : typeof object[col.name] === "object" &&
                    object[col.name] !== null ? (
                    <>{JSON.stringify(object[col])}</>
                  ) : isImageFile(object[col.name]) ? (
                    <img
                      src={`${import.meta.env.VITE_API}/utils/${
                        item === "table" ? "tables" : "png"
                      }/${object[col.name]}`}
                      className="w-[70px] h-[70px] mx-auto"
                      alt="table"
                    />
                  ) : (
                    <>{object[col.name]}</>
                  )}
                </td>
              ))}
              <td className="flex gap-4 items-center justify-center w-full">
                {item === "table" ? (
                  <button onClick={() => handleOpenAction(index, "clean")}>
                    <SiCcleaner />
                  </button>
                ) : (
                  <div className="flex gap-4 items-center justify-center w-full">
                    <button onClick={() => handleOpenAction(index, "update")}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleOpenAction(index, "delete")}>
                      <MdDelete />
                    </button>
                    {item === "manager" ? (
                      <button
                        onClick={() => handleOpenAction(index, "restrict")}
                      >
                        {object["status"] === "restricted" ? (
                          <FaLockOpen />
                        ) : (
                          <FaLock />
                        )}
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AdminDialog
        open={open}
        header={headerToEdit}
        data={editData}
        onClose={handleCloseAction}
        action={action}
        item={item}
      />
    </div>
  );
}

export default ViewTable;
