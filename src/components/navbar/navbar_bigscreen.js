import React, { useState } from "react";
import Menu from "../../assets/images/Menu.svg";
import "../../assets/css/navbar/navbar_bigscreen.css";
import Booking from "../../assets/images/Booking.svg";
import Bookingreport from "../../assets/images/Bookingreport.svg";
import Accountreport from "../../assets/images/Accountreport.svg";
import Parkingsetup from "../../assets/images/Parkingsetup.svg";
import Logout from "../../assets/images/Logout.svg";
import User_report from "../../assets/images/userreport.svg"
import { Link } from "react-router-dom";

export default function Navbarbigscreen(props) {
  const [expand, setExpand] = useState(false);

  function handleExpand() {
    setExpand(!expand);
  }

  function handleContract() {
    setExpand(!expand);
  }

  return (
    <>
      {!expand && (
        <div className="Navbigscreen_container">
          <div>
            <ul className="Navbigscreen_list">
              <li className="Navbigscreen_menu_noexpand" onClick={handleExpand}>
                <img
                  src={Menu}
                  className="Navbigscreen_menu_img"
                  alt="Munidex_Parking_Menu"
                />
              </li>
              <Link to='/admin'>
              <li className="Navbigscreen_listitem_booking_noexpand">
                <img
                  src={Booking}
                  className="Navbigscreen_listitem_booking_img"
                  alt="Munidex_Parking_booking"
                />
              </li>
              </Link>
              <Link to = "AdmindashboardBookingreport">
              <li className="Navbigscreen_listitem_bookingreport_noexpand">
                <img
                  src={Bookingreport}
                  className="Navbigscreen_listitem_bookingreport_img"
                  alt="Munidex_parking_Booking_Report"
                />
              </li>
              </Link>
              <Link to="Admindashboardpayment">
              <li className="Navbigscreen_listitem_accountreport_noexpand">
                <img
                  src={Accountreport}
                  className="Navbigscreen_listitem_accountreport_img"
                  alt="Munidex_parking_Account_Report"
                />
              </li>
              </Link>
              <Link to = 'AdmindashboardParkingsetup'>
              <li className="Navbigscreen_listitem_parkingsetup_noexpand">
                <img
                  src={Parkingsetup}
                  className="Navbigscreen_listitem_parkingsetup_img"
                  alt="Munidex_parking_Parking_setup"
                />
              </li>
              </Link>
              <Link to = 'AdmindashboardUserreport' >
              <li className="Navbigscreen_listitem_parkingsetup_noexpand">
                <img
                  src={User_report}
                  className="Navbigscreen_listitem_parkingsetup_img"
                  alt="Munidex_parking_Parking_setup"
                />
              </li>
              </Link>
            </ul>
          </div>

          <div onClick={props.logout} className="Navbigscreen_listitem_logout_noexpand">
            <img
              src={Logout}
              className="Navbigscreen_listitem_logout_img"
              alt="Munidex_parking_logout"
            />
          </div>
        </div>
      )}

      {expand && (
        <div className="Navbigscreen_container" style={{ width: "13vw" }}>
          <div>
            <ul className="Navbigscreen_list">
              <li className="Navbigscreen_menu" onClick={handleContract}>
                <img
                  src={Menu}
                  className="Navbigscreen_menu_img"
                  alt="Munidex_Parking_Menu"
                />
              </li>
              <Link to = 'admin' style={{textDecoration:"none"}}>
              <li className="Navbigscreen_listitem_booking">
                <img
                  src={Booking}
                  className="Navbigscreen_listitem_booking_img"
                  alt="Munidex_Parking_booking"
                />
                <span className="Navbigscreen_listitem_booking_text">
                  Booking
                </span>
              </li>
              </Link>
              <Link to = "AdmindashboardBookingreport" style={{textDecoration:"none"}}>
              <li className="Navbigscreen_listitem_bookingreport">
                <img
                  src={Bookingreport}
                  className="Navbigscreen_listitem_bookingreport_img"
                  alt="Munidex_parking_Booking_Report"
                />
                <span className="Navbigscreen_listitem_bookingreport_text">
                  Booking Report
                </span>
              </li>
              </Link>
              <Link to="Admindashboardpayment" style={{textDecoration:"none"}}>
              <li className="Navbigscreen_listitem_accountreport">
                <img
                  src={Accountreport}
                  className="Navbigscreen_listitem_accountreport_img"
                  alt="Munidex_parking_Account_Report"
                />
                <span className="Navbigscreen_listitem_accountreport_text">
                  Payment
                </span>
              </li>
              </Link>
              <Link to = 'AdmindashboardParkingsetup' style={{textDecoration:"none"}}>
              <li className="Navbigscreen_listitem_parkingsetup">
                <img
                  src={Parkingsetup}
                  className="Navbigscreen_listitem_parkingsetup_img"
                  alt="Munidex_parking_Parking_setup"
                />
                <span className="Navbigscreen_listitem_parkingsetup_text">
                  Parking Setup
                </span>
              </li>
              </Link>
              <Link to = 'AdmindashboardUserreport' style={{textDecoration:"none"}}>
              <li className="Navbigscreen_listitem_userreport">
                <img
                  src={User_report}
                  className="Navbigscreen_listitem_userreport_img"
                  alt="Munidex_parking_user_report"
                />
                <span className="Navbigscreen_listitem_userreport_text">
                  User Report
                </span>
              </li>
              </Link>
            </ul>
          </div>
          <div className="Navbigscreen_listitem_logout" onClick={props.logout}>
            <img
              src={Logout}
              className="Navbigscreen_listitem_logout_img"
              alt="Munidex_parking_logout"
            />
            <span className="Navbigscreen_listitem_logout_text">Logout</span>
          </div>
        </div>
      )}
    </>
  );
}
