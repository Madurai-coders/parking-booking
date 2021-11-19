import React, { useState } from "react";
import Menu from "../../assets/images/Menu.svg";
import "../../assets/css/navbar/navbar_bigscreen.css";
import Booking from "../../assets/images/Booking.svg";
import Bookingreport from "../../assets/images/Bookingreport.svg";
import Accountreport from "../../assets/images/Accountreport.svg";
import Parkingsetup from "../../assets/images/Parkingsetup.svg";
import Logout from "../../assets/images/Logout.svg";
import Logo from "../../assets/images/munidex_logo.jpeg";

export default function Navbarbigscreen() {

  const [expand, setExpand] = useState(false);

  function handleExpand(){
    setExpand(!expand);
  }

  function handleContract(){
    setExpand(!expand);
  }

  return (
    <>
      {!expand && (
                    <div className='bg-primary' style={{height:'100vh',width:'5vh' }}>
                      <li className="Navbigscreen_menu_noexpand" onClick={handleExpand}>
                <img
                  src={Menu}
                  className="Navbigscreen_menu_img"
                 alt="Munidex_Parking_Menu"
               />
             </li>   
                    </div>

        //   <div className="Navbigscreen_container">
        //   <div>
        //     <ul className="Navbigscreen_list">
        //       <li className="Navbigscreen_menu_noexpand" onClick={handleExpand}>
        //         <img
        //           src={Menu}
        //           className="Navbigscreen_menu_img"
        //           alt="Munidex_Parking_Menu"
        //         />
        //       </li>
        //       <li className="Navbigscreen_listitem_booking_noexpand">
        //         <img
        //           src={Booking}
        //           className="Navbigscreen_listitem_booking_img"
        //           alt="Munidex_Parking_booking"
        //         />
        //       </li>
        //       <li className="Navbigscreen_listitem_bookingreport_noexpand">
        //         <img
        //           src={Bookingreport}
        //           className="Navbigscreen_listitem_bookingreport_img"
        //           alt="Munidex_parking_Booking_Report"
        //         />
        //       </li>
        //       <li className="Navbigscreen_listitem_accountreport_noexpand">
        //         <img
        //           src={Accountreport}
        //           className="Navbigscreen_listitem_accountreport_img"
        //           alt="Munidex_parking_Account_Report"
        //         />
        //       </li>
        //       <li className="Navbigscreen_listitem_parkingsetup_noexpand">
        //         <img
        //           src={Parkingsetup}
        //           className="Navbigscreen_listitem_parkingsetup_img"
        //           alt="Munidex_parking_Parking_setup"
        //         />
        //       </li>
        //     </ul>
        //   </div>
        //   <div className="Navbigscreen_listitem_logout_noexpand">
        //     <img
        //       src={Logout}
        //       className="Navbigscreen_listitem_logout_img"
        //       alt="Munidex_parking_logout"
        //     />
        //   </div>
        // </div>
      )}

      {expand && (
                    <div className='bg-primary' style={{height:'100vh',width:'20vh' }}>

<li className="Navbigscreen_menu_noexpand" onClick={handleExpand}>
                <img
                  src={Menu}
                  className="Navbigscreen_menu_img"
                 alt="Munidex_Parking_Menu"
               />
             </li>  
                    </div>

        // <div className="Navbigscreen_container" style={{width:"12%"}}>
        //   <div>
        //     <ul className="Navbigscreen_list">
        //       <li className="Navbigscreen_menu" onClick={handleContract}>
        //         <img
        //           src={Menu}
        //           className="Navbigscreen_menu_img"
        //           alt="Munidex_Parking_Menu"
        //         />
        //         {/* <img src={Logo} alt="Munidex_logo" className="Navbarbigscreen_logo"/> */}
        //       </li>
        //       <li className="Navbigscreen_listitem_booking">
        //         <img
        //           src={Booking}
        //           className="Navbigscreen_listitem_booking_img"
        //           alt="Munidex_Parking_booking"
        //         />
        //         <span className="Navbigscreen_listitem_booking_text">
        //           Booking
        //         </span>
        //       </li>
        //       <li className="Navbigscreen_listitem_bookingreport">
        //         <img
        //           src={Bookingreport}
        //           className="Navbigscreen_listitem_bookingreport_img"
        //           alt="Munidex_parking_Booking_Report"
        //         />
        //         <span className="Navbigscreen_listitem_bookingreport_text">
        //           Booking Report
        //         </span>
        //       </li>
        //       <li className="Navbigscreen_listitem_accountreport">
        //         <img
        //           src={Accountreport}
        //           className="Navbigscreen_listitem_accountreport_img"
        //           alt="Munidex_parking_Account_Report"
        //         />
        //         <span className="Navbigscreen_listitem_accountreport_text">
        //           Account Report
        //         </span>
        //       </li>
        //       <li className="Navbigscreen_listitem_parkingsetup">
        //         <img
        //           src={Parkingsetup}
        //           className="Navbigscreen_listitem_parkingsetup_img"
        //           alt="Munidex_parking_Parking_setup"
        //         />
        //         <span className="Navbigscreen_listitem_parkingsetup_text">
        //           Parking Setup
        //         </span>
        //       </li>
        //     </ul>
        //   </div>
        //   <div className="Navbigscreen_listitem_logout">
        //     <img
        //       src={Logout}
        //       className="Navbigscreen_listitem_logout_img"
        //       alt="Munidex_parking_logout"
        //     />
        //     <span className="Navbigscreen_listitem_logout_text">Logout</span>
        //   </div>
        // </div>

      )}
    </>
  );
}
