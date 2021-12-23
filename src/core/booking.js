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
import Carousel from "react-elastic-carousel";
import "../assets/css/Booking/bookingsuccess.css";
import view from "../assets/images/view.svg";
import print from "../assets/images/print.svg";
import send from "../assets/images/send.svg";
import tick from "../assets/images/tick.svg";
import close from "../assets/images/close.svg";
import Bookinginvoice from "../components/Booking/bookinginvoice"
import { motion, AnimatePresence } from "framer-motion";

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
  const [wing_data, setWing_data] = useState();
  const [wing, SetWing] = useState();
  const [slot, SetSlot] = useState();
  const [success, setSuccess] = useState();
  const [preview, setPreview] = useState(false);
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
      setWing_data(response);
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
                  slot_connect: slot.id,
                  wing_name: slot.wing.wingName,
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
            onMouseEnter={() =>
              setBookinghover({
                slotid: slot.slotId,
                slot_connect: slot.id,
                wing_name: slot.wing.wingName,
              })
            }
            onMouseLeave={() => setBookinghover()}
            onClick={() =>
              booking.slotid == slot.slotId
                ? setbooking({
                    ...booking,
                    slotid: "",
                    slot_connect: "",
                    wing_name: "",
                  })
                : setbooking({
                    ...booking,
                    slotid: slot.slotId,
                    slot_connect: slot.id,
                    wing_name: slot.wing.wingName,
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
      bookingId: Date.now().toString(36) + Math.random().toString(36).substr(2,6),
    //   date:moment(new Date(), "DD-MM-YYYY").format("DD-MM-YYYY")

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
        userId: booking_data.userId,
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

  function ClosePreview(){
      setPreview(false)
  }

//   const componentRef = useRef();

//   const handlePrint = useReactToPrint({
//       content: () => componentRef.current,
//   });

  
  return (
    <motion.div
    initial={{ opacity: 0, x:100  }}
    animate={{ opacity:[0.5,1], x:0 }}
    transition={{ duration: 0.8 }}>
      <Helmet>
         <title>Munidex Parking - Booking </title>
      </Helmet>


      {preview && <div className="overlay1"> <div className='d-flex'>
<div className='p-3 '> <div className='d-flex'>  <div className='btn-primary btn-sm btn mx-2'>share</div> <div className='btn-danger btn-sm  btn' onClick={ClosePreview}>Close</div></div></div>
<Bookinginvoice bookingData={success} ClosePreview={ClosePreview}/></div></div>}
      

      {success &&
      <div className="overlay">
              <div className="bookingspopup_container">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div> </div>
                  <div className="pt-2 pe-3">
                    <img onClick={()=>setSuccess(false)} src={close} />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div> </div>
                  <div className="mt-2 ps-3">
                    <img src={tick} />
                  </div>
                </div>
                <div className="bookingspopup_title mt-3 mb-3">
                  Booking success
                </div>
                <hr className="bookingspopup_hr" />
                <div className="bookingspopup_details">
                  <div className="bookingspopup_details_flex mb-3">
                    <div className="bookingspopup_head">
                      {" "}
                      From: <span className="bookingspopup_body"> {success.startFrom}</span>
                    </div>
                    <div className="bookingspopup_head">
                      To: <span className="bookingspopup_body">{success.endTo}</span>
                    </div>
                  </div>
                  <div className="bookingspopup_details_flex mb-3">
                    <div className="bookingspopup_head">
                      Name:{" "}
                      <span className="bookingspopup_body">{success.User.userName}</span>
                    </div>
                    <div className="bookingspopup_head">
                      Plan: <span className="bookingspopup_body">{success.plan}</span>
                    </div>
                  </div>
                  <div className="bookingspopup_details_flex mb-4">
                    <div className="bookingspopup_head">
                      Wing: <span className="bookingspopup_body">{success.slots.wing.wingName}</span>
                    </div>
                    <div className="bookingspopup_head">
                      Slot: <span className="bookingspopup_body">{success.slot_connect}</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "center" }} className="mb-5">
                  <span className="bookingspopup_text_amount"> Amount </span>{" "}
                  <span className="bookingspopup_value_amount"> $ {success.charge}</span>
                </div>
                <div className="bookingspopup_amount_flex">
                  <div className="bookingspopup_options m-3" onClick={()=>setPreview(true)}>
                    {" "}
                    View <img src={view} />{" "}
                  </div>
                  <div className="bookingspopup_options m-3">
                    {" "}
                    Send <img src={send} />{" "}
                  </div>
                  {/* <div className="bookingspopup_options m-3">
                    {" "}
                    Print <img src={print} />{" "}
                  </div> */}
                </div>
              </div>
            </div>
}
            
      <div className="">
        <div className="row booking_container">
          <div className="col-7">
            {" "}
            <div className="px-4 pt-1">
              <div className="shadow-sm p-3">
                {!bookinghover ? (
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <small className="col-7">
                          Name: {booking.name != "not_selected" && booking.name}
                        </small>
                        <small className="col-5">
                          Plan: {booking.plan != "not_selected" && booking.plan}
                        </small>
                      </div>
                    </div>
                    <div className="mt-2 col-12 ">
                      <div className="row">
                        <small className="col-7">
                          Slot Id:{" "}
                          <span className="badge bg-success">
                            {booking.wing_name &&
                              booking.wing_name +
                                " [" +
                                booking.slot_connect +
                                "]"}
                          </span>
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
                          Plan: {bookinghover.plan}
                        </small>
                      </div>
                    </div>
                    <div className="mt-2 col-12 ">
                      <div className="row">
                        <small className="col-7 ">
                          Slot Id:{" "}
                          <span className="badge bg-primary">
                            {bookinghover.wing_name &&
                              bookinghover.wing_name +
                                " [" +
                                bookinghover.slot_connect +
                                "]"}
                          </span>
                        </small>
                        <small className="col-5">
                          {" "}
                          {bookinghover.day ? (
                            <>Days left: {bookinghover.day}</>
                          ) : (
                            <>$:</>
                          )}
                        </small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              {/* {wing_data && wing_data.length < 10 && (
                <div className="parking_setup_wing_title_section">
                  <>
                    {" "}
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
                  </>
                </div>
              )} */}
               {wing_data && wing_data.length < 10 && (
                <div className="parking_setup_wing_title_section">

         <div style={{ flexGrow: 1 }}>
            <Carousel
              itemsToShow={6}
              itemsToScroll={1}
              pagination={false}
              showArrows={false}
            >
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
            </Carousel>
          </div>
          </div>)}

              {/* {wing_data && wing_data.length > 10 && (
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
              )} */}

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

            <div className='booking_colorcodes mt-5 pe-4'>
            <span className='booking_undercons'> Under Construction</span>
            <span className='booking_lessweek'> &lt; week remaining </span>
            <span className='booking_moreweek'> &gt; week remaining</span>
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
            
          </div>
        </div>
      </div>
    </motion.div>
  );
}
