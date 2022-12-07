import React, { useState, useEffect, useMemo } from "react";
import { BiEditAlt } from "react-icons/bi";
import propic from "../../assets/images/profilepic.png";
import { InputBox } from "../../components/general/inputbox";

import {
  validation_name,
  validation_value,
  validation_country,
  axios_call,
  axios_call_unauthenticated,
  axios_call_auto,
  validation_count,
  logout,
  generateUUID,
  formatUsd,
  generateUUID_334,
  validation_char,
  validation_mobile_number,
} from "../../functions/reusable_functions";
export default function Userprofile(props) {
  const [edit, setedit] = useState(false);
  const [updated, setupdated] = useState(false);
  const [userdata, setuserdata] = useState({
    firstname: props.data.userName,
    lastname: props.data.lastName,
    contact: props.data.mobileNumber,
  });

  function Validate_userdata() {
    let val = false;
    var value = { ...userdata };
    if (
      validation_name(userdata.firstname).class == "pass" &&
      validation_name(userdata.lastname).class == "pass" &&
      validation_mobile_number(userdata.contact).class == "pass"
    ) {
      val = true;
      setuserdata({ ...userdata, valid: "pass" });
    } else {
      if (userdata.firstname == "not_selected") {
        value = { ...value, license: "" };
      }
      if (userdata.lastname == "not_selected") {
        value = { ...value, lastname: "" };
      }
      if (userdata.contact == "not_selected") {
        value = { ...value, contact: "" };
      }
      setuserdata({ ...value, valid: "warn" });
    }
    return val;
  }

  function onUpdate() {
    console.log(Validate_userdata());
    if (Validate_userdata()) {
      axios_call("GET", "CreateBusinessPartner/" + props.data.id + "/").then(
        (response) => {
          axios_call("PUT", "CreateBusinessPartner/" + props.data.id + "/", {
            ...response,
            userName: userdata.firstname,
            lastName: userdata.lastname,
            mobileNumber: userdata.contact,
          }).then((response) => {
            setupdated(true);
            setTimeout(() => {
              setupdated(false);
            }, 3000);
            console.log("updated");
            console.log(response);
          });
          console.log(response);
        }
      );
    }
  }
  return (
    <>
      {edit && (
        <div className="overlay_carInfo shadow">
          <div className="row">
            <div className="text-center h3" style={{ marginTop: "40px" }}>
              User Info
            </div>

            <div className="col-lg-5 col-md-12 text-center">
              
              <div className="d-flex flex-column" style={{ marginTop: "45px" }}>
                <img
                  src={propic}
                  style={{ marginLeft: "25%", marginTop: "20px" }}
                  className="w-50"
                  alt="Munidex_parking_Booking_slots"
                />
              </div>
              <span className="text-muted"> Account Number :</span>{" "}
              {props.data.accountNumber}
            </div>

            <div className="col-lg-7 col-md-12" style={{ marginTop: "30px" }}>
            {updated && (
                <div className="alert alert-success mb-5" role="alert">
                  Update Successful!
                </div>
              )}
              <div className="row mt-4">
                <div className="col-12" style={{ marginTop: "1%" }}>
                  <InputBox
                    label="First Name"
                    type="text"
                    state={userdata}
                    setState={setuserdata}
                    value={userdata.firstname}
                    keyValue={"firstname"}
                    validate={validation_name}
                  />
                </div>

                <div className="col-12" style={{ marginTop: "1%" }}>
                  <InputBox
                    label="Last Name"
                    type="text"
                    state={userdata}
                    setState={setuserdata}
                    value={userdata.lastname}
                    keyValue={"lastname"}
                    validate={validation_name}
                  />
                </div>

                <div className="col-12" style={{ marginTop: "1%" }}>
                  <InputBox
                    label="Contact"
                    type="text"
                    state={userdata}
                    setState={setuserdata}
                    value={userdata.contact}
                    keyValue={"contact"}
                    validate={validation_mobile_number}
                  />
                </div>

                <div style={{ marginRight: "200px", marginTop: "70px" }}>
                  <div className="d-flex justify-content-end">
                    <div
                      className="btn  btn-primary"
                      onClick={() => onUpdate()}
                    >
                      update
                    </div>
                    <div
                      className="btn me-5 ms-2 btn-light"
                      onClick={() => setedit(false)}
                    >
                      cancel
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="col-xl-2  col-lg-3 col-md-12 udb_prosec">
        
        <div className="udb_propicsection ms-4 me-5 mt-4 mb-4 pt-3 pb-3 ps-3 pe-3">
          <div style={{ position: "relative" }}>
            <img src={propic} className="udb_propic img-fluid" />
            <div onClick={() => setedit(true)} style={{cursor:'pointer'}}>
              <BiEditAlt
                size={16}
                style={{
                  position: "absolute",
                  bottom: "-35",
                  right: "0",
                  color: "#828282",
                }}
              />
            </div>
          </div>
          <div className="udb_propicname mt-3">{userdata.firstname}</div>
        </div>
        <div className="udb_details ps-4 pb-3 pe-3 pt-3 ms-1 me-1">
          {/* <div className="udb_name mt-1 mb-3">{props.name}</div> */}
          <div className="udb_proedit">
            <div className="udb_acnum mb-2">Account Number </div>
            {/* <BiEditAlt size={16} color="#828282" /> */}
          </div>
          <div className="udb_acnumval mb-3">{props.data.accountNumber}</div>
          <div className="udb_proedit">
            <div className="udb_email mb-2">Email </div>
            {/* <BiEditAlt size={16} color="#828282" /> */}
          </div>
          <div className="udb_emailval mb-3">{props.data.email}</div>
          <div className="udb_proedit">
            <div className="udb_num mb-2">Mobile Number </div>
            {/* <BiEditAlt size={16} color="#828282" /> */}
          </div>
          <div className="udb_numval mb-3">
            {props.data.mobileNumber ? userdata.contact : "--"}
          </div>
        </div>
        <div
          onClick={() => props.setHistory(false)}
          className={
            !props.history_report
              ? "btn btn-primary mx-3 mt-3 "
              : "btn btn-light mx-3 mt-3"
          }
        >
          Booking
        </div>
        <div
          onClick={() => (props.setHistory(true),props.setTab('Booking'))}
          className={
            props.history_report
              ? "btn btn-primary mt-3 "
              : "btn btn-light mt-3"
          }
        >
          History
        </div>

        {/* <div  className="mt-4 mx-2">
          Leave the password field empty <br /> if you don’t want to change</div> */}
        {/* <div className="udb_pwdtxt mt-2 mb-3">
        </div>
        <div className="ps-3">
          <div className="mt-4 mb-4">
            <label for="udb_password" className="udb_cnfrmpwdlabel mb-2">
              Password
            </label>
            <input type="text" id="udb_password" className="udb_cnfrmpwd" />
          </div>
          <div className="mb-3">
            <label for="udb_cpassword" className="udb_cnfrmpwdlabel mb-2">
              Confirm Password
            </label>
            <input type="text" id="udb_cpassword" className="udb_cnfrmpwd" />
          </div>
          <button type="button" className="btn btn-success btn-sm udb_savebtn me-3">
            Save Changes
          </button>
          <button type="button" className="btn btn-secondary btn-sm udb_backbtn">
            Back
          </button>
        </div> */}
      </div>
    </>
  );
}
