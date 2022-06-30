import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import logo from "../../assets/images/navlogo.svg";
import {
  validation_mobile_number,
  validation_name,
  validation_password,
  validation_email,
  email_login,
  axios_call,
} from "../../functions/reusable_functions";
import { ToastContainer, toast } from "react-toastify";
import { db, firebase } from "../../core/firebase/firebase";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import shake from "../../assets/images/shake.gif";
export default function CreateAccount(props) {
  const [form_values, setForm_values] = useState({
    email: "not_selected",
    password: "not_selected",
    retypedPassword: "not_selected",
    name: "not_selected",
  });
  let history = useHistory();

  const [reset, setReset] = useState(false);
  const [error, seterror] = useState();
  const [error_login, seterror_login] = useState();
  const [resetemail, setResetemail] = useState("not_selected");
  const [creatAccount, setcreatAccount] = useState(false);
  const [signUp, setsignUp] = useState(false);
  const [visible, setVisible] = useState(true);

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
    var value = { ...form_values};
    if (
      validation_email(form_values.email).class == "pass" &&
      validation_name(form_values.name).class == "pass" &&
      validation_password(form_values.password).class == "pass"&&
      form_values.password==form_values.retypedPassword
    ) {
      val = true;
    } else {
    //   toastifyfail();

      if (form_values.email == "not_selected") {
        value = { ...value, email: "" };
      }
      if (form_values.name == "not_selected") {
        value = { ...value, name: "" };
      }
      if (form_values.password == "not_selected") {
        value = { ...value, password: "" };
      }
      if (form_values.password!=form_values.retypedPassword){
        value = { ...value, retypedPassword: "" };
        seterror('Password does not match')
        console.log('mismatch')
      }
      setForm_values(value);
    }
    return val;
  }

  const onSubmit = async () => {
    // seterror_login(props.loading);
    const result = await form_validate();

    console.log(result);
    if(result)
{
    var newbookingpartner = {
      uId: new Date().getUTCMilliseconds(),
      accountNumber: Math.floor(100000 + Math.random() * 9000),
      userName: form_values.name,
      lastName: form_values.name,
      email: form_values.email,
    };
seterror('loading')
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        newbookingpartner.email,
        form_values.password
      )
      .then((userCredential) => {
        console.log("initiated firebase");
        console.log(userCredential);
        axios({
          method: "POST",
          url: "https://munidexparking.pythonanywhere.com/verified_register/",
          data: {
            username: userCredential.user.email,
            password: userCredential.user.uid,
            first_name:form_values.name
          },
          withCredentials: true,
        }).then((response_one) => {
          // history.push("/");
          setsignUp(true);
          seterror(false)

        });
      }).catch(()=>{
          console.log('error1')
        seterror('mail id already exist')
      });
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

  function ContinueSignIn(){
    setForm_values({
        email: "not_selected",
        password: "not_selected",
        retypedPassword: "not_selected",
        name: "not_selected",
      });  
      props.setcreatAccount(false)
      setsignUp(false)
  }

  
  const Entercredentials=(event)=> {
    if (event.keyCode === 13) {
        onSubmit()
    }
}



  return (
    <>
      {signUp ? (
        <>
          <div className="user_login_card_container text-center">
            <div className="user_login_card shadow">
              <img
                src={logo}
                alt="munidex_logo"
                className="user_login_signin_logo m-4"
              />
              <div className="px-5">
                <div className="h3 mt-1 mb-4 text-capitalize">Hi {form_values.name} !</div>
                <img src={shake} style={{ width: "200px" }}></img>
                <div className="h6 text-muted" style={{ marginTop: "5px" }}>
                  We've sent a verification link to your address.Please click on
                  the link given in email to ver your account
                </div>
                <div className="small mt-4 mb-3 text-muted">
                  If you didn't receive email,
                  <span onClick={()=>setsignUp(false)} style={{cursor:'pointer'}} className="text-primary">click here</span> to resend the
                  verification email
                </div>
              </div>
              <div className="text-center user_login_account_button mb-4" onClick={ContinueSignIn}>
                <div className="d-flex">
                  <div style={{ marginTop: "2px", marginLeft: "5px" }}>
                    {" "}
                    Continue
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="user_login_card_container text-center">
          <div className="user_login_card shadow">
            {" "}
            <img
              src={logo}
              alt="munidex_logo"
              className="user_login_signin_logo m-4"
            />
            <div className="mt-4 mb-2">
              <input
                type="text"
                onBlur={(e) =>
                  setForm_values({
                    ...form_values,
                    name: e.target.value,
                  })
                }
                onChange={(e) => (
                  setForm_values({
                    ...form_values,
                    name: e.target.value,
                  }),
                  seterror_login()
                )}
                value={
                  form_values && form_values.name == "not_selected"
                    ? ""
                    : form_values.name
                }
                className={
                  "user_login_signin_acntnumber mb-5" +
                  " " +
                  validation_name(form_values.name).class
                }
                id="name"
                name="name"
                required
                placeholder="Name"
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
                {validation_name(form_values.name).msg}
              </div>

              <>
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
              </>

              <>
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
                  className={
                    "user_login_signin_lastname mb-4" +
                    " " +
                    validation_password(form_values.password).class
                  }
                  onKeyDown={(e) => Entercredentials(e)}
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
                  }}EnterForgotPassword
                >
                  {validation_password(form_values.password).msg}
                </div>
              </>

              <input
                type={visible?"password":"text"}
                onMouseOver={()=>setVisible(false)}
                onMouseLeave={()=>setVisible(true)}
                onBlur={(e) =>
                  setForm_values({
                    ...form_values,
                    retypedPassword: e.target.value,
                  })
                }
                onChange={(e) => (
                  seterror_login(),
                  setForm_values({
                    ...form_values,
                    retypedPassword: e.target.value,
                  })
                )}
                className={
                  "user_login_signin_lastname mb-4" +
                  " " +
                  validation_password(form_values.retypedPassword).class
                }
                id="retypedPassword"
                name="retypedPassword"
                required
                value={
                  form_values.retypedPassword == "not_selected"
                    ? ""
                    : form_values.retypedPassword
                }
                placeholder="Confirm Password"
                onKeyDown={(e) => Entercredentials(e)}
                
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
                {validation_password(form_values.retypedPassword).msg}
              </div>
            </div>
            <div className="d-flex flex-row px-lg-5 px-4 justify-content-between">
              <div
                className="mb-4"
                style={{ marginLeft: "20px", marginTop: "-2px" }}
              >
                <div
                  className="btn btn-primary btn-sm "
                  onClick={onSubmit}
                  disabled={error == "loading"}
                >
                  Sign Up
                </div>
              </div>

              <div
                className="small  text-muted pt-2"
                onClick={() => props.setcreatAccount(false)}
                style={{ cursor: "pointer" }}
              >
                <u>Back to login</u>
              </div>

            </div>
            <br></br>
            
            {error&&error.length << 10 && (
                  <>
                    <div class="alert alert-danger" role="alert">
                   {error}
                    </div>
                  </>
                )}
              {error == "loading" && (
                  <div
                    class="spinner-border text-primary text-center mb-3"
                    role="status"
                  >
                    <span class="sr-only"></span>
                  </div>
                )}
                
          </div>
        </div>
      )}
    </>
  );
}
