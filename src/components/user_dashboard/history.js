import React, { useState, useEffect,useMemo } from "react";
import moment from "moment";

export default function History({booking_partner,payment_partner}) {
    const [table, setTable] = useState({
        bookingdetails: true,
        transactionhistory: false,
      });

      function toggleTable(val) {
        setTable({
          bookingdetails: false,
          transactionhistory: false,
          [val]: true,
        });
      }


      function Dayleft(endTo) {
        var b = moment(endTo, "YYYY-MM-DD");
        var a = moment(new Date(), "YYYY-MM-DD");
        var day = b.diff(a, "days");
        if (day==0){return(1)}
        return day;
      }
    


    return(
        <>
 <div className="row user_dashboard_bookingdetails_heading mt-5 ps-2 pe-2">
 {" "}
 <div
   className="col-6 user_dashboard_bookingdetails_heading_bd p-4"
   onClick={() => toggleTable("bookingdetails")}
   style={{
     cursor:'pointer',
     backgroundColor: table.bookingdetails
       ? "#f0f8ff"
       : "#fff",
   }}
 >
   {" "}
   Booking Details{" "}
 </div>
 <div
   className="col-6 user_dashboard_bookingdetails_heading_th p-4"
   onClick={() => toggleTable("transactionhistory")}
   style={{
       cursor:'pointer',
     backgroundColor: table.transactionhistory
       ? "#f0f8ff"
       : "#fff",
   }}
 >
   {" "}
   Transaction History
 </div>
</div>



{table.bookingdetails && (
    <div className="user_dashboard_booking_details_card pb-5 ">
      <table className="user_dashboard_booking_details_table">
        <tr className="user_dashboard_booking_details_table_heading">
          <th>Wing</th>
          <th>Start date</th>
          <th>End date</th>
          <th>Plan</th>
          <th>Amount</th>
          <th>Active for</th>
        </tr>
        {booking_partner &&
          booking_partner.map((userdata) => {
            return (
              <tr className="user_dashboard_booking_details_table_data">
                {/* <td>{userdata.Slots.wing.wingName}+[{userdata.slotid}]</td> */}
                <td>{userdata.slots.wing.wingName}</td>
                <td>
                  {moment(userdata.startFrom).format(
                    "DD-MM-YYYY"
                  )}
                </td>
                <td>
                  {moment(userdata.endTo).format(
                    "DD-MM-YYYY"
                  )}
                </td>
                <td>{userdata.plan}</td>
                <td>{userdata.charge}$</td>
                <td>
                  {Dayleft(userdata.endTo) > 0
                    ? Dayleft(userdata.endTo)
                    : 0}{" "}
                  days
                  <span
                    className={
                      "mx-1 user_dashboard_active_" +
                      (Dayleft(userdata.endTo) > 0
                        ? "green"
                        : "red")
                    }
                  ></span>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  )}

{table.transactionhistory && (
    <div className="user_dashboard_booking_details_card pb-5">
      <table className="user_dashboard_booking_details_table">
        <tr className="user_dashboard_booking_details_table_heading">
          <th>Transaction id</th>
          <th>Date</th>
          <th>Payment</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
        {payment_partner.map((transaction) => {
          return (
            <tr className="user_dashboard_booking_details_table_data">
              <td>{transaction.paymentId}</td>
              <td>
                {moment(transaction.paymentDate).format(
                  "DD-MM-YYYY"
                )}
              </td>
              <td>{transaction.paymentType}</td>
              <td>{transaction.amount}</td>

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
  )}
  </>)
    }
    