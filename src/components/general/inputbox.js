import {
  validation_mobile_number,
  validation_email,
  validation_name,
  validation_payment_id,
  validation_amount,
  axios_call,
  axios_call_auto,
  generateUUID_334,
  formatUsd,
} from "../../functions/reusable_functions";
import React, { useState, useEffect, useMemo } from "react";

export  function InputBox({
  label,
  type,
  state,
  value,
  setState,
  keyValue,
  validate,
  styles,
}) {

    const [className, setClassName] = useState("homeinput full")

  function onchangeText(val) {
    setState({...state,[keyValue]:val});
    console.log({...state,[keyValue]:val})
  }

  useEffect(() => {
    console.log(value);
    if(value=='not_selected') {
        setClassName('homeinput full')
    }
    else{
        if (validate(value).class == "warn") {
            setClassName('homeinput full error')
          }
          if(validate(value).class == "pass") {
              setClassName('homeinput full valid')
          }
    }
  }, [state[keyValue]])
  

  

  return (
    <>
     
        <div className="homeinputblock">
          <input
          style={styles}
            className={className}
            type={type}
            placeholder=" "
            onChange={(e) => onchangeText(e.target.value)}
            value={state[keyValue]=='not_selected'?'':value}
            onBlur={(e) => onchangeText(e.target.value)}
          />
          <label className="label_cons">{label}</label>
                  </div>

                  <div style={{ marginTop: "2.5px",marginBottom:'18px', fontSize: "12.5px" }}>
                    {validate(value).msg}&nbsp;&nbsp;
                  </div>
               
      
    </>
  );
}



export  function InputBoxDisplay({
    label,
    type,
    value,
    styles,
    
  }) {
  
      const [className, setClassName] = useState("homeinput full")
   
  
    
  
    return (
      <>
        
                    <div className="homeinputblock m-3">
            <input
            style={styles}
              className={className}
              type={type}
              placeholder=" "
              value={value}
              readOnly
            />
            <label className="label_cons">{label}</label>
                    </div>
                   
        
      </>
    );
  }
  
