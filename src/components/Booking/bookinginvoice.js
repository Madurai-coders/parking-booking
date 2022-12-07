import React, { useState } from "react";
import "../../assets/css/Booking/bookinginvoice.css";
import moment from "moment";
export default function Bookinginvoice(props) {
  return (
    <>
      <div
        onClick={props.ClosePreview}
        className="bookinginvoice_container flex-grow-1 px-3 pt-1 mb-3 mt-5 bg-white shadow"
      >
        <div className="bookinginvoice_topsection row">
          <div className="col-8"></div>
          <div className="col-4">
            <div className="bookinginvoice_text_binv mb-3">Booking Invoice</div>
            <div className="bookinginvoice_text_invno mb-1">
              Invoice no: {props.bookingData.id}
            </div>
            <div className="bookinginvoice_text_invdate">
              Invoice Date:
              {moment(props.bookingData.date).format("MM/DD/YYYY")}
            </div>
          </div>
        </div>
        <div className="bookinginvoicebody">
          <div>
            <div className="bookinginvoice_text_billto mt-4 mb-2">
              Bill To :
            </div>
            <div className="bookinginvoice_text_address mb-4 px-4">
              {props.bookingData.User.userName}
            </div>
            <table className="bookinginvoice_table">
              <tr className="bookinginvoice_table_headers">
                <th>Name</th>
                <th>Booking Id</th>
                <th>Plan</th>
                <th>Wing</th>
                <th>Slot</th>
                <th>Amount</th>
              </tr>

              <tr className="bookinginvoice_table_body">
                <td>{props.bookingData.User.userName}</td>
                <td>{props.bookingData.bookingId}</td>
                <td>{props.bookingData.plan}</td>
                <td>{props.bookingData.slots.wing.wingName}</td>
                <td>{props.bookingData.slot_connect}</td>
                <td>{props.bookingData.charge}</td>
              </tr>
            </table>
            <div className="bookinginvoice_total">
              {props.bookingData.charge}$
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
              <div className="col-6 pb-5">
                <div className="bookinginvoice_text_bdate pt-1 pb-1 ps-1 mb-2">
                  {" "}
                  Booking Date{" "}
                </div>
                <div className="row">
                  <div className="col-6 bookinginvoice_dop">
                    {" "}
                    From:{" "}
                    <span className="bookinginvoice_dop_value">
                      {moment(props.bookingData.startFrom).format("MM/DD/YYYY")}
                    </span>
                  </div>
                  <div className="col-6 bookinginvoice_dop">
                    {" "}
                    To:{" "}
                    <span className="bookinginvoice_dop_value">
                    {moment(props.bookingData.endTo).format("MM/DD/YYYY")}
                    </span>
                  </div>
                </div>
              </div>
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
