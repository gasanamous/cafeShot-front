import LoginCard from "./LoginCard";
import admin from "../../assets/manager.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex h-auto bg-secondary rounded-[20px] flex-row items-center justify-center box-shadow mx-auto m-10 xl:w-[55%] w-[95%] p-3 gap-5">
      <div className="hidden md:flex flex-row justify-between items-center gap-4">
        <img src={admin} alt="" className="w-[150px] h-[150px]" />
        <div className="text-[15px] txt1">
          <h1
            className="text-[45px] text-left"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.6)" }}
          >
            Welcome
          </h1>
          <p className="text-[18px]">
            Enter your credentials to continue.
          </p>
        </div>
      </div>
      <div className="">
        <LoginCard />
      </div>
    </div>
  );
}
