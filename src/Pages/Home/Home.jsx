import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import { NavLink } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import FavouritesSwiper from "../../Components/FavouritesSwiper/FavouritesSwiper";
import ReviewComponent from "../../Components/Review/ReviewComponent";
import CoffeeMood from "../../Components/CoffeeMood";
import FormDialog from "../../Components/FormDialog/FormDialog";
import coffee from "../../assets/header.png";
import coffee2 from "../../assets/header2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Bell from "../../Components/OrderNowButton/Bell";
import OrderNow from "../../Components/OrderNowButton/OrderNow";
import APIService from "../../utils/api";
import { useCustomer } from "../../Contexts/CustomerContext";
import QRDialog from "../../Components/QR_code/QRDialog";
import { useLocation } from "react-router-dom";

function Home() {
  const { setRole, customerToken } = useCustomer();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [openOptionDialog, setOpenOptionDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [favouriteDrinks, setFavouriteDrinks] = useState([]);

  const handleClickOpen = () => {
    setOpenOptionDialog(true);
  };

  const handleOptionSelect = (option) => {
    setOpenOptionDialog(false);
    if (option === "writeTableId") {
      setOpen(true);
    } else if (option === "qrCode") {
      setOpenQRDialog(true);
    }
  };

  const location = useLocation();

  useEffect(() => {
    /** if pathname contains tableId then automatic book a table */
    const bookTable = async (tableId) => {
      try {
        const response = await APIService.post("/table/booktable", { tableId });
        const token = response.data?.TABLE_ACCESS_TOKEN;
        localStorage.setItem("role", "customer");
        localStorage.setItem("TABLE_ACCESS_TOKEN", token);
        localStorage.setItem("tableId", tableId);
        localStorage.setItem("orderItems", "[]");
        setRole("customer");
      } catch (error) {
        console.log(error.response.data?.errMsg);
      }
    };

    const queryParams = new URLSearchParams(window.location.search);
    const tableId = queryParams.get("tableId");
    if (tableId) {
      bookTable(tableId);
    }
    const getDrinks = async () => {
      const data = await APIService.get(`/menu?series=Drink`);
      setFavouriteDrinks(data.menu);
    };
    getDrinks();
  }, [location.pathname]);

  return (
    <>
      <div className={`relative  bg-primary pb-6`}>
        {!customerToken ? (
          <div className="fixed right-0 -translate-y-1/2 z-50 flex flex-col gap-4 top-3/4">
            <OrderNow handleClickOpen={handleClickOpen} />
          </div>
        ) : (
          customerToken && (
            <div className="fixed right-0 -translate-y-1/2 z-50 flex flex-col gap-4 top-3/4">
              <Bell />
            </div>
          )
        )}

        {openOptionDialog && (
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-primary p-8 rounded-2xl shadow-lg w-[90%] max-w-2xl text-center">
              <h3 className="mb-6 text-1xl txt4">
                To book a table, please either enter the key provided on the
                table or scan the QR code using your device's camera.
              </h3>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button
                  className="flex-1 py-4 text-lg rounded-lg bg-secondary txt1 hover:opacity-90 transition-all"
                  onClick={() => handleOptionSelect("writeTableId")}
                >
                  Write Table ID
                </button>
                <button
                  className="flex-1 py-4 text-lg rounded-lg bg-secondary-trans txt1 hover:opacity-90 transition-all"
                  onClick={() => handleOptionSelect("qrCode")}
                >
                  Using QR Code
                </button>
              </div>
              <button
                className="mt-6 text-color4 underline"
                onClick={() => setOpenOptionDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <FormDialog open={open} setOpen={setOpen} />
        <QRDialog open={openQRDialog} setOpen={setOpenQRDialog} />

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          centeredSlides={false}
        >
          <SwiperSlide className="">
            <div className="container lg:grid grid-cols-2 flex flex-col-reverse mb-10 ">
              <div className="z-10 lg:w-2/3 txt4 flex items-start lg:ml-auto lg:mr-auto justify-center flex-col lg:gap-6 gap-3">
                <h2 className="lg:text-5xl text-3xl">
                  Best Coffee Taste, GreatCompany
                </h2>
                <h3 className="lg:text-2xl text-xl">
                  Your coffee, a moment of peace in a busy day
                </h3>
                <div
                  className={`${style.links} z-10 lg:text-xl txt1 flex lg:gap-6 gap-3`}
                >
                  {!customerToken && (
                    <button onClick={handleClickOpen}>Order Now</button>
                  )}
                  <NavLink to="/Menu/All">Explore Our Menu</NavLink>
                </div>
              </div>
              <img
                src={coffee}
                className="lg:w-3/4 w-1/2 mb-auto ml-auto mr-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="">
            <div className="container lg:grid grid-cols-2 flex flex-col mb-10 ">
              <img
                src={coffee2}
                className="lg:w-3/4 w-1/2 mb-auto ml-auto mr-auto"
              />
              <div className="z-10 lg:w-2/3 txt4 flex items-start lg:ml-auto lg:mr-auto justify-center flex-col lg:gap-6 gap-3">
                <h2 className="lg:text-5xl text-3xl">
                  Sip the Art of Coffee, Feel the Soul
                </h2>
                <h3 className="lg:text-2xl text-xl">
                  A journey of flavor, brewed with love and served with a smile
                </h3>
                <div
                  className={`${style.links} z-10 lg:text-xl txt1 flex lg:gap-6 gap-3`}
                >
                  {!customerToken && (
                    <button onClick={handleClickOpen}>Order Now</button>
                  )}
                  <NavLink to="/Menu/All">Explore Our Menu</NavLink>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="container my-10 border-y-4 txt1 py-4">
        <h2 className="fontLogo txt4 text-3xl mb-10">favourite drinks</h2>
        <FavouritesSwiper
          favouriteDrinks={favouriteDrinks}
          isSmallScreen={isSmallScreen}
        />
      </div>
      <CoffeeMood />
      <ReviewComponent />
    </>
  );
}

export default Home;
