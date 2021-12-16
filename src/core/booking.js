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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Car from "../assets/images/Car.svg";
import moment from "moment";
export default function Booking() {
  const [booking, setbooking] = useState({
    userId: "",
    bookingId: "not_selected",
    date: new Date(),
    startFrom: "not_selected",
    endTo: "not_selected",
    slotid: "",
    plan: "not_selected",
    name: "not_selected",
    charge: "",
  });
  const [userdata, setuserdata] = useState();
  const [usr_suggestion, set_usr_suggestion] = useState([]);
  const [booking_details, SetBookingdetails] = useState([]);
  const [wing_data, SetWing_data] = useState();
  const [wing, SetWing] = useState();
  const [slot, SetSlot] = useState();
  const [success, setSuccess] = useState();
  const [bookinghover, setBookinghover] = useState();
  const [percent, setPercent] = useState();

  const checkuser = async (val) => {
    if (validation_name(val).class === "pass") {
      axios_call("GET", "Check_BusinessPartner?search=" + val).then(
        (response) => {
          set_usr_suggestion(response);
          console.log(response[0]);
          console.log(val);
          if (response[0] && response[0].userName == val) {
            setbooking({
              ...booking,
              name: response[0].userName,
              userId: response[0].id,
            });
          }
        }
      );
    }
  };

  function GetWingDetails(id) {
    axios_call("GET", "CreateWing/").then((response) => {
      SetWing_data(response);
      console.log(response);
      if (response[0]) {
        if (id) {
          SetSlot(response[response.length - 1].slots);
          SetWing(response.length - 1);
        } else {
          SetSlot(response[0].slots);
          SetWing(response[0]);
        }
      }
    });
  }

  function GetBooking() {
    var start = moment(new Date()).format("YYYY-MM-DD");
    var end = moment(new Date()).add(366, "days").format("YYYY-MM-DD");
    axios_call("GET", "GetBooking/?from=" + start + "&to=" + end).then(
      (response) => {
        SetBookingdetails(response);
        console.log(response.length);
        axios_call("GET", "SlotCount/").then((response1) => {
          var tot = response1.total - response1.inactive;
          var val = ((tot - response.length) / tot) * 100;
          setPercent({
            reserved: 100 - Math.round(val),
            unreserved: Math.round(val),
          });
        });
      }
    );
  }

  function checkslots(slot, id, booking_details) {
    if (slot.slotStatus) {
      if (booking_details[0]) {
        var val = booking_details.filter((item) => item.slotid == slot.slotId);
      }
      if (val ? val[0] : false) {
        var b = moment(val[0].endTo, "YYYY-MM-DD");
        var a = moment(new Date(), "YYYY-MM-DD");
        var day = b.diff(a, "days");
        if (day < 10) {
          var indicate = "closes_soon";
        } else indicate = "booked";
        return (
          <>
            <img
              onMouseEnter={() =>
                setBookinghover({
                  name: val[0].User.userName,
                  day: day,
                  slotid: slot.slotId,
                  plan: val[0].plan,
                })
              }
              onMouseLeave={() => setBookinghover()}
              key={id}
              src={Car}
              className={"ps-3 pe-3 mb-3 parking_setup_car_img " + indicate}
              alt="Munidex_parking_Booking_slots"
            />
          </>
        );
      } else {
        return (
          <img
            key={id}
            src={Car}
            onClick={() =>
              booking.slotid == slot.slotId
                ? setbooking({ ...booking, slotid: "" })
                : setbooking({
                    ...booking,
                    slotid: slot.slotId,
                    slot_connect: slot.id,
                  })
            }
            className={
              "ps-3 pe-3 mb-3 parking_setup_car_img " +
              (booking.slotid == slot.slotId && "Selected")
            }
            alt="Munidex_parking_Booking_slots"
          />
        );
      }
    } else {
      return (
        <img
          key={id}
          src={Car}
          className={"ps-3 pe-3 mb-3 parking_setup_car_img parking_undercons"}
          alt="Munidex_parking_Booking_slots"
        />
      );
    }
  }

  function FormSumbit() {
    var startFrom = moment(booking.date, "YYYY-MM-DD").format("YYYY-MM-DD");
    var endTo = "";

    if (booking.plan == "Monthly") {
      endTo = moment(booking.date, "YYYY-MM-DD")
        .add(31, "days")
        .format("YYYY-MM-DD");
    }

    if (booking.plan == "Quarterly") {
      endTo = moment(booking.date, "YYYY-MM-DD")
        .add(180, "days")
        .format("YYYY-MM-DD");
    }

    if (booking.plan == "Weekly") {
      endTo = moment(booking.date, "YYYY-MM-DD")
        .add(7, "days")
        .format("YYYY-MM-DD");
    }

    if (booking.plan == "Yearly") {
      endTo = moment(booking.date, "YYYY-MM-DD")
        .add(366, "days")
        .format("YYYY-MM-DD");
    }

    var booking_finalized = {
      ...booking,
      startFrom: startFrom,
      endTo: endTo,
      bookingId: Date.now().toString(36) + Math.random().toString(36).substr(2),
    };

    if (
      booking_finalized.slotid &&
      booking_finalized.name &&
      booking_finalized.userId &&
      booking_finalized.plan &&
      booking_finalized.endTo &&
      booking_finalized.startFrom &&
      booking_finalized.charge
    ) {
      console.log(booking_finalized);

      axios_call("POST", "CreateBooking/", booking_finalized)
        .then((response) => {
          console.log(response);
          reset();
          setSuccess(response);
        })
        .catch((response) => {
          axios_call("POST", "CreateBooking/", booking_finalized).then(
            (response) => {
              console.log(response);
              reset();
            }
          );
        });
    }
  }

  function reset() {
    setbooking({
      userId: "",
      bookingId: "not_selected",
      date: new Date(),
      startFrom: "not_selected",
      endTo: "not_selected",
      slotid: "",
      plan: "not_selected",
      name: "not_selected",
    });
    GetWingDetails();
    GetBooking();
  }
  useEffect(() => {
    var booking_data = window.localStorage.getItem("bookingdata");
    var booking_data = JSON.parse(booking_data);
    console.log(booking_data);

    if (booking_data) {
      setuserdata(booking_data);
      console.log(booking_data);
      setbooking({
        ...booking,
        userId: booking_data.id,
        name: booking_data.User.userName,
      });
      window.localStorage.removeItem("bookingdata");
    }
    GetWingDetails();
    GetBooking();
  }, []);

  //   useEffect(() => {
  //     var value = usr_suggestion.filter((item) => (item.userName = booking.name));

  //     setbooking({
  //       ...booking,
  //       userId: value.userName
  //     });
  //     console.log(users)
  //   }, [booking.name]);

  return (
    <>
      <Helmet>
         <title>Munidex Parking - Booking </title>
      </Helmet>
      <div className="flex-grow-1">
        <div className="row booking_container">
          <div className="col-7">
            {" "}
            <div className="px-4 pt-1">
              <div className="shadow-sm p-3">
                {!bookinghover ? (
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <small className="col-7">Name: {booking.name}</small>
                        <small className="col-5">plan: {booking.plan}</small>
                      </div>
                    </div>
                    <div className="mt-2 col-12 ">
                      <div className="row">
                        <small className="col-7">
                          SlotId: {booking.slotid}
                        </small>
                        <small className="col-5"> $: {booking.charge}</small>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <small className="col-7">
                          Name: {bookinghover.name}
                        </small>
                        <small className="col-5">
                          plan: {bookinghover.plan}
                        </small>
                      </div>
                    </div>
                    <div className="mt-2 col-12 ">
                      <div className="row">
                        <small className="col-7">
                          SlotId: {bookinghover.slotid}
                        </small>
                        <small className="col-5">
                          {" "}
                          Days left: {bookinghover.day}
                        </small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              {wing_data && wing_data.length > 10 && (
                <div className="parking_setup_wing_title_section">
                  <Slider>
                    {wing_data.map((wing) => {
                      return (
                        <div
                          className={
                            wing.id != (slot && slot[0].wingId)
                              ? "btn-light btn btn-sm m-1"
                              : "btn-outline-primary btn btn-sm m-1"
                          }
                          onClick={() => (
                            SetWing(wing),
                            setbooking({ ...booking, plan: "", charge: "" }),
                            SetSlot(wing.slots)
                          )}
                        >
                          {wing.wingName}
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              )}

              {wing_data && wing_data.length < 10 && (
                <div className="parking_setup_wing_title_section">
                  <div className="d-flex">
                    {wing_data.map((wing) => {
                      return (
                        <div
                          className={
                            wing.id != (slot && slot[0].wingId)
                              ? "btn-light btn btn-sm m-1"
                              : "btn-outline-primary btn btn-sm m-1"
                          }
                          onClick={() => (
                            SetWing(wing),
                            setbooking({ ...booking, plan: "", charge: "" }),
                            SetSlot(wing.slots)
                          )}
                        >
                          {wing.wingName}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="parking_setup_wing_container">
                {slot && (
                  <>
                    {slot.map((slot, id) => {
                      return (
                        <span>{checkslots(slot, id, booking_details)}</span>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="row">
              <div className="col-6">
                <div className="booking_reserved_text">Reserved</div>
                <div className="booking_reserved_percentage_text">
                  {percent && percent.reserved}%
                </div>
                <div class="progress booking_reserved_progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      width: percent && percent.reserved + "%",
                      backgroundColor: "#FF6767",
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-6">
                <div className="booking_unreserved_text">Unreserved</div>
                <div className="booking_unreserved_percentage_text">
                  {percent && percent.unreserved}%
                </div>
                <div class="progress booking_unreserved_progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      width: percent && percent.unreserved + "%",
                      backgroundColor: "#2AB0FF",
                    }}
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
                    onClick={() =>
                      setbooking({
                        ...booking,
                        plan: "Weekly",
                        charge: wing && wing.planWeekly,
                      })
                    }
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
                    onClick={() =>
                      setbooking({
                        ...booking,
                        plan: "Monthly",
                        charge: wing && wing.planMonthly,
                      })
                    }
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
                      setbooking({
                        ...booking,
                        plan: "Quarterly",
                        charge: wing && wing.planQuarterly,
                      })
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
                    onClick={() =>
                      setbooking({
                        ...booking,
                        plan: "Yearly",
                        charge: wing && wing.planYearly,
                      })
                    }
                  >
                    {" "}
                    Yearly{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="booking_form_submit_clear">
              <div className="booking_form_submit" onClick={FormSumbit}>
                {" "}
                Submit{" "}
              </div>
              <div className="booking_form_clear"> Clear </div>
            </div>

            {/* <div class="alert alert-success mt-2 mx-2" role="alert">
                
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
