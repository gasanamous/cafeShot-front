import coffeeTime from "../../assets/coffeeTime.png";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import InstagramIcon from "@mui/icons-material/Instagram";
import DiamondIcon from "@mui/icons-material/Diamond";
import "../../App.css";
import "./Footer.css";
export default function CoffeeTime() {
  return (
    <div className="w-[220px] h-[220px] rounded-full bg-secondary-trans flex flex-col items-center justify-between p-4">
      <div className="flex flex-col items-center justify-center">
        <img src={coffeeTime} alt="" className="w-[80px] h-[80px]" />
        <h1 className="text-sm mt-2 txt1">Coffee Shot . 2025</h1>
        <div className="flex items-center w-full mt-2">
          <hr className="flex-1 border-t-2 border-[#704123]" />
          <DiamondIcon className="mx-2 txt3" />
          <hr className="flex-1 border-t-2 border-[#704123]" />
        </div>
      </div>
      <div className="flex space-x-4 mt-2">
        <div className="border-2 rounded-full border-[#704123] facebook">
          <FacebookSharpIcon className="m-1 txt1" />
        </div>
        <div className="border-2 rounded-full border-[#704123] instagram">
          <InstagramIcon className="m-1 txt1" />
        </div>
      </div>
    </div>
  );
}
