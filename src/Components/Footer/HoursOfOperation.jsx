import CoffeeCup from "../../assets/coffeeCup.png";
import { formatTime12Hour, useSiteSettings } from "../../Contexts/SiteSettingsContext";

export default function HoursOfOperation() {
  const { siteSettings } = useSiteSettings();
  return (
    <div className="flex flex-col justify-center items-center text-center px-4">
      <img src={CoffeeCup} alt="" className="w-[120px] h-[120px] mb-2" />
      <h1 className="txt3 font-bold text-lg mb-1">Hours Of Operation</h1>
      <h3 className="txt4 font-bold">
        <div className="text-xl">Every Day</div>
        <div className="text-sm">
          From {formatTime12Hour(siteSettings.openAt)} <br />
          To {formatTime12Hour(siteSettings.closedAt)}
        </div>
      </h3>
    </div>
  );
}
