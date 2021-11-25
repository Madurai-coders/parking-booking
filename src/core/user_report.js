import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/user_report.css";
import filtericon from "../assets/images/filtericon.svg";
import { VscHistory } from "react-icons/vsc";
import { IoCloseOutline } from "react-icons/io5";

export default function User_report() {
  const [filter, setFilter] = useState(false);

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

  function handleFilter() {
    setFilter(!filter);
  }

  return (
    <>
      <Helmet>
         <title>Munidex Parking - User report </title>
      </Helmet>
      <div className="User_report_container flex-grow-1">
        <div className="User_report_detail_entry">
          <div className="User_report_title_text">User Report</div>
          <div className="User_report_filter_search_container">
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
              <div className="User_report_filter_button" onClick={handleFilter}>
                {" "}
                Filter <img src={filtericon} alt="Munidex_filter" />
              </div>
            </div>
            {filter && (
              <div className="User_report_filter_card p-3">
                <div className="User_report_filter_card_segment1 mt-4 mb-4 row">
                  <div className="User_report_filter_card_segment1_text_ps col-4"> Payment Status</div>
                  <div className="col-3">
                  <input
                    type="checkbox"
                    id="pending"
                    name="pending"
                    className="User_report_filter_card_segment1_input_pending"
                  />
                  <label for="pending" className="User_report_filter_card_segment1_text_pending"> Pending </label>
                  </div>
                  <div className="col-3">
                  <input
                    type="checkbox"
                    id="completed"
                    name="completed"
                    className="User_report_filter_card_segment1_input_completed"
                  />
                  <label for="pending" className="User_report_filter_card_segment1_text_completed"> Completed </label>
                  </div>
                  <div className="col-2" onClick={handleFilter} style={{display:"flex", justifyContent:"flex-end", paddingRight:"5%", position:"relative", bottom:"100%"}} >
                  <IoCloseOutline size={20}/>
                  </div>
                </div>
                <div className="User_report_filter_card_segment2 mb-4 row">
                  <div className="User_report_filter_card_segment2_text_date col-4">Date</div>
                  <div className="User_report_filter_card_segment2_date_picker col-6"> Date picker here </div>
                  <div className="col-2"></div>
                </div> 
                <div className="User_report_filter_card_segment3 mb-2">
                  <div className="User_report_filter_card_segment3_text_caf col-3"> clear all filters </div>
                  <div style={{display:"flex"}}>
                  <div className="User_report_filter_card_segment3_text_cancel me-3"> Cancel </div>
                  <div className="User_report_filter_card_segment3_text_apply me-3"> Apply </div>
                  </div>
                </div>   
              </div>
            )}
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
                  <td>
                    <span className="User_report_controls_view">View</span>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
