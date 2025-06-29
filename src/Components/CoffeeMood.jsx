import Mood1 from "../assets/CoffeeMood/Mood1.png";
import Mood2 from "../assets/CoffeeMood/Mood2.png";
export default function CoffeeMood() {
  return (
    <div className="relative w-full h-screen">
      <div className="flex w-full h-full blur-sm">
        <img src={Mood2} alt="mood 2" className="w-1/2 h-full object-cover" />
        <img src={Mood1} alt="mood 1" className="w-1/2 h-full object-cover" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="text-center fontLogo text-[#F8F4E1] text-[50px] font-semibold"
          style={{ textShadow: "2px 2px 4px #543310" }}
        >
          Enjoy a warm atmosphere and soothing music <br />
          with your favorite cup of coffee
        </h1>
      </div>
    </div>
  );
}
