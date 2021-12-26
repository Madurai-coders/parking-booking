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
} from "../functions/reusable_functions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import send from "../assets/images/send.svg";
import Payment_invoice from "../components/Paymentinvoice/paymentinvoice";

export default function Payment() {
  const [payment, setPayment] = useState();
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
        }
      );
    }
  };

  function removePayment(id) {
    axios_call("DELETE", "CreatePayment/" + id + "/", "").then((response) => {
      setRemove_payment(false);
    });
    var values_result = payment.filter((item) => item.id !== id);
    setPayment(values_result);
    setedit(false);
  }

  function call_edit(val) {
    console.log(val);
    console.log(val.paymentId);
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
        console.log("starting exsisting user");
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
          };
          console.log(data);
          axios_call("POST", "CreatePayment/", data).then((response) => {
            axios_call("GET", "GetPayment?search=" + form.name).then(
              (response) => {
                console.log(response);
                setPayment(response);
                reset();
              }
            );
            console.log("payment added to existing user");
          });
        }

        if (
          usr_suggestion[0].userName === form.name &&
          usr_suggestion[0].email === form.email
        ) {
          setData_fail("username dose not match with email provided");
        }
      } else {
        console.log("starting newuser");
        var newbookingpartner = {
          uId: new Date().getUTCMilliseconds(),
          accountNumber: Math.floor(Math.random() * 10000 + 1),
          userName: form.name,
          lastName: form.name,
          email: form.email,
        };

        axios_call("POST", "CreateBusinessPartner/", newbookingpartner).then(
          (response) => {
            console.log("newuser created");

            var data = {
              userId: response.id,
              paymentId: form.payment_id,
              paymentType: form.payment_type,
              paymentDate: form.date,
              amount: form.amount,
            };

            axios_call("POST", "CreatePayment/", data).then((response) => {
              axios_call("GET", "GetPayment?search=" + form.name).then(
                (response) => {
                  console.log(response);
                  setPayment(response);
                  reset();
                }
              );
              console.log("payment added to created existing user");
            });
          }
        );
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
        console.log(response);
        setPayment(response.results);
      });
    } else {
      axios_call("GET", "GetPayment?search=" + form.name).then((response) => {
        setPayment(response);
        console.log(response);
        console.log("search");
      });
    }
    if (usr_suggestion[0]) {
      if (form.name == usr_suggestion[0].userName) {
        setForm({ ...form, email: usr_suggestion[0].email });
      } else {
        setForm({ ...form, email: "not_selected" });
      }
    }
  }, [form.name]);

  function checkpaymentid() {
    if (form.payment_id) {
      axios_call("GET", "GetPayment?search=" + form.payment_id).then(
        (response) => {
          console.log(form.payment_id);
          console.log(response);
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
      invoiceDate: moment(payment_invoice.paymentDate).format("DD/MM/YYYY"),
      user: payment_invoice.User.userName,
      accountNumber: payment_invoice.User.accountNumber,
      paymentId: payment_invoice.paymentId,
      amount: payment_invoice.amount,
    };
    console.log(data);
    setMailStatus({
      status: "Sending",
      to: payment_invoice.User.email,
    });

    axios_call("POST", "send_mail/", data).then((response) => {
      console.log(response);
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
                              class="spinner-grow mx-1 text-primary"
                              role="status"
                            >
                              <span class="sr-only"></span>
                            </div>
                            <div
                              class="spinner-grow mx-1 text-secondary"
                              role="status"
                            >
                              <span class="sr-only"></span>
                            </div>
                            <div
                              class="spinner-grow mx-1 text-success"
                              role="status"
                            >
                              <span class="sr-only"></span>
                            </div>
                            <div
                              class="spinner-grow mx-1 text-danger"
                              role="status"
                            >
                              <span class="sr-only"></span>
                            </div>
                            <div
                              class="spinner-grow mx-1 text-warning"
                              role="status"
                            >
                              <span class="sr-only"></span>
                            </div>
                            <div
                              class="spinner-grow mx-1 text-info"
                              role="status"
                            >
                              <span class="sr-only"></span>
                            </div>
                            <div
                              class="spinner-grow mx-1 text-light"
                              role="status"
                            >
                              <span class="sr-only"></span>
                            </div>
                            <div
                              class="spinner-grow mx-1 text-dark"
                              role="status"
                            >
                              <span class="sr-only"></span>
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
          {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Remove Payment
                </h5>
                <button
                  type="button"
                  onClick={() => setRemove_payment(false)}
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Are your sure?</div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={() => removePayment(remove_payment)}
                  class="btn btn-light"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => setRemove_payment(false)}
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
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: [0.5, 1], x: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow-1"
      >
        <div className="payment_container">
          {/* {data_fail && (
            <div className="pr-5 pl-5">
              <div class="alert alert-danger" role="alert">
                {data_fail}
              </div>
            </div>
          )} */}
          <div className="payment_text_booking_report"> Payment Report</div>

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
                  className={"payment_name " + validation_name(form.name).class}
                  id="pname"
                />
                <datalist id="data">
                  {usr_suggestion.map((item, key) => (
                    <option key={key} value={item.userName} />
                  ))}
                </datalist>
                <div style={{ marginTop: "-5px", fontSize: "10px" }}>
                  {validation_name(form.name).msg}
                </div>
              </div>
              <div className="payment_label_container">
                <label for="pemail" className="plabel">
                  Email
                </label>
                <input
                  autocomplete="off"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onBlur={(e) => setForm({ ...form, email: e.target.value })}
                  type="text"
                  className={
                    "payment_email " + validation_email(form.email).class
                  }
                  value={form.email != "not_selected" ? form.email : ""}
                  id="pemail"
                />
                <div style={{ marginTop: "-5px", fontSize: "10px" }}>
                  {validation_email(form.email).msg}
                </div>{" "}
              </div>

              <div className="payment_label_container">
                <label for="ptype" className="plabel">
                  Payment type
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
                    form.payment_type != "not_selected" ? form.payment_type : ""
                  }
                  className={
                    "payment_email " + validation_name(form.payment_type).class
                  }
                  style={{ width: "150px", height: "30px" }}
                  id="payment_ptype"
                >
                  <option ></option>
                  <option value="check">check</option>
                  <option value="card">card</option>
                  <option value="cash">cash</option>
                  <option value="online">online</option>
                </select>
                <div style={{ marginTop: "-5px", fontSize: "10px" }}>
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
                    "payment_pid " +
                    validation_payment_id(form.payment_id).class
                  }
                  id="pid"
                />
                <div style={{ marginTop: "-5px", fontSize: "10px" }}>
                  {validation_payment_id(form.payment_id).msg}
                </div>{" "}
              </div>
              <div className="payment_label_container">
                <label for="pdate" className="plabel">
                  {" "}
                  Date{" "}
                </label>

                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  className="payment_date"
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
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  onBlur={(e) => setForm({ ...form, amount: e.target.value })}
                  type="number"
                  value={form.amount != "not_selected" ? form.amount : ""}
                  name="payment_amount"
                  className={
                    "payment_pid " + validation_amount(form.amount).class
                  }
                  id="pamount"
                />
                <div style={{ marginTop: "-5px", fontSize: "10px" }}>
                  {validation_amount(form.amount).msg}
                </div>{" "}
              </div>
            </div>
            {!edit ? (
              <div className="payment_submit_reset_container">
                <div
                  className="payment_submit_button"
                  style={{ cursor: "pointer" }}
                  onClick={form_submit}
                >
                  {" "}
                  Submit{" "}
                </div>

                <div
                  className="payment_reset_button"
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
          <div className="payment_table_container">
            <table className="payment_table ">
              <tr className="payment_table_heading">
                <th>Name</th>
                <th>UserId</th>
                <th>Payment type</th>
                <th>Payment id</th>
                <th>Amount</th>
                <th>Date/Time</th>
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
                          class={
                            payment.paymentType == "cash"
                              ? "bg-primary p-1  text-white rounded"
                              : "bg-danger p-1  text-white rounded"
                          }
                        >
                          {payment.paymentType}
                        </span>
                      </td>
                      <td>{payment.paymentId}</td>
                      <td>{payment.amount}$</td>
                      <td>
                        {moment(payment.paymentDate).format("DD/MM/YYYY")}
                      </td>
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
      </motion.div>
    </>
  );
}
