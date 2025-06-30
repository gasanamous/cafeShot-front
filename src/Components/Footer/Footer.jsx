import React from "react";
import "../../App.css";
import "./Footer.css";
import HoursOfOperation from "./HoursOfOperation";
import CoffeeTime from "./CoffeeTime";
import CoffeeInformation from "./CoffeeInformation";
function Footer() {
  return (
    <div className="bg-primary flex flex-col txt4 items-center py-6 px-4">
      <div className="flex flex-col md:flex-row md:gap-6 justify-between w-full max-w-6xl items-start md:items-center">
        <div className="flex-1 min-w-[250px] flex justify-center">
          <HoursOfOperation />
        </div>
        <div className="flex-1 min-w-[250px] flex justify-center">
          <CoffeeTime />
        </div>
        <div className="flex-1 min-w-[250px] flex justify-center">
          <CoffeeInformation />
        </div>
      </div>
      <hr className="w-full max-w-6xl mt-6 border border-gray-400" />
    </div>
  );
}

export default Footer;
