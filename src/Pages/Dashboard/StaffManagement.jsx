import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import AdminAddForm from "../../Components/AdminAddForm/AdminAddForm";
import ViewTable from "../../Components/ViewTable/ViewTable";
import APIService from "../../utils/api";

function StaffManagement() {
  const headerToEdit = [
    { name: "accountEmail", type: "email" },
    { name: "accountPassword", type: "password" },
    { name: "firstName", type: "text" },
    { name: "lastName", type: "text" },
    { name: "phoneNumber", type: "tel" },
    { name: "role", type: "select", options: ["Waiter", "Admin"] },
    {
      name: "workingHours",
      type: "select",
      options: ["Morning shift", "Evening shift", "Full time"],
    },
  ];
  const headerToView = [
    { name: "managerId", type: "text" },
    { name: "firstName", type: "text" },
    { name: "lastName", type: "text" },
    { name: "accountEmail", type: "text" },
    { name: "status", type: "text" },
    { name: "createdAt", type: "text" },
    { name: "phoneNumber", type: "tel" },
    { name: "role", type: "text" },
    { name: "workingHours", type: "text" },
  ];
  const [openForm, setOpenForm] = useState(false);
  const [managers, setManagers] = useState([]);
  const getManagers = async () => {
    try {
      const data = await APIService.get(`/manager/allmanagers`, true, "admin");
      setManagers(data?.managers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getManagers();
    const update = () => {
      getManagers();
    };

    window.addEventListener("update", update);

    return () => {
      window.removeEventListener("update", update);
    };
  }, [openForm]);

  const handleOpenAction = () => {
    setOpenForm(true);
  };
  const handleCloseAction = () => {
    setOpenForm(false);
  };

  return (
    <div className="w-full overflow-hidden flex flex-col gap-3">
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
        item="manager"
      />
      <ViewTable
        headerToView={headerToView}
        headerToEdit={headerToEdit}
        array={managers}
        item="manager"
      />
    </div>
  );
}

export default StaffManagement;
