import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import socket from "../socket/socket";
import OrderNotification from "../Components/Notification/OrderNotification";
import BellNotification from "../Components/Notification/BellNotification";
import { playOrderNotificationAudio } from "../utils/services";
import { toast } from "react-toastify";

function Root() {

  const location = useLocation()
  useEffect(() => {

    if (socket) {
      const toastProps = {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

      }
      socket.on('newOrder', orderDetails => {

        toast.info(
          <OrderNotification orderDetails={orderDetails} />, { ...toastProps }
        )
        playOrderNotificationAudio()
      })

      socket.on('callWaiter', message => {
        toast.info(
          <BellNotification message={message} />,
          { ...toastProps, icon: null }
        )
      })
    }

  }, [location.pathname])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
