import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/booking.css";
import {
  validation_mobile_number,
  validation_email,
  validation_name,
  validation_payment_id,
  validation_amount,
  axios_call,
  axios_call_auto,
} from "../functions/reusable_functions";
import DatePicker from "react-datepicker";
import { set } from "js-cookie";

export default function Booking() {
  const [booking, setbooking] = useState({
    userId: "not_selected",
    bookingId: "not_selected",
    date: new Date(),
    startFrom: "not_selected",
    endTo: "not_selected",
    slotid: "not_selected",
    plan: "not_selected",
    name: "not_selected",
  });
  const [userdata, setuserdata] = useState();
  const [usr_suggestion, set_usr_suggestion] = useState([]);
  const [wing_data, SetWing_data] = useState();
  const [bookind_details, SetBookingdetails] = useState();
  

  const checkuser = async (val) => {
    if (validation_name(val).class === "pass") {
      axios_call("GET", "Check_BusinessPartner?search=" + val).then(
        (response) => {
          set_usr_suggestion(response);
        
        if(response[0]==val){
setbooking({...booking,userId:response[0].id})
        }}
      );
    }
  };

  
  
  function GetWingDetails(val) {
    axios_call("GET", "CreateWing/").then((response) => {
      SetWing_data(response);
      console.log(response);
    });
  }

  function GetBookingDetails() {
    axios_call("GET", "CreateBooking/").then((response) => {
      SetBookingdetails(response);
      console.log(response);
    });
  }

  useEffect(() => {
    var booking_data = window.localStorage.getItem("bookingdata");
    var booking_data = JSON.parse(booking_data);
    console.log(booking_data)

    if (booking_data) {
      setuserdata(booking_data);
      console.log(booking_data)
      setbooking({...booking,userId:booking_data.id,name:booking_data.User.userName})      
    }
    GetWingDetails()
  }, []);

  

  return (
    <>
      <Helmet>
         <title>Munidex Parking - Booking </title>
      </Helmet>
      <div className="flex-grow-1">
        <div className="row booking_container">
          <div className="col-7"> </div>
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
                <div className="d-flex flex-column booking_form_name_input">
                  <input
                    autocomplete="off"
                    list="data"
                    onChange={(e) => (
                      checkuser(e.target.value),
                      setbooking({ ...booking, name: e.target.value })
                    )}
                    onBlur={(e) =>
                      setbooking({ ...booking, name: e.target.value })
                    }
                    type="text"
                    value={booking.name != "not_selected" ? booking.name : ""}
                    className={"" + validation_name(booking.name).class}
                    id="name"
                    style={{ marginLeft: "109px", marginTop: "20px" }}
                  />
                  <div style={{ marginTop: "5px", fontSize: "10px" }}>
                    {validation_name(booking.name).msg}
                  </div>
                </div>
                <datalist id="data">
                  {usr_suggestion.map((item, key) => (
                    <option key={key} value={item.userName} />
                  ))}
                </datalist>
              </div>

              <div className="booking_form_date_input">
                <label for="date">Date</label>
                <div style={{ marginLeft: "65px", marginTop: "-5px" }}>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    className="payment_date"
                    selected={booking.date}
                    onClickOutside
                    onSelect={(date) => setbooking({ ...booking, date: date })}
                  />
                </div>
              </div>

              <div className="booking_form_plan_input">
                <div className="booking_form_plan_input_text"> Plan </div>
                <div className="booking_form_plan_input_buttons">
                  <div
                    className={
                      booking.plan == "Weekly"
                        ? "booking_form_input_button_weekly_selected"
                        : "booking_form_input_button_weekly"
                    }
                    onClick={() => setbooking({ ...booking, plan: "Weekly" })}
                  >
                    {" "}
                    Weekly{" "}
                  </div>
                  <div
                    className={
                      booking.plan == "Monthly"
                        ? "booking_form_input_button_monthly_selected"
                        : "booking_form_input_button_monthly"
                    }
                    onClick={() => setbooking({ ...booking, plan: "Monthly" })}
                  >
                    {" "}
                    Monthly{" "}
                  </div>
                  <div
                    className={
                      booking.plan == "Quarterly"
                        ? "booking_form_input_button_quarterly_selected"
                        : "booking_form_input_button_quarterly"
                    }
                    onClick={() =>
                      setbooking({ ...booking, plan: "Quarterly" })
                    }
                  >
                    {" "}
                    Quarterly{" "}
                  </div>
                  <div
                    className={
                      booking.plan == "Yearly"
                        ? "booking_form_input_button_yearly_selected"
                        : "booking_form_input_button_yearly"
                    }
                    onClick={() => setbooking({ ...booking, plan: "Yearly" })}
                  >
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
    </>
  );
}
