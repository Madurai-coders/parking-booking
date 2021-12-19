import React,{useState} from "react";
import "../../assets/css/Booking/bookingsuccess.css"
import view from "../../assets/images/view.svg";
import print from "../../assets/images/print.svg";
import send from "../../assets/images/send.svg"
import tick from "../../assets/images/tick.svg" 
import close from "../../assets/images/close.svg"

export default function Bookingsuccesspopup(props) {
     
  const[visible,setVisible]=useState(true);
    
return(
    <>
    {visible &&
    <div className="bookingspopup_container">
      <div style={{display:"flex",justifyContent:"space-between" }}>
        <div> </div>
      <div className="mt-2 ps-3">
         <img src={tick} />
      </div>
      <div className="pt-2 pe-3" onClick={()=>setVisible(false)}> 
      <img src={close}/>
      </div>
      </div>
      <div className="bookingspopup_title mt-3 mb-3">
          Booking success
      </div>
      <hr className="bookingspopup_hr"/>
      <div className="bookingspopup_details">
      <div className="bookingspopup_details_flex mb-3">
         <div className="bookingspopup_head"> From: <span className="bookingspopup_body"> 5/08/21</span></div>
         <div className="bookingspopup_head">To: <span className="bookingspopup_body">5/09/21</span></div>
      </div>
      <div className="bookingspopup_details_flex mb-3">
          <div className="bookingspopup_head">Name: <span className="bookingspopup_body">Jane Cooper</span></div>
          <div className="bookingspopup_head">Plan: <span className="bookingspopup_body">Weekly</span></div>
      </div>
      <div className="bookingspopup_details_flex mb-4">
           <div className="bookingspopup_head">Wing: <span className="bookingspopup_body">C</span></div>
           <div className="bookingspopup_head">Slot: <span className="bookingspopup_body">D</span></div>
      </div>
      </div>
          <div style={{textAlign:"center"}} className="mb-5"><span className="bookingspopup_text_amount"> Amount </span> <span className="bookingspopup_value_amount"> $650</span></div>
      <div className="bookingspopup_amount_flex">
          <div className="bookingspopup_options m-3"> View <img src={view} /> </div>
          <div className="bookingspopup_options m-3"> Send <img src={send}/> </div>
          <div className="bookingspopup_options m-3"> Print <img src={print}/> </div>
      </div>
    </div>
}
    </>
);

}