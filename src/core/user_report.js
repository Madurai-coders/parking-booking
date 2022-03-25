import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/user_report.css";
import filtericon from "../assets/images/filtericon.svg";
import { VscHistory } from "react-icons/vsc";
import { IoCloseOutline } from "react-icons/io5";
import {
  validation_name,
  axios_call,
  axios_call_auto,
  formatUsd,
} from "../functions/reusable_functions";
import moment from "moment";
import { Link } from "react-router-dom";
import User from "./user.js";
import Pagination from "../components/Pagination/pagination";
import { motion, AnimatePresence } from "framer-motion";

export default function User_report() {
  const [filter, setFilter] = useState(false);
  const [flag, setFlag] = useState("none");
  const [usr_suggestion, set_usr_suggestion] = useState([]);
  const [usr_suggestion_all, set_usr_suggestion_all] = useState([]);
  const [paymentStatus, setpaymentStatus] = useState(false);
  const [checked_pending, setChecked_pending] = useState(false);
  const [checked_completed, setChecked_completed] = useState(false);
  const [user, setUser] = useState();
  const [pagination, setPagination] = useState();
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([
    {
      name: "Alfreds Futterkiste",
      acntnumber: 567362925,
      NumofBooking: 17,
      Balance: "$6,500.00",
      ldate: "28/10/2012",
    },
  ]);

  function handleFilter() {
    setFilter(!filter);
  }

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
          {" "}
          {formatUsd(Math.abs(payment_total - booking_total))}
          <span className="small bg-danger mx-1 text-white px-1 rounded">
            Delinquent
          </span>
        </div>
      );
    } else {
      if (val == 0) {
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
        return (
          <div>
            {" "}
            {formatUsd(payment_total - booking_total)}
            <span className="small bg-success mx-1 text-white px-1 rounded">
              OverPayment
            </span>
          </div>
        );
      }
    }
  }

  const checkuser = async (val) => {
    if (validation_name(val).class === "pass") {
      axios_call("GET", "BusinessPartner_Group/?search=" + val).then(
        (response) => {
          console.log(response);
          set_usr_suggestion(response);
          setPagination();
        }
      );
    }
    else{
        GetBusinessPartner()
    }

  };

  const GetPagination = async (val) => {
    setloading(true);
    set_usr_suggestion([]);
    set_usr_suggestion_all([]);
    axios_call("GET", "GetBusinessPartner/?page=" + val).then((response) => {
      var val = [...response.results];
      setPagination(response);
      set_usr_suggestion(response.results);
      set_usr_suggestion_all(response.results);
      setloading(false);
      if (checked_pending && !checked_completed) {
        CallFliter(val);      }
     
      console.log(val);
    });
  };

  const GetBusinessPartner = async (val) => {
    axios_call("GET", "GetBusinessPartner/").then((response) => {
      console.log('response');
      setPagination(response);
      set_usr_suggestion(response.results);
      set_usr_suggestion_all(response.results);
    });
  };

  useEffect(() => {
    GetBusinessPartner();
  }, []);


  function CallFliter(val) {
    if (!val) {
      var usr = usr_suggestion;
    } else {
      var usr = val;
    }
    var completed = [];
    var pending = [];
    for (const element of usr) {
      var payment_total = 0;
      var booking_total = 0;
      element.payment_partner.forEach((element) => {
        payment_total = payment_total + element.amount;
      });
      element.booking_partner.forEach((element) => {
        booking_total = booking_total + parseInt(element.charge);
      });
      var balance = payment_total - booking_total;

      if (balance < 0) {
        pending.push(element);
      }
      if (balance >= 0) {
        completed.push(element);
      }
    }

    if (checked_pending && !checked_completed) {
      set_usr_suggestion(pending);
    }
    if (checked_completed && !checked_pending) {
      set_usr_suggestion(completed);
    }
    if (
      (!checked_completed && !checked_pending) ||
      (checked_completed && checked_pending)
    ) {
      set_usr_suggestion(usr_suggestion_all);
    }
  }

  useEffect(() => {
    CallFliter();
  }, [checked_pending, checked_completed]);

  function set_up_flag() {
    setFlag("none");
  }

  return (
    <>
      <Helmet>
         <title>Munidex Parking - User report </title>
      </Helmet>
      {!flag && (
        <div
          className="overlay_userdashboard shadow-lg"
          style={{ display: flag }}
        >
          <User user={user} set_up_flag={set_up_flag}></User>
        </div>
      )}
      <motion.div
       initial={{ opacity: 0, y: 15 }}
       animate={{ opacity: [0.5, 1], y: 0 }}
       transition={{ duration: 0.3 }}
        className=" flex-grow-1"
      >
            <div className="booking_report_title ">User </div>

<div className="booking_report_container_whole">
        <div className="User_report_detail_entry">
          {/* <div className="User_report_title_text">User Report </div> */}
          {/* <div className="User_report_title">User Report</div> */}

          <div className="User_report_filter_search_container mt-5">
            <div className="User_report_search_container">
              <label
                for="User_report_uid"
                className="User_report_search_input_label"
              >
                {" "}
                Name
              </label>
              <input
                type="text"
                name="userid"
                id="User_report_uid"
                className="User_report_search_input"
                onChange={(e) => checkuser(e.target.value)}
              />
              <div className="User_report_get_button"> Get </div>
              <div className="User_report_filter_button" onClick={handleFilter}>
                {" "}
                Filter <img src={filtericon} alt="Munidex_filter" />
              </div>
            </div>
            {filter && (
              <div className="User_report_filter_card p-3">
                <div className="User_report_filter_card_segment1 mt-4 mb-4 row">
                  <div className="User_report_filter_card_segment1_text_ps col-4">
                    {" "}
                    Payment Status
                  </div>
                  <div className="col-3">
                    <input
                      type="checkbox"
                      id="pending"
                      name="pending"
                      checked={checked_pending}
                      onChange={() => setChecked_pending(!checked_pending)}
                      className="User_report_filter_card_segment1_input_pending"
                    />
                    <label
                      for="pending"
                      className="mx-1 User_report_filter_card_segment1_text_pending"
                    >
                      {" "}
                      Delinquent{" "}
                    </label>
                  </div>
                  <div className="col-3">
                    <input
                      type="checkbox"
                      id="completed"
                      name="completed"
                      checked={checked_completed}
                      onChange={() => setChecked_completed(!checked_completed)}
                      className="User_report_filter_card_segment1_input_completed"
                    />
                    <label
                      for="completed"
                      className="mx-1 User_report_filter_card_segment1_text_completed"
                    >
                      {" "}
                      OverPayment{" "}
                    </label>
                  </div>
                  <div
                    className="col-2"
                    onClick={handleFilter}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingRight: "2%",
                      position: "relative",
                      bottom: "100%",
                      marginTop: "-30px",
                    }}
                  >
                    <IoCloseOutline size={20} />
                  </div>
                </div>
                <div className="User_report_filter_card_segment2 mb-4 row">
                  {/* <div className="User_report_filter_card_segment2_text_date col-4">
                    Date
                  </div>
                  <div className="User_report_filter_card_segment2_date_picker col-6">
                    {" "}
                    Date picker here{" "}
                  </div> */}
                  <div className="col-2"></div>
                </div>
                <div className="User_report_filter_card_segment3 mb-2">
                  {/* <div onSelect={()=>setpaymentStatus(false)} className="User_report_filter_card_segment3_text_caf col-3">
                    {" "}
                    clear all filters{" "}
                  </div> */}
                  <div style={{ display: "flex" }}>
                    <div
                      onClick={() => (
                        setChecked_pending(false),
                        setChecked_completed(false),
                        handleFilter()
                      )}
                      className="User_report_filter_card_segment3_text_cancel me-3"
                    >
                      {" "}
                      Clear{" "}
                    </div>
                    {/* <div className="User_report_filter_card_segment3_text_apply me-3">
                      {" "}
                      Apply{" "}
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: "-20px",marginLeft:'85%',zIndex:'1000000' }} className="">
          {loading && (
            <div
              style={{ marginLeft: "47%", marginTop: "-5px" }}
              class=" spinner-grow"
              role="status"
            >
              <span class="sr-only"></span>
            </div>
          )}
          <div style={{ display: loading ? "none" : "" }}>
            {pagination && pagination.count > 20 && (
              <Pagination
                count={pagination.count}
                GetPagination={GetPagination}
              />
            )}
          </div>
        </div>
        <div
          className="payment_table_container table mt-2"
          onClick={() => setFilter(false)}
        >
          <table className="payment_table ">
            {usr_suggestion && (
              <tr className="payment_table_heading">
                <th>Name</th>
                <th>Account Number</th>
                <th>No of Booking</th>
                <th>Balance</th>
                <th>Last Paid</th>
                <th>Controls</th>
              </tr>
            )}
            {usr_suggestion &&
              usr_suggestion.map((userdata) => {
                return (
                  <tr   onClick={() => (
                    console.log(userdata),
                    setUser(userdata),
                    setFlag(false)
                  )}  key={userdata.id} className="payment_table_content">
                    <td>{userdata.userName}</td>
                    <td>{userdata.accountNumber}</td>
                    <td>{userdata.booking_partner.length}</td>
                    <td>
                      {Balance(
                        userdata.payment_partner,
                        userdata.booking_partner
                      )}
                    </td>
                    <td>
                      {userdata.payment_partner.length ? (
                        <>
                          {moment(
                            userdata.payment_partner[
                              userdata.payment_partner.length - 1
                            ].paymentDate
                          ).format("DD/MM/YYYY")}
                        </>
                      ) : (
                        "Not yet paid"
                      )}
                    </td>
                    <td>
                      <span
                        onClick={() => (
                          console.log(userdata),
                          setUser(userdata),
                          setFlag(false)
                        )}
                        className="User_report_controls_view"
                      >
                        View
                      </span>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        
        </div>
      </motion.div>
      
    </>
  );
}
