import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import logo from "../assets/images/logogrey.svg";
import userprof from "../assets/images/userprofile.png";
import handshake from "../assets/images/handshake.png";
import loader_video from "../assets/images/loader.mp4";
import "../assets/css/user_dashboard/user_dashboard.css";
import Carousel from "react-elastic-carousel";
import Car from "../assets/images/Car.svg";
import Cartcard from "../components/user_dashboard/cartcard.js";
import Addslot from "../components/user_dashboard/addslot.js";
import Activebooking from "../components/user_dashboard/activebookingcard.js";
import Userprofile from "../components/user_dashboard/userprofile.js";
import History from "../components/user_dashboard/history";
import { IoClose } from "react-icons/io5";
import moment from "moment";
import "../assets/css/admin_dashboard/booking.css";
import DatePicker from "react-datepicker";
import {
  validation_name,
  validation_value,
  validation_country,
  axios_call,
  axios_call_unauthenticated,
  axios_call_auto,
  validation_count,
  logout,
  generateUUID,
  formatUsd,
  generateUUID_334,
  validation_char,
} from "../functions/reusable_functions";
import { useLocation } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import {InputBox} from "../components/general/inputbox";
import noBooking from "../assets/images/noactiveBooking.svg"
export default function User_dashboard() {
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState(false);
  const [props, setprops] = useState();
  const [getAmount, setGetAmount] = useState(false);
  const [amount, setAmount] = useState();
  const [logout_popup, setlogout_popup] = useState();
  const [loader, setloader] = useState(true);
  const [history_report, setHistory] = useState(false);
  const [credit, setCredit] = useState({ amount: 0, type: "" });
  const [success, setSuccess] = useState();
  const [table, setTable] = useState({
    bookingdetails: true,
    transactionhistory: false,
  });
  const [bookinghover, setBookinghover] = useState();
  const [booking_details, SetBookingdetails] = useState([]);
  const [wing_data, setWing_data] = useState();
  const [wing, SetWing] = useState();
  const [slot, SetSlot] = useState();
  const [percent, setPercent] = useState();
  const [datafail, setData_fail] = useState();

  const [carInfo, setCarInfo] = useState(false);
  const [cardata, setCarData] = useState({
    license: "not_selected",
    make: "not_selected",
    model: "not_selected",
    carRegistrationState: "not_selected",
    color: "not_selected",
    insurance: "not_selected",
    permitYear: moment(new Date()).format("YYYY"),
    valid: "nil",
  });

  function Validate_carData() {
    let val = false;
    var value = { ...cardata };
    if (
      validation_char(cardata.license).class == "pass" &&
      validation_char(cardata.make).class == "pass" &&
      validation_char(cardata.model).class == "pass" &&
      validation_country(cardata.carRegistrationState).class == "pass" &&
      validation_value(cardata.color).class == "pass" &&
      validation_char(cardata.insurance).class == "pass"
    ) {
      val = true;
      setCarData({ ...cardata, valid: "pass" });
      setCarInfo(false);
    } else {
      if (cardata.license == "not_selected") {
        value = { ...value, license: "" };
      }
      if (cardata.make == "not_selected") {
        value = { ...value, make: "" };
      }
      if (cardata.model == "not_selected") {
        value = { ...value, model: "" };
      }
      if (cardata.carRegistrationState == "not_selected") {
        value = { ...value, carRegistrationState: "" };
      }
      if (cardata.color == "not_selected") {
        value = { ...value, color: "" };
      }
      if (cardata.insurance == "not_selected") {
        value = { ...value, insurance: "" };
      }
      setCarData({ ...value, valid: "warn" });
    }
    return val;
  }



  function reset() {
    setbooking({
      userId: "not_selected",
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
    setData_fail();
    setCarData({
      license: "not_selected",
      make: "not_selected",
      model: "not_selected",
      carRegistrationState: "not_selected",
      color: "not_selected",
      insurance: "not_selected",
      permitYear: moment(new Date()).format("YYYY"),
      valid: "nil",
    });
  }

  const [booking, setbooking] = useState({
    userId: "not_selected",
    bookingId: "not_selected",
    date: new Date(),
    startFrom: "not_selected",
    endTo: "not_selected",
    slotid: "",
    plan: "not_selected",
    name: "not_selected",
    charge: "",
  });

  function GetWingDetails(id) {
    axios_call("GET", "CreateWing/").then((response) => {
      setWing_data(response);
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

  function GetBooking(val) {
    if (val) {
      var start = moment(val).format("YYYY-MM-DD");
    } else {
      var start = moment(new Date()).format("YYYY-MM-DD");
      var end = moment(new Date()).add(366, "days").format("YYYY-MM-DD");
    }
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
  useEffect(() => {
    GetWingDetails();
    setTimeout(() => {
      GetBooking();
    }, 1000);
  }, []);

  let history = useHistory();

  function Balance(payment, booking) {
    var payment_total = 0;
    var booking_total = 0;
    payment.forEach((element) => {
      payment_total = payment_total + element.amount;
    });
    booking.forEach((element) => {
      booking_total = booking_total + parseInt(element.charge);
    });
    var val = payment_total - booking_total;

    if (val < 0) {
      setCredit({ amount: val, type: "Delinquent" });
    } else {
      if (val == 0) {
        setCredit({ amount: val, type: "--" });
      } else {
        setCredit({ amount: val, type: "credit" });
      }
    }

    // return (
    //   <div>
    //     <span className="user_dashboard_balance_card_amount">
    //       {formatUsd(Math.abs(payment_total - booking_total))}
    //     </span>
    //   </div>
    // );
  }

  function Dayleft(endTo) {
    var b = moment(endTo, "YYYY-MM-DD");
    var a = moment(new Date(), "YYYY-MM-DD");
    var day = b.diff(a, "days");
    return day;
  }

  useEffect(() => {
    axios_call("GET", "UserLogin").then((response) => {
      console.log(response[0]);
      if (response[0] == undefined) {
        console.log("user dashboard");

        axios_call("GET", "GetUserAccount").then((response) => {
          console.log(response[0]);
          var newbookingpartner = {
            uId: new Date().getUTCMilliseconds(),
            accountNumber: Math.floor(100000 + Math.random() * 9000),
            userName: response[0].first_name,
            lastName: response[0].first_name,
            email: response[0].username,
            accountHolder: response[0].id,
          };
          axios_call("POST", "CreateBusinessPartner/", {
            ...newbookingpartner,
          }).then((response) => {
            console.log("newuser created");
            console.log(response);
          });

          axios_call("GET", "UserLogin").then((response) => {
            console.log(response[0]);
            console.log(response);
            setbooking({...booking,name:response[0].userName,userId:response[0].id})
            setUser(response[0]);
            Balance(response[0].payment_partner, response[0].booking_partner);
          });
        });
      } else {
        setbooking({...booking,name:response[0].userName,userId:response[0].id})
        setUser(response[0]);
        Balance(response[0].payment_partner, response[0].booking_partner);
      }
    });

    setTimeout(() => {
      setloader(false);
    }, 3000);
  }, []);

  function logoutuser() {
    logout().then(function (log) {
      if (log != null) {
        Cookies.remove("accountnumber");
        Cookies.remove("lastname");
        setTimeout(() => {
          console.log("logout");
          history.push("/");
        }, 500);
      }
    });
  }

  function CallPayment(val) {
    if (amount > 10) {
      var body = {
        fname: user.userName,
        lname: user.userName,
        email: user.email,
        amount: amount,
        transfee: 1.5,
        muni_code: "1122",
        dept: "pkng",
        pbsdescr: "Parking Fees",
        clientrefnum: generateUUID(),
        ptype: "CC",
        pprovider: "PROC",
        rme: false,
      };

      var data = {
        secretKey: "9401f9e0-6596-11ec-bd15-8d09a4545895",
        userId: user.id,
        paymentId: generateUUID(),
        paymentType: "online",
        paymentDate: new Date(),
        amount: amount,
      };

      console.log(data);
      //   axios_call_unauthenticated(
      //     "POST",
      //     "CreateOnlinePayment/4ebd0208-8328-5d69-8c44-ec50939c0967/",
      //     data
      //   ).then((response) => {
      //     console.log(response);
      //     let userDate = user;
      //     userDate.payment_partner.push(response);
      //     setUser(user);
      //     setGetAmount(false);
      //     setAmount();
      //   });

      window.location.replace("https://taxdev.munidex.info/pbs2/pbs/");

      // axios({
      //   method: "POST",
      //   url: "https://taxdev.munidex.info/pbs2/pbsreq",
      //   data: body,
      //   port: 443,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Cookie:
      //       "connect.sid=s%3Ajn1ZAMIq3w-AOZiwO4qGDqsbFvfd6OT7.4xwH5hCrPjKBetTh6rW8NogYksb84jMRdpfzNUJibN0",
      //   },
      //   json: true,
      //   withCredentials: true
      // }).then((response) => {

      // window.location.replace('https://taxdev.munidex.info/pbs2/pbs/' + response + '?returnUri=http://localhost:3000/dashboard')

      //   console.log(response);

      // });
    }
  }

  function FormSumbit() {
    var startFrom = moment(booking.date, "YYYY-MM-DD").format("YYYY-MM-DD");
    var endTo = "";

    if (booking.plan == "Daily") {
      endTo = moment(booking.date, "YYYY-MM-DD")
        .add(0, "days")
        .format("YYYY-MM-DD");
    }

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
      bookingId: generateUUID_334(),
      //   date:moment(new Date(), "DD-MM-YYYY").format("DD-MM-YYYY")
    };
    const { valid, ...carDetails } = cardata;
    if (
      Validate_carData() &&
      booking_finalized.slotid &&
    //   booking_finalized.name != "not_selected" &&
    //   booking_finalized.userId != "not_selected" &&
    //   booking_finalized.name &&
    //   booking_finalized.userId &&
      booking_finalized.plan &&
      booking_finalized.endTo &&
      booking_finalized.startFrom &&
      booking_finalized.charge &&
      booking_finalized.bookingId
    ) {
      axios_call("POST", "CreateBooking/", booking_finalized)
        .then((response) => {
          console.log(response);
          console.log({ ...carDetails, bookingId: response.id });
          axios_call("POST", "CreateCarInfo/", {
            ...carDetails,
            bookingId: response.id,
          }).then((response) => {
            reset();
          });
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
    } else {
      if (
        booking_finalized.name == "not_selected" ||
        booking_finalized.userId == "not_selected"
      ) {
        setbooking({ ...booking, name: "", userId: "" });
        setData_fail("Invalid user name");
      } else {
        setData_fail(true);
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Munidex Parking - User Dashboard</title>
      </Helmet>

      {loader ? (
        <div style={{ height: "100vh" }}>
          <video width="220" height="140" className="overlay" autoPlay muted>
            <source src={loader_video} type="video/mp4" />
          </video>
        </div>
      ) : (
        <>

{carInfo && (
        <div className="overlay_carInfo shadow">
          <div className="row">
            <div className="text-center h3" style={{ marginTop: "20px" }}>
              Car Info
            </div>
            <div className="col-5 text-center">
              <div className="d-flex flex-column" style={{ marginTop: "45px" }}>
                <div>
                  {" "}
                  {booking.wing_name &&
                    booking.wing_name + " [" + booking.slot_connect + "]"}
                </div>
                <img
                  src={Car}
                  style={{ marginLeft: "25%", marginTop: "20px" }}
                  className="w-50"
                  alt="Munidex_parking_Booking_slots"
                />
              </div>
            </div>

            <div className="col-7" style={{ marginTop: "20px" }}>
              <div className="row">
                <div className="col-6" style={{ marginTop: "1%" }}>
                  <InputBox
                    label="License Plate"
                    type="text"
                    state={cardata}
                    setState={setCarData}
                    value={cardata.license}
                    keyValue={"license"}
                    validate={validation_char}
                  />
                </div>
                <div className="col-6" style={{ marginTop: "1%" }}>
                  <InputBox
                    label="Make"
                    type="text"
                    state={cardata}
                    setState={setCarData}
                    value={cardata.make}
                    keyValue={"make"}
                    validate={validation_char}
                  />
                </div>
                <div className="col-6" style={{ marginTop: "1%" }}>
                  <InputBox
                    label="Model"
                    type="number"
                    state={cardata}
                    setState={setCarData}
                    value={cardata.model}
                    keyValue={"model"}
                    validate={validation_char}
                  />
                </div>
                <div className="col-6" style={{ marginTop: "1%" }}>
                  <InputBox
                    label="Car Registration State"
                    type="text"
                    state={cardata}
                    setState={setCarData}
                    value={cardata.carRegistrationState}
                    keyValue={"carRegistrationState"}
                    validate={validation_char}
                  />
                </div>

                <div className="col-6" style={{ marginTop: "1%" }}>
                  <InputBox
                    label="Insurance"
                    type="text"
                    state={cardata}
                    setState={setCarData}
                    value={cardata.insurance}
                    keyValue={"insurance"}
                    validate={validation_char}
                  />
                </div>
                <div className="col-6" style={{ marginTop: "1%" }}>
                  <div className="homeinputblock">
                    <DatePicker
                      className="homeinput full"
                      onChange={(e) =>
                        setCarData({
                          ...cardata,
                          permitYear: moment(e).format("YYYY"),
                        })
                      }
                      dateFormat="yyyy"
                      showYearPicker
                      value={cardata.permitYear}
                    />{" "}
                    <label className="label_cons_1">Permit Year</label>
                  </div>
                </div>

                <div className="col-6" style={{ marginTop: "1%" }}>
                  <InputBox
                    label="Color"
                    type="color"
                    state={cardata}
                    setState={setCarData}
                    value={cardata.color}
                    keyValue={"color"}
                    validate={validation_value}
                    styles={{ padding: "18px", height: "48px" }}
                  />
                </div>
              </div>
              <div style={{ marginRight: "100px", marginTop: "30px" }}>
                <div className="d-flex justify-content-end">
                  <div
                    className="btn btn-light mx-3"
                    onClick={() => (
                      setCarInfo(false),
                      setCarData({ ...cardata, valid: "warn" })
                    )}
                  >
                    Close
                  </div>
                  {/* <div
                    className="btn btn-secondary mx-3"
                    onClick={() => reset()}
                  >
                    Reset
                  </div> */}
                  <div
                    className="btn btn-primary"
                    onClick={() => Validate_carData()}
                  >
                    Submit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

          {logout_popup && (
            <div className="overlay">
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
                      style={{ cursor: "pointer" }}
                    ></button>
                  </div>
                  <div class="modal-body">Are you sure?</div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      onClick={() => setlogout_popup(false)}
                      class="btn btn-light btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={logoutuser}
                      class="btn btn-danger btn-sm"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {user && (
            <div className="user_dashboard_container">
              <div className="udb_topsec p-2">
                <img
                  src={logo}
                  alt="munidex_logo"
                  className="user_dashboard_munidex_logo"
                />
                <img
                  onClick={() => setlogout_popup(true)}
                  src={userprof}
                  alt="Customer_profile"
                  className="user_dashboard_profile_icon"
                />
              </div>
              <div className="row">
                <Userprofile
                  name={user.lastName}
                  acntnum={user.accountNumber}
                  email={user.email}
                  num="--"
                  setHistory={setHistory}
                  history_report={history_report}
                />
                <div className="col-10">
                  <div className="row">
                    
                    <div className="col-8 udb_middlescrollsection">
                 
               
                      {!history_report && (
                        <div>
                           <div className="booking_colorcodes mt-3 px-2 mx-5 ">
                  <span className="booking_undercons"> Under Construction</span>
                  <span className="booking_lessweek"> &lt; 7 days </span>
                  <span className="booking_moreweek"> &gt; 7 days</span>
                </div>

                          {wing_data && wing_data.length && (
                            <div className="parking_setup_wing_title_section  ">
                              <div style={{ flexGrow: 1 }}>
                                <Carousel
                                  itemsToShow={6}
                                  itemsToScroll={1}
                                  pagination={false}
                                  showArrows={true}
                                >
                                  {wing_data.map((wing) => {
                                    return (
                                      <div
                                        className={
                                          wing.id != (slot && slot[0].wingId)
                                            ? "btn-light btn btn-sm m-1 text-capitalize"
                                            : "btn-primary btn btn-sm m-1 text-capitalize"
                                        }
                                        onClick={() => (
                                          SetWing(wing),
                                          setbooking({
                                            ...booking,
                                            plan: "",
                                            charge: "",
                                          }),
                                          SetSlot(wing.slots)
                                        )}
                                      >
                                        {wing.wingName}
                                      </div>
                                    );
                                  })}
                                </Carousel>
                              </div>
                            </div>
                          )}

                          <div className="parking_setup_wing_container">
                            {slot && (
                              <>
                                {slot.map((slot, id) => {
                                  return (
                                    <span>
                                      {checkslots(slot, id, booking_details)}
                                    </span>
                                  );
                                })}
                              </>
                            )}
                          </div>
                      

<>

                <div className="booking_form_container">
                  <div className="booking_form_title bg-light me-5 p-2">
                    {" "}
                    Booking{" "}
                  </div>
                  <div className="mx-3 p-2">
                    

                    <div className="booking_form_date_input mt-3">
                      <label for="date">Date</label>
                      <div style={{ marginLeft: "65px", marginTop: "-5px" }}>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          className="payment_date"
                          selected={booking.date}
                          onClickOutside
                          onSelect={(date) => (
                            GetBooking(date),
                            setbooking({ ...booking, date: date })
                          )}
                        />
                      </div>
                    </div>

                    <div className="booking_form_name_input">
                      <label for="name">Car Info</label>
                      <div className="d-flex flex-column booking_form_name_input">
                        <input
                          type="text"
                          style={{ marginLeft: "109px", marginTop: "20px" }}
                          placeholder={
                            cardata.valid == "pass"
                              ? "Filled"
                              : "Fill this form"
                          }
                          onClick={() => setCarInfo(true)}
                          className={cardata.valid}
                        />
                      </div>
                    </div>

</div>
                    <div className="booking_form_title bg-light me-5 p-2" style={{marginTop:'-10px'}}>
                    Plan
                  </div>
                  <div className="mx-3 p-2">

                    <div className="booking_form_plan_input">
                      <div className="booking_form_plan_input_text">  </div>
                      <div className="booking_form_plan_input_buttons1">
                        <div
                          className={
                            booking.plan == "Daily"
                              ? "booking_form_input_button_daily_selected"
                              : "booking_form_input_button_daily"
                          }
                          onClick={() =>
                            setbooking({
                              ...booking,
                              plan: "Daily",
                              charge: wing && wing.planDaily,
                            })
                          }
                        >
                          {" "}
                          Daily{" "}
                        </div>

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
                        
                          Yearly
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end flex-row mt-5" style={{marginBottom:'200px'}}>
                  <div className="btn  btn-primary" onClick={FormSumbit}>
                    Submit
                  </div>
                  <div className="btn mx-2 btn-light" onClick={reset}>
                    Clear
                  </div>
                  
                </div>

                </>

                </div>
                      )}


                      {/* <hr></hr>
                      <div className="px-5 mt-3 pb-3">
                        <Addslot amount="12" />
                        <Addslot amount="20" />
                      </div>
                      <hr></hr> */}

                      {history_report && (
                        <History
                          booking_partner={user.booking_partner}
                          payment_partner={user.payment_partner}
                        ></History>
                      )}
                      
                    </div>
                    <div className="col-4">
                      <div className="udb_bcsection mt-4 pt-4 ps-4 pe-3 me-4 mx-5">
                        <div className="udb_bctext mt-3 mb-2 ms-2">Balance</div>
                        <div className="udb_bcval ms-2">
                          {credit && formatUsd(Math.abs(credit.amount))}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          className="pb-3"
                        >
                          <span
                            className={
                              credit.type == "Delinquent"
                                ? "udb_bcdelinquent pt-2 pb-1 ps-2 pe-2"
                                : "udb_bccredit pt-2 pb-1 ps-2 pe-2"
                            }
                          >
                            {credit && credit.type}{" "}
                          </span>
                        </div>
                      </div>
                      <div className="udb_cartsection mt-4 pt-4 ps-3 pe-3 pb-2">
                          {!user.booking_partner[0]&&<>
                         <div className="row justify-content-center mt-5"> <img src={noBooking} className='w-75'/></div>
                         <div className="h5 text-center text-muted mt-4">No active booking</div></>}
                        {user.booking_partner.map((booking) => {
                          return (
                            <>
                              {Dayleft(booking.endTo) > 0 && (
                                <Activebooking
                                  entry={booking.startFrom}
                                  expiry={booking.endTo}
                                  status="Active"
                                  remdays={Dayleft(booking.endTo)}
                                  slot={booking.slots.id}
                                  wing={booking.slots.wing.wingName}
                                  plan={booking.plan}
                                />
                              )}
                            </>
                          );
                        })}
                      </div>
                      {/* <div className="udb_carttotal p-4">
                        Total Amount : $46
                      </div>
                      <div className="row text-center">
                        <div className="col-6" style={{ paddingRight: "0" }}>
                          <button
                            type="button"
                            class="btn btn-secondary btn-md w-75 udb_cart_clrbutton"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="col-6" style={{ paddingLeft: "0" }}>
                          <button
                            type="button"
                            class="btn btn-success btn-md w-75 udb_cart_continuebutton"
                          >
                            Continue
                          </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3"></div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* {user && (
            <div className="user_dashboard_container">
             
              <img
                src={logo}
                alt="munidex_logo"
                className="user_dashboard_munidex_logo"
              />
              <img
                onClick={() => setlogout_popup(true)}
                src={userprof}
                alt="Customer_profile"
                className="user_dashboard_profile_icon"
              />

              <div className="row">
                <div className="col-7">
                  <div className="user_dashboard_username">
                    {" "}
                    Hello {user.userName} !!
                  </div>
                  <div className="user_dashboard_text_booking_details">
                    {" "}
                    Booking Details
                  </div>
                  <div className="user_dashboard_down_arrow"></div>
                  <div className="user_dashboard_booking_details_card">
                    <table className="user_dashboard_booking_details_table">
                      <tr className="user_dashboard_booking_details_table_heading">
                        <th>Wing</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Plan</th>
                        <th>Amount</th>
                        <th>Active for</th>
                      </tr>
                      {user.booking_partner.map((userdata) => {
                        return (
                          <tr className="user_dashboard_booking_details_table_data">
                            <td>{userdata.slots.wing.wingName}</td>
                            <td>
                              {moment(userdata.startFrom).format("DD-MM-YYYY")}
                            </td>
                            <td>
                              {moment(userdata.endTo).format("DD-MM-YYYY")}
                            </td>
                            <td>{userdata.plan}</td>
                            <td>

                              {userdata.charge}$
                            </td>
                            <td>
                              {Dayleft(userdata.endTo) > 0
                                ? Dayleft(userdata.endTo)
                                : 0}{" "}
                              days
                              <span
                                className={
                                  "mx-1 user_dashboard_active_" +
                                  (Dayleft(userdata.endTo) > 0
                                    ? "green"
                                    : "red")
                                }
                              ></span>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                  
                </div>
                <div className="col-5">
                  <div className="user_dashboard_right_container">
                    <div className="user_dashboard_balance_card">
                      <div className="user_dashboard_balance_card_text mb-3">
                        {" "}
                        Balance{" "}

                        <div className="user_dashboard_pay_container text-center">
                          {!getAmount ? (
                            <div
                              className="user_dashboard_pay"
                              onClick={() => setGetAmount(true)}
                            >
                              {" "}
                              Pay Online{" "}
                            </div>
                          ) : (
                            <div
                              className="user_dashboard_pay"
                              onClick={() => setGetAmount(false)}
                            >
                              {" "}
                              Last Transaction{" "}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="d-flex">
                        {Balance(user.payment_partner, user.booking_partner)} 
                      </div>
                    </div>

                    {!getAmount ? (
                      <>
                         {true && (
                <div className="">

                  <div className="">
                    <div className="user_dashboard_popup_history_container">
                      <div className="user_dashboard_popup_transaction_history_flex">
                        <div className="user_dashboard_popup_transaction_history mb-4">
                          {" "}
                          Transaction History{" "}
                        </div>

                      </div>
                      <div className="user_dashboard_popup_table_container">
                        <table className="user_dashboard_popup_table">
                          <tr className="user_dashboard_popup_table_header">
                            <th>Transaction id</th>
                            <th>Date</th>
                            <th>Payment</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                          {user.payment_partner.map((transaction) => {
                            return (
                              <tr className="user_dashboard_popup_table_content">
                                <td>{transaction.paymentId}</td>
                                <td>
                                  {moment(transaction.paymentDate).format(
                                    "DD-MM-YYYY"
                                  )}
                                </td>
                                <td>{transaction.paymentType}</td>
                                <td>{transaction.amount}</td>

                                <td>
                                  <span
                                    className={
                                      "user_dashboard_popup_status_" +
                                      "Successful".toLowerCase()
                                    }
                                  >
                                    Successful
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

                      </>
                    ) : (
                      <div className="user_dashboard_transaction_card">
                        <div className="user_dashboard_transaction_card_title">
                          {" "}
                        </div>
                        <div className="user_dashboard_transaction_card_transaction_id mb-3">
                          {" "}
                        </div>

                        <div
                          className="user_dashboard_transaction_card_amount_section"
                          style={{ paddingRight: "16px" }}
                        >
                          <div className="user_dashboard_transaction_card_amount_text mb-3">
                            {" "}
                            Amount{" "}
                          </div>

                          <div class="input-group">
                            <div class="input-group-prepend">
                              <div class="input-group-text">$</div>
                            </div>
                            <input
                              type="number"
                              class="form-control"
                              id="inlineFormInputGroupUsername"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>

                          <div class="col-auto text-center my-1">
                            <button
                              type="submit"
                              class="btn btn-primary btn-sm mt-3 mb-3"
                              onClick={() => CallPayment()}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                  
              </div>
              <div className="row">
                <div className="col-7">
                  <div style={{ display: "none" }}>Munidex Parking</div>
                </div>
              </div>
            </div>
          )} */}
        </>
      )}
    </>
  );
}
