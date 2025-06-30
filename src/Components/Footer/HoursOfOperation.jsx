import CoffeeCup from "../../assets/coffeeCup.png";
import { formatTime12Hour, useSiteSettings } from "../../Contexts/SiteSettingsContext";

export default function HoursOfOperation() {
  const { siteSettings } = useSiteSettings();
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img src={CoffeeCup} alt="" className="w-[150px] h-[150px]" />
        <h1 className="txt3 font-bold text-sm">Hours Of Operation</h1>
      </div>
      <h3 className="txt4 font-bold">
        <span className="text-4xl">Every Day</span>
        <span className="text-sm">
          <br /> From {formatTime12Hour(siteSettings.openAt)}
          <br /> To {formatTime12Hour(siteSettings.closedAt)}
        </span>
      </h3>
    </div>
  );
}
