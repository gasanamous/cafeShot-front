import CoffeeCup from "../../assets/coffeeCup.png";
export default function HoursOfOperation() {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img src={CoffeeCup} alt="" className="w-[150px] h-[150px]" />
        <h1 className="txt3 font-bold text-sm">Hours Of Operation</h1>
      </div>
      <h3 className="txt4 font-bold">
        <span className="text-4xl">Every Day</span>
        <span className="text-sm">
          <br /> From 12:00 PM
          <br /> To 12:00 AM
        </span>
      </h3>
    </div>
  );
}
