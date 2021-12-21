import React, { useState } from "react";
import "../../assets/css/Booking/bookingsuccess.css";
import view from "../../assets/images/view.svg";
import print from "../../assets/images/print.svg";
import send from "../../assets/images/send.svg";
import tick from "../../assets/images/tick.svg";
import close from "../../assets/images/close.svg";

export default function Bookingsuccesspopup(props) {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        ''
      )}
    </>
  );
}
