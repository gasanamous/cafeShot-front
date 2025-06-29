import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function CoffeeInformation() {
  return (
    <div className="flex flex-col justify-center items-start">
      <h1 className="txt4 font-bold text-2xl mb-2">Coffee Shot Info</h1>
      <div className="flex flex-row justify-center items-center m-1 ">
        <CallIcon className="txt3" />
        <h3 className="ml-2 txt3 contact">0599123456</h3>
      </div>
      <div className="flex flex-row justify-center items-center m-1 ">
        <EmailIcon className="txt3" />
        <h3 className="ml-2 txt3 contact">coffee122@gmail.com</h3>
      </div>
      <div className="flex flex-row justify-center items-center m-1 ">
        <LocationOnIcon className="txt3 " />
        <h3 className="txt3 contact">Rawabi Asal</h3>
      </div>
    </div>
  );
}
