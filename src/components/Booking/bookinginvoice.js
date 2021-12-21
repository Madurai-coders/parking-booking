import React, { useState } from "react";
import "../../assets/css/Booking/bookinginvoice.css";

export default function Bookinginvoice(props) {

    const[bookingdata, setBookingdata] = useState([{name:"Williamson",bid: 6475764, plan: "Weekly" , wing:"A" , slot: "A" , amount:"$600.00"}]);

  return (
    <>
      <div className="bookinginvoice_container flex-grow-1">
        <div className="bookinginvoice_topsection row">
          <div className="col-9"></div>
          <div className="col-3">
          <div className="bookinginvoice_text_binv mb-3">Booking Invoice</div>
          <div className="bookinginvoice_text_invno mb-2">Invoice no: 7383837</div>
          <div className="bookinginvoice_text_invdate">Invoice Date: 20/11/21</div>
          </div>  
        </div>
        <div className="bookinginvoicebody">
            <div>
          <div className="bookinginvoice_text_billto mt-4 mb-2">Bill To</div>
          <div className="bookinginvoice_text_address mb-4">Santy cool</div>
        <table className="bookinginvoice_table">
          <tr className="bookinginvoice_table_headers">
            <th>Name</th>
            <th>Booking Id</th>
            <th>Plan</th>
            <th>Wing</th>
            <th>Slot</th>
            <th>Amount</th>
          </tr>
            {bookingdata.map((bdata)=>{
               return(
                <tr className="bookinginvoice_table_body">
               <td>{bdata.name}</td>
               <td>{bdata.bid}</td>
               <td>{bdata.plan}</td>
               <td>{bdata.wing}</td>
               <td>{bdata.slot}</td>
               <td>{bdata.amount}</td>
               </tr>
               );
            })}
        </table>
        <div className="bookinginvoice_total">{bookingdata[0].amount}</div>
        </div>
        <div>
        <div className="row">
         <div className="col-6">
        <div className="bookinginvoice_text_pdetails pt-1 pb-1 ps-1 mb-2"> Payment Details </div>
        <div className="bookinginvoice_lorem mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare placerat condimente.</div>
        <div className="bookinginvoice_dop mb-2"> Date of Payment: <span className="bookinginvoice_dop_value">10/10/2021 </span></div>
        <div className="bookinginvoice_dop"> Payment Type: <span className="bookinginvoice_dop_value">Upi </span></div>
         </div>
         <div className="col-1"></div>
         <div className="col-5">
          <div className="bookinginvoice_text_bdate pt-1 pb-1 ps-1 mb-2"> Booking Date </div>
          <div className="row">
           <div className="col-6 bookinginvoice_dop"> From: <span className="bookinginvoice_dop_value">15/10/2021 </span></div>
           <div className="col-6 bookinginvoice_dop"> To: <span className="bookinginvoice_dop_value">20/10/2021 </span></div>
          </div>
         </div>
        </div>
        <div className="row bookinginvoice_bottom p-2"> <div className="col-1 bookinginvoice_bottomtext_terms"> Terms: </div> <div className="col-11 bookinginvoice_bottom_terms">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare placerat condimentum venenatis diam ipsum urna, arcu nibh elit.</div> </div>
        </div>
        </div>
      </div>
    </>
  );
}
