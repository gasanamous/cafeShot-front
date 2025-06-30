export default function CoffeeMood() {
  return (
    <div className="relative w-full h-80">
      <div className="flex w-full h-full">
        <img
          src="https://fruitbasket.limepack.com/blog/wp-content/uploads/2024/03/modern-cafe-house.jpg"
          alt="mood 2"
          className="w-1/2 h-full object-cover"
        />
        <img
          src="https://www.dubaiparksandresorts.com/sites/default/files/2024-11/DSC09443%201.JPG"
          alt="mood 1"
          className="w-1/2 h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="text-center fontLogo txt1 text-2xl sm:text-[40px] font-semibold bg-secondary-trans py-4 w-full"
          style={{ textShadow: "2px 2px 4px #30261e" }}
        >
          Enjoy a warm atmosphere and soothing music <br />
          with your favorite cup of coffee
        </h1>
      </div>
    </div>
  );
}
