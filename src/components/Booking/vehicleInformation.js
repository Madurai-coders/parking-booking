import React, { useState } from "react";
import Car from "../../assets/images/Car.svg";
import {InputBoxDisplay} from "../general/inputbox";
export default function VehicalInformation({setBookinghover,bookinghover}) {
  return (
    <>
    
    <div className="overlay_carInfo shadow">
          <div className="row">
            <div className="text-center h3" style={{ marginTop: "20px" }}>
              Car Info
            </div>
            <div className="col-5 text-center">
              <div className="d-flex flex-column" style={{ marginTop: "45px" }}>
              <div>
                  {" "}
                  {bookinghover.wing_name &&
                    bookinghover.wing_name + " [" + bookinghover.slot_connect + "]"}
                </div>
                <img
                  src={Car}
                  style={{ marginLeft: "25%", marginTop: "20px" }}
                  className="w-50"
                  alt="Munidex_parking_Booking_slots"
                />
                <div className="mt-3 text-center"><span className='text-muted'>Owner</span> : {bookinghover.name}</div>
                <div className="mt-2 text-center"><span className='text-muted'>Days left</span> : {bookinghover.day}</div>
                <div className="mt-2 text-center"><span className='text-muted'>Plan</span> : {bookinghover.plan}</div>
              </div>
            </div>

            <div className="col-7" style={{ marginTop: "35px" }}>
              <div className="row">
                  <div className="col-6" >
            <InputBoxDisplay
                    label="Make"
                    type="text"
                    value={bookinghover.carInfo.make}
                   
                  /></div>
          <div className="col-6" >
            <InputBoxDisplay
                    label="License Plate"
                    type="text"
                    value={bookinghover.carInfo.license}
                  
                  /></div>

<div className="col-6" >
            <InputBoxDisplay
                    label="Model"
                    type="text"
                    value={bookinghover.carInfo.model}
                   
                  /></div>


<div className="col-6" >
            <InputBoxDisplay
                    label="Registration State"
                    type="text"
                    value={bookinghover.carInfo.carRegistrationState
                    }
                    
                  /></div>


<div className="col-6" >
            <InputBoxDisplay
                    label="Color"
                    type="color"
                    styles={{ padding: "18px", height: "48px" }}
                    value={bookinghover.carInfo.color}
                  /></div>

<div className="col-6" >
            <InputBoxDisplay
                    label="Insurance"
                    type="text"
                    value={bookinghover.carInfo.insurance}
                    keyValue={"license"}
                    display={true}
                  /></div>
                  <div className="col-6" >
            <InputBoxDisplay
                    label="Permit Year"
                    type="text"
                    value={bookinghover.carInfo.permitYear}
                    keyValue={"license"}
                    display={true}
                  /></div>
              </div>
              <div style={{ marginRight: "50px", marginTop: "40px" }}>
                <div className="d-flex justify-content-end">
                  <div
                    className="btn btn-light mx-3"
                    onClick={()=>setBookinghover()}
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
    </>)}