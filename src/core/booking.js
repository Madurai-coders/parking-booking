import React from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/booking.css";
import Menu from "../core/Menu";
import Navbarbigscreen from "../components/navbar/navbar_bigscreen.js";

export default function User_dashboard() {
  return (
    <>
      <Helmet>
         <title>Munidex Parking - Booking </title>
      </Helmet>
      <div className="d-flex flex-row">
      <div>
          {/* <div className='bg-primary' style={{height:'100vh',width:'10vh' }}></div> */}
          <Navbarbigscreen/>
          </div>

        <div className='flex-grow-1'>
        <div className="row mt-5">
          <div className="col-7"> coll111111111111</div>
          <div className="col-5">
            <div className="row">
              <div className="col-6">
                <div className="booking_reserved_text">Reserved</div>
                <div className="booking_reserved_percentage_text">80%</div>
                <div class="progress booking_reserved_progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "80%", backgroundColor: "#FF6767" }}
                  ></div>
                </div>
              </div>
              <div className="col-6">
                <div className="booking_unreserved_text">Unreserved</div>
                <div className="booking_unreserved_percentage_text">50%</div>
                <div class="progress booking_unreserved_progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "50%", backgroundColor: "#2AB0FF" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="booking_form_container">
              <div className="booking_form_title"> Booking </div>
              <div className="booking_form_name_input">
                <label for="name">Name</label>
                <input type="text" id="name" />
              </div>
              <div className="booking_form_email_input">
                <label for="email">Email</label>
                <input type="text" id="email" />
              </div>
              <div className="booking_form_date_input">
                <label for="date">Date</label>
                <input type="text" id="date" />
              </div>
              <div className="booking_form_ptype_input">
                <label for="ptype">Payment type</label>
                <input type="text" id="ptype" />
              </div>
              <div className="booking_form_pid_input">
                <label for="pid">Payment id</label>
                <input type="text" id="pid" />
              </div>
              <div className="booking_form_plan_input">
                <div className="booking_form_plan_input_text"> Plan </div>
                <div className="booking_form_plan_input_buttons">
                  <div className="booking_form_input_button_weekly">
                    {" "}
                    Weekly{" "}
                  </div>
                  <div className="booking_form_input_button_monthly">
                    {" "}
                    Monthly{" "}
                  </div>
                  <div className="booking_form_input_button_quarterly">
                    {" "}
                    Quarterly{" "}
                  </div>
                  <div className="booking_form_input_button_yearly">
                    {" "}
                    Yearly{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="booking_form_submit_clear">
              <div className="booking_form_submit"> Submit </div>
              <div className="booking_form_clear"> Clear </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
