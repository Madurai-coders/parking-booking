import React,{useState} from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/payment.css";
import { AiOutlinePrinter } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

export default function Payment() {
  const [payment, setPayment] = useState([
    {
      name: "Jane Cooper",
      uid: 22739,
      ptype: "Credit card",
      pid: 77301740,
      Datime: "07/10/21 10:22pm"
    },
    {
    name: "Wade Warren",
    uid: 43178,
    ptype: "Checks",
    pid: 38731379,
    Datime: "05/21/21 9:00pm"
  },
  {
    name: "Jane Cooper",
    uid: 22739,
    ptype: "Credit card",
    pid: 77301740,
    Datime: "07/10/21 10:22pm"
  },
  {
  name: "Wade Warren",
  uid: 43178,
  ptype: "Checks",
  pid: 38731379,
  Datime: "05/21/21 9:00pm"
},
{
  name: "Jane Cooper",
  uid: 22739,
  ptype: "Credit card",
  pid: 77301740,
  Datime: "07/10/21 10:22pm"
},
{
name: "Wade Warren",
uid: 43178,
ptype: "Checks",
pid: 38731379,
Datime: "05/21/21 9:00pm"
},
{
  name: "Jane Cooper",
  uid: 22739,
  ptype: "Credit card",
  pid: 77301740,
  Datime: "07/10/21 10:22pm"
},
{
name: "Wade Warren",
uid: 43178,
ptype: "Checks",
pid: 38731379,
Datime: "05/21/21 9:00pm"
},
{
  name: "Jane Cooper",
  uid: 22739,
  ptype: "Credit card",
  pid: 77301740,
  Datime: "07/10/21 10:22pm"
},
{
  name: "Jane Cooper",
  uid: 22739,
  ptype: "Credit card",
  pid: 77301740,
  Datime: "07/10/21 10:22pm"
},
{
name: "Wade Warren",
uid: 43178,
ptype: "Checks",
pid: 38731379,
Datime: "05/21/21 9:00pm"
},
{
name: "Jane Cooper",
uid: 22739,
ptype: "Credit card",
pid: 77301740,
Datime: "07/10/21 10:22pm"
},
{
name: "Wade Warren",
uid: 43178,
ptype: "Checks",
pid: 38731379,
Datime: "05/21/21 9:00pm"
},
{
name: "Jane Cooper",
uid: 22739,
ptype: "Credit card",
pid: 77301740,
Datime: "07/10/21 10:22pm"
},
{
name: "Wade Warren",
uid: 43178,
ptype: "Checks",
pid: 38731379,
Datime: "05/21/21 9:00pm"
},
{
name: "Jane Cooper",
uid: 22739,
ptype: "Credit card",
pid: 77301740,
Datime: "07/10/21 10:22pm"
},
{
  name: "Wade Warren",
  uid: 43178,
  ptype: "Checks",
  pid: 38731379,
  Datime: "05/21/21 9:00pm"
  }
  ]);

  return (
    <>
      <Helmet>
         <title>Munidex Parking - Payments </title>
      </Helmet>
      <div className="flex-grow-1">
        <div className="payment_container">
          <div className="payment_text_booking_report"> Payment Report</div>
          <div className="payment_enty_container">
            <div className="payment_entry_fields">
              <div className="payment_label_container">
                <label for="pname" className="plabel">
                  Name
                </label>
                <input
                  type="text"
                  name="payment_name"
                  className="payment_name"
                  id="pname"
                />
              </div>
              <div className="payment_label_container">
                <label for="pemail" className="plabel">
                  Email
                </label>
                <input
                  type="text"
                  name="payment_email"
                  className="payment_email"
                  id="pemail"
                />
              </div>
              <div className="payment_label_container">
                <label for="ptype" className="plabel">
                  Payment type
                </label>
                <input
                  type="text"
                  name="payment_ptype"
                  className="payment_ptype"
                  id="ptype"
                />
              </div>
              <div className="payment_label_container">
                <label for="pid" className="plabel">
                  {" "}
                  Payment id
                </label>
                <input
                  type="text"
                  name="payment_pid"
                  className="payment_pid"
                  id="pid"
                />
              </div>
              <div className="payment_label_container">
                <label for="pdate" className="plabel">
                  {" "}
                  Date{" "}
                </label>
                <input
                  type="text"
                  name="payment_date"
                  className="payment_date"
                  id="pdate"
                />
              </div>
              <div className="payment_label_container">
                <label for="pamount" className="plabel">
                  {" "}
                  Amount{" "}
                </label>
                <input
                  type="text"
                  name="payment_amount"
                  className="payment_amount"
                  id="pamount"
                />
              </div>
            </div>
            <div className="payment_submit_reset_container">
              <div className="payment_submit_button"> Submit </div>
              <div className="payment_reset_button"> Reset </div>
            </div>
          </div>
          <div className="payment_table_container">
            <table className="payment_table">
              <tr className="payment_table_heading">
                <th>Name</th>
                <th>User id</th>
                <th>Payment type</th>
                <th>Payment id</th>
                <th>Date/Time</th>
                <th>Controls</th>
              </tr>
              {payment.map((payment)=>{
                return(
                  <tr className="payment_table_content">
                    <td>{payment.name}</td>
                    <td>{payment.uid}</td>
                    <td>{payment.ptype}</td>
                    <td>{payment.pid}</td>
                    <td>{payment.Datime}</td>
                    <td><div className="payment_table_controls_container"><span className="payment_table_button_book">Book</span><AiOutlinePrinter size={16} style={{color:"#898989"}}/><FaRegEdit size={14} style={{color:"#898989"}}/><HiOutlineTrash size={16} style={{color:"#898989"}}/></div></td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
