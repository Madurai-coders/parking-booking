import React from "react";

export default function Cartcard(props) {
  return (
    <>
      <div className="udb_cartcard m-4">
        <div className="udb_cartcard_flex">
          <div className="udb_cartcard_flexalign mt-3 mb-3">
            <div className="udb_cartcard_valflex mb-2">{props.slot}</div>
            <div className="udb_cartcard_textflex">Slot</div>
          </div>
          <div className="udb_cartcard_flexalign mt-3 mb-3">
            <div className="udb_cartcard_valflex mb-2">{props.wing}</div>
            <div className="udb_cartcard_textflex">Wing</div>
          </div>
          <div className="udb_cartcard_flexalign mt-3 mb-3">
            <div className="udb_cartcard_valflex mb-2">{props.plan}</div>
            <div className="udb_cartcard_textflex">Plan</div>
          </div>
        </div>
        <div className="udb_cartcard_btn p-1">{props.amount}</div>
      </div>
    </>
  );
}
