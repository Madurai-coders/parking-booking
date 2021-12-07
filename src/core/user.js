import React, { useState } from "react";
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
} from "../functions/reusable_functions";
export default function User_dashboard(props) {
  const [popup, setPopup] = useState(false);
  const [userdashboard, setUserdashboard] = useState([
    {
      slot: 5,
      sdate: "13/11/21",
      edate: "20/11/21",
      status: "pending",
      active: "green",
    },
    {
      slot: 7,
      sdate: "9/10/21",
      edate: "10/10/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 3,
      sdate: "5/09/21",
      edate: "10/08/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 7,
      sdate: "9/10/21",
      edate: "10/10/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 3,
      sdate: "5/09/21",
      edate: "10/08/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 7,
      sdate: "9/10/21",
      edate: "10/10/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 3,
      sdate: "5/09/21",
      edate: "10/08/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 5,
      sdate: "13/11/21",
      edate: "20/11/21",
      status: "pending",
      active: "green",
    },
    {
      slot: 7,
      sdate: "9/10/21",
      edate: "10/10/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 3,
      sdate: "5/09/21",
      edate: "10/08/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 7,
      sdate: "9/10/21",
      edate: "10/10/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 3,
      sdate: "5/09/21",
      edate: "10/08/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 7,
      sdate: "9/10/21",
      edate: "10/10/21",
      status: "completed",
      active: "red",
    },
    {
      slot: 3,
      sdate: "5/09/21",
      edate: "10/08/21",
      status: "completed",
      active: "red",
    },
  ]);

  const [transactionhistory, setTransactionhistoty] = useState([
    { tid: 567362925, dop: "20/11/21", payment: "$1,000", status: "Pending" },
    {
      tid: 567362925,
      dop: "10/10/21",
      payment: "$1,043",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/08/21",
      payment: "$2,095",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "12/09/21",
      payment: "$1,246",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/10/21",
      payment: "$1,043",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/08/21",
      payment: "$2,095",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "12/09/21",
      payment: "$1,246",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/10/21",
      payment: "$1,043",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/08/21",
      payment: "$2,095",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "12/09/21",
      payment: "$1,246",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/10/21",
      payment: "$1,043",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/08/21",
      payment: "$2,095",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "12/09/21",
      payment: "$1,246",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/10/21",
      payment: "$1,043",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/08/21",
      payment: "$2,095",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "12/09/21",
      payment: "$1,246",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/10/21",
      payment: "$1,043",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/08/21",
      payment: "$2,095",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "12/09/21",
      payment: "$1,246",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/10/21",
      payment: "$1,043",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/08/21",
      payment: "$2,095",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "12/09/21",
      payment: "$1,246",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/10/21",
      payment: "$1,043",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "10/08/21",
      payment: "$2,095",
      status: "Successful",
    },
    {
      tid: 567362925,
      dop: "12/09/21",
      payment: "$1,246",
      status: "Successful",
    },
  ]);

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

function Dayleft(endTo){
    var b = moment(endTo, "YYYY-MM-DD");
    var a = moment(new Date(), "YYYY-MM-DD");
   var day = b.diff(a, "days");
    return day
}

  return (
    <>
      {" "}
       
      <Helmet>
        <title>Munidex Parking - User Dashboard</title>
      </Helmet>
      <div className="user_dashboard-popup_close" onClick={props.set_up_flag}>
        <IoClose style={{ color: "#646262" }} size={30} />
      </div>
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
                      <th>Date of Payment</th>
                      <th>Payment</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                    {props.user.payment_partner.map((transaction) => {
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

                          <td><span className={"user_dashboard_popup_status_" + ('Successful'.toLowerCase())}>Successful</span></td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-7">
            <div className="user_dashboard_username">
              {" "}
              Hello {props.user.userName}
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
                {props.user.booking_partner.map((userdata) => {
                  return (
                    <tr className="user_dashboard_booking_details_table_data">
                      {/* <td>{userdata.Slots.wing.wingName}+[{userdata.slotid}]</td> */}
                      <td>{userdata.Slots.wing.wingName}</td>
                      <td>{moment(userdata.startFrom).format("DD-MM-YYYY")}</td>
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
                        
                        {userdata.charge}
                      </td>
                      <td>
                     { Dayleft(userdata.endTo)}
                        <span
                          className={"mx-1 user_dashboard_active_" + (( Dayleft(userdata.endTo)>0)? 'green':'red')}
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
                </div>
                <div className="user_dashboard_balance_card_amount d-flex">
                  {Balance(
                    props.user.payment_partner,
                    props.user.booking_partner
                  )}{" "}
                  $
                </div>
              </div>
              <div className="user_dashboard_transaction_card">
                <div className="user_dashboard_transaction_card_title">
                  {" "}
                  Last Transaction{" "}
                </div>
                <div className="user_dashboard_transaction_card_transaction_id mb-3">
                  {" "}
                  Transaction id : <span>{props.user.payment_partner[props.user.payment_partner.length-1].paymentId} </span>
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
                  {" "}{moment(props.user.payment_partner[props.user.payment_partner.length-1].paymentDate).format("DD-MM-YYYY")}
                  <div> </div>{moment(props.user.payment_partner[props.user.payment_partner.length-1].paymentDate).format("hh:mm a")} <div>  </div>
                </div>
                <div className="user_dashboard_transaction_card_amount_section">
                  <div className="user_dashboard_transaction_card_amount_text mb-3">
                    {" "}
                    Amount{" "}
                  </div>
                  <div className="user_dashboard_transaction_card_amount_number mb-3">
                {props.user.payment_partner[props.user.payment_partner.length-1].amount} $
                  </div>
                </div>
                <div
                  className="user_dashboard_transaction_card_seemore text-center mt-4"
                  onClick={() => setPopup(true)}
                >
                  See more
                </div>
              </div>
            </div>
          </div>
            
        </div>
        <div className="row">
          <div className="col-7">
            <div style={{ display: "none" }}>Munidex Parking</div>
          </div>
        </div>
      </div>
    </>
  );
}
