import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import logo from "../assets/images/munidex_logo.jpeg";
import userprof from "../assets/images/userprofile.png";
import handshake from "../assets/images/handshake.png";
import "../assets/css/user_dashboard/user_dashboard.css";
import { IoClose } from "react-icons/io5";
import moment from "moment";
import {
  axios_call,
  axios_call_auto,
  validation_count,
  logout,
} from "../functions/reusable_functions";
import { useLocation } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

export default function User_dashboard() {
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState(false);
  const [props, setprops] = useState();
  const [getAmount, setGetAmount] = useState();
  const [amount, setAmount] = useState();

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
    return payment_total - booking_total;
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
      axios({
        method: "GET",
        url:
          "http://127.0.0.1:8000/UserLogin?username=" +
          lastname +
          "&accountnumber=" +
          accountnumber,
      }).then((response) => {
        console.log(response.data[0]);
        if (response.data[0]) {
          setUser(response.data[0]);
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
        fname: "Munidex",
        lname: "Mail",
        email: "munidexmail@gmail.com",
        amount: amount,
        transfee: 1.5,
        muni_code: "1122",
        dept: "pkng",
        pbsdescr: "Parking Fees",
        clientrefnum: "abcd-1234-123-121",
        ptype: "CC",
        pprovider: "PROC",
        rme: false,
      };

      axios({
        method: "POST",
        url: "https://taxdev.munidex.info/pbs2/pbsreq",
        data:body,
        port: 443,
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "connect.sid=s%3Ajn1ZAMIq3w-AOZiwO4qGDqsbFvfd6OT7.4xwH5hCrPjKBetTh6rW8NogYksb84jMRdpfzNUJibN0",
        },
        json: true,
        withCredentials: true
      }).then((response) => { 
          console.log(response)
      });
    }
  }

  return (
    <>
      {" "}
       
      <Helmet>
        <title>Munidex Parking - User Dashboard</title>
      </Helmet>
      {user && (
        <div className="user_dashboard_container">
          {popup && (
            <div className="row user_dashboard_popup_section shadow">
              <div className="col-4 user_dashboard_popup_leftside text-center">
                <img
                  src={handshake}
                  alt="zengov"
                  className="user_dashboard_handshake_image"
                />
                <div className="user_dashboard_popup_leftside_text">
                  Zen<span>Gov</span>
                </div>
              </div>
              <div className="col-8">
                <div className="user_dashboard_popup_history_container">
                  <div className="user_dashboard_popup_transaction_history_flex">
                    <div className="user_dashboard_popup_transaction_history mb-5">
                      {" "}
                      Transaction History{" "}
                    </div>
                    <div
                      className="user_dashboard-popup_close"
                      onClick={() => setPopup(false)}
                    >
                      <IoClose style={{ color: "#646262" }} size={30} />
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

          <img
            src={logo}
            alt="munidex_logo"
            className="user_dashboard_munidex_logo"
          />
          <img
            onClick={logoutuser}
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
                    <th>plan</th>
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
                        <td>{moment(userdata.endTo).format("DD-MM-YYYY")}</td>
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
                          {Dayleft(userdata.endTo)} days
                          <span
                            className={
                              "mx-1 user_dashboard_active_" +
                              (Dayleft(userdata.endTo) > 0 ? "green" : "red")
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
                          Pay{" "}
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
                  <div className="user_dashboard_balance_card_amount d-flex">
                    {Balance(user.payment_partner, user.booking_partner)} $
                  </div>
                </div>

                {!getAmount ? (
                  <div className="user_dashboard_transaction_card">
                    <div className="user_dashboard_transaction_card_title">
                      {" "}
                      Last Transaction{" "}
                    </div>
                    <div className="user_dashboard_transaction_card_transaction_id mb-3">
                      {" "}
                      Transaction id :{" "}
                      <span>
                        {
                          user.payment_partner[user.payment_partner.length - 1]
                            .paymentId
                        }{" "}
                      </span>
                    </div>
                    <div className="user_dashboard_transaction_card_datetime_text">
                      {" "}
                      <div className="user_dashboard_transaction_card_date_text">
                        {" "}
                        Date{" "}
                      </div>{" "}
                      <div className="user_dashboard_transaction_card_time_text">
                        {" "}
                        Time{" "}
                      </div>
                    </div>
                    <div className=" user_dashboard_transaction_card_datetime">
                      {" "}
                      {moment(
                        user.payment_partner[user.payment_partner.length - 1]
                          .paymentDate
                      ).format("DD-MM-YYYY")}
                      <div> </div>
                      {moment(
                        user.payment_partner[user.payment_partner.length - 1]
                          .paymentDate
                      ).format("hh:mm a")}{" "}
                      <div> </div>
                    </div>
                    <div className="user_dashboard_transaction_card_amount_section">
                      <div className="user_dashboard_transaction_card_amount_text mb-3">
                        {" "}
                        Amount{" "}
                      </div>
                      <div className="user_dashboard_transaction_card_amount_number mb-3">
                        {
                          user.payment_partner[user.payment_partner.length - 1]
                            .amount
                        }{" "}
                        $
                      </div>
                    </div>
                    <div
                      className="user_dashboard_transaction_card_seemore text-center mt-4"
                      onClick={() => setPopup(true)}
                    >
                      See more
                    </div>
                  </div>
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
  );
}
