import React from "react";
import { RiMapPinLine } from "react-icons/ri";
import { CgShapeCircle } from "react-icons/cg";
import Car from "../../assets/images/Vectorcardcar.svg";


export default function Activebooking(props) {
  return (
    <>
      <div className="abc_card p-3 mt-1 mb-3">
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-2">
                <RiMapPinLine style={{color:'#0CB0E2'}} />
              </div>
              <div className="col-9 mb-2">
                <span className="abc_entrydatetext">Entry Date</span> <br />
                <span className="abc_entrydateval">{props.entry}</span>
              </div>
            </div>
          </div>
          <div className="col-6 abc_active mt-2"> Active </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">
            <div className="row">
              <div className="col-2">
                <CgShapeCircle style={{color:'#0CB0E2'}}/>
              </div>
              <div className="col-9">
                <span className="abc_expirydatetext">Expiry Date</span> <br />
                <span className="abc_expirydateval">{props.expiry}</span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="abc_remdaycover p-1">
              <div className="abc_remdaysval px-3"> {props.remdays} </div>
              <div className="abc_remdaystext">
                <div>Remaining</div>
                <div>Days</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="abc_cardhr"/>
        <div className="abc_card_bottomsection mt-2">
        <div className="abc_cardbottom_flex">
              <div> <img src={Car} className="abc_cardbottomcar p-2"/> </div>
              <div className="ms-1">
                <div className="abc_cardbottom_slottxt">Slot</div>
                <div className="abc_cardbottom_slotval">{props.slot}</div>
              </div>
            </div>
            <div className="abc_cardbottom_flex">
              <div> <img src={Car} className="abc_cardbottomcar p-2"/> </div>
              <div className="ms-1">
                <div className="abc_cardbottom_slottxt">Wing</div>
                <div className="abc_cardbottom_slotval">{props.wing}</div>
              </div>
            </div>
            <div className="abc_cardbottom_flex">
              <div> <img src={Car} className="abc_cardbottomcar p-2"/> </div>
              <div className="ms-1">
                <div className="abc_cardbottom_plantxt">Plan</div>
                <div className="abc_cardbottom_planval">{props.plan}</div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
