import React, { useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import coffee from "../../assets/healthy.png";
import "./Login.css";
import "../../App.css";
import APIService from "../../utils/api";
import { useAdmin } from "../../Contexts/AdminContext";
import { useWaiter } from "../../Contexts/WaiterContext";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginCard() {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const { setAdminToken, setRole: setAdminRole } = useAdmin();
  const { setWaiterToken, setRole: setWaiterRole } = useWaiter();
  const [newAdmin, setNewAdmin] = useState({
    loginId: "",
    accountPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const handleToSubmit = async () => {
    setLoading(true);
    try {
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
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center txt4 bg-primary rounded-[15px]  p-5 w-full">
      <div className="flex justify-center items-center flex-row">
        <img src={coffee} alt="" className="w-[40px] h-[40px]" />
        <h1 className="txt4 m-1 text-center"> Administrator Access Only</h1>
        <img src={coffee} alt="" className="w-[40px] h-[40px]" />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <TextField
          label="Login ID"
          className="w-full "
          id="outlined-start-adornment"
          placeholder="Enter Your Login ID/email"
          value={newAdmin.loginId}
          onChange={(event) => {
            setNewAdmin({ ...newAdmin, loginId: event.target.value });
          }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment></InputAdornment>,
            },
          }}
        />
        <FormControl className=" w-full text-left" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={newAdmin.accountPassword}
            onChange={(event) => {
              setNewAdmin({ ...newAdmin, accountPassword: event.target.value });
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-1/2 p-2 mt-5 mb-5 box-shadow rounded-[15px] cursor-pointer login"
        onClick={handleToSubmit}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <span className="loaderButton"></span>
            <span>Logging in...</span>
          </div>
        ) : (
          "Login"
        )}
      </button>
    </div>
  );
}
