import React, { useEffect, useState } from "react";
import TableCard from "./TableCard";
import TableDialog from "./TableDialog";
import APIService from "../../utils/api";

function CafeTables() {
  const [open, setOpen] = useState(false);
  const [tableToHandle, setTableToHandle] = useState({});
  const [listTables, setListTables] = useState([]);
  const [groubedTables, setGroubedTables] = useState([]);
  const [isActive, setIsActive] = useState("All");

  useEffect(() => {
    const getListOfTables = async () => {
      const response = await APIService.get(
        `/table/tablesDetails`,
        true,
        "waiter"
      );
      const sortedTables = response.tablesWithOrders.sort((a, b) => {
        const numA = parseInt(a._id.split("_")[1]);
        const numB = parseInt(b._id.split("_")[1]);
        return numA - numB;
      });
      setListTables(sortedTables);
      const status = localStorage.getItem("groubedTables");
      if (!status || status === "All") {
        setGroubedTables(sortedTables);
      } else {
        setGroubedTables(sortedTables.filter((t) => t.status === status));
      }
    };
    getListOfTables();
    const updateTables = () => {
      getListOfTables();
    };

    window.addEventListener("tablessUpdated", updateTables);

    return () => {
      window.removeEventListener("tablessUpdated", updateTables);
    };
  }, []);

  const handleOpen = (tableId) => {
    const selectedTable = listTables.find((t) => tableId === t._id);
    setTableToHandle(selectedTable);
    setOpen(true);
  };
  const filterTables = (status) => {
    setIsActive(status);
    localStorage.setItem("groubedTables", status);
    if (status === "All") {
      setGroubedTables(listTables);
    } else {
      const selectedTables = listTables.filter((t) => status === t.status);
      setGroubedTables(selectedTables);
    }
  };
  return (
    <div className="p-6 bg-gray-50 container min-h-screen flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Tables & Orders</h1>
      <div className="mb-4 space-x-4 ml-auto">
        {["All", "Booked", "Available"].map((status) => (
          <button
            key={status}
            className={`p-4 rounded-xl shadow-md hover:scale-105 text-center ${
              isActive === status
                ? "underline font-bold bg-primary"
                : "bg-gray-100"
            }`}
            onClick={() => filterTables(status)}
          >
            {status} Tables
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {groubedTables &&
          groubedTables.map((table) => (
            <TableCard
              table={table}
              key={table.TableId}
              handleOpen={() => handleOpen(table._id)}
            />
          ))}
        <TableDialog open={open} setOpen={setOpen} table={tableToHandle} />
      </div>
    </div>
  );
}

export default CafeTables;
