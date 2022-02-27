import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import logo from "../assets/images/navlogo.svg";
import userprof from "../assets/images/userprofile.png";
import handshake from "../assets/images/handshake.png";
import loader_video from "../assets/images/loader.mp4";
import "../assets/css/user_dashboard/user_dashboard.css";
import { IoClose } from "react-icons/io5";
import moment from "moment";
import {
  axios_call,
  axios_call_unauthenticated,
  axios_call_auto,
  validation_count,
  logout,
  generateUUID,
  formatUsd
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
    var val = payment_total - booking_total

    if(val<0){
    return <div><span className="user_dashboard_balance_card_amount" >{formatUsd(Math.abs(payment_total - booking_total))}</span><span className=" small bg-danger mx-2 text-white px-1 rounded">Delinquent</span></div>
    }
    else
    if(val==0){

        return (
            <div>
              {" "}
              {formatUsd(payment_total - booking_total)}
              <span className="small bg-warning mx-1 text-white px-1 rounded">
                Paid
              </span>
            </div>
          );

    }
    else{
    {
    return <div><span className="user_dashboard_balance_card_amount" >{formatUsd(payment_total - booking_total)}</span><span className="small bg-success mx-2 text-white px-1 rounded">OverPayment</span></div>
    }  }
}

  function Dayleft(endTo) {
    var b = moment(endTo, "YYYY-MM-DD");
    var a = moment(new Date(), "YYYY-MM-DD");
    var day = b.diff(a, "days");
    return day;
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

    window.location.replace('https://taxdev.munidex.info/pbs2/pbs/' )


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
      {" "}
       
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
                {/* </div> */}
              </div>
            </div>
          )}
          {user && (
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
                            {/* <td>{userdata.Slots.wing.wingName}+[{userdata.slotid}]</td> */}
                            <td>{userdata.slots.wing.wingName}</td>
                            <td>
                              {moment(userdata.startFrom).format("DD-MM-YYYY")}
                            </td>
                            <td>
                              {moment(userdata.endTo).format("DD-MM-YYYY")}
                            </td>
                            <td>{userdata.plan}</td>
                            <td>
                              {/* <span
                          className={
                            "user_dashboard_payment_text_" + userdata.status
                          }
                        >
                          {userdata.status}
                        </span> */}
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
                        {/* <div className="user_dashboard_pay_container text-center">
                    <div className="user_dashboard_pay"> Pay </div>
                  </div> */}
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
                  {/* <div className="col-4 user_dashboard_popup_leftside text-center">
                    <img
                      src={handshake}
                      alt="zengov"
                      className="user_dashboard_handshake_image"
                    />
                    <div className="user_dashboard_popup_leftside_text">
                      Zen<span>Gov</span>
                    </div>
                  </div> */} 
                  <div className="">
                    <div className="user_dashboard_popup_history_container">
                      <div className="user_dashboard_popup_transaction_history_flex">
                        <div className="user_dashboard_popup_transaction_history mb-4">
                          {" "}
                          Transaction History{" "}
                        </div>
                        {/* <div
                          className="user_dashboard-popup_close"
                          onClick={() => setPopup(false)}
                        >
                          <IoClose style={{ color: "#646262" }} size={30} />
                        </div> */}
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
          )}
        </>
      )}
    </>
  );
}
