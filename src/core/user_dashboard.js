import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import logo from "../assets/images/logogrey.svg";
import wrong from "../assets/images/wrong.svg";
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
import { IoClose, IoSettingsSharp } from "react-icons/io5";
import moment from "moment";
import "../assets/css/admin_dashboard/booking.css";
import DatePicker from "react-datepicker";
import tick from "../assets/images/tick.svg";
import payment_unsuccessful from "../assets/images/payment_unsuccessful.webp";
import view from "../assets/images/view.svg";
import close from "../assets/images/close.svg";
import { useMediaQuery } from "react-responsive";
import {
  validation_name,
  validation_value,
  validation_country,
  axios_call,
  axios_call_unauthenticated,
  axios_call_auto,
  validation_count,
  axios_call_error,
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
import { InputBox } from "../components/general/inputbox";
import noBooking from "../assets/images/noactiveBooking.svg";
import SetupProcess from "../components/user_dashboard/SetupProcessProgressbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function User_dashboard() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isTabOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  let { id, status, key } = useParams();
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState(false);
  const [active, setactive] = useState(false);
  const [props, setprops] = useState();
  //   const [getAmount, setGetAmount] = useState(false);
  //   const [amount, setAmount] = useState();
  const [logout_popup, setlogout_popup] = useState();
  const [loader, setloader] = useState(true);
  const [history_report, setHistory] = useState(false);
  const [credit, setCredit] = useState({ amount: 0, type: "" });
  const [success, setSuccess] = useState();
  const [step, setstep] = useState(1);
  const [payment_online, setpayment_online] = useState();
  const [table, setTable] = useState({
    bookingdetails: true,
    transactionhistory: false,
  });
  const [preview, setPreview] = useState(false);
  const [bookinghover, setBookinghover] = useState();
  const [booking_details, SetBookingdetails] = useState([]);
  const [wing_data, setWing_data] = useState();
  const [wing, SetWing] = useState();
  const [slot, SetSlot] = useState();
  const [percent, setPercent] = useState();
  const [datafail, setData_fail] = useState();
  const [error, setError] = useState();
  const [mailStatus, setMailStatus] = useState();
  const [tab, setTab] = useState("Booking");
  const [carInfo, setCarInfo] = useState(false);
  const [PaymentSuccessful, setPaymentSuccessful] = useState()
  const [payment_pop, setpayment_pop] = useState({
    pop: false,
    amount: null,
    error: false,
  });
  const [cardata, setCarData] = useState({
    license: "dfv",
    make: "dfv",
    model: "5165",
    carRegistrationState: "dfv",
    color: "#ffffff",
    insurance: "dfvfd",
    permitYear: moment(new Date()).format("YYYY"),
    valid: "nil",
  });
const [btn, setbtn] = useState(false)
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

  let history = useHistory();

  function Validate_carData() {
    let val = false;
    var value = { ...cardata };
    if (
      validation_char(cardata.license).class == "pass" &&
      validation_char(cardata.make).class == "pass" &&
      validation_char(cardata.model).class == "pass" &&
      validation_char(cardata.carRegistrationState).class == "pass" &&
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
    setstep(1);
  }

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

  function Balance(payment, booking) {
    var payment_total = 0;
    var booking_total = 0;
    payment.forEach((element) => {
      if (element.status == "success") {
        payment_total = payment_total + element.amount;
      }
    });
    booking.forEach((element) => {
      booking_total = booking_total + parseInt(element.charge);
    });
    var val = payment_total - booking_total;
    console.log(val);
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
    if (day == 0) {
      return "1";
    }
    if (!active && day >= 0) {
      setactive(true);
    }
    return day;
  }

  function calluseEffect() {
    axios_call("GET", "UserLogin").then((response) => {
      console.log('response');
      console.log(response);
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

            axios_call("GET", "UserLogin").then((response) => {
              console.log(response[0]);
              console.log("response[0]");
              console.log(response);
              setbooking({
                ...booking,
                name: response[0].userName,
                userId: response[0].id,
              });
              setUser(response[0]);
              Balance(response[0].payment_partner, response[0].booking_partner);
            });
          });
        });
      } else {
        setbooking({
          ...booking,
          name: response[0].userName,
          userId: response[0].id,
        });
        setUser(response[0]);
        Balance(response[0].payment_partner, response[0].booking_partner);
      }
    });

    GetWingDetails();
    setTimeout(() => {
      GetBooking();
    }, 2000);

    setTimeout(() => {
      setloader(false);
    }, 3000);
  }

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
    if (val > 1) {
        setbtn(true)
      var body = {
        fname: user.userName,
        lname: user.userName,
        email: user.email,
        amount: val,
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
        paymentId: body.clientrefnum,
        paymentType: "online",
        paymentDate: new Date(),
        amount: val,
        Status: "failed",
        key: generateUUID(),
      };

      console.log(data);
      axios_call(
        "POST",
        "CreateOnlinePayment/4ebd0208-8328-5d69-8c44-ec50939c0967/",
        data
      ).then((response_main) => {
        console.log(response_main);
        let userDate = user;
        userDate.payment_partner.push(response_main);
        setUser(user);
        FormSubmit(body.clientrefnum);

        // axios_call("POST", "PaymentEndpoint/", {
        //   status: "S",
        //   transNum: body.clientrefnum,
        //   serviceType: "pkg",
        // }).then((response_main) => {
        //   console.log(response_main);
        // });

        axios({
          method: "POST",
          url: "http://3.223.15.134:9000/testapi/",
          data: body,
          port: 443,
          headers: {
            "Content-Type": "application/json",
          },
          json: true,
        }).then((response) => {
          window.location.assign(
            "https://taxdev.munidex.info/pbs2/pbs/" +
              response.data +
              "?returnUri=http://localhost:3001/dashboard/" +
              response_main.id +
              "/booking/" +
              body.clientrefnum
          );
          console.log(response);
        });
      });
    } else {
      setpayment_pop({ ...payment_pop, error: "Please enter a valid amount" });
      console.log(generateUUID());
      if (id) {
        console.log(id);
      }
    }
  }

  function CallPayment_pop(val) {
    if (val > 1) {
        setbtn(true)
      var body = {
        fname: user.userName,
        lname: user.userName,
        email: user.email,
        amount: val,
        transfee: 1.5,
        muni_code: "9999",
        dept: "marina",
        pbsdescr: "pet license",
        clientrefnum: generateUUID(),
        ptype: "CC",
        pprovider: "MSBP",
        rme: false,
      };

      var data = {
        secretKey: "9401f9e0-6596-11ec-bd15-8d09a4545895",
        userId: user.id,
        paymentId: body.clientrefnum,
        paymentType: "online",
        paymentDate: new Date(),
        amount: val,
        Status: "failed",
        key: generateUUID(),
      };

      console.log(data);

      axios_call(
        "POST",
        "CreateOnlinePayment/4ebd0208-8328-5d69-8c44-ec50939c0967/",
        data
      ).then((response_main) => {
        console.log(response_main);
        let userDate = user;
        userDate.payment_partner.push(response_main);
        setUser(user);

        axios_call_unauthenticated("POST", "PaymentEndpoint/", {
          status: "S",
          transNum: body.clientrefnum,
          serviceType: "pkg",
        }).then((response_main) => {
          console.log(response_main);
        });
        console.log('hi')
        axios({
          method: "POST",
          url: "http://3.223.15.134:9000/testapi/",
          data: body,
          port: 443,
          headers: {
            "Content-Type": "application/json",
          },
          json: true,
        }).then((response) => {
          window.location.assign(
            "https://taxdev.munidex.info/pbs2/pbs/" +
              response.data +
              "?returnUri=http://localhost:3001/dashboard/" +
              response_main.id +
              "/payment/" +
              body.clientrefnum
          );
          console.log(response);
        });
      });
    } else {
      setpayment_pop({ ...payment_pop, error: "Please enter a valid amount" });
      console.log(generateUUID());
      if (id) {
        console.log(id);
      }
    }
  }

  function nextStep(val) {
    console.log(booking);

    if (val == 1) {
      setstep(1);
      setCarInfo(false);
    }

    if (val == 2) {
      if (
        booking.date &&
        booking.slotid &&
        booking.slot_connect &&
        booking.wing_name
      ) {
        setstep(2);
        setCarInfo(true);
      } else {
        setError("Please select a slot to continue");
      }
    }

    if (val == 3) {
      if (Validate_carData()) {
        setstep(3);
        setCarInfo(false);
        setError();
      }
    }

    if (step == 4) {
      if (booking.plan) {
        setstep(4);
      }
    }
  }

  function FormSubmit(key) {
    var startFrom = moment(booking.date, "YYYY-MM-DD").format("YYYY-MM-DD");
    var endTo = "";

    if (booking.plan == "Daily") {
      endTo = moment(booking.date, "YYYY-MM-DD")
        .add(0, "days")
        .format("YYYY-MM-DD");
    }

    if (booking.plan == "Monthly") {
      endTo = moment(booking.date, "YYYY-MM-DD")
        .add(1, "M")
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
      console.log(booking_finalized);
      axios_call("POST", "BookingTemp/", { ...booking_finalized, key: key })
        .then((response) => {
          console.log(response);
          console.log("response");
          let userDate = user;
          userDate.booking_partner.unshift(response);
          setUser(user);
          console.log({ ...carDetails, bookingId: response.id, key: key });
          axios_call("POST", "CarInfoTemp/", {
            ...carDetails,
            bookingId: response.id,
            key: key,
          }).then((response) => {
            // reset();
          });
          //   setSuccess(response);
          //   SendMail();
        })
        .catch((response) => {
          //   axios_call("POST", "CreateBooking/", booking_finalized).then(
          //     (response) => {
          //       console.log(response);
          //       reset();
          //     }
          //   );
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

  function SendMail(success) {
    var data = {
      to: success.User.email,
      invoiceDate: moment(success.date).format("MM/DD/YYYY"),
      user: success.User.userName,
      accountNumber: success.User.accountNumber,
      bookingId: success.bookingId,
      amount: success.charge,
      startFrom: moment(success.startFrom).format("MM/DD/YYYY"),
      endTo: moment(success.endTo).format("MM/DD/YYYY"),
      wing: success.slots.wing.wingName,
      plan: success.plan,
      id: success.id,
      slot: success.slot_connect,
    };
    console.log(data);
    setMailStatus({
      status: "Sending",
      to: success.User.email,
    });

    axios_call("POST", "send_mail_booking/", data).then((response) => {
      console.log(response);
      setMailStatus({
        status: "Successful",
        to: success.User.email,
      });
    });
  }

  useEffect(async () => {
    if (key && status && id) {
      var response_main = null;
      response_main = await axios_call_error(
        "GET",
        "PaymentEndpoint/" + key + "/"
      );
      if (response_main.transNum == key && response_main.status == "S") {
        console.log("hi");
        axios_call("GET", "CreatePayment/" + id + "/").then((response) => {
          if (response.paymentId == key) {
            console.log("success");
            var data = {
              userId: response.userId,
              paymentId: response.paymentId,
              paymentType: response.paymentType,
              paymentDate: response.paymentDate,
              amount: response.amount,
              Status: "success",
              key: response.key,
            };
            axios_call("PUT", "CreatePayment/" + id + "/", data).then(
              (response) => {
                axios_call(
                    "Delete",
                    "PaymentEndpoint/" + key + "/"
                  )
                if (status == "booking") {
                  axios_call("GET", "BookingTemp/" + key + "/").then(
                    (response_main) => {
                      delete response_main["id"];
                      delete response_main["date_auto"];
                      console.log(response_main);
                      axios_call("POST", "CreateBooking/", response_main).then(
                        (booked) => {
                          console.log(booked.id);
                          axios_call("GET", "CarInfoTemp/" + key + "/").then(
                            (carinfo) => {
                              axios_call("POST", "CreateCarInfo/", {
                                ...carinfo,
                                bookingId: booked.id,
                              }).then((carinfobooked) => {
                                axios_call(
                                    "Delete",
                                    "BookingTemp/" + key + "/"
                                  )
                                  axios_call(
                                    "Delete",
                                    "CarInfoTemp/" + key + "/"
                                  )
                                calluseEffect();
                              });
                            }
                          );
                          SendMail(booked);
                          setSuccess(booked)
                        }
                      );
                    }
                  );
                }
                if(status=='payment'){
                    calluseEffect();
                    setPaymentSuccessful({...data,success:true})
                }
              }
            );
          }
        });
      }
      if (response_main == "failed"||response_main.status == "F") {
        calluseEffect();
        setpayment_online('failed')
        if (status == "booking"){
        axios_call(
            "Delete",
            "BookingTemp/" + key + "/"
          )
          axios_call(
            "Delete",
            "CarInfoTemp/" + key + "/"
          )}
          axios_call(
            "Delete",
            "PaymentEndpoint/" + key + "/"
          )
      }
    } else {
      calluseEffect();
    }
  }, []);

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

{payment_online=='failed' && (
            <div className="overlay">
              <div className="bookingspopup_container">
                <div
                onClick={() => setpayment_online()} 
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div> </div>
                  <Link to='/dashboard'>
                  <div className="pt-2 pe-3">
                    <img onClick={() => setpayment_online()} src={close} />
                  </div></Link>
                </div>
                <div className="d-flex flex-column mb-3">
                  <div className=" ps-3 text-center">
                    <img src={payment_unsuccessful} style={{width:'70%'}} />
                  </div>
                   <div style={{color:'gray',fontSize:'30px'}} className="mt-2 mb-5  ps-3 text-center" >
                  Payment Failed
                </div>
                </div>
              </div>
            </div>
          )}

{PaymentSuccessful && (
            <div className="overlay">
              <div className="bookingspopup_container">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div> </div>
                  <Link to='/dashboard'>
                  <div className="pt-2 pe-3">
                    <img 
                    onClick={() => setPaymentSuccessful()} 
                    src={close} />
                  </div></Link>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div> </div>
                  <div className="mt-2 ps-3">
                    <img src={tick} />
                  </div>
                </div>
                <div className="bookingspopup_title mt-3 mb-5">
                Payment Successful
                </div>
                
                <div style={{ textAlign: "center" }} className="mb-5">
                  <span className="bookingspopup_text_amount"> Amount </span>{" "}
                  <span className="bookingspopup_value_amount">
                    {" "}
                    {true && formatUsd(parseInt(PaymentSuccessful.amount))}
                  </span>
                </div>
              </div>
            </div>
          )}


          {success && (
            <div className="overlay">
              <div className="bookingspopup_container">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div> </div>
                  <Link to='/dashboard'> <div className="pt-2 pe-3">
                    <img onClick={() => setSuccess(false)} src={close} />
                  </div></Link>
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
                      From:{" "}
                      <span className="bookingspopup_body">
                        {" "}
                        {moment(success.startFrom).format("MM/DD/YYYY")}
                      </span>
                    </div>
                    <div className="bookingspopup_head">
                      To:{" "}
                      <span className="bookingspopup_body">
                        {moment(success.endTo).format("MM/DD/YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="bookingspopup_details_flex mb-3">
                    <div className="bookingspopup_head">
                      Name:{" "}
                      <span className="bookingspopup_body">
                        {success.User.userName}
                      </span>
                    </div>
                    <div className="bookingspopup_head">
                      Plan:{" "}
                      <span className="bookingspopup_body">{success.plan}</span>
                    </div>
                  </div>
                  <div className="bookingspopup_details_flex mb-4">
                    <div className="bookingspopup_head">
                      Wing:{" "}
                      <span className="bookingspopup_body">
                        {success.slots.wing.wingName}
                      </span>
                    </div>
                    <div className="bookingspopup_head">
                      Slot:{" "}
                      <span className="bookingspopup_body">
                        {success.slot_connect}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "center" }} className="mb-5">
                  <span className="bookingspopup_text_amount"> Amount </span>{" "}
                  <span className="bookingspopup_value_amount">
                    {" "}
                    {success.charge && formatUsd(parseInt(success.charge))}
                  </span>
                </div>
              </div>
            </div>
          )}



          {logout_popup && (
            <div className="overlay">
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
                      style={{ cursor: "pointer" }}
                    ></button>
                  </div>
                  <div className="modal-body">Are you sure?</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      onClick={() => setlogout_popup(false)}
                      className="btn btn-light btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={logoutuser}
                      className="btn btn-danger btn-sm"
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
              <div className="d-flex justify-content-between mt-3 ps-3 pe-4">
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
                {!isDesktopOrLaptop && (
                  <div className="d-flex justify-content-evenly mt-4 mb-3 px-2">
                    {!isTabOrLaptop && (
                      <div
                        className={
                          tab == "Profile"
                            ? "btn btn-outline-primary btn-sm"
                            : "btn btn-primary btn-sm"
                        }
                        onClick={() => setTab("Profile")}
                      >
                        Profile
                      </div>
                    )}
                    <div
                      className={
                        tab == "Booking"
                          ? "btn btn-outline-primary btn-sm"
                          : "btn btn-primary btn-sm"
                      }
                      onClick={() => setTab("Booking")}
                    >
                      Booking
                    </div>
                    <div
                      className={
                        tab == "Online"
                          ? "btn btn-outline-primary btn-sm"
                          : "btn btn-primary btn-sm"
                      }
                      onClick={() => setTab("Online")}
                    >
                      Online
                    </div>
                  </div>
                )}

                {(tab == "Profile" || isTabOrLaptop) && (
                  <>
                    <Userprofile
                      setHistory={setHistory}
                      setTab={setTab}
                      history_report={history_report}
                      data={user}
                    />
                  </>
                )}

                <div className={"col-xl-10 col-lg-9 col-12"}>
                  <div className="row">
                    {(tab == "Booking" || isDesktopOrLaptop) && (
                      <>
                        <div className="col-xl-8  col-md-12 udb_middlescrollsection">
                          {!history_report && (
                            <div>
                              {carInfo && (
                                <div className="overlay_carInfo shadow">
                                  <div className="row">
                                    <div
                                      className="text-center h3"
                                      style={{ marginTop: "20px" }}
                                    >
                                      Car Info
                                    </div>
                                    <div className="col-lg-5 col-12 text-center">
                                      <div
                                        className="d-flex flex-column"
                                        style={{ marginTop: "45px" }}
                                      >
                                        <div>
                                          {" "}
                                          {booking.wing_name &&
                                            booking.wing_name +
                                              " [" +
                                              booking.slot_connect +
                                              "]"}
                                        </div>
                                        <img
                                          src={Car}
                                          style={{
                                            marginLeft: "25%",
                                            marginTop: "20px",
                                          }}
                                          className="w-50"
                                          alt="Munidex_parking_Booking_slots"
                                        />
                                      </div>
                                    </div>

                                    <div
                                      className="col-lg-7 col-12"
                                      style={{ marginTop: "20px" }}
                                    >
                                      <div className="row ps-lg-0 ps-4">
                                        <div
                                          className="col-lg-6 col-12"
                                          style={{ marginTop: "1%" }}
                                        >
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
                                        <div
                                          className="col-lg-6 col-12"
                                          style={{ marginTop: "1%" }}
                                        >
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
                                        <div
                                          className="col-lg-6 col-12"
                                          style={{ marginTop: "1%" }}
                                        >
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
                                        <div
                                          className="col-lg-6 col-12"
                                          style={{ marginTop: "1%" }}
                                        >
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

                                        <div
                                          className="col-lg-6 col-12"
                                          style={{ marginTop: "1%" }}
                                        >
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
                                        <div
                                          className="col-lg-6 col-12"
                                          style={{ marginTop: "1%" }}
                                        >
                                          <div className="homeinputblock">
                                            <DatePicker
                                              className="homeinput full"
                                              onChange={(e) =>
                                                setCarData({
                                                  ...cardata,
                                                  permitYear:
                                                    moment(e).format("YYYY"),
                                                })
                                              }
                                              dateFormat="yyyy"
                                              showYearPicker
                                              value={cardata.permitYear}
                                            />{" "}
                                            <label className="label_cons_1">
                                              Permit Year
                                            </label>
                                          </div>
                                        </div>

                                        <div
                                          className="col-lg-6 col-12 mt-lg-0 mt-5"
                                          style={{ marginTop: "1%" }}
                                        >
                                          <InputBox
                                            label="Color"
                                            type="color"
                                            state={cardata}
                                            setState={setCarData}
                                            value={cardata.color}
                                            keyValue={"color"}
                                            validate={validation_value}
                                            styles={{
                                              padding: "18px",
                                              height: "48px",
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          marginRight: "100px",
                                          marginTop: "30px",
                                        }}
                                      >
                                        <div className="d-flex justify-content-end mb-5">
                                          <div
                                            className="btn  btn-primary"
                                            onClick={() =>
                                              step < 4 && nextStep(step + 1)
                                            }
                                          >
                                            Next
                                          </div>
                                          <div
                                            className="btn mx-2 btn-light"
                                            onClick={() =>
                                              step > 1 && nextStep(step - 1)
                                            }
                                          >
                                            Back
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {isDesktopOrLaptop && (
                                <SetupProcess number={step}></SetupProcess>
                              )}
                              <div className=" px-lg-3 p-lg-3 px-1 bg-white rounded">
                                <div className="row ">
                                  <div className="col-lg-4 col-6">
                                    <div className="booking_form_date_input mt-3">
                                      <label for="date">Date</label>
                                      <div
                                        style={{
                                          marginLeft: isDesktopOrLaptop
                                            ? "50px"
                                            : "20px",
                                          marginTop: "-5px",
                                        }}
                                      >
                                        <DatePicker
                                          dateFormat="MM/dd/yyyy"
                                          className="payment_date"
                                          selected={booking.date}
                                          onClickOutside
                                          onSelect={(date) => (
                                            GetBooking(date),
                                            setbooking({
                                              ...booking,
                                              date: date,
                                            })
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-lg-4 col-6">
                                    <div className="booking_form_name_input">
                                      <label for="name">Slot</label>
                                      <div className="d-flex flex-column booking_form_name_input">
                                        {bookinghover ? (
                                          <input
                                            type="text"
                                            style={{
                                              marginLeft: "50px",
                                              marginTop: "10px",
                                              background: "#007ffe",
                                              borderRadius: "4px",
                                              color: "white",
                                            }}
                                            value={
                                              bookinghover.slotid &&
                                              bookinghover.wing_name +
                                                " [" +
                                                bookinghover.slot_connect +
                                                "]"
                                            }
                                            //   onClick={() => setCarInfo(true)}
                                            //   className={cardata.valid}
                                            readOnly
                                          />
                                        ) : (
                                          <input
                                            type="text"
                                            style={{
                                              marginLeft: "50px",
                                              marginTop: "10px",
                                            }}
                                            value={
                                              booking.slotid &&
                                              booking.wing_name +
                                                " [" +
                                                booking.slot_connect +
                                                "]"
                                            }
                                            //   onClick={() => setCarInfo(true)}
                                            //   className={cardata.valid}
                                            readOnly
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  {isDesktopOrLaptop && (
                                    <div className="col-4">
                                      <div className="booking_form_name_input">
                                        <label for="name">Plan</label>
                                        <div className="d-flex flex-column booking_form_name_input">
                                          <input
                                            type="text"
                                            style={{
                                              marginLeft: "50px",
                                              marginTop: "10px",
                                            }}
                                            value={
                                              booking.plan != "not_selected"
                                                ? booking.plan
                                                : ""
                                            }
                                            //   onClick={() => setCarInfo(true)}
                                            //   className={cardata.valid}
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {error && (
                                <div className="alert alert-danger mt-3">
                                  {error}
                                </div>
                              )}

                              {/* step1----------------------------------------------------------------- */}
                              {step == 1 && (
                                <div className="">
                                  <div className="booking_colorcodes mt-3 px-2 mx-lg-5 ">
                                    <span className="booking_undercons">
                                      {" "}
                                      Construction
                                    </span>
                                    <span className="booking_lessweek">
                                      {" "}
                                      &lt; 7 days{" "}
                                    </span>
                                    <span className="booking_moreweek">
                                      {" "}
                                      &gt; 7 days
                                    </span>
                                  </div>

                                  {wing_data && wing_data.length && (
                                    <div className="parking_setup_wing_title_section_user mt-lg-0 mt-3 shadow">
                                      <div style={{ flexGrow: 1 }}>
                                        <Carousel
                                          itemsToShow={
                                            isDesktopOrLaptop ? 6 : 3
                                          }
                                          itemsToScroll={1}
                                          pagination={false}
                                          showArrows={true}
                                        >
                                          {wing_data.map((wing,id) => {
                                            return (
                                              <div
                                              key={id}
                                                className={
                                                  wing.id !=
                                                  (slot && slot[0].wingId)
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

                                  <div className="parking_setup_wing_container mt-lg-1 mt-4">
                                    {slot && (
                                      <>
                                        {slot.map((slot, id) => {
                                          return (
                                            <span key={id}>
                                              {checkslots(
                                                slot,
                                                id,
                                                booking_details
                                              )}
                                            </span>
                                          );
                                        })}
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* step3----------------------------------------------------------------- */}
                              {step == 3 && (
                                <>
                                  <div
                                    className="booking_form_title bg-light me-5 p-2"
                                    style={{ marginTop: "0px" }}
                                  >
                                    Plan
                                  </div>
                                  <div className="">
                                    <div className="booking_form_plan_input">
                                      <div className="booking_form_plan_input_buttons1">
                                        <div
                                          className={
                                            booking.plan == "Daily"
                                              ? "booking_form_input_button_daily_selected m-1"
                                              : "booking_form_input_button_daily m-1"
                                          }
                                          onClick={() =>
                                            setbooking({
                                              ...booking,
                                              plan: "Daily",
                                              charge: wing && wing.planDaily,
                                            })
                                          }
                                        >
                                          <div className="d-flex flex-column">
                                            <div className="h6">Daily</div>
                                            <div className="h5">
                                              {" "}
                                              {wing &&
                                                formatUsd(wing.planDaily)}
                                            </div>
                                          </div>
                                        </div>

                                        <div
                                          className={
                                            booking.plan == "Weekly"
                                              ? "booking_form_input_button_weekly_selected m-1"
                                              : "booking_form_input_button_weekly m-1"
                                          }
                                          onClick={() =>
                                            setbooking({
                                              ...booking,
                                              plan: "Weekly",
                                              charge: wing && wing.planWeekly,
                                            })
                                          }
                                        >
                                          <div className="d-flex flex-column">
                                            <div className="h6"> Weekly</div>
                                            <div className="h5">
                                              {" "}
                                              {wing &&
                                                formatUsd(wing.planWeekly)}
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className={
                                            booking.plan == "Monthly"
                                              ? "booking_form_input_button_monthly_selected m-1"
                                              : "booking_form_input_button_monthly m-1"
                                          }
                                          onClick={() =>
                                            setbooking({
                                              ...booking,
                                              plan: "Monthly",
                                              charge: wing && wing.planMonthly,
                                            })
                                          }
                                        >
                                          <div className="d-flex flex-column">
                                            <div className="h6">Monthly</div>
                                            <div className="h5">
                                              {" "}
                                              {wing &&
                                                formatUsd(wing.planMonthly)}
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className={
                                            booking.plan == "Quarterly"
                                              ? "booking_form_input_button_quarterly_selected m-1"
                                              : "booking_form_input_button_quarterly m-1"
                                          }
                                          onClick={() =>
                                            setbooking({
                                              ...booking,
                                              plan: "Quarterly",
                                              charge:
                                                wing && wing.planQuarterly,
                                            })
                                          }
                                        >
                                          <div className="d-flex flex-column">
                                            <div className="h6">Quarterly</div>
                                            <div className="h5">
                                              {" "}
                                              {wing &&
                                                formatUsd(wing.planQuarterly)}
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className={
                                            booking.plan == "Yearly"
                                              ? "booking_form_input_button_yearly_selected m-1"
                                              : "booking_form_input_button_yearly m-1"
                                          }
                                          onClick={() =>
                                            setbooking({
                                              ...booking,
                                              plan: "Yearly",
                                              charge: wing && wing.planYearly,
                                            })
                                          }
                                        >
                                          <div className="d-flex flex-column">
                                            <div className="h6"> Yearly</div>
                                            <div className="h5">
                                              {" "}
                                              {wing &&
                                                formatUsd(wing.planYearly)}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}

                              <div
                                className="d-flex justify-content-end flex-row mt-5"
                                style={{ marginBottom: "200px" }}
                              >
                                {" "}
                                {step != 3 ? (
                                  <div
                                    className="btn  btn-primary"
                                    onClick={() =>
                                      step < 4 && nextStep(step + 1)
                                    }
                                  >
                                    Next
                                  </div>
                                ) : (
                                  <button
                                  disabled={btn}
                                    className="btn  btn-primary"
                                    onClick={() => CallPayment(booking.charge)}
                                  >
                                    Proceed to payment
                                  </button>
                                )}
                                <div
                                  className="btn mx-2 btn-light"
                                  onClick={() => step > 1 && nextStep(step - 1)}
                                >
                                  Back
                                </div>
                              </div>
                            </div>
                          )}

                          {history_report && (
                            <History
                              setHistory={setHistory}
                              isDesktopOrLaptop={isDesktopOrLaptop}
                              booking_partner={user.booking_partner}
                              payment_partner={user.payment_partner}
                            ></History>
                          )}
                        </div>
                      </>
                    )}

                    {(tab == "Online" || isDesktopOrLaptop) && (
                      <>
                        <div className="col-xl-4 col-md-12">
                          <div
                            className="udb_bcsection mt-4 pt-4 ps-4 pe-lg-3 mx-lg-5 mx-1 me-lg-4"
                            onClick={() =>
                              setpayment_pop({ ...payment_pop, pop: true })
                            }
                          >
                            <div className="udb_bctext mt-3 mb-2 ms-2">
                              Balance
                            </div>
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
                                    ? "udb_bcdelinquent pt-2 pb-1 ps-2 pe-2 mx-lg-0 mx-3"
                                    : "udb_bccredit pt-2 pb-1 ps-2 pe-2 mx-lg-0 mx-3"
                                }
                              >
                                {credit && credit.type}
                              </span>
                            </div>
                          </div>
                          <div className="udb_cartsection mt-4 pt-4 ps-3 pe-lg-3 pb-2">
                            {!active && (
                              <>
                                <div className="row justify-content-center mt-5">
                                  {" "}
                                  <img src={noBooking} className="w-75" />
                                </div>
                                <div className="h5 text-center text-muted mt-4">
                                  No active booking
                                </div>
                              </>
                            )}
                            {user.booking_partner.map((booking,id) => {
                              return (
                                <div key={id}>
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
                                </div>
                              );
                            })}
                          </div>

                          {payment_pop.pop && (
                            <div className="pay shadow">
                              {payment_pop.error && (
                                <div className="alert alert-danger mt-3">
                                  {payment_pop.error}
                                </div>
                              )}
                              <div className="row">
                                <div
                                  className="text-center h3"
                                  style={{ marginTop: "20px" }}
                                >
                                  Payment
                                </div>
                              </div>
                              <form className="mx-5">
                                <div className="form-group mt-2 mb-2">
                                  <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    onChange={(e) =>
                                      setpayment_pop({
                                        ...payment_pop,
                                        amount: e.target.value,
                                        error: null,
                                      })
                                    }
                                    placeholder="Enter amount"
                                  />
                                </div>
                                <div className="text-center mt-4">
                                  <button
                                    type="button"
                                    disabled={btn}
                                    className="btn btn-primary mx-2 btn-block"
                                    onClick={() =>
                                      CallPayment_pop(payment_pop.amount)
                                    }
                                  >
                                    Make payment
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-light  btn-block"
                                    onClick={(e) =>
                                      setpayment_pop({
                                        ...payment_pop,
                                        pop: false,
                                      })
                                    }
                                  >
                                    Close
                                  </button>
                                </div>
                              </form>
                              <History
                                setHistory={setHistory}
                                isDesktopOrLaptop={isDesktopOrLaptop}
                                booking_partner={user.booking_partner}
                                payment_partner={user.payment_partner}
                                transaction={true}
                              ></History>
                            </div>
                          )}
                          {/* <div className="udb_carttotal p-4">
                        Total Amount : $46
                      </div>
                      <div className="row text-center">
                        <div className="col-6" style={{ paddingRight: "0" }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-md w-75 udb_cart_clrbutton"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="col-6" style={{ paddingLeft: "0" }}>
                          <button
                            type="button"
                            className="btn btn-success btn-md w-75 udb_cart_continuebutton"
                          >
                            Continue
                          </button>
                        </div>
                      </div> */}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!user&&
           <div className="">
           <div className="">
             <div
             onClick={() => setpayment_online()} 
               style={{ display: "flex", justifyContent: "space-between" }}
             >
               <div> </div>
               <div className="pt-5 pe-3">
                 {/* <img onClick={() => setpayment_online()} src={close} /> */}
               </div>
             </div>
             <div className="d-flex flex-column justify-content-center mt-5">
               <div className=" ps-3 text-center">
                 <img src={wrong} style={{width:'200px'}} />
               </div>
                <div style={{color:'gray',fontSize:'30px'}} className="mt-2 mb-5  ps-3 text-center" >
               Somthing went wrong
             </div>
            
             </div>
             <div className="text-center">
                <Link to='/'>
             <div className="btn btn-primary btn-lg">
             Get back to login
             </div></Link></div>
           </div>
         </div>
          
          }
        </>
      )}
    </>
  );
}
