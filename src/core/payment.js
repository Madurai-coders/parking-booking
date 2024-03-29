import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/admin_dashboard/payment.css";
import { AiOutlinePrinter } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import {
  validation_mobile_number,
  validation_email,
  validation_name,
  validation_payment_id,
  validation_amount,
  axios_call,
  axios_call_auto,
  generateUUID,
  formatUsd,
} from "../functions/reusable_functions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import send from "../assets/images/send.svg";
import Payment_invoice from "../components/Paymentinvoice/paymentinvoice";
import { db, firebase } from "../core/firebase/firebase";
import axios from "axios";

export default function Payment() {
  const [payment, setPayment] = useState();
  const [payment_initiated, setPayment_initiated] = useState();
  const [payment_invoice, setPayment_invoice] = useState();
  const [remove_payment, setRemove_payment] = useState();
  const [mailStatus, setMailStatus] = useState();
  const [edit, setedit] = useState(false);
  let history = useHistory();
  const [form, setForm] = useState({
    name: "not_selected",
    email: "not_selected",
    payment_type: "not_selected",
    payment_id: "not_selected",
    date: new Date(),
    amount: "not_selected",
  });

  const [data_fail, setData_fail] = useState(false);
  const [usr_suggestion, set_usr_suggestion] = useState([]);

  function form_validate() {
    let val = false;
    var value = { ...form };
    if (
      validation_name(form.name).class == "pass" &&
      validation_email(form.email).class == "pass" &&
      validation_name(form.payment_type).class == "pass" &&
      validation_payment_id(form.payment_id).class == "pass" &&
      validation_amount(form.amount).class == "pass"
    ) {
      val = true;
    } else {
      if (form.name == "not_selected") {
        value = { ...value, name: "" };
      }
      if (form.email == "not_selected") {
        value = { ...value, email: "" };
      }
      if (form.payment_type == "not_selected") {
        value = { ...value, payment_type: "" };
      }
      if (form.payment_id == "not_selected") {
        value = { ...value, payment_id: "" };
      }

      // if (form.date == "not_selected") {
      //     value = { ...value, date: "" }
      // }

      if (form.amount == "not_selected") {
        value = { ...value, amount: "" };
      }
    }
    setForm(value);
    return val;
  }

  const checkuser = async (val) => {
    if (validation_name(val).class === "pass") {
      axios_call("GET", "Check_BusinessPartner?search=" + val).then(
        (response) => {
          set_usr_suggestion(response);
          //console.log(response);
        }
      );
    }
  };

 function call_email_entry(){
    if(usr_suggestion[0]){
    usr_suggestion.forEach((element) => {
        if (form.name == element.userName) {
          setForm({ ...form, email: element.email });
        } 
      })}
  }

  function removePayment(id) {
    axios_call("DELETE", "CreatePayment/" + id + "/", "").then((response) => {
      setRemove_payment(false);
    });
    var values_result = payment.filter((item) => item.id !== id);
    setPayment(values_result);
    setedit(false);
  }

  function call_edit(val) {
    //console.log(val);
    //console.log(val.paymentId);
    setedit(true);
    setForm({
      name: val.User.userName,
      email: val.User.email,
      payment_type: val.paymentType,
      payment_id: val.paymentId,
      date: moment(val.paymentDate).toDate(),
      amount: val.amount,
      id: val.id,
      userId: val.userId,
      Status: val.Status,
      key: val.key,
    });
  }

  const call_edit_update = async () => {
    const result = await form_validate();
    if (result) {
      var data = {
        userId: form.userId,
        paymentId: form.payment_id,
        paymentType: form.payment_type,
        paymentDate: moment(form.date).toDate(),
        amount: form.amount,
        Status: "success",
        key: form.key,
      };
      axios_call("PUT", "CreatePayment/" + form.id + "/", data).then(
        (response) => {
          axios_call("GET", "GetPayment?search=" + form.name).then(
            (response) => {
              setPayment(response);
            }
          );

          reset();
        }
      );
    }
  };

  const form_submit = async () => {
    const result = await form_validate();
    if (result && !data_fail) {
      if (usr_suggestion[0]) {
        setPayment_initiated(true);
        //console.log("starting existing user");
        if (
          usr_suggestion[0].userName === form.name &&
          usr_suggestion[0].email === form.email
        ) {
          var data = {
            userId: usr_suggestion[0].id,
            paymentId: form.payment_id,
            paymentType: form.payment_type,
            paymentDate: form.date,
            amount: form.amount,
            Status: "success",
            key: generateUUID(),
          };
          //console.log(data);
          axios_call("POST", "CreatePayment/", data).then((response) => {
            axios_call("GET", "GetPayment?search=" + form.name).then(
              (response) => {
                //console.log(response);
                setPayment(response);
                reset();
              }
            );
            //console.log("payment added to existing user");
            setPayment_initiated(false);
          });
        }

        if (
          usr_suggestion[0].userName === form.name &&
          usr_suggestion[0].email === form.email
        ) {
          setData_fail("username dose not match with email provided");
        }
      } else {
        //console.log("initiate newUser");
        setPayment_initiated(true);
        var newbookingpartner = {
          uId: new Date().getUTCMilliseconds(),
          accountNumber: Math.floor(100000 + Math.random() * 9000),
          userName: form.name,
          lastName: form.name,
          email: form.email,
        };

        firebase
          .auth()
          .createUserWithEmailAndPassword(
            newbookingpartner.email,
            newbookingpartner.accountNumber.toString()
          )
          .then((userCredential) => {
            //console.log("initiated firebase");
            //console.log(userCredential);
            axios({
              method: "POST",
              url: "https://parkingdev1.munidex.info/register/",
              data: {
                username: userCredential.user.email,
                password: userCredential.user.uid,
              },
              withCredentials: true,
            }).then((response_one) => {
              //console.log("initiated database");
              //console.log(response_one);

              // Signed in
              //console.log(response_one.data.id)
              axios_call("POST", "CreateBusinessPartner/", {
                ...newbookingpartner,
                accountHolder: response_one.data.id,
              }).then((response) => {
                //console.log("newuser created");
                //console.log(response);

                var data = {
                  userId: response.id,
                  paymentId: form.payment_id,
                  paymentType: form.payment_type,
                  paymentDate: form.date,
                  amount: form.amount,
                  Status: "success",
                  key: generateUUID(),
                };
                // })

                axios_call("POST", "CreatePayment/", data).then((response) => {
                  axios_call("GET", "GetPayment?search=" + form.name).then(
                    (response) => {
                      //console.log(response);
                      setPayment(response);
                      reset();
                    }
                  );
                  //console.log("payment added to created existing user");
                  setPayment_initiated(false);
                });
              });
            });
          })

          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });
      }

      setData_fail(false);
    } else {
      setData_fail("Please check the details you have entered");
    }
  };

  function intiatebooking(data) {
    window.localStorage.setItem("bookingdata", JSON.stringify(data));
    history.push("/admin");
  }

  useEffect(() => {
    if (form.name == "not_selected" || !form.name) {
      axios_call("GET", "CreatePayment/").then((response) => {
        //console.log(response);
        setPayment(response.results);
      });
    } else {
      axios_call("GET", "GetPayment?search=" + form.name).then((response) => {
        setPayment(response);
        //console.log(response);
        //console.log("search");
      });
    }
  }, [form.name]);

  function checkpaymentid() {
    if (form.payment_id) {
      axios_call("GET", "GetPayment?search=" + form.payment_id).then(
        (response) => {
          //console.log(form.payment_id);
          //console.log(response);
          if (response[0]) {
            setData_fail("payment id exist");
          } else {
            setData_fail(false);
          }
        }
      );
    }
  }

  function reset() {
    setForm({
      name: "not_selected",
      email: "not_selected",
      payment_type: "not_selected",
      payment_id: "not_selected",
      date: new Date(),
      amount: "not_selected",
    });
    setData_fail(false);
    setedit(false);
  }

  useEffect(() => {
    if (form.payment_type == "cash") {
      setForm({
        ...form,
        payment_id: generateUUID(),
      });
    }
  }, [form.payment_type]);

  function Close_payment_invoice() {
    setPayment_invoice(false);
    setMailStatus();
  }

  function SendMail() {
    var data = {
      to: payment_invoice.User.email,
      invoiceDate: moment(payment_invoice.paymentDate).format("MM/DD/YYYY"),
      user: payment_invoice.User.userName,
      accountNumber: payment_invoice.User.accountNumber,
      paymentId: payment_invoice.paymentId,
      amount: payment_invoice.amount,
    };
    //console.log(data);
    setMailStatus({
      status: "Sending",
      to: payment_invoice.User.email,
    });

    axios_call("POST", "send_mail/", data).then((response) => {
      //console.log(response);
      setMailStatus({
        status: "Successful",
        to: payment_invoice.User.email,
      });
    });
  }

  return (
    <>
      <Helmet>
         <title>Munidex Parking - Payments </title>
      </Helmet>
      {payment_invoice && (
        <div className="overlay1">
          <div className="row">
            <div className="col-6 px-5">
              <Payment_invoice
                paymentData={payment_invoice}
                Close_payment_invoice={Close_payment_invoice}
              />
            </div>

            <div className="col-6">
              <div className="p-3 ">
                <div
                  className=""
                  style={{ marginTop: mailStatus ? "30vh" : "84vh" }}
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
                    onClick={Close_payment_invoice}
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

      {remove_payment && (
        <div className="overlay">
          {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Remove Payment
                </h5>
                <button
                  type="button"
                  onClick={() => setRemove_payment(false)}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Are your sure?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => removePayment(remove_payment)}
                  className="btn btn-light"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => setRemove_payment(false)}
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

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: [0.5, 1], y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-grow-1"
      >
        <div className="booking_report_title">Payment </div>

        <div className="booking_report_container_whole">
          <div className="payment_container">
            {/* {data_fail && (
            <div className="pr-5 pl-5">
              <div className="alert alert-danger" role="alert">
                {data_fail}
              </div>
            </div>
          )} */}

            <div className="payment_enty_container">
              <div className="payment_entry_fields">
                <div className="payment_label_container">
                  <label for="pname" className="plabel">
                    Name
                  </label>
                  <input
                    autocomplete="off"
                    list="data"
                    onChange={(e) => (
                      checkuser(e.target.value),
                      setForm({ ...form, name: e.target.value })
                    )}
                    onBlur={(e) => setForm({ ...form, name: e.target.value })}
                    type="text"
                    value={form.name != "not_selected" ? form.name : ""}
                    className={
                      "form-control " + validation_name(form.name).class
                    }
                    id="pname"
                  />
                  <datalist id="data">
                    {usr_suggestion.map((item, key) => (
                      <option key={key} value={item.userName} />
                    ))}
                  </datalist>
                  <div style={{ marginTop: "1px", fontSize: "10px" }}>
                    {validation_name(form.name).msg}
                  </div>
                </div>
                <div className="payment_label_container">
                  <label for="pemail" className="plabel">
                    Email
                  </label>
                  <input
                  onClick={call_email_entry}
                    autocomplete="off"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    onBlur={(e) => setForm({ ...form, email: e.target.value })}
                    type="text"
                    className={
                      "form-control " + validation_email(form.email).class
                    }
                    value={form.email != "not_selected" ? form.email : ""}
                    id="pemail"
                  />
                  <div style={{ marginTop: "1px", fontSize: "10px" }}>
                    {validation_email(form.email).msg}
                  </div>{" "}
                </div>

                <div className="payment_label_container">
                  <label for="ptype" className="plabel">
                    Type
                  </label>
                  <select
                    name="payment_ptype"
                    onBlur={(e) =>
                      setForm({ ...form, payment_type: e.target.value })
                    }
                    onChange={(e) =>
                      setForm({ ...form, payment_type: e.target.value })
                    }
                    value={
                      form.payment_type != "not_selected"
                        ? form.payment_type
                        : ""
                    }
                    className={
                      "form-select  " + validation_name(form.payment_type).class
                    }
                    //   style={{ width: "130%", height: "80%", margin:'0px'}}
                    id="payment_ptype"
                  >
                    <option></option>
                    <option value="check">check</option>
                    <option value="card">card</option>
                    <option value="cash">cash</option>
                    <option value="online">online</option>
                  </select>
                  <div style={{ marginTop: "1px", fontSize: "10px" }}>
                    {validation_name(form.payment_type).msg}
                  </div>{" "}
                </div>
                <div className="payment_label_container">
                  <label for="pid" className="plabel">
                    {" "}
                    Payment id
                  </label>
                  <input
                    disabled={form.payment_type == "cash"}
                    autocomplete="off"
                    onChange={(e) =>
                      setForm({ ...form, payment_id: e.target.value })
                    }
                    onBlur={(e) => (
                      checkpaymentid(),
                      setForm({ ...form, payment_id: e.target.value })
                    )}
                    type="text"
                    value={
                      form.payment_id != "not_selected" ? form.payment_id : ""
                    }
                    name="payment_pid"
                    className={
                      "form-control " +
                      validation_payment_id(form.payment_id).class
                    }
                    id="pid"
                  />
                  <div style={{ marginTop: "1px", fontSize: "10px" }}>
                    {validation_payment_id(form.payment_id).msg}
                  </div>{" "}
                </div>
                <div className="payment_label_container">
                  <label for="pdate" className="plabel">
                    {" "}
                    Date{" "}
                  </label>

                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    className="form-control"
                    selected={form.date}
                    onClickOutside
                    onSelect={(date) => setForm({ ...form, date: date })}
                  />
                </div>
                <div className="payment_label_container">
                  <label for="pamount" className="plabel">
                    {" "}
                    Amount{" "}
                  </label>
                  <input
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    onBlur={(e) => setForm({ ...form, amount: e.target.value })}
                    type="number"
                    value={form.amount != "not_selected" ? form.amount : ""}
                    name="payment_amount"
                    className={
                      "form-control " + validation_amount(form.amount).class
                    }
                    id="pamount"
                  />
                  <div style={{ marginTop: "1px", fontSize: "10px" }}>
                    {validation_amount(form.amount).msg}
                  </div>{" "}
                </div>
              </div>
              {!edit ? (
                <div className="mt-3">
                  <button
                    disabled={payment_initiated}
                    className="btn-success btn btn-sm"
                    style={{ cursor: "pointer" }}
                    onClick={form_submit}
                  >
                    {payment_initiated && (
                      <span
                        class="spinner-border spinner-border-sm mx-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Submit{" "}
                  </button>

                  <div
                    className="btn-light btn btn-sm mx-3 "
                    style={{ cursor: "pointer" }}
                    onClick={reset}
                  >
                    {" "}
                    Reset{" "}
                  </div>
                </div>
              ) : (
                <div className="payment_submit_reset_container">
                  <div
                    className="payment_submit_button"
                    style={{ cursor: "pointer" }}
                    onClick={call_edit_update}
                  >
                    {" "}
                    Update{" "}
                  </div>

                  <div
                    className="payment_reset_button "
                    style={{ cursor: "pointer" }}
                    onClick={reset}
                  >
                    {" "}
                    Close{" "}
                  </div>
                  <div
                    className="payment_danger_button mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => setRemove_payment(form.id)}
                  >
                    {" "}
                    remove{" "}
                  </div>
                </div>
              )}
            </div>
            <div className="payment_table_container1 ">
              <table className="payment_table ">
                <tr className="payment_table_heading">
                  <th>Name</th>
                  <th>UserId</th>
                  <th>Payment type</th>
                  <th>Payment id</th>
                  <th>Amount</th>
                  <th>Date/Time</th>
                  <th>Status</th>
                  <th>Controls</th>
                </tr>
                {payment &&
                  payment.map((payment, id) => {
                    return (
                      <tr className="payment_table_content" key={id}>
                        <td>{payment.User.userName}</td>
                        <td>{payment.User.accountNumber}</td>
                        <td>
                          <span
                            className={
                              payment.paymentType == "cash"
                                ? "bg-primary p-1 small  text-white rounded"
                                : "bg-danger p-1 small  text-white rounded"
                            }
                          >
                            {payment.paymentType}
                          </span>
                        </td>
                        <td>{payment.paymentId}</td>
                        <td>{formatUsd(parseInt(payment.amount))} </td>
                        <td>
                          {moment(payment.paymentDate).format("MM/DD/YYYY")}
                        </td>
                        <td>{payment.Status}</td>
                        <td>
                          <div className="payment_table_controls_container">
                            <span
                              className="payment_table_button_book"
                              onClick={() => intiatebooking(payment)}
                            >
                              Book
                            </span>
                            <img
                              src={send}
                              onClick={() => setPayment_invoice(payment)}
                              style={{ cursor: "pointer" }}
                            />
                            <FaRegEdit
                              onClick={() => call_edit(payment)}
                              size={14}
                              style={{ color: "#898989", cursor: "pointer" }}
                            />
                            <HiOutlineTrash
                              onClick={() => setRemove_payment(payment.id)}
                              size={16}
                              style={{ color: "#898989", cursor: "pointer" }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
