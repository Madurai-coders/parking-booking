import React, { useState } from "react";
import Menu from "../../assets/images/Menu.svg";
import "../../assets/css/navbar/navbar_bigscreen.css";
import Booking from "../../assets/images/Booking.svg";
import Bookingreport from "../../assets/images/Bookingreport.svg";
import payment from "../../assets/images/Accountreport.svg";
import Parkingsetup from "../../assets/images/Parkingsetup.svg";
import Logout from "../../assets/images/Logout.svg";

import User_report from "../../assets/images/userreport.svg";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { set } from "js-cookie";

export default function Navbarbigscreen(props) {
  const [expand, setExpand] = useState(false);
  const [expandb_bar, setExpandBar] = useState(false);
  const [current_page, setCurrentpage] = useState("booking");
  const [logout_popup, setlogout_popup] = useState();

  function handleExpand() {
    setExpand(!expand);
  }

  function handleContract() {
    if(expand){
    setExpand(false);}
    if(!expand){
    setTimeout(() => {
      setExpand(!expand);
    }, 220);}
  }

  return (
    <>
      <AnimatePresence>
        {logout_popup && (
          <div className="overlay">
            {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Logout
                  </h5>
                  <button
                    type="button"
                    onClick={() => setlogout_popup(false)}
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">Are your sure?</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    onClick={() => setlogout_popup(false)}
                    class="btn btn-light btn-sm"
                    data-bs-dismiss="modal"
                  >
                    Cancle
                  </button>
                  <button
                    type="button"
                    onClick={props.logout}
                    class="btn btn-danger btn-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        )}
        {true && (
          <div
            className= {'Navbigscreen_container' + ' ' + (expandb_bar && 'Navbigscreen_container_active')}
           
          >
            <div>
              <ul className="Navbigscreen_list">
                <li
                  className="Navbigscreen_menu_noexpand pt-1"
                  onClick={() => {
                    setExpandBar(!expandb_bar);
                   handleContract()
                    
                  }}
                >
                  <img
                    src={Menu}
                    className="Navbigscreen_menu_img "
                    alt="Munidex_Parking_Menu"
                  />
                </li>
                <Link
                  to="/admin"
                  style={{ textDecoration: "none" }}
                  onClick={() => setCurrentpage("booking")}
                >
                  <li
                    className={
                      current_page == "booking"
                        ? "Navbigscreen_listitem_booking_noexpand_active"
                        : "Navbigscreen_listitem_booking_noexpand"
                    }
                  >
                    <img
                      src={Booking}
                      className={
                        current_page == "booking"
                          ? "Navbigscreen_listitem_booking_img_active"
                          : "Navbigscreen_listitem_booking_img"
                      }
                      alt="Munidex_Parking_booking"
                    />
                    {expand && (
                      <span
                        className={
                          current_page == "booking"
                            ? "Navbigscreen_listitem_booking_text_active"
                            : "Navbigscreen_listitem_booking_text"
                        }
                      >
                        Booking
                      </span>
                    )}
                  </li>
                </Link>
                <Link
                  to="AdmindashboardBookingreport"
                  style={{ textDecoration: "none" }}
                  onClick={() => setCurrentpage("bookingreport")}
                >
                  <li
                    className={
                      current_page == "bookingreport"
                        ? "Navbigscreen_listitem_bookingreport_noexpand_active"
                        : "Navbigscreen_listitem_bookingreport_noexpand"
                    }
                  >
                    <img
                      src={Bookingreport}
                      className={
                        current_page == "bookingreport"
                          ? "Navbigscreen_listitem_bookingreport_img_active"
                          : "Navbigscreen_listitem_bookingreport_img"
                      }
                      alt="Munidex_parking_Booking_Report"
                    />
                    
                    {expand && (
                      <span
                        className={
                          current_page == "bookingreport"
                            ? "Navbigscreen_listitem_bookingreport_text_active"
                            : "Navbigscreen_listitem_bookingreport_text"
                        }
                      >
                        Booking Report
                        
                      </span>
                    )}
                  </li>
                </Link>
                <Link
                  to="Admindashboardpayment"
                  style={{ textDecoration: "none" }}
                  onClick={() => setCurrentpage("payment")}
                >
                  <li
                    className={
                      current_page == "payment"
                        ? "Navbigscreen_listitem_payment_noexpand_active"
                        : "Navbigscreen_listitem_payment_noexpand"
                    }
                  >
                    <img
                      src={payment}
                      className={
                        current_page == "payment"
                          ? "Navbigscreen_listitem_payment_img_active"
                          : "Navbigscreen_listitem_payment_img"
                      }
                      alt="Munidex_parking_payment"
                    />
                   
                    {expand && (
                      <span
                        className={
                          current_page == "payment"
                            ? "Navbigscreen_listitem_payment_text_active"
                            : "Navbigscreen_listitem_payment_text"
                        }
                      >
                        Payment
                        
                      </span>
                      
                    )}
                  </li>
                </Link>
                <Link
                  to="AdmindashboardParkingsetup"
                  style={{ textDecoration: "none" }}
                  onClick={() => setCurrentpage("parkingsetup")}
                >
                  <li
                    className={
                      current_page == "parkingsetup"
                        ? "Navbigscreen_listitem_parkingsetup_noexpand_active"
                        : "Navbigscreen_listitem_parkingsetup_noexpand"
                    }
                  >
                    <img
                      src={Parkingsetup}
                      className={
                        current_page == "parkingsetup"
                          ? "Navbigscreen_listitem_parkingsetup_img_active"
                          : "Navbigscreen_listitem_parkingsetup_img"
                      }
                      alt="Munidex_parking_Parking_setup"
                    />
                    {expand && (
                      <span
                        className={
                          current_page == "parkingsetup"
                            ? "Navbigscreen_listitem_parkingsetup_text_active"
                            : "Navbigscreen_listitem_parkingsetup_text"
                        }
                      >
                        Parking Setup
                      </span>
                    )}
                  </li>
                </Link>
                <Link
                  to="AdmindashboardUserreport"
                  style={{ textDecoration: "none" }}
                  onClick={() => setCurrentpage("userreport")}
                >
                  <li
                    className={
                      current_page == "userreport"
                        ? "Navbigscreen_listitem_userreport_noexpand_active"
                        : "Navbigscreen_listitem_userreport_noexpand"
                    }
                  >
                    <img
                      src={User_report}
                      className={
                        current_page == "userreport"
                          ? "Navbigscreen_listitem_userreport_img_active"
                          : "Navbigscreen_listitem_userreport_img"
                      }
                      alt="Munidex_parking_userreport_setup"
                    />
                    {expand && (
                      <span
                        className={
                          current_page == "userreport"
                            ? "Navbigscreen_listitem_userreport_text_active"
                            : "Navbigscreen_listitem_userreport_text"
                        }
                      >
                        User Report
                      </span>
                    )}
                  </li>
                </Link>
              </ul>
            </div>

            

            <div
              onClick={() => (setlogout_popup(true), setExpand(false))}
              className="Navbigscreen_listitem_logout_noexpand"
            >
                
              <img
                src={Logout}
                className="Navbigscreen_listitem_logout_img"
                alt="Munidex_parking_logout"
              />
              {expand && (
                <span
                  className="Navbigscreen_listitem_logout_text"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </span>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
       
      </AnimatePresence>
    </>
  );
}
