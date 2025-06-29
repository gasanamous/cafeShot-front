import React, { useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import coffee from "../../assets/healthy.png";
import "./Login.css";
import "../../App.css";
import APIService from "../../utils/api";
import { useAdmin } from "../../Contexts/AdminContext";
import { useWaiter } from "../../Contexts/WaiterContext";

export default function LoginCard() {
  const navigate = useNavigate();
  const { setAdminToken, setRole: setAdminRole } = useAdmin();
  const { setWaiterToken, setRole: setWaiterRole } = useWaiter();
  const [newAdmin, setNewAdmin] = useState({
    loginId: "",
    accountPassword: "",
  });
  const handleToSubmit = async () => {
    const response = await APIService.post("/manager/login", newAdmin);
    const token = response.data.ACCESS_TOKEN;
    const role = response.data.role.toLowerCase();
    console.log(response);
    localStorage.setItem("Token", token);
    localStorage.setItem("role", role);

    if (role === "admin") {
      setAdminRole(role);
      setAdminToken(token);
      navigate("/DashBoard");
    } else if (role === "waiter") {
      setWaiterRole(role);
      setWaiterToken(token);
      navigate("/CafeTables");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center txt4 bg-primary rounded-[15px]  p-5 w-full">
      <div className="flex justify-center items-center flex-row">
        <img src={coffee} alt="" className="w-[40px] h-[40px]" />
        <h1 className="txt4 m-1 text-center"> Administrator Access Only</h1>
        <img src={coffee} alt="" className="w-[40px] h-[40px]" />
      </div>

      <label className="ml-5 w-full text-left m-1">Login ID</label>
      <input
        className="border-2 rounded-xl border-[#704123] w-full p-2 mb-5 bg-primary"
        placeholder="Enter your Email or ID"
        value={newAdmin.loginId}
        onChange={(event) => {
          setNewAdmin({ ...newAdmin, loginId: event.target.value });
        }}
      />

      <label className="ml-5 w-full text-left mb-1">Password</label>
      <input
        className="border-2 rounded-xl border-[#704123] w-full p-2 mb-5 bg-primary"
        type="password"
        placeholder="Enter your Password"
        value={newAdmin.accountPassword}
        onChange={(event) => {
          setNewAdmin({ ...newAdmin, accountPassword: event.target.value });
        }}
      />
      <button
        type="submit"
        className="w-1/2 p-2 mt-5 mb-5 box-shadow rounded-[15px] cursor-pointer login"
        onClick={handleToSubmit}
      >
        Login
      </button>
    </div>
  );
}
