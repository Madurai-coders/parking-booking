import "./respons_nav.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Booking from "../../assets/images/Booking.svg";
import Bookingreport from "../../assets/images/Bookingreport.svg";
import payment from "../../assets/images/Accountreport.svg";
import Parkingsetup from "../../assets/images/Parkingsetup.svg";
import Logout from "../../assets/images/Logout.svg";
import logo from "../../assets/images/navlogo.svg";
import { useHistory, Redirect } from "react-router-dom";

import User_report from "../../assets/images/userreport.svg";
import { useEffect } from "react";
function Respons_nav(props) {
  const [current_page, setCurrentpage] = useState();
  const [logout_popup, setlogout_popup] = useState();
  let history = useHistory();

  const addclass = () => {
    document.querySelector("#btn").classList.toggle("inactive");
    document.querySelector("#sidebar").classList.toggle("close");
    // document.querySelector("#logout").classList.toggle("change");
  };

  const addfnt = () => {
    document.querySelector("#sidebar").classList.add("close");
    document.querySelector("#btn").classList.toggle("inactive");
    // document.querySelector("#logout").classList.add("change");
  };

  const closefnt = () => {
    document.querySelector("#btn").classList.toggle("inactive");
    // document.querySelector("#logout").classList.toggle("change");
    document.querySelector("#sidebar").classList.toggle("close");
  };

  const dropdown = () => {
    document.querySelector("#submenu").classList.toggle("menuopen");
    document.querySelector("#arrow").classList.toggle("down");
  };

  const dropdown_1 = () => {
    document.querySelector("#submenu_1").classList.toggle("menuopen_1");
    document.querySelector("#arrow_1").classList.toggle("down_1");
  };

  return (
    <>
      {logout_popup && (
        <div className="overlay">
          {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Logout
                </h5>
                <button
                  type="button"
                  onClick={() => setlogout_popup(false)}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Are your sure?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setlogout_popup(false)}
                  className="btn btn-light btn-sm"
                  data-bs-dismiss="modal"
                >
                  Cancle
                </button>
                <button
                  type="button"
                    onClick={()=>(props.logout(),history.push("/admin"))}
                  className="btn btn-primary btn-sm"
                >
                  Logout
                </button>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      )}
      <div className="sidebar shadow-sm" id="sidebar">
        <div className="logo_cnt shadow-sm  ">
          <div className="logo d-flex justify-content-between ">
            <div>
              <span className="logo_name" id="logo_1">
                <img src={logo} id="btn" onClick={addclass}></img>
              </span>
            </div>
            {/* <div>
              <span className="logo_name" id="logo_1">
                <img src={logo} id="btn" onClick={addclass}></img>
              </span>
            </div> */}
            <div>
              <i
                className="fa fa-power-off"
                onClick={() => setlogout_popup(true)}
                style={{ fontSize: "20px", color: "grey", marginRight:'60px',marginTop:'7px',cursor:'pointer'}}
              ></i>
            </div>
          </div>
        </div>

        <ul className="nav_list">
          {/* <li className="sh">
            <a href="#">
              <i onClick={addfnt} id="bar" className=" search fa fa-search"></i>
              <input type="text" placeholder="Search..."></input>
            </a>
            <span className="tooltips">Search</span>
          </li> */}
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li className="dropdown select">
              <a
                href="#"
                onClick={() => setCurrentpage("Booking")}
                className={current_page == "Booking" && "sl"}
              >
                <i className="fa fa-bookmark"></i>
                <span className="link_name" id="link_name_close">
                  Booking
                </span>
                {/* <i
                  id="arrow"
                  onClick={dropdown}
                  className="chevron_down fa fa-sort-down"
                ></i> */}
              </a>
            </li>
            {/* <div className="menulist" id="submenu">
              <h6 className="sub">My Account</h6>
              <h6 className="sub">My Rewards</h6>
              <h6 className="sub"> My Wish List</h6>
            </div> */}
          </Link>

          <Link
            to="AdmindashboardBookingreport"
            style={{ textDecoration: "none" }}
          >
            <li>
              <a
                href="#"
                onClick={() => setCurrentpage("Report")}
                className={current_page == "Report" && "sl"}
              >
                <i className="fa fa-pie-chart"></i>
                <span className="link_name" id="link_name_close">
                  Report
                </span>
              </a>
              <span className="tooltips">Message</span>
            </li>
          </Link>
          <Link to="/Admindashboardpayment" style={{ textDecoration: "none" }}>
            <li>
              <a
                href="#"
                onClick={() => setCurrentpage("Payment")}
                className={current_page == "Payment" && "sl"}
              >
                <i className="fa fa-credit-card"></i>
                <span className="link_name">Payment</span>
              </a>
              <span className="tooltips">Analytics</span>
            </li>
          </Link>
          <Link
            to="/AdmindashboardUserreport"
            style={{ textDecoration: "none" }}
          >
            <li>
              <a
                href="#"
                onClick={() => setCurrentpage("User")}
                className={current_page == "User" && "sl"}
              >
                <i className="fa fa-user"></i>
                <span className="link_name">User</span>
                {/* <i
                  id="arrow_1"
                  onClick={dropdown_1}
                  className="chevron_down fa fa-sort-down"
                ></i> */}
              </a>
            </li>
            {/* <div className="menulist_1" id="submenu_1">
              <h6 className="sub_1">My Order</h6>
              <h6 className="sub_1">Cart List</h6>
              <h6 className="sub_1">Favorite</h6>
            </div> */}
          </Link>
          {/* <Link to="/saved" style={{ textDecoration: "none" }}>
            <li>
              <a href="#">
                <i className="fa fa-heart"></i>
                <span className="link_name">Saved</span>
              </a>
              <span className="tooltips">Saved</span>
            </li>
          </Link> */}

          <Link
            to="/AdmindashboardParkingsetup"
            style={{ textDecoration: "none" }}
          >
            <li>
              <a
                href="#"
                onClick={() => setCurrentpage("Settings")}
                className={current_page == "Settings" && "sl"}
              >
                <i className="fa fa-cog"></i>
                <span className="link_name">Settings</span>
              </a>
              <span className="tooltips">Settings</span>
            </li>
          </Link>

          {/* <div className="profile_cnt">
            <div className="profile" id="profile">
              <div className="profile_details">
                <img
                  id="hide"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSoQFvYAr4KD4S-iecBnmLmPf7zuyFyHkd8w&usqp=CAU"
                  className="pfl"
                  alt=""
                ></img>
                <div className="name_job">
                  <div id="hide" className="profile_name">
                    PriyaDharshini
                  </div>
                  <div id="hide" className="job">
                    Web designer
                  </div>
                </div>
              </div>
              <i
                onClick={closefnt}
                id="logout"
                className=" logout fa fa-arrow-left"
              ></i>
            </div>
          </div> */}
        </ul>
      </div>
    </>
  );
}
export default Respons_nav;
