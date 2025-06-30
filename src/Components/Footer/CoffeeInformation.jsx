import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSiteSettings } from "../../Contexts/SiteSettingsContext";
export default function CoffeeInformation() {
  const { siteSettings } = useSiteSettings();

  return (
    <div className="flex flex-col justify-center items-start">
      <h1 className="txt4 font-bold text-2xl mb-2">Coffee Shot Info</h1>
      <div className="flex flex-row justify-center items-center m-1 ">
        <CallIcon className="txt3" />
        <h3 className="ml-2 txt3 contact">{siteSettings.phoneNumber}</h3>
      </div>
      <div className="flex flex-row justify-center items-center m-1 ">
        <EmailIcon className="txt3" />
        <h3 className="ml-2 txt3 contact">{siteSettings.email}</h3>
      </div>
      <div className="flex flex-row justify-center items-center m-1 ">
        <LocationOnIcon className="txt3 " />
        <h3 className="txt3 contact">{siteSettings.Location}</h3>
      </div>
    </div>
  );
}
