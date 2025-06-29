import React from "react";
import Contact from "../../Components/Contact/Contact";
import Location from "../../Components/Location/Location";

function LocationContact() {
  return (
    <div className="flex flex-col text-center items-center px-4 py-6 ">
      <h3 className="text-sm mb-2 txt3">We'd love to hear from you</h3>
      <h1 className="text-3xl md:text-5xl mb-6 txt4">Contact Us</h1>
      <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-6 md:w-[90%] w-full">
        <div className="w-full md:w-1/2">
          <Contact />
        </div>
        <div className="w-full md:w-1/2">
          <Location />
        </div>
      </div>
    </div>
  );
}

export default LocationContact;
