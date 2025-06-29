import NotificationsIcon from "@mui/icons-material/Notifications";
import { playBellAudio } from "../../utils/services";
import APIService from "../../utils/api";

export default function Bell() {

  const callWaiter = async () => {

    const url = `contact/call-waiter/${localStorage.getItem("tableId")}`;
    await APIService.post(url, {}, false)
    playBellAudio()
  }
  return (
    <div>
      <button onClick={callWaiter} className=" bg-secondary rounded-full w-[50px] h-[50px] border-2 border-primary cursor-pointer txt1">
        <NotificationsIcon
          style={{ color: "var(--color1)", fontSize: "30px" }}
        />
      </button>
    </div>
  );
}
