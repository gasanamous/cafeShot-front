import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import MenuItem from "../../Pages/Menu/MenuItem";

function FavouritesSwiper({ favouriteDrinks, isSmallScreen }) {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={isSmallScreen ? 10 : 20}
      slidesPerView={isSmallScreen ? 1.1 : 3.5}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      centeredSlides={false}
    >
      {favouriteDrinks?.map((drink) => (
        <SwiperSlide key={drink.productId} className="p-2">
          <MenuItem menuItem={drink} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default FavouritesSwiper;
