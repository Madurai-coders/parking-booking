import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/parking_setup.css";
import {
  validation_mobile_number,
  validation_email,
  validation_name,
  validation_payment_id,
  validation_amount,
  axios_call,
  axios_call_auto,
  validation_count,
} from "../functions/reusable_functions";
import Car from "../assets/images/Car.svg";
import Slider from "react-slick";

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
  const [data_fail, setData_fail] = useState(false);
  const [wing_data, SetWing_data] = useState();
  const [wing, setWing] = useState({
    wingName: "not_selected",
    wingCount: "not_selected",
    wingStatus: true,
    planWeekly: "not_selected",
    planMonthly: "not_selected",
    planQuarterly: "not_selected",
    planYearly: "not_selected",
  });
  function form_validate() {
    let val = false;
    var value = { ...wing };
    if (
      validation_name(wing.wingName).class == "pass" &&
      validation_count(wing.wingCount).class == "pass" &&
      validation_amount(wing.planWeekly).class == "pass" &&
      validation_amount(wing.planMonthly).class == "pass" &&
      validation_amount(wing.planQuarterly).class == "pass" &&
      validation_amount(wing.planYearly).class == "pass"
    ) {
      val = true;
    } else {
      if (wing.wingName == "not_selected") {
        value = { ...value, wingName: "" };
      }
      if (wing.wingCount == "not_selected") {
        value = { ...value, wingCount: "" };
      }
      if (wing.planWeekly == "not_selected") {
        value = { ...value, planWeekly: "" };
      }
      if (wing.planMonthly == "not_selected") {
        value = { ...value, planMonthly: "" };
      }
      if (wing.planQuarterly == "not_selected") {
        value = { ...value, planQuarterly: "" };
      }
      if (wing.planYearly == "not_selected") {
        value = { ...value, planYearly: "" };
      }
    }
    setWing(value);
    return val;
  }

  const form_submit = async () => {
    const result = await form_validate();

    if (result && data_fail) {
      console.log(result);
      var wingId =
        Date.now().toString(36) + Math.random().toString(36).substr(2);
      var wingdata = { ...wing, wingId: wingId };
      console.log(wingdata);
      axios_call("POST", "CreateWing/", wingdata).then((response) => {
        console.log(response);

        if (parseInt(wing.wingCount) > 0) {
          for (let i = 0; i < wing.wingCount; i++) {
            var slots = {
              slotId:
                Date.now().toString(36) + Math.random().toString(36).substr(2),
              slotStatus: true,
              wingId: response.id,
            };
            axios_call("POST", "CreateSlots/", slots).then((response) => {
              console.log(response);
            });
          }
        }
      });
    }
  };

  function call_wingName_check(val) {
    axios_call("GET", "GetWing?search=" + val).then((response) => {
      console.log(val);
      if (response[0] ? response[0].wingName == val : false) {
        console.log("hi");
        setData_fail("Wing name already exists");
      } else {
        setData_fail(false);
      }
    });
  }

  function GetWingDetails(val) {
    axios_call("GET", "CreateWing/").then((response) => {
      SetWing_data(response);

      console.log(response);
    });
  }

  function reset() {
    setData_fail(false);
  }

  useEffect(() => {
    GetWingDetails();
  }, []);

  const [booksection, setBooksection] = useState([
    {
      wingA: [
        { slotname: "was1" , status:"" },
        { slotname: "was2" , status:"booked" },
        { slotname: "was3" , status:"" },
        { slotname: "was4" , status:"" },
        { slotname: "was5" , status:"" },
        { slotname: "was6" , status:"booked" },
        { slotname: "was7" , status:"" },
        { slotname: "was8" , status:"" },
        { slotname: "was9" , status:"" },
        { slotname: "was10" , status:"" },
        { slotname: "was11" , status:"booked" },
        { slotname: "was12" , status:"" },
        { slotname: "was13" , status:"" },
        { slotname: "was14" , status:"" },
        { slotname: "was1" , status:"" },
        { slotname: "was2" , status:"booked" },
        { slotname: "was3" , status:"" },
        { slotname: "was4" , status:"" },
        { slotname: "was5" , status:"booked" },
        { slotname: "was6" , status:"" },
        { slotname: "was7" , status:"" },
        { slotname: "was8" , status:"" },
        { slotname: "was9" , status:"" },
        { slotname: "was10" , status:"" },
        { slotname: "was11" , status:"booked" },
        { slotname: "was12" , status:"" },
        { slotname: "was13" , status:"" },
        { slotname: "was14" , status:"" }
      ],
    },
    { wingB: [{ slotname: "wbs1" }, { slotname: "wbs2" }] },
  ]);

 const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  let count = 0;
  let space;

  return (
    <>
      <Helmet>
         <title>Munidex Parking - Parking Setup </title>
      </Helmet>

      <div className="flex-grow-1 parking_setup_container">
        {data_fail && (
          <div className="pr-5 pl-5">
            <div class="alert alert-danger" role="alert">
              {data_fail}
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-7">
            <div className="row">
              <div className="col-4 parking_setup_slot_container">
                <div className="parking_setup_text_slot_type"> Wing Name </div>
                <input
                  type="text"
                  name="slot_type"
                  className="parking_setup_input_slot_type"
                  onChange={(e) => (
                    call_wingName_check(e.target.value),
                    setWing({ ...wing, wingName: e.target.value })
                  )}
                  onBlur={(e) => setWing({ ...wing, wingName: e.target.value })}
                  type="text"
                  value={wing.wingName != "not_selected" ? wing.wingName : ""}
                  className={
                    "parking_setup_input_slot_type " +
                    validation_name(wing.wingName).class
                  }
                />
                <div style={{ marginTop: "5px", fontSize: "10px" }}>
                  {validation_name(wing.wingName).msg}
                </div>
                <div className="parking_setup_button_container mt-4">
                  <div
                    className="parking_setup_submit_button"
                    onClick={form_submit}
                  >
                    {" "}
                    Submit{" "}
                  </div>
                  <div className="parking_setup_clear_button" onClick={reset}>
                    {" "}
                    Clear{" "}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="parking_setup_text_count"> Count </div>
                <input
                  type="number"
                  placeholder="Number of slots"
                  name="slot_count"
                  onChange={(e) =>
                    setWing({ ...wing, wingCount: e.target.value })
                  }
                  onBlur={(e) =>
                    setWing({ ...wing, wingCount: e.target.value })
                  }
                  value={wing.wingCount != "not_selected" ? wing.wingCount : ""}
                  className={
                    "parking_setup_input_slot_type " +
                    validation_count(wing.wingCount).class
                  }
                />
                <div style={{ marginTop: "5px", fontSize: "10px" }}>
                  {validation_count(wing.wingCount).msg}
                </div>
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
                      onChange={(e) =>
                        setWing({ ...wing, planWeekly: e.target.value })
                      }
                      onBlur={(e) =>
                        setWing({ ...wing, planWeekly: e.target.value })
                      }
                      value={
                        wing.planWeekly != "not_selected" ? wing.planWeekly : ""
                      }
                      className={
                        "parking_setup_input_weekly " +
                        validation_amount(wing.planWeekly).class
                      }
                    />
                    <div style={{ marginTop: "5px", fontSize: "10px" }}>
                      {validation_amount(wing.planWeekly).msg}
                    </div>
                    <div className="parking_setup_text_quarterly">
                      {" "}
                      Quarterly{" "}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter"
                      name="quarterly_rate"
                      onChange={(e) =>
                        setWing({ ...wing, planQuarterly: e.target.value })
                      }
                      onBlur={(e) =>
                        setWing({ ...wing, planQuarterly: e.target.value })
                      }
                      value={
                        wing.planQuarterly != "not_selected"
                          ? wing.planQuarterly
                          : ""
                      }
                      className={
                        "parking_setup_input_weekly " +
                        validation_amount(wing.planQuarterly).class
                      }
                    />
                    <div style={{ marginTop: "5px", fontSize: "10px" }}>
                      {validation_amount(wing.planQuarterly).msg}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="parking_setup_text_monthly"> Monthly </div>
                    <input
                      type="text"
                      placeholder="Enter"
                      name="monthly_rate"
                      onChange={(e) =>
                        setWing({ ...wing, planMonthly: e.target.value })
                      }
                      onBlur={(e) =>
                        setWing({ ...wing, planMonthly: e.target.value })
                      }
                      value={
                        wing.planMonthly != "not_selected"
                          ? wing.planMonthly
                          : ""
                      }
                      className={
                        "parking_setup_input_weekly " +
                        validation_amount(wing.planMonthly).class
                      }
                    />
                    <div style={{ marginTop: "5px", fontSize: "10px" }}>
                      {validation_amount(wing.planMonthly).msg}
                    </div>
                    <div className="parking_setup_text_yearly"> Yearly </div>
                    <input
                      type="text"
                      placeholder="Enter"
                      name="yearly_rate"
                      onChange={(e) =>
                        setWing({ ...wing, planYearly: e.target.value })
                      }
                      onBlur={(e) =>
                        setWing({ ...wing, planYearly: e.target.value })
                      }
                      value={
                        wing.planYearly != "not_selected" ? wing.planYearly : ""
                      }
                      className={
                        "parking_setup_input_weekly " +
                        validation_amount(wing.planYearly).class
                      }
                    />
                    <div style={{ marginTop: "5px", fontSize: "10px" }}>
                      {validation_amount(wing.planYearly).msg}
                    </div>
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
          <div className="col-7">
            <div className="parking_setup_wing_container"> 
            <Slider {...settings}>

					</Slider>
              {booksection[0].wingA.map((slot) => {
                count++;
                return (
                  <span>
                    <img
                      key={slot.slotname}
                      src={Car}
                      className={"ps-3 pe-3 mb-3 parking_setup_car_img" + slot.status}
                      alt="Munidex_parking_Booking_slots"
                    />
                  </span>
                );
              })}
            </div>
          </div>
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
