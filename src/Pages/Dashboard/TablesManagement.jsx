import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import AdminAddForm from "../../Components/AdminAddForm/AdminAddForm";
import ViewTable from "../../Components/ViewTable/ViewTable";
import APIService from "../../utils/api";
import Loader from "../../Components/Loader/Loader";

function TablesManagement() {
  const [tables, setTables] = useState([]);
  const headerToView = [
    { name: "_id", type: "text" },
    { name: "floor", type: "text" },
    { name: "status", type: "text" },
    { name: "tableQR", type: "file" },
  ];
  const headerToEdit = [
    { name: "tableId", type: "text", required: true },
    {
      name: "floor",
      type: "select",
      options: ["0", "1", "2", "3"],
      required: true,
    },
    { name: "tableQR", type: "file", required: true },
  ];
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenAction = () => {
    setOpenForm(true);
  };
  const handleCloseAction = () => {
    setOpenForm(false);
  };
  const getTables = async () => {
    setLoading(true);
    try {
      const data = await APIService.get(`/table/all`, true, "admin");
      setTables(
        data.tables.sort((a, b) => {
          const numA = parseInt(a._id.split("_")[1]);
          const numB = parseInt(b._id.split("_")[1]);
          return numA - numB;
        })
      );
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getTables();
    const update = () => {
      getTables();
    };

    window.addEventListener("update", update);

    return () => {
      window.removeEventListener("update", update);
    };
  }, [openForm]);
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleOpenAction}
        className="flex txt3 border rounded-2xl p-2 justify-center items-center bg-primary gap-2 w-fit ml-auto"
      >
        Add New
        <IoAddCircleOutline className="w-[30px] h-[30px] cursor-pointer" />
      </button>
      <AdminAddForm
        open={openForm}
        onClose={handleCloseAction}
        header={headerToEdit}
        item="table"
      />
      {loading ? (
        <Loader />
      ) : (
        <ViewTable
          headerToView={headerToView}
          headerToEdit={headerToEdit}
          array={tables}
          item="table"
        />
      )}
    </div>
  );
}

export default TablesManagement;
