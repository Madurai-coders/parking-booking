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
import {
  axios_call,
  axios_call_auto,
  formatUsd,
} from "../functions/reusable_functions";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";
import Chart from "chart.js/auto";
import { motion, AnimatePresence } from "framer-motion";
import send from "../assets/images/send.svg";
import Bookinginvoice from "../components/Booking/bookinginvoice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, PolarArea } from "react-chartjs-2";
import { set } from "js-cookie";
import Table from "../components/table/table";
import Loader from "../components/loader/loader";
import "../../src/assets/css/general.css";
export default function Booking_report() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState();
  const [selected_wing, setSelected_wing] = useState();
  const [slotgrap, setSlotgraph] = useState();
  const [slotgrap_option, setSlotgraph_option] = useState();
  const [slotdata, setSlotdata] = useState();
  const [maingraph, setMaingraph] = useState();
  const [wing_results, setWing_result] = useState();
  const [remove_booking, setRemove_booking] = useState();
  const [preview, setPreview] = useState(false);
  const [mailStatus, setMailStatus] = useState();
  const [timeline, settimeline] = useState("Weekly");
  const [payment, setpayment] = useState();
  const [payment_graph, setpayment_graph] = useState();
  const [booking_graph, setbooking_graph] = useState();
  const [payment_values, setpayment_values] = useState();
  const [expand, setexpand] = useState();
  const [count_val, setCountval] = useState(0);
  const [Daily_payment, setDaily_payment] = useState();
  const [Daily_booking, setDaily_booking] = useState();
  const [booking_validity, setBooking_validity] = useState();
  const [paymentType_graph, setPaymentType_graph] = useState();
  const [display, setdisplay] = useState("payment_report");
  const [date_timeline, setdate_timeline] = useState();
  const [table_data, settable_data] = useState();
const [timer, settimer] = useState(false)
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
      y: {
        min: 0,
      },
      x: {},
    },
  };

  const [wingdata, setWingData] = useState();


  function MainGraph(start, end, booking, wing,booking_by_date) {
    // console.log(wing);
    console.log(booking);
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
      SlotGraph(selected_wing, booking, start, end,true,booking_by_date);
    }

    setMaingraph({
      labels: wing_holder,
      datasets: [
        {
          label: "Unreserved %",
          data: wing_value_holder_unreserved,
          borderColor: "rgb(191, 236, 255)",
          backgroundColor: "rgb(191, 236, 255)",
          borderRadius: 5,
          borderSkipped: false,
          tension: 0.1,
        },
        {
          label: "Reserved %",
          data: wing_value_holder_reserved,
          borderColor: "rgba(144, 181, 240, 0.71)",
          backgroundColor: "rgba(144, 181, 240, 0.71)",
          fill: true,
          borderRadius: 5,
          borderSkipped: false,
          tension: 0.1,
        },
      ],
    });
  }

  const SlotGraph = async (wing, booking, start, end, selected,getbooking_data) => {
    var dateOne = moment(start);
    var dateTwo = moment(end);

    var total_days = dateTwo.diff(dateOne, "days");
    if (total_days > 1) {
      total_days = total_days + 1;
    }
    var slotId = [];
    var days_of_booking = [];

    var booked_slots_wing = booking.filter(
      (val) => val.slots.wing.wingName == wing.wingName
    );
    if (data) {

      var booked_slots_wing_alter = data.filter(
        (val) => val.slots.wing.wingName == wing.wingName
      );

      var amount = 0;
      booked_slots_wing_alter.forEach((element) => {
        amount = amount + parseInt(element.charge);
      });

      setWing_result(booked_slots_wing_alter);
      if (selected_wing || selected) {
        setSlotdata({
          ...slotdata,
          unreserved: wing.slots.length - booked_slots_wing.length,
          reserved: booked_slots_wing.length,
          total: wing.slots.length,
          amount: amount,
        });
      }
    }
    console.log(getbooking_data)
    if(getbooking_data){
        var booked_slots_wing_alter = getbooking_data.filter(
            (val) => val.slots.wing.wingName == wing.wingName
          );
    
          var amount = 0;
          booked_slots_wing_alter.forEach((element) => {
            amount = amount + parseInt(element.charge);
          });
    
          setWing_result(booked_slots_wing_alter);
          if (selected_wing || selected) {
            setSlotdata({
              ...slotdata,
              unreserved: wing.slots.length - booked_slots_wing.length,
              reserved: booked_slots_wing.length,
              total: wing.slots.length,
              amount: amount,
            });
          }
    }

    wing.slots.forEach((slot) => {
      slotId.push(slot.id);
      var booked_period = 0;
      booked_slots_wing.forEach((element) => {
        if (element.slot_connect == slot.id) {
          var dateOne = moment(element.startFrom);
          var dateTwo = moment(element.endTo);
          booked_period = booked_period + dateTwo.diff(dateOne, "days");
        }
      });

      if (booked_period >= total_days) {
        days_of_booking.push(total_days);
      } else {
        days_of_booking.push(booked_period);
      }
    });

    setSlotgraph_option({
      scales: {
        y: {
          min: 0,
          max: total_days,
        },
        x: {},
      },
    });

    setSlotgraph({
      labels: slotId,
      datasets: [
        {
          label: wing.wingName + " in days",
          data: days_of_booking,
          borderColor: "rgba(144, 181, 240, 0.71)",
          backgroundColor: "rgb(55, 157, 201)",
          borderRadius: 5,
          borderSkipped: false,
          tension: 0.4,
        },
      ],
    });
  };

  async function SelectAll() {
    var amount = 0;
    data.forEach((element) => {
      amount = amount + parseInt(element.charge);
    });
    var slotcount = await axios_call("GET", "SlotCount/");
    var tot = slotcount.total - slotcount.inactive;
    var val = tot - booking_validity.booking.length;
    setSlotdata({
      total: tot,
      reserved: tot - val,
      unreserved: val,
      amount: amount,
    });

    if (wingdata && booking_validity) {
      SlotGraph(
        wingdata[0],
        booking_validity.booking,
        booking_validity.start,
        booking_validity.end
      );
    }
  }

  const GetBooking = async (start, end) => {
    var start1 = moment(new Date()).format("YYYY-MM-DD");
    var end1 = moment(new Date()).add(366, "days").format("YYYY-MM-DD");
    var booking_validity = await axios_call(
      "GET",
      "GetBooking/?from=" + start1 + "&to=" + end1
    );
    setBooking_validity({
      booking: booking_validity,
      end: end1,
      start: start1,
    });
    var booking = await axios_call(
      "GET",
      "GetBookingByDate/?from=" + start + "&to=" + end
    );
    setData(booking);
console.log(booking_validity)
    var amount = 0;
    booking.forEach((element) => {
      amount = amount + parseInt(element.charge);
    });
    var slotcount = await axios_call("GET", "SlotCount/");
    var tot = slotcount.total - slotcount.inactive;
    var val = tot - booking_validity.length;
    setSlotdata({
      total: tot,
      reserved: tot - val,
      unreserved: val,
      amount: amount,
    });
    var wingdata = await axios_call("GET", "CreateWing/");
    setWingData(wingdata);
    console.log(booking_validity)
    console.log('booking_validity')
    console.log(wingdata)

    // if (wingdata && booking_validity) {
    //   SlotGraph(wingdata[0], booking_validity, start1, end1,selected_wing,wingdata);
    // }

    MainGraph(start1, end1, booking_validity, wingdata,booking);

    return booking;
  };

  const GetPayment = async (timeline, start, end, x) => {
    if (timeline) {
      var today = new Date();
      //   var start = moment(today, "YYYY-MM-DD").format("YYYY-MM-DD");
      //   var end = "";
      let y = x + 1;
      var booking = [];

      if (timeline == "Daily") {
        start = moment(today, "YYYY-MM-DD").add(x, "days").format("YYYY-MM-DD");

        end = moment(today, "YYYY-MM-DD").add(y, "days").format("YYYY-MM-DD");

        booking = await GetBooking(
          moment(today, "YYYY-MM-DD").add(x, "days").format("YYYY-MM-DD"),
          moment(today, "YYYY-MM-DD").add(y, "days").format("YYYY-MM-DD")
        );
        setDate({
          start: moment(today, "YYYY-MM-DD")
            .add(x, "days")
            .format("YYYY-MM-DD"),
          end: moment(today, "YYYY-MM-DD").add(y, "days").format("YYYY-MM-DD"),
        });
      } else {
        setexpand(false);
      }

      if (timeline == "Monthly") {
        var startOfWeek = moment().startOf("month").toDate();
        var endOfWeek = moment().endOf("month").toDate();

        var start = moment(startOfWeek).add(x, "months").format("YYYY-MM-DD");
        var end = moment(endOfWeek).add(x, "months").format("YYYY-MM-DD");
        booking = await GetBooking(start, end);
        setDate({
          start: start,
          end: end,
        });
      }

      if (timeline == "Weekly") {
        var startOfWeek = moment().startOf("week").toDate();
        var endOfWeek = moment().endOf("week").toDate();

        var start = moment(startOfWeek).add(x, "weeks").format("YYYY-MM-DD");
        var end = moment(endOfWeek).add(x, "weeks").format("YYYY-MM-DD");
        booking = await GetBooking(start, end);
        setDate({
          start: start,
          end: end,
        });
      }

      if (timeline == "Yearly") {
        end = moment(today, "YYYY-MM-DD").add(366, "days").format("YYYY-MM-DD");
        var startOfWeek = moment().startOf("year").toDate();
        var endOfWeek = moment().endOf("year").toDate();
        var start = moment(startOfWeek).add(x, "years").format("YYYY-MM-DD");
        var end = moment(endOfWeek).add(x, "years").format("YYYY-MM-DD");
        booking = await GetBooking(start, end);
        setDate({
          start: start,
          end: end,
        });
      }

      var payment = await axios_call(
        "GET",
        "GetPaymentbyDate/?from=" + start + "&to=" + end
      );
    } else {

      var payment = await axios_call(
        "GET",
        "GetPaymentbyDate/?from=" + start + "&to=" + end
      );
      booking = await GetBooking(start, end, true);
    }
console.log(payment)
    setpayment(payment);

    var amount = 0;
    var cash = 0;
    var card = 0;
    var online = 0;
    var check = 0;
    payment.forEach((element) => {
        if(element.Status == 'success'){
      amount = amount + parseInt(element.amount);
      if (element.paymentType == "cash") {
        cash = element.amount + cash;
      }
      if (element.paymentType == "card") {
        card = element.amount + card;
      }
      if (element.paymentType == "online") {
        online = element.amount + online;
      }
      if (element.paymentType == "check") {
        check = element.amount + check;
      }}
    });

    setpayment_values({ amount, cash, card, online, check });

    setPaymentType_graph({
      labels: ["Cash", "Card", "Online", "Check"],
      datasets: [
        {
          label: "Payment Method",
          data: [cash, card, online, check],
          backgroundColor: [
            "rgba(3, 248, 252, 1)",
            "rgba(54, 162, 235,1)",
            "rgba(252, 244, 3, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 0,
        },
      ],
    });

    var day1 = moment(start);
    var day2 = moment(end);
    var date_of_lable = [];
    var result = [];
    if (timeline != "Yearly") {
      while (day1.diff(day2, "days") != 0) {
        result.push(moment({ ...day1 }));
        day1.add(1, "day");
      }
      result.push(moment({ ...day2 }));

      result.map((x) => date_of_lable.push(x.format("DD-MMM")));
    } else {
      while (day2.diff(day1, "days") >= 28) {
        result.push(moment({ ...day1 }));
        day1.add(1, "month");
      }
      //  console.log(result.map((x) => x.format("YYYY-MM-DD")));
      result.map((x) => date_of_lable.push(x.format("MMM")));
    }
    setdate_timeline(result);
    var amount_by_fliter = [];
    var booking_amount_by_fliter = [];
    var payment_table_value = [];
    var booking_table_value = [];

    if (booking) {
      result.forEach((date_payment) => {
        let total_payment = 0;
        let no_of_pay = 0;
        let no_of_booking = 0;
        let total_amount_booking = 0;

        payment.forEach((element) => {
          if (timeline == "Yearly") {
            if (
              moment(date_payment).format("YYYY-MM-DD") ==
              moment(moment(element.paymentDate).startOf("month")).format(
                "YYYY-MM-DD"
              )
            ) {
                if(element.Status=='success'){
              total_payment = total_payment + parseInt(element.amount);
              no_of_pay = no_of_pay + 1;
            }}
          } else {
            if (
              moment(date_payment).format("YYYY-MM-DD") ==
              moment(element.paymentDate).format("YYYY-MM-DD")
            ) {
                if(element.Status=='success'){
              total_payment = total_payment + parseInt(element.amount);
              no_of_pay = no_of_pay + 1;}
            }
          }
        });

        booking.forEach((element) => {
          if (
            selected_wing
              ? selected_wing.wingName == element.slots.wing.wingName
              : true
          ) {
            if (timeline == "Yearly") {
              if (
                moment(date_payment).format("YYYY-MM-DD") ==
                moment(moment(element.startFrom).startOf("month")).format(
                  "YYYY-MM-DD"
                )
              ) {
                total_amount_booking =
                  total_amount_booking + parseInt(element.charge);
                no_of_booking = no_of_booking + 1;
              }
            } else {
              if (
                moment(date_payment).format("YYYY-MM-DD") ==
                moment(element.startFrom).format("YYYY-MM-DD")
              ) {
                total_amount_booking =
                  total_amount_booking + parseInt(element.charge);
                no_of_booking = no_of_booking + 1;
              }
            }
          }
        });

        booking_amount_by_fliter.push(total_amount_booking);
        amount_by_fliter.push(total_payment);

        payment_table_value.push({
          date: date_payment,
          no_of_pay: no_of_pay,
          tot_amount: total_payment,
        });

        booking_table_value.push({
          date: date_payment,
          no_of_booking: no_of_booking,
          total_amount_booking: total_amount_booking,
        });
      });
    }
    console.log(payment_table_value)

    setDaily_payment(payment_table_value);
    setDaily_booking(booking_table_value);
    setTimeout(() => {
      if (amount_by_fliter && date_of_lable && booking_amount_by_fliter) {
        setpayment_graph({
          labels: date_of_lable,
          datasets: [
            {
              label: "Payment received - days",
              data: amount_by_fliter,
              borderColor: "rgba(144, 181, 240, 0.71)",
              backgroundColor: "rgb(55, 157, 201)",
              borderRadius: 5,
              borderSkipped: false,
              tension: 0.4,
            },
          ],
        });

        setbooking_graph({
          labels: date_of_lable,
          datasets: [
            {
              label:
                "Booking collection in " +
                (timeline == "Yearly" ? "Months" : "days"),
              data: booking_amount_by_fliter,
              borderColor: "rgba(144, 181, 240, 0.71)",
              backgroundColor: "rgb(55, 157, 201)",
              borderRadius: 5,
              borderSkipped: false,
              tension: 0.4,
            },
          ],
        });
      }
    }, 2000);
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
    if(start.format("YYYY-MM-DD")==end.format("YYYY-MM-DD")){
        end=end.add(1, "day")
        settimeline('Daily')
       }
    GetPayment(false, start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"));
    setDate({
      start: start.format("YYYY-MM-DD"),
      end: end.format("YYYY-MM-DD"),
    });
  };

  function ClosePreview() {
    setPreview(false);
    setMailStatus();
  }

  function SendMail() {
    var data = {
      to: preview.User.email,
      invoiceDate: moment(preview.date).format("MM/DD/YYYY"),
      user: preview.User.userName,
      accountNumber: preview.User.accountNumber,
      bookingId: preview.bookingId,
      amount: preview.charge,
      startFrom: moment(preview.startFrom).format("MM/DD/YYYY"),
      endTo: moment(preview.endTo).format("MM/DD/YYYY"),
      wing: preview.slots.wing.wingName,
      plan: preview.plan,
      id: preview.id,
      slot: preview.slot_connect,
    };
    setMailStatus({
      status: "Sending",
      to: preview.User.email,
    });

    axios_call("POST", "send_mail_booking/", data).then((response) => {
      setMailStatus({
        status: "Successful",
        to: preview.User.email,
      });
    });
  }

  function Daysleft(a, b) {
    var day = b.diff(a, "days");
    if(day==0){return '1'}
    return day;
  }

  useEffect(() => {
    GetPayment("Weekly");
    axios_call("GET", "TableData/").then((response) => {
      settable_data(response);
    });
  }, []);

  function bookingPayment(selected_wing) {
    var booking_amount_by_fliter = [];
    var payment_table_value = [];
    var booking_table_value = [];
    var date_of_lable = [];

    if (timeline != "Yearly") {
      date_timeline.map((x) => date_of_lable.push(x.format("DD-MMM")));
    } else {
      date_timeline.map((x) => date_of_lable.push(x.format("MMM")));
    }

    if (selected_wing) {
      date_timeline.forEach((date_payment) => {
        let no_of_booking = 0;
        let total_amount_booking = 0;

        data.forEach((element) => {
          if (
            selected_wing
              ? selected_wing.wingName == element.slots.wing.wingName
              : true
          ) {
            if (timeline == "Yearly") {
              if (
                moment(date_payment).format("YYYY-MM-DD") ==
                moment(moment(element.startFrom).startOf("month")).format(
                  "YYYY-MM-DD"
                )
              ) {
                total_amount_booking =
                  total_amount_booking + parseInt(element.charge);
                no_of_booking = no_of_booking + 1;
              }
            } else {
              if (
                moment(date_payment).format("YYYY-MM-DD") ==
                moment(element.startFrom).format("YYYY-MM-DD")
              ) {
                total_amount_booking =
                  total_amount_booking + parseInt(element.charge);
                no_of_booking = no_of_booking + 1;
              }
            }
          }
        });

        booking_amount_by_fliter.push(total_amount_booking);

        booking_table_value.push({
          date: date_payment,
          no_of_booking: no_of_booking,
          total_amount_booking: total_amount_booking,
        });

        setDaily_booking(booking_table_value);
      });
    } else {
      date_timeline.forEach((date_payment) => {
        let no_of_booking = 0;
        let total_amount_booking = 0;

        data.forEach((element) => {
          if (timeline == "Yearly") {
            if (
              moment(date_payment).format("YYYY-MM-DD") ==
              moment(moment(element.startFrom).startOf("month")).format(
                "YYYY-MM-DD"
              )
            ) {
              total_amount_booking =
                total_amount_booking + parseInt(element.charge);
              no_of_booking = no_of_booking + 1;
            }
          } else {
            if (
              moment(date_payment).format("YYYY-MM-DD") ==
              moment(element.startFrom).format("YYYY-MM-DD")
            ) {
              total_amount_booking =
                total_amount_booking + parseInt(element.charge);
              no_of_booking = no_of_booking + 1;
            }
          }
        });

        booking_amount_by_fliter.push(total_amount_booking);

        booking_table_value.push({
          date: date_payment,
          no_of_booking: no_of_booking,
          total_amount_booking: total_amount_booking,
        });

        setDaily_booking(booking_table_value);
      });
    }

    setTimeout(() => {
      setbooking_graph({
        labels: date_of_lable,
        datasets: [
          {
            label:
              "Booking collection in " +
              (timeline == "Yearly" ? "Months" : "days"),
            data: booking_amount_by_fliter,
            borderColor: "rgba(144, 181, 240, 0.71)",
            backgroundColor: "rgb(55, 157, 201)",
            borderRadius: 5,
            borderSkipped: false,
            tension: 0.4,
          },
        ],
      });
    }, 1000);
  }

  function Table_data(data, key) {
    var val = [];

    if (key == "Daily_payment") {
      let count = 0;
      data.forEach(
        (element, id) => (
          (count = count + 1),
          val.push({
            data1: count,
            data2: moment(element.date).format("MM-DD-YYYY").toString(),
            data3: element.no_of_pay,
            data4: formatUsd(parseInt(element.tot_amount)),
          })
        )
      );
    }

    if (key == "payment") {
      let count = 0;
      data.forEach(
        (element, id) => {
            if(element.Status=='success'){
          (count = count + 1)
          val.push({
            data1: element.User.userName,
            data2: moment(element.paymentDate).format("MM-DD-YYYY").toString(),
            data3: element.User.email,
            data4: element.User.accountNumber,
            data5: element.paymentType,
            data6: formatUsd(parseInt(element.amount)),
          })}}
        
      );
    }

    if (key == "Daily_booking") {
      let count = 0;
      data.forEach(
        (element, id) => (
          (count = count + 1),
          val.push({
            data1: count,
            data2: moment(element.date).format("MM-DD-YYYY").toString(),
            data3: element.no_of_booking,
            data4:   formatUsd(parseInt(element.total_amount_booking)),
          })
        )
      );
    }

    if (key == "data") {
      let count = 0;
      data.forEach(
        (element, id) => (
          (count = count + 1),
          val.push({
            id: element.bookingId,
            data1: count,
            data2: element.User.lastName,
            data3: element.User.email,
            data4: element.User.accountNumber,
            data5: element.plan,
            data6: element.bookingId,
            data7: moment(element.startFrom).format("MM-DD-YYYY"),
            data8: moment(element.endTo).format("MM-DD-YYYY"),
            data9: element.slots.wing.wingName + " [" + element.slots.id + "]",
            data10: formatUsd(parseInt(element.charge)),
          })
        )
      );
    }

    if (key == "booking_validity") {
        var array = [];

        if (data) {
          data.booking.forEach((element) => {
            array.push({
              ...element,
              day_left: Daysleft(
                moment(new Date(), "YYYY-MM-DD"),
                moment(element.endTo, "YYYY-MM-DD")
              ),
            });
          });
        }
        array.sort(function (a, b) {
          return a.day_left - b.day_left;
        });
        // console.log(array)
      let count = 0;
if(selected_wing){
    array=array.filter(val=> selected_wing.wingName == val.slots.wing.wingName)
}

      array.forEach(
        (element, id) => (
          (count = count + 1),
          val.push({
            data1: count,
            data2: element.User.lastName,
            data3: element.User.accountNumber,
            data4: element.User.email,
            data5: element.bookingId,
            data6: element.plan,
            data7: moment(element.startFrom).format("MM-DD-YYYY"),
            data8: moment(element.endTo).format("MM-DD-YYYY"),
            data9:element.day_left,
            data10: element.slots.wing.wingName,
            data11:  formatUsd(parseInt(element.charge)),
          })
        )
      );
    }

    // console.log(val);
    return val;
  }

  function Booking_validity_function(booking_validity) {
    var array = [];

    if (booking_validity) {
      booking_validity.booking.forEach((element) => {
        array.push({
          ...element,
          day_left: Daysleft(
            moment(new Date(), "YYYY-MM-DD"),
            moment(element.endTo, "YYYY-MM-DD")
          ),
        });
      });
    }
    array.sort(function (a, b) {
      return a.day_left - b.day_left;
    });

    return (
      <>
        {array &&
          array.map((bookingdata, id) => {
            return (
              <>
                {selected_wing ? (
                  selected_wing.wingName == bookingdata.slots.wing.wingName && (
                    <tr key={id} className="booking_report_table_data">
                      <td>{id + 1}</td>
                      <td>{bookingdata.User.lastName}</td>
                      <td>{bookingdata.User.accountNumber}</td>
                      <td>{bookingdata.User.email}</td>
                      <td>{bookingdata.bookingId}</td>
                      <td>{bookingdata.plan}</td>

                      <td>
                        {moment(bookingdata.startFrom).format("MM-DD-YYYY")}
                      </td>
                      <td>{moment(bookingdata.endTo).format("MM-DD-YYYY")}</td>
                      <td>
                        <div
                          className={
                            bookingdata.day_left < 7 &&
                            "p-1 shadow-sm rounded bg-danger display-block"
                          }
                        >
                          {bookingdata.day_left}
                        </div>
                      </td>
                      <td>
                        {" "}
                        {bookingdata.slots.wing.wingName} [
                        {bookingdata.slots.id}]
                      </td>
                      <td>{bookingdata.charge}</td>
                    </tr>
                  )
                ) : (
                  <tr key={id} className="booking_report_table_data">
                    <td>{id + 1}</td>
                    <td>{bookingdata.User.lastName}</td>
                     <td>{bookingdata.User.accountNumber}</td>
                      <td>{bookingdata.User.email}</td>
                    <td>{bookingdata.bookingId}</td>
                    
                    <td>{bookingdata.plan}</td>

                    <td>
                      {moment(bookingdata.startFrom).format("MM-DD-YYYY")}
                    </td>
                    <td>{moment(bookingdata.endTo).format("MM-DD-YYYY")}</td>
                    <td>
                      <div
                        className={
                          bookingdata.day_left < 7 &&
                          "pt-1 pb-1 text-white mx-3 shadow-sm rounded bg-danger"
                        }
                      >
                        {bookingdata.day_left}
                      </div>
                    </td>
                    <td>
                      {" "}
                      {bookingdata.slots.wing.wingName} [{bookingdata.slots.id}]
                    </td>
                    <td>{bookingdata.charge}</td>
                  </tr>
                )}
              </>
            );
          })}
      </>
    );
  }

  function Set_booking_id(val) {
    const value = data.filter((element) => element.bookingId == val);
    if (value) {
      setRemove_booking(value[0].id);
    }
  }

  function Set_Preview(val) {
    const value = data.filter((element) => element.bookingId == val);
    setPreview(value[0]);
    console.log(val);
  }

  

  return (
    <>
      <Helmet>
        <title>Munidex Parking - Booking Report</title>
      </Helmet>
      {/* <Loader></Loader> */}

      {preview && (
        <div className="overlay1">
          <div className="row">
            <div className="col-6 px-5">
              <Bookinginvoice
                bookingData={preview}
                ClosePreview={ClosePreview}
              />
            </div>

            <div className="col-6">
              <div className="p-3 ">
                <div
                  className=""
                  style={{ marginTop: mailStatus ? "36.5vh" : "84vh" }}
                >
                  {mailStatus && (
                    <div className="">
                      <div className="h2 text-center">
                        {mailStatus.status == "Sending" && (
                          <div className="text-center mb-2">
                            <div
                              className="spinner-grow mx-1 text-primary"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                            <div
                              className="spinner-grow mx-1 text-secondary"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                            <div
                              className="spinner-grow mx-1 text-success"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                            <div
                              className="spinner-grow mx-1 text-danger"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                            <div
                              className="spinner-grow mx-1 text-warning"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                            <div
                              className="spinner-grow mx-1 text-info"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                            <div
                              className="spinner-grow mx-1 text-light"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                            <div
                              className="spinner-grow mx-1 text-dark"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                          </div>
                        )}
                        {mailStatus.status} !!{" "}
                      </div>
                      <div className="h2 mt-3 text-center">
                        To : {mailStatus.to}{" "}
                      </div>
                    </div>
                  )}
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
          {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Remove Booking
                </h5>
                <button
                  type="button"
                  onClick={() => setRemove_booking(false)}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Are your sure?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => Removebooking(remove_booking)}
                  className="btn btn-light"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => setRemove_booking(false)}
                  className="btn btn-danger"
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

      {!payment_graph&& <Loader></Loader>}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: [0.5, 1], y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-grow-1"
      >
        {" "}
        <div className="booking_report_title ">Report </div>
        <div className="booking_report_container_whole">
          <div className="">
            <div className="row mt-5">
              {display != "booking_status" && (
                <>
                  <div className="col-3  ">
                    <div className="text-center">
                      <DateRangePicker onCallback={handleCallback}>
                        {display != "booking_status" && (
                          <div
                            className="text-center"
                            style={{ marginTop: "10px" }}
                          >
                            <div className="btn-sm btn btn-outline-primary">
                              {moment(date && date.start).format(
                                "dd, MMM Do YYYY"
                              )}
                              &nbsp; -- &nbsp;
                              {moment(date && date.end).format(
                                "dd, MMM Do YYYY"
                              )}
                            </div>
                          </div>
                        )}
                      </DateRangePicker>
                    
                      <div className="booking_form_plan_input_buttons mt-4  ">
                        <div
                          className={
                            timeline == "Daily"
                              ? "booking_form_input_button_daily_selected"
                              : "booking_form_input_button_daily"
                          }
                          onClick={() => (
                            GetPayment("Daily", "", "", 0),
                            settimeline("Daily"),
                            setCountval(0),
                            setexpand(true)
                          )}
                        >
                          {" "}
                          Daily{" "}
                        </div>

                        <div
                          className={
                            timeline == "Weekly"
                              ? "booking_form_input_button_weekly_selected"
                              : "booking_form_input_button_weekly"
                          }
                          onClick={() => (
                            GetPayment("Weekly"),
                            settimeline("Weekly"),
                            setCountval(0)
                          )}
                        >
                          {" "}
                          Weekly{" "}
                        </div>
                        <div
                          className={
                            timeline == "Monthly"
                              ? "booking_form_input_button_monthly_selected"
                              : "booking_form_input_button_monthly"
                          }
                          onClick={() => (
                            GetPayment("Monthly"),
                            settimeline("Monthly"),
                            setCountval(0)
                          )}
                        >
                          {" "}
                          Monthly{" "}
                        </div>
                        {/* <div
                    className={
                      timeline == "Quarterly"
                        ? "booking_form_input_button_quarterly_selected"
                        : "booking_form_input_button_quarterly"
                    }
                    onClick={() =>
                      settimeline({
                        plan: "Quarterly",
                      })
                    }
                  >
                    {" "}
                    Quarterly{" "}
                  </div> */}
                        <div
                          className={
                            timeline == "Yearly"
                              ? "booking_form_input_button_yearly_selected"
                              : "booking_form_input_button_yearly"
                          }
                          onClick={() => (
                            GetPayment("Yearly"),
                            settimeline("Yearly"),
                            setCountval(0)
                          )}
                        >
                          {" "}
                          Yearly{" "}
                        </div>
                      </div>

                      <div className="booking_form_plan_input_buttons mt-2">
                        <div
                          className={"booking_form_input_button_quarterly"}
                          onClick={() => (
                            setCountval(count_val - 1),
                            GetPayment(timeline, 0, 0, count_val - 1)
                          )}
                        >
                          {" "}
                          Previous{" "}
                        </div>
                        <div
                          className={"booking_form_input_button_quarterly"}
                          onClick={() => (
                            setCountval(count_val + 1),
                            GetPayment(timeline, 0, 0, count_val + 1)
                          )}
                        >
                          {" "}
                          Next{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className={display != "booking_status" ? "col-9" : "col-12"}>
                <div className="booking_report_topdisplay">
                  <div
                    onClick={() => setdisplay("booking_status")}
                    className={
                      display == "booking_status"
                        ? "booking_report_slot_number_card_selected"
                        : "booking_report_slot_number_card"
                    }
                  >
                    <div className="booking_report_slot_number_text">
                      {" "}
                      {slotdata && slotdata.total}
                    </div>
                    <div className="booking_report_bottom_flex">
                      {" "}
                      <span className="booking_report_bottom_flex_number">
                        {" "}
                        Total No of Slot
                      </span>{" "}
                      <span>
                        {" "}
                        <img src={Numberofslots} alt="Number of slots" />{" "}
                      </span>{" "}
                    </div>
                  </div>
                  <div
                    onClick={() => setdisplay("booking_status")}
                    className={
                      display == "booking_status"
                        ? "booking_report_slot_number_card_selected"
                        : "booking_report_slot_number_card"
                    }
                  >
                    <div className="booking_report_slot_number_text">
                      {" "}
                      {slotdata && slotdata.reserved}
                    </div>
                    <div className="booking_report_bottom_flex">
                      {" "}
                      <span className="booking_report_bottom_flex_number">
                        Reserved Slot
                      </span>{" "}
                      <span>
                        {" "}
                        <img src={Reservedslot} alt="Reserved slot" />{" "}
                      </span>{" "}
                    </div>
                  </div>
                  <div
                    onClick={() => setdisplay("booking_status")}
                    className={
                      display == "booking_status"
                        ? "booking_report_slot_number_card_selected"
                        : "booking_report_slot_number_card"
                    }
                  >
                    <div className="booking_report_slot_number_text">
                      {" "}
                      {slotdata && slotdata.unreserved}
                    </div>
                    <div className="booking_report_bottom_flex">
                      {" "}
                      <span className="booking_report_bottom_flex_number">
                        {" "}
                        Unreserved slot
                      </span>{" "}
                      <span>
                        {" "}
                        <img src={Unreservedslot} alt="Unreserved slot" />{" "}
                      </span>{" "}
                    </div>
                  </div>
                  <div
                    onClick={() => setdisplay("booking_report")}
                    className={
                      display == "booking_report"
                        ? "booking_report_slot_number_card_selected"
                        : "booking_report_slot_number_card"
                    }
                  >
                    <div className="booking_report_slot_number_text">
                      {" "}
                      {slotdata && formatUsd(parseInt(slotdata.amount))}{" "}
                    </div>
                    <div className="booking_report_bottom_flex">
                      {" "}
                      <span className="booking_report_bottom_flex_number">
                        {" "}
                        Booking Amount
                      </span>{" "}
                      <span>
                        {" "}
                        <img src={Amount} alt="Amount" />{" "}
                      </span>{" "}
                    </div>
                  </div>

                  <div
                    onClick={() => setdisplay("payment_report")}
                    className={
                      display == "payment_report"
                        ? "booking_report_slot_number_card_selected"
                        : "booking_report_slot_number_card"
                    }
                  >
                    <div className="booking_report_slot_number_text">
                      {" "}
                      {slotdata &&
                        payment_values &&
                        formatUsd(parseInt(payment_values.amount))}{" "}
                    </div>
                    <div className="booking_report_bottom_flex">
                      {" "}
                      <span className="booking_report_bottom_flex_number">
                        {" "}
                        Payment Received
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

            {display != "payment_report" && (
              <>
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
                              className={
                                selected_wing &&
                                selected_wing.wingName == wing.wingName
                                  ? "booking_report_wing_button_selected"
                                  : "booking_report_wing_button"
                              }
                              onClick={() => (
                                setSelected_wing(wing), 
                                bookingPayment(wing),
                                SlotGraph(
                                  wing,
                                  booking_validity.booking,
                                  booking_validity.start,
                                  booking_validity.end,
                                  true
                                )
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
                      bookingPayment(),
                      setSlotgraph(),
                      setSelected_wing(),
                      setWing_result(),
                      SelectAll()
                    )}
                    className="booking_report_wingsubmit"
                  >
                    {" "}
                    Select All
                  </span>
                </div>
              </>
            )}

            {display == "booking_report" && (
              <div className="row">
                <div className={"col-12 mb-3"}>
                  <Table
                    headers={[
                      { label: "S.No", key: "data1" },
                      { label: "Name", key: "data2" },
                      { label: "Mail", key: "data3" },
                      { label: "UserId", key: "data4" },
                      { label: "Plan", key: "data5" },
                      { label: "BookingId", key: "data6" },
                      { label: "From", key: "data7" },
                      { label: "To", key: "data8" },
                      { label: "Slot", key: "data9" },
                      { label: "Amount", key: "data10" },
                    ]}
                    data={Table_data(
                      !selected_wing ? data : wing_results,
                      "data"
                    )}
                    table_data={table_data[2]}
                    controls={true}
                    link={true}
                    // linkvalue
                    mail={Set_Preview}
                    remove={Set_booking_id}
                  ></Table>

                  {/* <div className="booking_report_table_container">
                    <table className="booking_report_table">
                      <tr className="booking_report_table_headers">
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Plan</th>
                        {expand && (
                          <>
                            <th>From</th>
                            <th>To</th>
                          </>
                        )}
                        <th>Slot</th>
                        <th>Amount</th>

                        <th onClick={() => setexpand(!expand)}>
                          {expand ? "Scale Down" : "Expand"}
                        </th>
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
                              {expand && (
                                <>
                                  <td>
                                    {moment(bookingdata.startFrom).format(
                                      "MM-DD-YYYY"
                                    )}
                                  </td>
                                  <td>
                                    {moment(bookingdata.endTo).format(
                                      "MM-DD-YYYY"
                                    )}
                                  </td>
                                </>
                              )}
                              <td>
                                {bookingdata.slots.wing.wingName} [
                                {bookingdata.slots.id}]
                              </td>
                              <td>
                                {bookingdata.charge &&
                                  formatUsd(parseInt(bookingdata.charge))}
                              </td>

                              <td>
                                <IoTrashOutline
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setRemove_booking(bookingdata.id)
                                  }
                                />
                                <img
                                  style={{ cursor: "pointer" }}
                                  src={send}
                                  className="px-1"
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
                              {expand && (
                                <>
                                  <td>
                                    {moment(bookingdata.startFrom).format(
                                      "MM-DD-YYYY"
                                    )}
                                  </td>
                                  <td>
                                    {moment(bookingdata.endTo).format(
                                      "MM-DD-YYYY"
                                    )}
                                  </td>
                                </>
                              )}
                              <td>
                                {bookingdata.slots.wing.wingName} [
                                {bookingdata.slots.id}]
                              </td>{" "}
                              <td>
                                {bookingdata.charge &&
                                  formatUsd(parseInt(bookingdata.charge))}{" "}
                              </td>
                              <td>
                                <IoTrashOutline
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setRemove_booking(bookingdata.id)
                                  }
                                />
                                <img
                                  style={{ cursor: "pointer" }}
                                  src={send}
                                  className="px-1"
                                  onClick={() => setPreview(bookingdata)}
                                />
                              </td>
                            </tr>
                          );
                        })}


                    </table>
                  </div> */}
                </div>

                {timeline != "Daily" && (
                  <>
                    {!expand && (
                      <>
                        <div className="col-6">
                          <Table
                            headers={[
                              { label: "S.No", key: "data1" },
                              { label: "Date", key: "data2" },
                              { label: "No of Booking", key: "data3" },
                              { label: "Amount", key: "data4" },
                            ]}
                            data={Table_data(Daily_booking, "Daily_booking")}
                            table_data={table_data[2]}
                          ></Table>

                          {/* <div className="booking_report_table_container_mini">
                            <table className="booking_report_table">
                              <tr className="booking_report_table_headers">
                                <th>S.No</th>
                                <th>Date</th>
                                <th>No</th>
                                <th>Amount</th>
                              </tr>
                              {Daily_booking &&
                                Daily_booking.map((bookingdata, id) => {
                                  return (
                                    <tr
                                      key={id}
                                      className="booking_report_table_data"
                                    >
                                      <td>{id + 1}</td>
                                      <td>
                                        {moment(bookingdata.date).format(
                                          "MM-DD-YYYY"
                                        )}
                                      </td>
                                      <td>{bookingdata.no_of_booking}</td>
                                      <td>
                                        {bookingdata.total_amount_booking}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </table>
                          </div> */}
                        </div>
                      </>
                    )}

                    {booking_graph && (
                      <div className="col-6 mt-4 mb-5">
                        <div className="p-4 shadow rounded">
                          <Line data={booking_graph} options={options1}></Line>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="row mx-2 mb-3">
            {display == "payment_report" && (
              <>
                {timeline != "Daily" && (
                  <>
                    <div className="col-6 p-3">
                      {/* <table className="booking_report_table">
                          <tr className="booking_report_table_headers">
                            <th>S.No</th>
                            <th>Date</th>
                            <th>No</th>
                            <th>Amount</th>
                          </tr>
                          {Daily_payment &&
                            Daily_payment.map((bookingdata, id) => {
                              return (
                                <tr
                                  key={id}
                                  className="booking_report_table_data"
                                >
                                  <td>{id + 1}</td>
                                  <td>
                                    {moment(bookingdata.date).format(
                                      "MM-DD-YYYY"
                                    )}
                                  </td>
                                  <td>{bookingdata.no_of_pay}</td>
                                  <td>{bookingdata.tot_amount}</td>
                                </tr>
                              );
                            })}
                        </table> */}
                      {Daily_payment && table_data && (
                        <Table
                          headers={[
                            { label: "S.No", key: "data1" },
                            { label: "Date", key: "data2" },
                            { label: "No of Payment", key: "data3" },
                            { label: "Amount", key: "data4" },
                          ]}
                          data={Table_data(Daily_payment, "Daily_payment")}
                          table_data={table_data[0]}
                        ></Table>
                      )}
                    </div>

                    {payment_graph && (
                      <div className="col-6 mt-5">
                        <div className="p-4 shadow rounded">
                          <Line data={payment_graph} options={options1}></Line>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="col-2 p-3 ">
                  <div className="h4 p-2 mt-3 shadow bg-primary rounded">
                    <div className="h5 text-white">Cash</div>
                   <span className='text-white'> {payment_values && formatUsd(parseInt(payment_values.cash))}</span>
                  </div>
                  <br></br>
                  <div className="h4 p-2 shadow rounded">
                    <div className="h5">Card</div>
                    {payment_values && formatUsd(parseInt(payment_values.card))}
                  </div>
                  <br></br>
                  <div className="h4 p-2 bg-primary shadow rounded">
                    <div className="h5 text-white">Online</div>
                    <span className='text-white'> {payment_values &&
                      formatUsd(parseInt(payment_values.online))}</span>
                  </div>
                  <br></br>
                  <div className="h4 p-2 shadow rounded">
                    <div className="h5">Check</div>
                    {payment_values &&
                      formatUsd(parseInt(payment_values.check))}
                  </div>
                  <br></br>
                </div>
                <div className="col-4 text-center" >
                <div className="d-flex justify-content-center">
                    <div style={{width:'350px' ,marginTop:'70px'}}>
                  {paymentType_graph && <Doughnut data={paymentType_graph} />}</div>
                </div>
                </div>

                <div className="col-6 mt-5">
                  {payment && (
                    <Table
                      headers={[
                        { label: "User", key: "data1" },
                        { label: "Date", key: "data2" },
                        { label: "Mail", key: "data3" },
                        { label: "UserId", key: "data4" },
                        { label: "Payment type", key: "data5" },
                        { label: "Amount", key: "data6" },
                      ]}
                      data={Table_data(payment, "payment")}
                      table_data={table_data[1]}
                    ></Table>
                  )}
                </div>
              </>
            )}

            {display == "booking_status" && (
              <>
                <div className="col-6 mb-4">
                  <div className="p-2 shadow rounded">
                    {/* {maingraph && !slotgrap && (
                      <Bar data={maingraph} options={options}></Bar>
                    )} */}
                    {maingraph && slotgrap && (
                      <Line data={slotgrap} options={slotgrap_option}></Line>
                    )}
                  </div>
                </div>

                <div className="col-6 mb-4">
                  <div className="p-2 shadow rounded">
                    <Bar data={maingraph} options={options}></Bar>
                  </div>
                </div>

                <div className="col-12 p-3 ">
                  {booking_validity && (
                        <Table
                          headers={[
                            { label: "S.No", key: "data1" },
                            { label: "Name", key: "data2" },
                            { label: "UserId", key: "data3" },
                            { label: "Mail", key: "data4" },
                            { label: "Booking Id", key: "data5" },
                            { label: "Plan", key: "data6" },
                            { label: "From", key: "data7" },
                            { label: "To", key: "data8" },
                            { label: "Days left", key: "data9" },
                            { label: "Slot", key: "data10" },
                            { label: "Amount", key: "data11" },
                          ]}
                          data={Table_data(booking_validity, "booking_validity")}
                          table_data={table_data[3]}
                        ></Table>
                      )}
                  {/* <div className="booking_report_table_container">
                    <table className="booking_report_table">
                      <tr className="booking_report_table_headers">
                        <th>S.No</th>
                        <th>Name</th>
                        <th>UserId</th>
                        <th>Mail</th>
                        <th>Booking Id</th>
                        <th>Plan</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Days left</th>
                        <th>Slot</th>
                        <th>Amount</th>
                      </tr>
                      {booking_validity && !selected_wing
                        ? Booking_validity_function(booking_validity)
                        : Booking_validity_function(
                            booking_validity,
                            selected_wing.wingName
                          )}
                    </table>
                  </div> */}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
