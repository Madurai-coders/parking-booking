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
  formatUsd
} from "../functions/reusable_functions";
import { useLocation } from "react-router";
export default function User_dashboard(props) {
  const [popup, setPopup] = useState(false);
  
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
    }
}
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
      <div className='d-flex justify-content-lg-end pe-4 '>
      <div className="user_dashboard-popup_close" onClick={props.set_up_flag} style={{zIndex:'10'}}>
        <IoClose style={{ color: "#646262" }} size={30} />
      </div>
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
                      <th>Date</th>
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

        <div className="row" style={{marginTop:'-30px'}}>
          <div className="col-7">
            <div className="user_dashboard_username">
              {" "}
             {props.user.userName}'s Report
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
                {props.user.booking_partner.map((userdata) => {
                  return (
                    <tr className="user_dashboard_booking_details_table_data">
                      {/* <td>{userdata.Slots.wing.wingName}+[{userdata.slotid}]</td> */}
                      <td>{userdata.slots.wing.wingName}</td>
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
                        
                        {formatUsd(parseInt(userdata.charge))}
                      </td>
                      <td>
                      {Dayleft(userdata.endTo)>0 ? Dayleft(userdata.endTo) : 0} days                        <span
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
                <div className=" d-flex">
                  {Balance(
                    props.user.payment_partner,
                    props.user.booking_partner
                  )}{" "}
                  
                </div>
              </div>
              {true && (
                <div className="  ">
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
                                <td>{formatUsd(parseInt(transaction.amount))}</td>

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
