import React, { useState, useEffect } from "react";
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
import { IoClose } from "react-icons/io5";
import moment from "moment";
import {
  axios_call,
  axios_call_unauthenticated,
  axios_call_auto,
  validation_count,
  logout,
  generateUUID,
  formatUsd,
} from "../functions/reusable_functions";
import { useLocation } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

export default function User_dashboard() {
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState(false);
  const [props, setprops] = useState();
  const [getAmount, setGetAmount] = useState(false);
  const [amount, setAmount] = useState();
  const [logout_popup, setlogout_popup] = useState();
  const [loader, setloader] = useState(true);
  const [wing_data, setWing_data] = useState([
    { wingName: "Wing A" },
    { wingName: "Wing B" },
    { wingName: "Wing C" },
    { wingName: "Wing D" },
    { wingName: "Wing E" },
    { wingName: "Wing F" },
    { wingName: "Wing G" },
    { wingName: "Wing H" },
    { wingName: "Wing I" },
  ]);
  const [slot, SetSlot] = useState([
    1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,
    1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,
    1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,
    1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,
  ]);
  const [table, setTable] = useState({
    bookingdetails: true,
    transactionhistory: false,
  });

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
      return (
        <div>
          <span className="user_dashboard_balance_card_amount">
            {formatUsd(Math.abs(payment_total - booking_total))}
          </span>
          <span className=" small bg-danger mx-2 text-white px-1 rounded">
            Delinquent
          </span>
        </div>
      );
    } else if (val == 0) {
      return (
        <div>
          {" "}
          {formatUsd(payment_total - booking_total)}
          <span className="small bg-warning mx-1 text-white px-1 rounded">
            Paid
          </span>
        </div>
      );
    } else {
      {
        return (
          <div>
            <span className="user_dashboard_balance_card_amount">
              {formatUsd(payment_total - booking_total)}
            </span>
            <span className="small bg-success mx-2 text-white px-1 rounded">
              OverPayment
            </span>
          </div>
        );
      }
    }
  }

  function Dayleft(endTo) {
    var b = moment(endTo, "YYYY-MM-DD");
    var a = moment(new Date(), "YYYY-MM-DD");
    var day = b.diff(a, "days");
    return day;
  }

  function toggleTable(val) {
    setTable({
      bookingdetails: false,
      transactionhistory: false,
      [val]: true,
    });
  }

  useEffect(() => {
    var accountnumber = Cookies.get("accountnumber");
    var lastname = Cookies.get("lastname");
    if (accountnumber && lastname) {
      axios_call_unauthenticated(
        "GET",
        "UserLogin?username=" + lastname + "&accountnumber=" + accountnumber
      ).then((response) => {
        if (response) {
          console.log(response);
          setUser(response[0]);
        }
      });
    } else {
      axios_call("GET", "GetUserAccount").then((response) => {
        axios_call(
          "GET",
          "GetBusinessPartner/" + response[0].useraccount + "/"
        ).then((response) => {
          setUser(response);
        });
      });
    }
    setTimeout(() => {
      setloader(false);
    }, 2500);
  }, []);

  function logoutuser() {
    logout();
    Cookies.remove("accountnumber");
    Cookies.remove("lastname");
    history.push("/");
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
                  name="Mitchell"
                  acntnum="56 7782684 85"
                  email="michelle.rivera@example.com"
                  num="(239) 555-0108"
                />
                <div className="col-10">
                  <div className="row">
                    <div className="col-9 abccards_section pb-2 pt-2 mb-2">
                      <Carousel
                        itemsToShow={2.2}
                        itemsToScroll={1}
                        pagination={false}
                        showArrows={true}
                      >
                        <Activebooking
                          entry="5/27/21"
                          expiry="6/27/21"
                          status="Active"
                          remdays="26"
                          slot="6"
                          wing="B"
                          plan="Monthly"
                        />
                        <Activebooking
                          entry="5/27/21"
                          expiry="6/27/21"
                          status="Active"
                          remdays="26"
                          slot="6"
                          wing="B"
                          plan="Monthly"
                        />
                        <Activebooking
                          entry="5/27/21"
                          expiry="6/27/21"
                          status="Active"
                          remdays="26"
                          slot="6"
                          wing="B"
                          plan="Monthly"
                        />
                        <Activebooking
                          entry="5/27/21"
                          expiry="6/27/21"
                          status="Active"
                          remdays="26"
                          slot="6"
                          wing="B"
                          plan="Monthly"
                        />
                        <Activebooking
                          entry="5/27/21"
                          expiry="6/27/21"
                          status="Active"
                          remdays="26"
                          slot="6"
                          wing="B"
                          plan="Monthly"
                        />
                        <Activebooking
                          entry="5/27/21"
                          expiry="6/27/21"
                          status="Active"
                          remdays="26"
                          slot="6"
                          wing="B"
                          plan="Monthly"
                        />
                      </Carousel>
                    </div>
                    <div className="col-3">
                      <div className="udb_bcsection mt-4 pt-4 ps-4 pe-3 me-4">
                        <div className="udb_bctext mt-3 mb-2 ms-2">Balance</div>
                        <div className="udb_bcval ms-2">$ 1.234</div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          className="pb-3"
                        >
                          <span className="udb_bccredit pt-2 pb-1 ps-2 pe-2">
                            Credit
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-9 udb_middlescrollsection">
                      <div>
                        {wing_data && wing_data.length && (
                          <div className="parking_setup_wing_title_section_udb">
                            <div style={{ flexGrow: 1 }}>
                              <Carousel
                                itemsToShow={6}
                                itemsToScroll={1}
                                pagination={false}
                                showArrows={true}
                              >
                                {wing_data.map((wing) => {
                                  return (
                                    <div className="btn-light btn btn-sm m-1 text-capitalize">
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
                                  <img src={Car} className="ps-3 pe-3 mb-3" />
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                      <hr></hr>
                      <div className="px-5 mt-3 pb-3">
                        <Addslot amount="12" />
                        <Addslot amount="20" />
                      </div>
                      <hr></hr>

                      <div className="row user_dashboard_bookingdetails_heading mt-5 ps-2 pe-2">
                        {" "}
                        <div
                          className="col-6 user_dashboard_bookingdetails_heading_bd p-4"
                          onClick={() => toggleTable("bookingdetails")}
                          style={{
                            backgroundColor: table.bookingdetails
                              ? "#f0f8ff"
                              : "#fff",
                          }}
                        >
                          {" "}
                          Booking Details{" "}
                        </div>
                        <div
                          className="col-6 user_dashboard_bookingdetails_heading_th p-4"
                          onClick={() => toggleTable("transactionhistory")}
                          style={{
                            backgroundColor: table.transactionhistory
                              ? "#f0f8ff"
                              : "#fff",
                          }}
                        >
                          {" "}
                          Transaction History
                        </div>
                      </div>
                      {table.bookingdetails && (
                        <div className="user_dashboard_booking_details_card pb-5 ">
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
                                  {/* <td>{userdata.Slots.wing.wingName}+[{userdata.slotid}]</td> */}
                                  <td>{userdata.slots.wing.wingName}</td>
                                  <td>
                                    {moment(userdata.startFrom).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                  <td>
                                    {moment(userdata.endTo).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                  <td>{userdata.plan}</td>
                                  <td>{userdata.charge}$</td>
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
                      )}
                      {table.transactionhistory && (
                        <div className="user_dashboard_booking_details_card pb-5">
                          <table className="user_dashboard_booking_details_table">
                            <tr className="user_dashboard_booking_details_table_heading">
                              <th>Transaction id</th>
                              <th>Date</th>
                              <th>Payment</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                            {user.payment_partner.map((transaction) => {
                              return (
                                <tr className="user_dashboard_booking_details_table_data">
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
                      )}
                    </div>
                    <div className="col-3">
                      <div className="udb_cartsection mt-4 pt-4 ps-3 pe-3 pb-2">
                        <Cartcard
                          slot="10"
                          wing="A"
                          plan="Daily"
                          amount="$ 12"
                        />
                        <Cartcard
                          slot="10"
                          wing="A"
                          plan="Daily"
                          amount="$ 12"
                        />
                      </div>
                      <div className="udb_carttotal p-4">
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
                      </div>
                    </div>
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
