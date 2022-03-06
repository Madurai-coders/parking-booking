import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/booking_report.css";
import { IoTrashOutline } from "react-icons/io5";
import Numberofslots from "../assets/images/Numberofslots.svg";
import Reservedslot from "../assets/images/Reservedslot.svg";
import Unreservedslot from "../assets/images/Unreservedslot.svg";
import Amount from "../assets/images/Amount.svg";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import Carousel from "react-elastic-carousel";
import { axios_call, axios_call_auto ,formatUsd} from "../functions/reusable_functions";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";
import Chart from "chart.js/auto";
import { motion, AnimatePresence } from "framer-motion";
import send from "../assets/images/send.svg";
import Bookinginvoice from "../components/Booking/bookinginvoice";

export default function Booking_report() {
  const [data, setData] = useState();
  const [date, setDate] = useState();
  const [selected_wing, setSelected_wing] = useState();
  const [slotgrap, setSlotgraph] = useState();
  const [slotdata, setSlotdata] = useState();
  const [maingraph, setMaingraph] = useState();
  const [wing_results, setWing_result] = useState();
  const [remove_booking, setRemove_booking] = useState();
  const [preview, setPreview] = useState(false);
  const [mailStatus, setMailStatus] = useState();

  const options = {
      
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };



  const options1 = {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Y text'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'X text'
        }
      }],
    }  ,
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },   
  } 

  const [wingdata, setWingData] = useState();

  let count = 0;

  function MainGraph(start, end, booking, wing) {
    // console.log(wing);
    // console.log(booking);
    var dateOne = moment(start);
    var dateTwo = moment(end);

    var total_days = dateTwo.diff(dateOne, "days");
    //  console.log(total_days);

    var wing_holder = [];
    var wing_value_holder_reserved = [];
    var wing_value_holder_unreserved = [];

    wing.forEach((wing) => {
      var booked_period_total = 0;

      booking.forEach((booking) => {
        if (wing.wingId == booking.slots.wing.wingId) {
          var start_date = moment(booking.startFrom);
          var end_date = moment(booking.endTo);

          var booked_period = end_date.diff(start_date, "days");
          // console.log(wing.wingId)
          // console.log(booking.Slots.wing.wingId)
          if (booked_period >= total_days) {
            booked_period = total_days;
          }
          booked_period_total += booked_period;
        }
      });

      var wing_total_period = total_days * wing.slots.length;
      //   console.log(wing_total_period);

      var reserved_value =
        ((wing_total_period - booked_period_total) / wing_total_period) * 100;

      wing_holder.push(wing.wingName);
      wing_value_holder_unreserved.push(Math.round(reserved_value));
      wing_value_holder_reserved.push(100 - Math.round(reserved_value));
    });

    // console.log(wing_value_holder_unreserved);
    // console.log(wing_value_holder_reserved);

    if (selected_wing && booking) {
      SlotGraph(selected_wing, booking, start, end);
    }

    setMaingraph({
      labels: wing_holder,
      datasets: [
        {
          label: "Unreserved %",
          data: wing_value_holder_unreserved,
          borderColor: "rgba(241, 80, 80, 1)",
          backgroundColor: "rgba(247, 128, 99, 0.6)",
          borderRadius: 5,
          borderSkipped: false,
          tension: 0.1
        },
        {
          label: "Reserved %",
          data: wing_value_holder_reserved,
          borderColor: "rgba(1, 78, 201, 1)",
          backgroundColor: "rgba(144, 181, 240, 0.71)",
          fill: true,
          borderRadius: 5,
          borderSkipped: false,
          tension: 0.1
        },
      ],
    });
  }

  const SlotGraph = async (wing, booking, start, end) => {
    var dateOne = moment(start);
    var dateTwo = moment(end);

    var total_days = dateTwo.diff(dateOne, "days");
    var slotId = [];
    var days_of_booking = [];
    console.log(total_days);

    var booked_slots_wing = booking.filter(
      (val) => val.slots.wing.wingName == wing.wingName
    );
    var amount = 0;
    booked_slots_wing.forEach((element) => {
      amount = amount + parseInt(element.charge);
    });

    setSlotdata({
      ...slotdata,
      unreserved: wing.slots.length - booked_slots_wing.length,
      reserved: booked_slots_wing.length,
      total: wing.slots.length,
      amount: amount,
    });

    setWing_result(booked_slots_wing);

    wing.slots.forEach((slot) => {
      slotId.push(slot.id);
      var booked_period = 0;
      booked_slots_wing.forEach((element) => {
        if (element.slot_connect == slot.id) {
          var dateOne = moment(element.startFrom);
          var dateTwo = moment(element.endTo);
          booked_period = dateTwo.diff(dateOne, "days");
        }
      });

      if (booked_period >= total_days) {
        days_of_booking.push(total_days);
      } else {
        days_of_booking.push(booked_period);
      }
    });

    setSlotgraph({
      labels: slotId,
      datasets: [
        {
          label: wing.wingName + ' in days',
          data: days_of_booking,
          borderColor: "rgba(241, 80, 80, 1)",
          backgroundColor: "rgba(247, 128, 99, 0.6)",
          borderRadius: 5,
          borderSkipped: false,
          tension: 0.1
        },
      ],
    });
  };

  const GetBooking = async (start, end) => {
    console.log(start);
    console.log(end);
    var booking = await axios_call(
      "GET",
      "GetBookingByDate/?from=" + start + "&to=" + end
    );
    setData(booking);
    console.log(booking);
    var amount = 0;
    booking.forEach((element) => {
      amount = amount + parseInt(element.charge);
    });
    var slotcount = await axios_call("GET", "SlotCount/");
    var tot = slotcount.total - slotcount.inactive;
    var val = tot - booking.length;
    setSlotdata({
      total: tot,
      reserved: tot - val,
      unreserved: val,
      amount: amount,
    });

    var wingdata = await axios_call("GET", "CreateWing/");
    setWingData(wingdata);

    MainGraph(start, end, booking, wingdata);
  };

  function Removebooking(id) {
    axios_call("DELETE", "CreateBooking/" + id + "/", "").then((response) => {
      var values_result = data.filter((item) => item.id !== id);
      setData(values_result);
      setRemove_booking(false);
    });

    if (wing_results) {
      var values_result = wing_results.filter((item) => item.id !== id);
      setWing_result(values_result);
    }
  }

  const handleCallback = (start, end) => {
    GetBooking(start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"), true);
    setDate({
      start: start.format("YYYY-MM-DD"),
      end: end.format("YYYY-MM-DD"),
    });
    console.log("selected_wing");
  };

  async function SelectAll() {
    var amount = 0;
    data.forEach((element) => {
      amount = amount + parseInt(element.charge);
    });
    var slotcount = await axios_call("GET", "SlotCount/");
    var tot = slotcount.total - slotcount.inactive;
    var val = tot - data.length;
    setSlotdata({
      total: tot,
      reserved: tot - val,
      unreserved: val,
      amount: amount,
    });
  }

  function month_report() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    GetBooking(
      moment(firstDay).format("YYYY-MM-DD"),
      moment(lastDay).format("YYYY-MM-DD")
    );
    setDate({
      start: moment(firstDay).format("YYYY-MM-DD"),
      end: moment(lastDay).format("YYYY-MM-DD"),
    });
  }

  useEffect(() => {
    month_report();
  }, []);

  function ClosePreview() {
    setPreview(false);
    setMailStatus()

  }

  function SendMail() {
    var data = {
      to: preview.User.email,
      invoiceDate:moment(preview.date).format("DD/MM/YYYY"),
      user: preview.User.userName,
      accountNumber: preview.User.accountNumber,
      bookingId: preview.bookingId,
      amount: preview.charge,
      startFrom:moment(preview.startFrom).format("DD/MM/YYYY"),
      endTo:moment(preview.endTo).format("DD/MM/YYYY"),
      wing:preview.slots.wing.wingName,
      plan:preview.plan,
      id:preview.id,
      slot:preview.slot_connect,
    };
    console.log(data);
    setMailStatus({
        status: "Sending",
        to: preview.User.email,
      });

    axios_call("POST", "send_mail_booking/", data).then((response) => {
      console.log(response);
      setMailStatus({
        status: "Successful",
        to: preview.User.email,
      });
    });
  }


  return (
    <>
      <Helmet>
        <title>Munidex Parking - Booking Report</title>
      </Helmet>


      {preview && (
        <div className="overlay1">
          <div className="row">
            <div className="col-6 px-5">
            <Bookinginvoice bookingData={preview} ClosePreview={ClosePreview} />
            </div>

            <div className="col-6">
              <div className="p-3 ">
              <div className='' style={{ marginTop: mailStatus ? "36.5vh" :"84vh" }}>
                  {mailStatus &&
                  <div className='' >
                      <div className='h2 text-center'>{
                          mailStatus.status == 'Sending' && 
                          <div className='text-center mb-2'>
                          <div class="spinner-grow mx-1 text-primary" role="status">
  <span class="sr-only"></span>
</div>
<div class="spinner-grow mx-1 text-secondary" role="status">
  <span class="sr-only"></span>
</div>
<div class="spinner-grow mx-1 text-success" role="status">
  <span class="sr-only"></span>
</div>
<div class="spinner-grow mx-1 text-danger" role="status">
  <span class="sr-only"></span>
</div>
<div class="spinner-grow mx-1 text-warning" role="status">
  <span class="sr-only"></span>
</div>
<div class="spinner-grow mx-1 text-info" role="status">
  <span class="sr-only"></span>
</div>
<div class="spinner-grow mx-1 text-light" role="status">
  <span class="sr-only"></span>
</div>
<div class="spinner-grow mx-1 text-dark" role="status">
  <span class="sr-only"></span>
</div>

                          </div>
                      }
  {mailStatus.status} !! </div>
 <div className='h2 mt-3 text-center'>
 To : {mailStatus.to}  </div>
                  </div>
}
</div>

                <div className="d-flex" style={{ marginTop: "35vh" }}>
                  <div
                    className="btn-danger btn-sm  btn"
                    onClick={ClosePreview}
                  >
                    Close
                  </div>
                  <button
                    className="btn-primary btn-sm btn mx-2"
                    onClick={SendMail}
                    disabled={mailStatus}
                  >
                    Send Receipt
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}




      {remove_booking && (
        <div className="overlay">
          {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Remove Booking
                </h5>
                <button
                  type="button"
                  onClick={() => setRemove_booking(false)}
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Are your sure?</div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={() => Removebooking(remove_booking)}
                  class="btn btn-light"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => setRemove_booking(false)}
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancle
                </button>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: [0.5, 1], y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-grow-1"
      >
        <div className="booking_report_container">
          <div className="booking_report_title"> Booking Report </div>
          <div className="row">
            <div className="col-3">
              <div className="booking_report_text_date"> Date </div>
              <DateRangePicker onCallback={handleCallback}>
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
                      {slotdata && slotdata.total}{" "}
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
                      {slotdata && slotdata.reserved}
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
                      {slotdata && slotdata.unreserved}{" "}
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
                      {slotdata && formatUsd(parseInt(slotdata.amount))}
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
            <div className="col-6">
              <div className="booking_report_table_container">
                <table className="booking_report_table">
                  <tr className="booking_report_table_headers">
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Plan</th>
                    <th>Slot</th>
                    <th>Amount</th>
                    <th>Control</th>
                  </tr>
                  {data &&
                    !wing_results &&
                    data.map((bookingdata, id) => {
                      count++;
                      return (
                        <tr key={id} className="booking_report_table_data">
                          <td>{count}</td>
                          <td>{bookingdata.User.lastName}</td>
                          <td>{bookingdata.plan}</td>
                          <td>
                            {bookingdata.slots.wing.wingName} [
                            {bookingdata.slots.id}]
                          </td>
                          <td>{bookingdata.charge && formatUsd(parseInt(bookingdata.charge))}</td>
                          <td>
                            <IoTrashOutline
                            style={{cursor:'pointer'}}
                              onClick={() => setRemove_booking(bookingdata.id)}
                            />
                            <img
                            style={{cursor:'pointer'}}
                              src={send}
                              className='px-1'
                              onClick={() => setPreview(bookingdata)}
                            />
                          </td>
                        </tr>
                      );
                    })}

                  {wing_results &&
                    wing_results.map((bookingdata, id) => {
                      count++;
                      return (
                        <tr key={id} className="booking_report_table_data">
                          <td>{count}</td>
                          <td>{bookingdata.User.lastName}</td>
                          <td>{bookingdata.plan}</td>
                          <td>
                            {bookingdata.slots.wing.wingName} [
                            {bookingdata.slots.id}]
                          </td>{" "}
                          <td>{bookingdata.charge && formatUsd(parseInt(bookingdata.charge))} </td>
                          <td>
                            <IoTrashOutline
                            style={{cursor:'pointer'}}
                              onClick={() => setRemove_booking(bookingdata.id)}
                            />
                            <img
                            style={{cursor:'pointer'}}
                              src={send}
                              className='px-1'
                              onClick={() => setPreview(bookingdata)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
            <div className="col-6">
              {maingraph && !slotgrap && (
                <Bar data={maingraph} options={options}></Bar>
              )}
              {maingraph && slotgrap && (
                <Line data={slotgrap} options={options1}></Line>
              )}
            </div>
          </div>
        </div>
        <div className="booking_report_wingselection_container">
          <div style={{ flexGrow: 1 }}>
            <Carousel
              itemsToShow={7}
              itemsToScroll={1}
              pagination={false}
              showArrows={true}
            >
              {wingdata &&
                wingdata.map((wing) => {
                  return (
                    <div
                      className="booking_report_wing_button"
                      onClick={() => (
                        SlotGraph(wing, data, date.start, date.end),
                        setSelected_wing(wing)
                      )}
                    >
                      {wing.wingName}
                    </div>
                  );
                })}
            </Carousel>
          </div>
          <span
            onClick={() => (
              setSlotgraph(), setSelected_wing(), setWing_result(), SelectAll()
            )}
            className="booking_report_wingsubmit"
          >
            {" "}
            Select All
          </span>
        </div>
      </motion.div>
    </>
  );
}
