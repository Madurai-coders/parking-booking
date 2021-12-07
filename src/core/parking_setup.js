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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const [booksection, setBooksection] = useState([
    {
      wingA: [
        { slotname: "was1", status: "" },
        { slotname: "was2", status: "undercons" },
        { slotname: "was3", status: "" },
        { slotname: "was4", status: "" },
        { slotname: "was5", status: "" },
        { slotname: "was6", status: "undercons" },
        { slotname: "was7", status: "" },
        { slotname: "was8", status: "" },
        { slotname: "was9", status: "" },
        { slotname: "was10", status: "" },
        { slotname: "was11", status: "undercons" },
        { slotname: "was12", status: "" },
        { slotname: "was13", status: "" },
        { slotname: "was14", status: "" },
        { slotname: "was1", status: "" },
        { slotname: "was2", status: "undercons" },
        { slotname: "was3", status: "" },
        { slotname: "was4", status: "" },
        { slotname: "was5", status: "undercons" },
        { slotname: "was6", status: "" },
        { slotname: "was7", status: "" },
        { slotname: "was8", status: "" },
        { slotname: "was9", status: "" },
        { slotname: "was10", status: "" },
        { slotname: "was11", status: "undercons" },
        { slotname: "was12", status: "" },
        { slotname: "was13", status: "" },
        { slotname: "was14", status: "" },
      ],
    },
    { wingB: [{ slotname: "wbs1" }, { slotname: "wbs2" }] },
  ]);

  const [wing, setWing] = useState({
    wingName: "not_selected",
    wingCount: "not_selected",
    wingStatus: true,
    planWeekly: "not_selected",
    planMonthly: "not_selected",
    planQuarterly: "not_selected",
    planYearly: "not_selected",
    wingId: "",
  });

  const [data_fail, setData_fail] = useState(false);

  const [wing_data, SetWing_data] = useState();
  const [slot, SetSlot] = useState();
  const [inactiveslot, SetInactivelot] = useState();

  const settings = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

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
    if (result && !data_fail) {
      var wingId =
        Date.now().toString(36) + Math.random().toString(36).substr(2);
      var wingdata = { ...wing, wingId: wingId };
      console.log(wingdata);
      axios_call("POST", "CreateWing/", wingdata).then((response) => {
        console.log(response);

        if (parseInt(wing.wingCount) > 0) {
          for (let i = 1; i <= wing.wingCount; i++) {
            var slots = {
              slotId:
                Date.now().toString(36) + Math.random().toString(36).substr(2),
              slotStatus: true,
              wingId: response.id,
            };
            axios_call("POST", "CreateSlots/", slots);
            if (i == wing.wingCount) {
              reset();
              GetWingDetails(true);
            }
          }
        }
      });
    }
  };

  function AddSlot(id) {
    var slots = {
      slotId: Date.now().toString(36) + Math.random().toString(36).substr(2),
      slotStatus: true,
      wingId: id,
    };
    axios_call("POST", "CreateSlots/", slots).then((response) => {
      var PresentSlot = [...slot, response];
      SetSlot([...PresentSlot]);
      var index = wing_data.findIndex((wing_data) => wing_data.id == id);


      var Wingdata = wing_data;

      Wingdata[index] = { ...wing_data[index], slots: [...PresentSlot] };
      SetWing_data([...Wingdata]);
      setWing({ ...wing, wingCount: PresentSlot.length });
    });
  }

  function RemoveSlot(value) {
    if (value) {
      axios_call("DELETE", "CreateSlots/" + value.id + "/").then((response) => {
        SetSlot(slot.filter((item) => item.id !== value.id));

        let index = wing_data.findIndex(
          (wing_data) => wing_data.wingId == value.wing.wingId
        );

        var Wingdata = wing_data;
        if(index>-1){
            console.log(value.wingId)
            console.log(value)
            console.log(Wingdata)
        var slotsOfWing = [...Wingdata[index].slots];
        slotsOfWing = slotsOfWing.filter((item) => item.id !== value.id);
        Wingdata[index] = { ...wing_data[index], slots: [...slotsOfWing] };
        SetWing_data([...Wingdata]);
        setWing({ ...wing, wingCount: slotsOfWing.length });}
      });
    }
  }

  const Wingupdate = async () => {
    const result = await form_validate();
    if (wing.wingId && result) {
      axios_call("PUT", "CreateWing/" + wing.wingId + "/", wing).then(
        (response) => {
          GetWingDetails(true);
          reset();
        }
      );
    }
  };

  const Slotupdate = async (value, id) => {
    if (value.id) {
      value = { ...value, slotStatus: !value.slotStatus };
      axios_call("PUT", "CreateSlots/" + value.id + "/", value).then(
        (response) => {
          var updated_slot = slot;
          updated_slot[id] = { ...slot[id], slotStatus: !slot[id].slotStatus };
          SetSlot([...updated_slot]);

          var index = wing_data.findIndex(
            (wing_data) => wing_data.id == value.wingId
          );

          var Wingdata = wing_data;

          Wingdata[index] = { ...wing_data[index], slots: [...updated_slot] };
          SetWing_data([...Wingdata]);
          console.log(Wingdata);

          reset();
          if (value.slotStatus == false) {
            SetInactivelot((inactiveslot) => [...inactiveslot, value]);
          } else {
            SetInactivelot(inactiveslot.filter((item) => item.id !== value.id));
          }
        }
      );
    }
  };

  const TotalInactiveSlotupdate = async (value) => {
    if (value.id) {
      value = { ...value, slotStatus: !value.slotStatus };
      axios_call("PUT", "Inactiveslots/" + value.id + "/", value).then(
        (response) => {
          var inactive_updated_slot = inactiveslot;
          inactive_updated_slot = inactive_updated_slot.filter(
            (item) => item.id !== value.id
          );
          SetInactivelot([...inactive_updated_slot]);

          var updated_slot = slot;
          var id = updated_slot.findIndex(
            (slot) => slot.slotId == value.slotId
          );


          updated_slot[id] = { ...value };
          console.log(updated_slot);
          SetSlot([...updated_slot]);

          var Wingdata = wing_data;
          var index = Wingdata.findIndex(
            (wing_data) => wing_data.id == value.wingId
          );
          var slotsdata = Wingdata[index] && Wingdata[index].slots;

          var solt_id = slotsdata.findIndex(
            (slot) => slot.slotId == value.slotId
          );
          slotsdata[solt_id] = {
            ...slotsdata[solt_id],
            slotStatus: value.slotStatus,
          };

          Wingdata[index] = { ...wing_data[index], slots: [...slotsdata] };
          SetWing_data([...Wingdata]);
        }
      );
    }
  };

  function Inactiveslots() {
    axios_call("GET", "Inactiveslots/").then((response) => {
      SetInactivelot(response);
    });
  }

  const removeWing = async () => {
    if (wing.wingId) {
      axios_call("DELETE", "CreateWing/" + wing.wingId + "/").then(
        (response) => {
          GetWingDetails(true);
          reset();
          Inactiveslots()
          SetSlot()
        }
      );
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

  function GetWingDetails(id) {
    axios_call("GET", "CreateWing/").then((response) => {
      SetWing_data(response);
      if(response[0]){
      if (id) {
        SetSlot(response[response.length - 1].slots);
      } else {
        SetSlot(response[0].slots);
      }
}    });
  }

  function reset() {
    setData_fail(false);
    setWing({
      wingName: "not_selected",
      wingCount: "not_selected",
      wingStatus: true,
      planWeekly: "not_selected",
      planMonthly: "not_selected",
      planQuarterly: "not_selected",
      planYearly: "not_selected",
      wingId: "",
    });
  }

  useEffect(() => {
    GetWingDetails();
    Inactiveslots();
  }, []);

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
              <div className="col-5 parking_setup_slot_container">
                <div className="parking_setup_text_slot_type"> Wing Name </div>
                <input
                autoComplete='off'
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
                {!wing.wingId && (
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
                )}

                {wing.wingId && (
                  <div className="parking_setup_button_container mt-4">
                    <div
                      className="parking_setup_submit_button"
                      onClick={Wingupdate}
                    >
                      {" "}
                      update{" "}
                    </div>
                    <div className="parking_setup_clear_button" onClick={reset}>
                      {" "}
                      Clear{" "}
                    </div>

                    <div
                      className="parking_setup_clear_button"
                      onClick={removeWing}
                    >
                      {" "}
                      Remove Wing{" "}
                    </div>
                  </div>
                )}
              </div>
              <div className="col-3">
                <div className="parking_setup_text_count"> Count </div>
                <input
                  type="number"
                  placeholder="Number of slots"
                  name="slot_count"
                  onChange={(e) => {
                    !wing.wingId &&
                      setWing({ ...wing, wingCount: e.target.value });
                  }}
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
                      Quarterly
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
            {wing_data && wing_data.length > 5 && (
              <div className="parking_setup_wing_title_section">
                <Slider>
                  {wing_data.map((wing) => {
                    return (
                      <div
                      className={
                        wing.id != (slot && slot[0].wingId)
                          ? "btn-light btn btn-sm m-1"
                          : "btn-outline-primary btn btn-sm m-1"
                      }
                        onClick={() => (reset(), SetSlot(wing.slots))}
                        onDoubleClick={() =>
                          setWing({
                            wingName: wing.wingName,
                            wingCount: wing.slots.length,
                            wingStatus: true,
                            planWeekly: parseInt(wing.planWeekly),
                            planMonthly: parseInt(wing.planMonthly),
                            planQuarterly: parseInt(wing.planQuarterly),
                            planYearly: parseInt(wing.planYearly),
                            wingId: wing.id,
                          })
                        }
                      >
                        {wing.wingName}
                      </div>
                    );
                  })}
                </Slider>
              </div>
            )}

            {wing_data && wing_data.length < 5 && (
              <div className="parking_setup_wing_title_section">
                <div className="d-flex">
                  {wing_data.map((wing) => {
                    return (
                      <div
                        className={
                          wing.id != (slot && slot[0].wingId)
                            ? "btn-light btn btn-sm m-1"
                            : "btn-outline-primary btn btn-sm m-1"
                        }
                        onClick={() => (reset(), SetSlot(wing.slots))}
                        onDoubleClick={() =>
                          setWing({
                            wingName: wing.wingName,
                            wingCount: wing.slots.length,
                            wingStatus: true,
                            planWeekly: parseInt(wing.planWeekly),
                            planMonthly: parseInt(wing.planMonthly),
                            planQuarterly: parseInt(wing.planQuarterly),
                            planYearly: parseInt(wing.planYearly),
                            wingId: wing.id,
                          })
                        }
                      >
                        {wing.wingName}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="parking_setup_wing_container">
              {slot && (
                <>
                  {slot.map((slot, id) => {
                    return (
                      <span>
                        <img
                          key={id}
                          src={Car}
                          onClick={() => (
                            wing.wingId
                              ? RemoveSlot(slot, id)
                              : Slotupdate(slot, id)
                          )}
                          className={
                            "ps-3 pe-3 mb-3 parking_setup_car_img " +
                            (!slot.slotStatus && "parking_undercons")
                          }
                          alt="Munidex_parking_Booking_slots"
                        />
                      </span>
                    );
                  })}{" "}
                  {wing.wingId && (
                    <div
                      className="btn btn-sm btn-primary"
                      onClick={() => AddSlot(wing.wingId)}
                    >
                      Add
                    </div>
                  )}
                </>
              )}
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
                    <th>Wing Name</th>
                    <th> Slot id </th>
                    {/* <th> Date </th> */}
                    <th> Activate </th>
                  </tr>
                  <tr className="parking_setup_table_dummy_data">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  {inactiveslot &&
                    inactiveslot.map((parkingsetupdata, id) => {
                      return (
                        <tr className="parking_setup_table_data">
                          <td>{parkingsetupdata.wing.wingName}</td>
                          <td>{parkingsetupdata.slotId}</td>
                          {/* <td>{parkingsetupdata.date}</td> */}
                          <td>
                            <span
                              className="parking_setup_table_activate_button"
                              onClick={() =>
                                TotalInactiveSlotupdate(parkingsetupdata, id)
                              }
                            >
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
