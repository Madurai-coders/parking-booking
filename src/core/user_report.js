import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/user_report.css";
import filter from "../assets/images/filtericon.svg";
import { VscHistory } from "react-icons/vsc";

export default function User_report() {
  const [data, setData] = useState([
    {
      name: "Alfreds Futterkiste",
      acntnumber: 567362925,
      NumofBooking: 17,
      Balance: "$6,500.00",
      ldate: "28/10/2012",
    },
    {
      name: "Francisco Chang",
      acntnumber: 567362926,
      NumofBooking: 12,
      Balance: "$266.00",
      ldate: "12/06/2020",
    },
    {
      name: "Alfreds Futterkiste",
      acntnumber: 567362925,
      NumofBooking: 17,
      Balance: "$6,500.00",
      ldate: "28/10/2012",
    },
    {
      name: "Francisco Chang",
      acntnumber: 567362926,
      NumofBooking: 12,
      Balance: "$266.00",
      ldate: "12/06/2020",
    },
    {
      name: "Alfreds Futterkiste",
      acntnumber: 567362925,
      NumofBooking: 17,
      Balance: "$6,500.00",
      ldate: "28/10/2012",
    },
    {
      name: "Francisco Chang",
      acntnumber: 567362926,
      NumofBooking: 12,
      Balance: "$266.00",
      ldate: "12/06/2020",
    },
    {
      name: "Alfreds Futterkiste",
      acntnumber: 567362925,
      NumofBooking: 17,
      Balance: "$6,500.00",
      ldate: "28/10/2012",
    },
    {
      name: "Francisco Chang",
      acntnumber: 567362926,
      NumofBooking: 12,
      Balance: "$266.00",
      ldate: "12/06/2020",
    },
    {
        name: "Alfreds Futterkiste",
        acntnumber: 567362925,
        NumofBooking: 17,
        Balance: "$6,500.00",
        ldate: "28/10/2012",
      },
      {
        name: "Francisco Chang",
        acntnumber: 567362926,
        NumofBooking: 12,
        Balance: "$266.00",
        ldate: "12/06/2020",
      },
      {
        name: "Alfreds Futterkiste",
        acntnumber: 567362925,
        NumofBooking: 17,
        Balance: "$6,500.00",
        ldate: "28/10/2012",
      },
      {
        name: "Francisco Chang",
        acntnumber: 567362926,
        NumofBooking: 12,
        Balance: "$266.00",
        ldate: "12/06/2020",
      },
  ]);

  return (
    <>
      <Helmet>
         <title>Munidex Parking - User report </title>
      </Helmet>
      <div className="User_report_container flex-grow-1">
        <div className="User_report_detail_entry">
          <div className="User_report_title_text">User Report</div>
          <div className="User_report_search_container">
            <label
              for="User_report_uid"
              className="User_report_search_input_label"
            >
              {" "}
              Name/Account
            </label>
            <input
              type="text"
              name="userid"
              id="User_report_uid"
              className="User_report_search_input"
            />
            <div className="User_report_get_button"> Get </div>
            <div className="User_report_filter_button">
              {" "}
              Filter <img src={filter} alt="Munidex_filter" />
            </div>
          </div>
        </div>
        <div className="User_report_text_recent">
          <VscHistory size={14.5} style={{ color: "#666666" }} /> Recent{" "}
        </div>
        <div className="User_report_recent_container">
          <table className="User_report_table">
            <tr className="User_report_table_headings">
              <th>Name</th>
              <th>Account Number</th>
              <th>No of Booking</th>
              <th>Balance</th>
              <th>Last Date</th>
              <th>Controls</th>
            </tr>
            {data.map((userdata) => {
              return (
                <tr className="User_report_table_data">
                  <td>{userdata.name}</td>
                  <td>{userdata.acntnumber}</td>
                  <td>{userdata.NumofBooking}</td>
                  <td>{userdata.Balance}</td>
                  <td>{userdata.ldate}</td>
                  <td><span className="User_report_controls_view">View</span></td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
