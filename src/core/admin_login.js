import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../assets/css/user_login/user_login.css";
import logo from "../assets/images/navlogo.svg";
import { FcGoogle } from "react-icons/fc";
import {
  validation_mobile_number,
  validation_name,
} from "../functions/reusable_functions";
import { toast } from "react-toastify";

export default function Admin_login(props) {
  return (
    <>
      <Helmet>
        <title>Munidex Parking - User login </title>
      </Helmet>

      <div className="user_login">
        <div className="user_login_card_container text-center">
          <div className="user_login_card shadow">
            <div>
              <Link to="/">
                <img
                  src={logo}
                  alt="munidex_logo"
                  className="user_login_signin_logo m-4"
                />
              </Link>
            </div>
            <div className="user_login_signin_text text-center  mb-4">
              Welcome Admin
            </div>

            <div className="text-center">
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
        {props.loading && (
          <div class="spinner-border text-danger text-center mb-3" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
              <br></br>{" "}

          </div>
        </div>
      
      </div>
    </>
  );
}
