import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../assets/css/user_login/user_login.css";
import logo from "../assets/images/navlogo.svg";
import { FcGoogle } from "react-icons/fc";
import {
  validation_mobile_number,
  validation_name,
  validation_password,
  validation_email,
} from "../functions/reusable_functions";
import { ToastContainer, toast } from "react-toastify";
import { db, firebase } from "../core/firebase/firebase";

export default function Admin_login(props) {
  const [form_values, setForm_values] = useState({
    email: "not_selected",
    password: "not_selected",
  });
  const [reset, setReset] = useState(false);
  const [error, seterror] = useState();
  const [visible, setVisible] = useState(true);
  const [error_login, seterror_login] = useState(props.loading);
  const [resetemail, setResetemail] = useState("not_selected");

  const toastifyfail = () => {
    toast.error("Please enter valid details", {
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
      validation_email(form_values.email).class == "pass" &&
      validation_password(form_values.password).class == "pass"
    ) {
      val = true;
    } else {
      toastifyfail();

      if (form_values.email == "not_selected") {
        value = { ...value, email: "" };
      }
      if (form_values.password == "not_selected") {
        value = { ...value, password: "" };
      }
      setForm_values(value);
    }
    return val;
  }

  const onSubmit = async () => {
    seterror_login(props.loading);
    const result = await form_validate();
    console.log(result);
    if (result) {
      props.Email_login(form_values.email, form_values.password);
    }
    if (props.loading == "error") {
      seterror_login(props.loading);
    }
  };

  const Getlink = async () => {
    if (validation_email(resetemail).class == "pass") {
      seterror("loading");
      firebase
        .auth()
        .sendPasswordResetEmail(resetemail)
        .then(() => {
          seterror("sent");
          setResetemail("not_selected");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          seterror("invalid email");
        });
    } else {
      if (resetemail == "not_selected") {
        setReset();
      }
    }
  };

  const Entercredentials=(event)=> {
    if (event.keyCode === 13) {
        onSubmit()
    }
}

const EnterForgotPassword=(event)=> {
    if (event.keyCode === 13) {
        Getlink()
    }
}


  return (
    <>
      <Helmet>
        <title>Munidex Parking - User login </title>
      </Helmet>

      <div className="user_login">
        {/* <ToastContainer /> */}

        <div className="user_login_card_container text-center">
          <div className="user_login_card shadow">
            {!reset ? (
              <>
                <div>
                  <Link to="/">
                    <img
                      src={logo}
                      alt="munidex_logo"
                      className="user_login_signin_logo m-4"
                    />
                  </Link>
                </div>
                <div className="mt-4 mb-2">
                  <input
                    type="text"
                    onBlur={(e) =>
                      setForm_values({
                        ...form_values,
                        email: e.target.value,
                      })
                    }
                    onChange={(e) => (
                      setForm_values({
                        ...form_values,
                        email: e.target.value,
                      }),
                      seterror_login()
                    )}
                    value={
                      form_values && form_values.email == "not_selected"
                        ? ""
                        : form_values.email
                    }
                    className={
                      "user_login_signin_acntnumber mb-5" +
                      " " +
                      validation_email(form_values.email).class
                    }
                    id="email"
                    name="email"
                    required
                    placeholder="Email"
                  />
                  <div
                    style={{
                      marginTop: "-40px",
                      marginBottom: "30px",
                      fontSize: "12px",
                      textAlign: "right",
                      marginRight: "80px",
                    }}
                  >
                    {validation_email(form_values.email).msg}
                  </div>
                  <input
                    type={visible?"password":"text"}
                    onMouseOver={()=>setVisible(false)}
                    onMouseLeave={()=>setVisible(true)}
                    onBlur={(e) =>
                      setForm_values({
                        ...form_values,
                        password: e.target.value,
                      })
                    }
                    onChange={(e) => (
                      seterror_login(),
                      setForm_values({
                        ...form_values,
                        password: e.target.value,
                      })
                    )}
                    onKeyDown={(e) => Entercredentials(e)}
                    className={
                      "user_login_signin_lastname mb-4" +
                      " " +
                      validation_password(form_values.password).class
                    }
                    id="password"
                    name="password"
                    required
                    value={
                      form_values.password == "not_selected"
                        ? ""
                        : form_values.password
                    }
                    placeholder="Password"
                  />
                  <div
                    style={{
                      marginTop: "-14px",
                      marginBottom: "30px",
                      fontSize: "12px",
                      textAlign: "right",
                      marginRight: "80px",
                    }}
                  >
                    {validation_password(form_values.password).msg}
                  </div>
                </div>
                <div className="d-flex flex-row px-lg-5 px-2 justify-content-between">
                  <div
                    className="mb-4"
                    style={{ marginLeft: "20px", marginTop: "-2px" }}
                  >
                    <div
                      className="btn btn-primary btn-sm px-4 "
                      onClick={onSubmit}
                    >
                      Sign In
                    </div>
                  </div>
                  <div
                    className="small  text-muted pt-2"
                    onClick={() => setReset(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <u>Forgot/Reset password</u>
                  </div>
                </div>
                <div className="m-2  text-center h5 text-muted">or</div>
                <div className="text-center mt-4">
                  <div
                    className="text-center user_login_google_button "
                    onClick={props.login}
                  >
                    <div className="d-flex">
                      <FcGoogle size={20} />
                      <div style={{ marginTop: "2px", marginLeft: "5px" }}>
                        {" "}
                        Continue with Google
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <br></br>{" "}
                </div>
                {error_login == "error" && (
                  <>
                    <div className="alert alert-danger" role="alert">
                      Invalid email and Password
                    </div>
                  </>
                )}
                {props.loading && props.loading != "error" && (
                  <div
                    className="spinner-border text-danger text-center mb-3"
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                )}
                <br></br>{" "}
              </>
            ) : (
              <>
                <div>
                  <Link to="/">
                    <img
                      src={logo}
                      alt="munidex_logo"
                      className="user_login_signin_logo m-4"
                    />
                  </Link>
                </div>
                <div className="mt-4 mb-2">
                  <input
                    type="text"
                    onKeyDown={(e) => EnterForgotPassword(e)}
                    onBlur={(e) => setResetemail(e.target.value)}
                    onChange={(e) => (
                      seterror(), setResetemail(e.target.value)
                    )}
                    value={resetemail == "not_selected" ? "" : resetemail}
                    className={
                      "user_login_signin_acntnumber mb-5" +
                      " " +
                      validation_email(resetemail).class
                    }
                    id="email"
                    name="email"
                    required
                    placeholder="Email"
                  />
                  <div
                    style={{
                      marginTop: "-40px",
                      marginBottom: "30px",
                      fontSize: "12px",
                      textAlign: "right",
                      marginRight: "80px",
                    }}
                  >
                    {validation_email(resetemail).msg}
                  </div>
                </div>
                <div className="d-flex flex-row px-xl-5 px-3  mb-4 justify-content-between">
                  <div
                    className="mb-4"
                    style={{ marginLeft: "20px", marginTop: "-2px" }}
                  >
                    <div
                      className="btn btn-primary btn-sm "
                      onClick={Getlink}
                    >
                      Get Link
                    </div>
                  </div>
                  <div
                    className="small  text-muted pt-2"
                    onClick={() => (
                      seterror(),
                      setResetemail("not_selected"),
                      setReset(false),
                      seterror_login()
                    )}
                    style={{ cursor: "pointer" }}
                  >
                    <u>Back to login</u>
                  </div>
                </div>
                {error == "loading" && (
                  <div
                    className="spinner-border text-danger text-center mb-3"
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                )}

                {error == "invalid email" && (
                  <>
                    <div className="alert alert-danger" role="alert">
                      Invalid email
                    </div>
                  </>
                )}

                {error == "sent" && (
                  <div className="alert alert-success" role="alert">
                    Password reset link has been sent to your email...
                    <span
                      className="text-primary"
                      onClick={() => (
                        seterror(),
                        setResetemail("not_selected"),
                        setReset(false)
                      )}
                      style={{ cursor: "pointer" }}
                    >
                      back to login
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
