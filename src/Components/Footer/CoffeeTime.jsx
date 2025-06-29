import coffeeTime from "../../assets/coffeeTime.png";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import InstagramIcon from "@mui/icons-material/Instagram";
import DiamondIcon from "@mui/icons-material/Diamond";
import "../../App.css";
import "./Footer.css";
export default function CoffeeTime() {
  return (
    <div className="border-1 rounded-full w-[200px] h-[200px] flex flex-col justify-start items-center m-5 bg-secondary-trans">
      <div className="h-[50%] m-3 flex flex-col items-center justify-center">
        <img src={coffeeTime} alt="" className="w-[80px] h-[80px] mt-2" />
        <h1 className="text-sm mb-1 txt1">Coffee Shot . 2025</h1>
        <div className="flex flex-row items-center justify-center w-full mb-5">
          <hr className="w-full my-2 mx-auto border-t-[2px] border-[#704123]" />
          <DiamondIcon className="txt3" />
          <hr className="w-full my-2 mx-auto border-t-[2px] border-[#704123]" />
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="border-2 rounded-full border-[#704123] mr-2 facebook">
          <FacebookSharpIcon className="m-1 txt1" />
        </div>
        <div className="border-2 rounded-full border-[#704123] ml-2 instagram ">
          <InstagramIcon className="m-1 txt1" />
        </div>
      </div>
    </div>
  );
}
