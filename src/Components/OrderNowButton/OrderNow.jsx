import logo from "../../assets/logo.svg";
export default function OrderNow({ handleClickOpen }) {
  return (
    <div>
      <button
        className=" rounded-l-[50px] border-2 border-primary p-[10px] flex txt1 bg-secondary cursor-pointer gap-3 items-center"
        onClick={handleClickOpen}
      >
        <img src={logo} className="w-[30px]" /> <p> Order Now</p>
      </button>
    </div>
  );
}
