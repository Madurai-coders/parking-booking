import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../assets/css/user_login/user_login.css";
import logo from "../assets/images/munidex_logo.jpeg";
import { FcGoogle } from "react-icons/fc";
import {
  axios_call,
  validation_mobile_number,
  validation_name,
  login,
} from "../functions/reusable_functions";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default function User_login() {
  let history = useHistory();

  const [user, setuser] = useState();
  const [loginuser, setloginuser] = useState(false);
  const [form_values, setForm_values] = useState({
    accountnumber: "not_selected",
    lastname: "not_selected",
  });

  const toastifyfail = () => {
    toast.error("Please enter vaild  details", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  function form_validate() {
    let val = false;
    var value = { ...form_values };
    if (
      validation_mobile_number(form_values.accountnumber).class == "pass" &&
      validation_name(form_values.lastname).class == "pass"
    ) {
      val = true;
    } else {
      toastifyfail();

      if (form_values.accountnumber == "not_selected") {
        value = { ...value, accountnumber: "" };
      }
      if (form_values.lastname == "not_selected") {
        value = { ...value, lastname: "" };
      }
      setForm_values(value);
    }
    return val;
  }

  const form_submit = async () => {
    const result = await form_validate();
    console.log(result);
    if (result) {
      axios({
        method: "GET",
        url:
          "http://127.0.0.1:8000/UserLogin?username=" +
          form_values.lastname +
          "&accountnumber=" +
          form_values.accountnumber,
      }).then((response) => {
        reset();
        console.log(response);
        if (response.data[0]) {
            if(!loginuser){
          Cookies.set("accountnumber", form_values.accountnumber);
          Cookies.set("lastname", form_values.lastname);
            }
          if (loginuser.useraccount) {
            history.push("/dashboard");
          } else {
            axios_call(
              "PUT",
              "CreateBusinessPartner/" + response.data[0].id + '/',
              {...response.data[0],accountHolder:loginuser.id}
            ).then((response) => {
              console.log(response);
              history.push("/dashboard");
            });
          }
        }
      });
    }
  };

  function reset() {
    setForm_values({
      accountnumber: "not_selected",
      lastname: "not_selected",
    });
  }

  const call_login = async () => {
    login(true).then(function (log) {
      console.log(log);
      if (log != null) {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/GetBusinessPartner/"+log.access,
            headers: { Authorization: `Bearer ${log.access}` },
          }).then((response) => {
          console.log(response);
          if (response[0].useraccount) {
            history.push("/dashboard");
          } else setloginuser(response[0]);
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Munidex Parking - User login </title>
      </Helmet>

      <div className="user_login">
        <div className="user_login_card_container text-center">
          <div className="user_login_card shadow">
            <div>
              <img
                src={logo}
                alt="munidex_logo"
                className="user_login_signin_logo m-4"
              />
            </div>
            <div className="user_login_signin_text text-center  mb-3">
              Sign in
            </div>

            <input
              type="text"
              onBlur={(e) =>
                setForm_values({
                  ...form_values,
                  accountnumber: e.target.value,
                })
              }
              onChange={(e) =>
                setForm_values({
                  ...form_values,
                  accountnumber: e.target.value,
                })
              }
              value={
                form_values && form_values.accountnumber == "not_selected"
                  ? ""
                  : form_values.accountnumber
              }
              className={
                "user_login_signin_acntnumber mb-5" +
                " " +
                validation_mobile_number(form_values.accountnumber).class
              }
              id="acnumber"
              name="accountnumber"
              required
              placeholder="Account number"
            />
            <div
              style={{
                marginTop: "-40px",
                marginBottom: "30px",
                fontSize: "10px",
              }}
            >
              {validation_mobile_number(form_values.accountnumber).msg}
            </div>
            <input
              type="text"
              onBlur={(e) =>
                setForm_values({
                  ...form_values,
                  lastname: e.target.value,
                })
              }
              onChange={(e) =>
                setForm_values({
                  ...form_values,
                  lastname: e.target.value,
                })
              }
              className={
                "user_login_signin_lastname mb-5" +
                " " +
                validation_name(form_values.lastname).class
              }
              id="lname"
              name="lastname"
              required
              value={
                form_values.lastname == "not_selected"
                  ? ""
                  : form_values.lastname
              }
              placeholder="Last name"
            />
            <div
              style={{
                marginTop: "-40px",
                marginBottom: "30px",
                fontSize: "10px",
              }}
            >
              {validation_name(form_values.lastname).msg}
            </div>

            <div className="text-center">
              <div
                onClick={form_submit}
                className="user_login_login_button text-center mb-3"
              >
                Login
              </div>
            </div>
            {!loginuser && (
              <>
                <div className="text-center user_login_text_or mb-2"> or </div>
                <div className="text-center">
                  <div
                    className="text-center user_login_google_button mb-4 "
                    onClick={call_login}
                  >
                    {" "}
                    <div className="d-flex">
                      <FcGoogle size={20} />
                      <div style={{ marginTop: "1px", marginLeft: "4px" }}>
                        {" "}
                        Continue with Google
                      </div>{" "}
                    </div>
                  </div>{" "}
                </div>
              </>
            )}
          </div>
          {loginuser && (
            <div className="mb-3 mt-5">
              <small className="alert-primary alert p-2">
                Please enter your account info to connect with "
                {loginuser.username}"{" "}
              </small>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
