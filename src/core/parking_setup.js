import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/parking_setup.css";

export default function Parkingsetup() {
  const [parkingsetup, setParkingsetup] = useState([
    { stype: "A", sid: 73143, date: "18/09/21" },
    { stype: "C", sid: 85486, date: "16/08/21" },
    { stype: "A", sid: 73143, date: "18/09/21" },
    { stype: "C", sid: 85486, date: "16/08/21" },
    { stype: "A", sid: 73143, date: "18/09/21" },
    { stype: "C", sid: 85486, date: "16/08/21" },
    { stype: "A", sid: 73143, date: "18/09/21" },
    { stype: "C", sid: 85486, date: "16/08/21" },
    { stype: "A", sid: 73143, date: "18/09/21" },
    { stype: "C", sid: 85486, date: "16/08/21" },
    { stype: "A", sid: 73143, date: "18/09/21" },
    { stype: "C", sid: 85486, date: "16/08/21" },
    { stype: "A", sid: 73143, date: "18/09/21" },
    { stype: "C", sid: 85486, date: "16/08/21" },
    { stype: "A", sid: 73143, date: "18/09/21" },
    { stype: "C", sid: 85486, date: "16/08/21" },
    { stype: "A", sid: 73143, date: "18/09/21" },
    { stype: "C", sid: 85486, date: "16/08/21" },
    { stype: "A", sid: 73143, date: "18/09/21" },
    { stype: "C", sid: 85486, date: "16/08/21" },
  ]);

  return (
    <>
      <Helmet>
         <title>Munidex Parking - Parking Setup </title>
      </Helmet>
      <div className="flex-grow-1 parking_setup_container">
        <div className="row">
          <div className="col-7">
            <div className="row">
              <div className="col-4 parking_setup_slot_container">
                <div className="parking_setup_text_slot_type"> Slot Type </div>
                <input
                  type="text"
                  placeholder="Type here"
                  name="slot_type"
                  className="parking_setup_input_slot_type"
                />
                <div className="parking_setup_button_container">
                  <div className="parking_setup_submit_button"> Submit </div>
                  <div className="parking_setup_clear_button"> Clear </div>
                </div>
              </div>
              <div className="col-4">
                <div className="parking_setup_text_count"> Count </div>
                <input
                  type="number"
                  placeholder="Number of slots"
                  name="slot_count"
                  className="parking_setup_input_count"
                />
              </div>
              <div className="col-4">
                <div className="parking_setup_text_plan"> Plan </div>
                <div className="row">
                  <div className="col-6">
                    <div className="parking_setup_text_weekly"> Weekly </div>
                    <input
                      type="text"
                      placeholder="Enter"
                      name="weekly_rate"
                      className="parking_setup_input_weekly"
                    />
                    <div className="parking_setup_text_quarterly">
                      {" "}
                      Quarterly{" "}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter"
                      name="quarterly_rate"
                      className="parking_setup_input_quarterly"
                    />
                  </div>
                  <div className="col-6">
                    <div className="parking_setup_text_monthly"> Monthly </div>
                    <input
                      type="text"
                      placeholder="Enter"
                      name="monthly_rate"
                      className="parking_setup_input_monthly"
                    />
                    <div className="parking_setup_text_yearly"> Yearly </div>
                    <input
                      type="text"
                      placeholder="Enter"
                      name="yearly_rate"
                      className="parking_setup_input_yearly"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="row">
              <div className="col-6">
                <div className="parking_setup_active_text">Active Slot</div>
                <div className="parking_setup_active_percentage_text">80%</div>
                <div class="progress parking_setup_active_progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "80%", backgroundColor: "#FF6767" }}
                  ></div>
                </div>
              </div>
              <div className="col-6">
                <div className="parking_setup_inactive_text">Inactive Slot</div>
                <div className="parking_setup_inactive_percentage_text">
                  50%
                </div>
                <div class="progress parking_setup_inactive_progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "50%", backgroundColor: "#2AB0FF" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-7"></div>
            <div className="col-5">
            <div className="parking_setup_inactive_slot_container">
              <div className="parking_setup_inactive_slot_container_title">
                {" "}
                Inactive Slot{" "}
              </div>
              <div className="parking_setup_inactive_slot_table_container">
                <table className="parking_setup_inactive_slot_table">
                  <tr className="parking_setup_table_headers">
                    <th> Slot Type </th>
                    <th> Slot id </th>
                    <th> Date </th>
                    <th> Activate </th>
                  </tr>
                  <tr className="parking_setup_table_dummy_data">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                  {parkingsetup.map((parkingsetupdata) => {
                    return (
                      <tr className="parking_setup_table_data">
                        <td>{parkingsetupdata.stype}</td>
                        <td>{parkingsetupdata.sid}</td>
                        <td>{parkingsetupdata.date}</td>
                        <td>
                          <span className="parking_setup_table_activate_button">
                            Activate
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
      </div>
    </>
  );
}
