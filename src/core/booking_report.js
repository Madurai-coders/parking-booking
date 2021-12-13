import React, { useState,useEffect } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/booking_report.css";
import { IoTrashOutline } from "react-icons/io5";
import Numberofslots from "../assets/images/Numberofslots.svg";
import Reservedslot from "../assets/images/Reservedslot.svg";
import Unreservedslot from "../assets/images/Unreservedslot.svg";
import Amount from "../assets/images/Amount.svg";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import Carousel from 'react-elastic-carousel';

export default function Booking_report() {
  const [data, setData] = useState([
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
    {
      bookingID: 567362925,
      name: "Ariene",
      Plan: "Monthly",
      slot: 19,
      Amount: "$3,173.00",
    },
  ]);

  const[wingdata , setWingData] = useState([{name:"Wing A"},{name:"Wing B"},{name:"Wing C"},{name:"Wing D"},{name:"Wing E"},{name:"Wing F"},{name:"Wing G"}])

  let count = 0;


  return (
    <>
      <Helmet>
        <title>Munidex Parking - Booking Report</title>
      </Helmet>
      <div className="flex-grow-1">
        <div className="booking_report_container">
          <div className="booking_report_title"> Booking Report </div>
          <div className="row">
            <div className="col-3">
              <div className="booking_report_text_date"> Date </div>
              <DateRangePicker
                initialSettings={{
                  startDate: "01/01/2020",
                  endDate: "01/15/2020",
                }}
              >
                <input type="text" className="booking_report_date_input" />
              </DateRangePicker>
            </div>
            <div className="col-9">
              <div className="booking_report_topdisplay">
                <div className="booking_report_slot_number_card">
                  <div className="booking_report_slot_number_text">
                    {" "}
                    Total No of Slot
                  </div>
                  <div className="booking_report_bottom_flex">
                    {" "}
                    <span className="booking_report_bottom_flex_number">
                      {" "}
                      45{" "}
                    </span>{" "}
                    <span>
                      {" "}
                      <img src={Numberofslots} alt="Number of slots" />{" "}
                    </span>{" "}
                  </div>
                </div>
                <div className="booking_report_slot_number_card">
                  <div className="booking_report_slot_number_text">
                    {" "}
                    Reserved Slot
                  </div>
                  <div className="booking_report_bottom_flex">
                    {" "}
                    <span className="booking_report_bottom_flex_number">
                      {" "}
                      32{" "}
                    </span>{" "}
                    <span>
                      {" "}
                      <img src={Reservedslot} alt="Reserved slot" />{" "}
                    </span>{" "}
                  </div>
                </div>
                <div className="booking_report_slot_number_card">
                  <div className="booking_report_slot_number_text">
                    {" "}
                    Unreserved slot
                  </div>
                  <div className="booking_report_bottom_flex">
                    {" "}
                    <span className="booking_report_bottom_flex_number">
                      {" "}
                      13{" "}
                    </span>{" "}
                    <span>
                      {" "}
                      <img src={Unreservedslot} alt="Unreserved slot" />{" "}
                    </span>{" "}
                  </div>
                </div>
                <div className="booking_report_slot_number_card">
                  <div className="booking_report_slot_number_text"> Amount</div>
                  <div className="booking_report_bottom_flex">
                    {" "}
                    <span className="booking_report_bottom_flex_number">
                      {" "}
                      3500{" "}
                    </span>{" "}
                    <span>
                      {" "}
                      <img src={Amount} alt="Amount" />{" "}
                    </span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">Date</div>
            <div className="col-5">
              <div className="booking_report_table_container">
                <table className="booking_report_table">
                  <tr className="booking_report_table_headers">
                    <th>S.No</th>
                    <th>Booking Id</th>
                    <th>Name</th>
                    <th>Plan</th>
                    <th>Slot</th>
                    <th>Amount</th>
                    <th>Control</th>
                  </tr>
                  {data.map((bookingdata) => {
                    count++;
                    return (
                      <tr className="booking_report_table_data">
                        <td>{count}</td>
                        <td>{bookingdata.bookingID}</td>
                        <td>{bookingdata.name}</td>
                        <td>{bookingdata.Plan}</td>
                        <td>{bookingdata.slot}</td>
                        <td>{bookingdata.Amount}</td>
                        <td>
                          <IoTrashOutline />
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
            <div className="col-4">Report</div>
          </div>
        </div>
        <div className="booking_report_wingselection_container">
          <div style={{ flexGrow: 1 }}>
          <Carousel itemsToShow={5.5} itemsToScroll={1} pagination={false} showArrows={false}>
            {wingdata.map((wing)=>{ 
              return (<div className="booking_report_wing_button">{wing.name}</div>);
            })}
          </Carousel>
          </div>
          <span className="booking_report_wingsubmit"> Submit </span>
        </div>
      </div>
    </>
  );
}
