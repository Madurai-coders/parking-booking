import React from "react";
import { BiEditAlt } from "react-icons/bi";
import propic from "../../assets/images/Profilepic.svg";

export default function Userprofile(props) {
  return (
    <>
      <div className="col-2 udb_prosec">
        <div className="udb_propicsection ms-4 me-5 mt-4 mb-4 pt-3 pb-3 ps-3 pe-3">
          <div style={{ position: "relative" }}>
            <img src={propic} className="udb_propic img-fluid" />
            <BiEditAlt
              size={16}
              style={{
                position: "absolute",
                bottom: "0",
                color: "#828282",
              }}
            />
          </div>
          <div className="udb_propicname mt-3">{props.name}</div>
        </div>
        <div className="udb_details ps-4 pb-3 pe-3 pt-3 ms-1 me-1">
          <div className="udb_name mt-1 mb-3">{props.name}</div>
          <div className="udb_proedit">
            <div className="udb_acnum mb-2">Account Number </div>
            <BiEditAlt size={16} color="#828282" />
          </div>
          <div className="udb_acnumval mb-3">{props.acntnum}</div>
          <div className="udb_proedit">
            <div className="udb_email mb-2">Email </div>
            <BiEditAlt size={16} color="#828282" />
          </div>
          <div className="udb_emailval mb-3">{props.email}</div>
          <div className="udb_proedit">
            <div className="udb_num mb-2">Mobile Number </div>
            <BiEditAlt size={16} color="#828282" />
          </div>
          <div className="udb_numval mb-3">{props.num}</div>
        </div>
        <div className="udb_pwdtxt mt-2 mb-3">
          Leave the password field empty <br /> if you don’t want to change
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
          <button type="button" class="btn btn-success btn-sm udb_savebtn me-3">
            Save Changes
          </button>
          <button type="button" class="btn btn-secondary btn-sm udb_backbtn">
            Back
          </button>
        </div>
      </div>
    </>
  );
}
