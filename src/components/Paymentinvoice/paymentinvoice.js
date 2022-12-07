import React, { useState } from "react";
import "../../assets/css/Booking/bookinginvoice.css";
import moment from "moment";

export default function Bookinginvoice(props) {
  return (
    <>
      <div
        onClick={props.Close_payment_invoice}
        className="bookinginvoice_container flex-grow-1 px-3 pt-1 mb-3 shadow bg-white"
      >
        <div className="bookinginvoice_topsection row">
          <div className="col-8"></div>
          <div className="col-4">
            <div className="bookinginvoice_text_binv mb-3">
              Parking Payment Invoice
            </div>

            <div className="bookinginvoice_text_invdate">
              Invoice Date:{" "}
              {moment(props.paymentData.paymentDate).format("MM/DD/YYYY")}
            </div>
          </div>
        </div>
        <div className="bookinginvoicebody">
          <div>
            <div className="bookinginvoice_text_billto mt-4 mb-2">
              Bill To :
            </div>
            <div className="bookinginvoice_text_address mb-4 px-4">
              {props.paymentData.User.userName}
            </div>
            <table className="bookinginvoice_table">
              <tr className="bookinginvoice_table_headers">
                <th>Name</th>
                <th>Account Number</th>
                <th>Transaction Id</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>

              <tr className="bookinginvoice_table_body">
                <td>{props.paymentData.User.userName}</td>
                <td>{props.paymentData.User.accountNumber}</td>
                <td>{props.paymentData.paymentId}</td>
                <td>
                  {moment(props.paymentData.paymentDate).format("MM/DD/YYYY")}
                </td>
                <td>{props.paymentData.amount} $</td>
              </tr>
            </table>
            <div className="bookinginvoice_total">
              {props.paymentData.amount}$
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-6">
                {/* <div className="bookinginvoice_text_pdetails pt-1 pb-1 ps-1 mb-2"> Payment Details </div>
        <div className="bookinginvoice_lorem mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare placerat condimente.</div>
        <div className="bookinginvoice_dop mb-2"> Date of Payment: <span className="bookinginvoice_dop_value">10/10/2021 </span></div>
        <div className="bookinginvoice_dop"> Payment Type: <span className="bookinginvoice_dop_value">Upi </span></div> */}
              </div>
              {/* <div className="col-6 pb-5">
                <div className="bookinginvoice_text_bdate pt-1 pb-1 ps-1 mb-2">
                  {" "}
                  Booking Date{" "}
                </div>
                <div className="row">
                  <div className="col-6 bookinginvoice_dop">
                    {" "}
                    From:{" "}
                    <span className="bookinginvoice_dop_value">
                      {props.bookingData.startFrom}{" "}
                    </span>
                  </div>
                  <div className="col-6 bookinginvoice_dop">
                    {" "}
                    To:{" "}
                    <span className="bookinginvoice_dop_value">
                      {props.bookingData.endTo}
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="row bookinginvoice_bottom p-2 mb-1">
              {" "}
              <div className="col-1 bookinginvoice_bottomtext_terms">
                {" "}
                Terms:{" "}
              </div>{" "}
              <div className="col-11 bookinginvoice_bottom_terms">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare
                placerat condimentum venenatis diam ipsum urna, arcu nibh elit.
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
