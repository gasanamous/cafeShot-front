import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSiteSettings } from "../../Contexts/SiteSettingsContext";
export default function CoffeeInformation() {
  const { siteSettings } = useSiteSettings();

  return (
    <div className="flex flex-col items-start gap-3 px-4 text-left">
      <h1 className="txt4 font-bold text-xl">Coffee Shot Info</h1>

      <div className="flex items-center gap-2">
        <CallIcon className="txt3" />
        <span className="txt3">{siteSettings.phoneNumber}</span>
      </div>

      <div className="flex items-center gap-2">
        <EmailIcon className="txt3" />
        <span className="txt3">{siteSettings.email}</span>
      </div>

      <div className="flex items-center gap-2">
        <LocationOnIcon className="txt3" />
        <span className="txt3">{siteSettings.Location}</span>
      </div>
    </div>
  );
}
