import React from "react";
import CurrentOrder from "../../Components/CurrentOrder/CurrentOrder";
import SubmittedOrders from "../../Components/SubmittedOrders/SubmittedOrders";

function Order() {
  return (
    <div>
      <div className="container min-h-screen">
        <CurrentOrder />
        <SubmittedOrders />
      </div>
    </div>
  );
}

export default Order;
