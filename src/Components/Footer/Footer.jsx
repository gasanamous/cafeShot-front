import React from "react";
import "../../App.css";
import "./Footer.css";
import HoursOfOperation from "./HoursOfOperation";
import CoffeeTime from "./CoffeeTime";
import CoffeeInformation from "./CoffeeInformation";
function Footer() {
  return (
    <div className="bg-primary flex txt4 justify-center items-center flex-col">
      <div className="md:grid md:grid-cols-3  md:w-full flex flex-col justify-center w-full items-center">
        <HoursOfOperation />
        <CoffeeTime />
        <CoffeeInformation />
      </div>
      <hr className="w-[90%] mb-2 border-1" />
    </div>
  );
}

export default Footer;
