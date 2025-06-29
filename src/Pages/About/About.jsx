import { Box, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { DiCoffeescript } from "react-icons/di";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function About() {
  const fadeInUp = {
    offscreen: { opacity: 0, y: 40 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.6,
        duration: 1,
      },
    },
  };
  const fadeIn = {
    offscreen: { opacity: 0 },
    onscreen: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };
  const food = [
    {
      img: "https://fruitbasket.limepack.com/blog/wp-content/uploads/2024/03/pexels-jason-toevs-2068296.jpg",
      title: "Espresso",
    },
    {
      img: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/314D11A6-4457-4C70-A1BE-A6C25F597C18/Derivates/B362DC69-6AAA-43E1-AF51-184463E8551B.jpg",
      title: "latte",
    },
    {
      img: "https://www.gaggia.com/app/uploads/2021/10/780x520-2.jpg",
      title: "coffee-Espresso",
    },
    {
      img: "https://dam.mediacorp.sg/image/upload/s--20pxjT5b--/c_crop,h_1191,w_2119,x_1,y_112/c_fill,g_auto,h_676,w_1200/f_auto,q_auto/v1/mediacorp/cna/image/2023/10/25/mithai_indian_sweet_istock-1054228718.jpg?itok=XUnmGuFI",
      title: "sweets",
    },
    {
      img: "https://www.sargento.com/assets/Uploads/Recipe/Image/Sargento11501.jpg",
      title: "Sargento",
    },
    {
      img: "https://iamhomesteader.com/wp-content/uploads/2024/07/Spicy-Chicken-Sandwich-3.jpg",
      title: "burger",
    },
    {
      img: "https://zhangcatherine.com/wp-content/uploads/2022/03/strawberry-roll-cake.jpg",
      title: "strawberry-roll",
    },
  ];
  const view = [
    {
      img: "https://fruitbasket.limepack.com/blog/wp-content/uploads/2024/03/modern-cafe-house.jpg",
      title: "cafe",
    },

    {
      img: "https://shop.darkwoodscoffee.co.uk/cdn/shop/files/Darkwoods_CafeSpace_SteveLovatt_WebRes-8_a23077cf-f7a3-4d48-ae56-61c8c5e900f7.jpg?v=1737982740&width=1946",
      title: "cafe",
    },
    {
      img: "https://www.dubaiparksandresorts.com/sites/default/files/2024-11/DSC09443%201.JPG",
      title: "sunlight",
    },
    {
      img: "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto:eco/sitecoremedialibrary/media-library/images/central%20marketing%20team/for%20the%20ride/experiences/fve%20update/cafe/fve-cafe-hero-1920x1080.jpg",
      title: "coffeeshop",
    },

    {
      img: "https://www.thetinroofcafe.co.uk/uploads/hero/_1600x800_fit_center-center_80_none/maldon-cafe-tinroof-caferia-and-bakery.jpg",
      title: "cafe",
    },
    {
      img: "https://www.upmenu.com/wp-content/uploads/2024/04/nafinia-putra-Kwdp-0pok-I-unsplash.jpg",
      title: "sunlight",
    },
    {
      img: "https://static-content.owner.com/funnel/images/c7085d0a-282f-4aca-9117-9f4750e2fa6c?v=1753072481&w=3840&q=80&auto=format",
      title: "cafe",
    },
  ];
  return (
    <div className="flex flex-col gap-10 py-6 min-h-screen justify-center items-center">
      <motion.h2
        className="txt4 text-4xl font-extrabold"
        variants={fadeInUp}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.6 }}
      >
        About Us
      </motion.h2>
      <motion.div
        className="container flex lg:flex-row flex-col-reverse gap-6"
        variants={fadeInUp}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.5 }}
      >
        <p className="text-xl flex flex-col gap-4">
          In the heart of the city, where footsteps echo and stories unfold with
          every passing hour, we built more than just a café — we built a
          sanctuary. Amidst the swirl of urban chaos, our space offers a pause,
          a breath, a sip of something warm and genuine. Here, coffee is not
          just a drink — it is a ritual. We source our beans from sustainable
          farms, roast them with precision, and serve them with a smile that
          says: "You're home now." Designed with warmth and intention, our café
          is a blend of rustic wood, soft lighting, and cozy corners. It’s a
          place where time slows down, conversations deepen, and inspiration
          flows as freely as the espresso.
          <NavLink
            to="/LocationContact"
            className="lg:text-xl rounded-bl-3xl rounded-tr-3xl rounded-xl bg-secondary txt1 w-fit p-3 text-center"
          >
            Location & Contact
          </NavLink>
        </p>
        <Box>
          <ImageList variant="masonry" cols={3} gap={8}>
            {view.map((item) => (
              <ImageListItem key={item.img}>
                <motion.img
                  whileTap={{ scale: 0.95 }}
                  srcSet={`${item.img}?w=400&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=400&fit=crop&auto=format`}
                  alt={item.title}
                  
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </motion.div>
      <motion.div
        variants={fadeIn}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        className="relative w-full min-h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://thehuntr-prod.s3.me-central-1.amazonaws.com/places/95/gallery/friends-avenue-dubai-l-1-64699.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="relative z-10 px-8 text-center max-w-3xl">
          <p className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed tracking-wide drop-shadow-lg">
            {" "}
            Whether you’re chasing a deadline, catching up with an old friend,
            or simply sitting in silence,{" "}
            <strong className="text-secondary font-bold">
              Our café is your companion in the rhythm of life.
            </strong>
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="relative lg:h-[220px] h-[150px] flex justify-center w-full bg-primary "
      >
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
          viewport={{ amount: 0.5 }}
          src={`beans.png`}
          className="absolute lg:w-[200px] w-[100px] right-0 top-auto bottom-auto"
        />
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
          viewport={{ amount: 0.8 }}
          src={`beans.png`}
          className="absolute lg:w-[200px] w-[100px] left-0 top-auto bottom-auto scale-x-[-1]"
        />
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
          viewport={{ once: true, amount: 0.8 }}
          className="lg:text-2xl md:text-xl flex flex-col gap-4 justify-center lg:w-[70%] md:w-[60%] w-[50%] text-center"
        >
          We select coffee beans from sustainable farms around the world and
          roast them expertly in our own roastery, so they arrive fresh and
          aromatic.
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        viewport={{ amount: 0.5 }}
        className="container flex lg:flex-row flex-col-reverse gap-6"
      >
        <Box>
          <ImageList variant="masonry" cols={3} gap={8}>
            {food.map((item) => (
              <ImageListItem key={item.img}>
                <motion.img
                  whileTap={{ scale: 0.95 }}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Box className="flex flex-col gap-10 mt-4 items-center">
          <h2 className="txt4 text-4xl font-extrabold">Our Menu</h2>
          <p className="text-xl text-center w-[80%]">
            From strong espressos to warming lattes, we offer a selection of hot
            and cold beverages, as well as freshly baked goods to make your day.
            Explore our menu and taste the difference.
          </p>
          <NavLink
            to="/Menu/All"
            className="lg:text-xl rounded-bl-3xl rounded-tr-3xl rounded-xl bg-secondary txt1 w-fit p-3 text-center"
          >
            Explore Our Menu
          </NavLink>
        </Box>
      </motion.div>
    </div>
  );
}

export default About;
