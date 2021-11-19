import React, { useState } from "react";
import { Helmet } from "react-helmet";
import logo from "../assets/images/munidex_logo.jpeg";
import userprof from "../assets/images/userprofile.png";
import handshake from "../assets/images/handshake.png";
import "../assets/css/user_dashboard/user_dashboard.css";
import { IoClose } from "react-icons/io5";

export default function User_dashboard() {
  const [popup, setPopup] = useState(false);

  return (
    <>
      {" "}
       
      <Helmet>
        <title>Munidex Parking - User Dashboard</title>
      </Helmet>
      <div className="user_dashboard_container">
        {popup && (
          <div className="row user_dashboard_popup_section shadow">
            <div className="col-4 user_dashboard_popup_leftside text-center">
              <img
                src={handshake}
                alt="zengov"
                className="user_dashboard_handshake_image"
              />
              <div className="user_dashboard_popup_leftside_text">
                Zen<span>Gov</span>
              </div>
            </div>
            <div className="col-8">
              <div className="user_dashboard_popup_history_container">
                <div className="user_dashboard_popup_transaction_history_flex">
                  <div className="user_dashboard_popup_transaction_history mb-5">
                    {" "}
                    Transaction History{" "}
                  </div>
                  <div
                    className="user_dashboard-popup_close"
                    onClick={() => setPopup(false)}
                  >
                    <IoClose style={{ color: "#646262" }} size={30} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <div className="user_dashboard_popup_title">
                      {" "}
                      Transaction id
                    </div>
                    <div className="user_dashboard_popup_tid_text">
                      {" "}
                      567362925{" "}
                    </div>
                    <div className="user_dashboard_popup_tid_text">
                      {" "}
                      567362925{" "}
                    </div>
                    <div className="user_dashboard_popup_tid_text">
                      {" "}
                      567362925{" "}
                    </div>
                    <div className="user_dashboard_popup_tid_text">
                      {" "}
                      567362925{" "}
                    </div>
                    <div className="user_dashboard_popup_tid_text">
                      {" "}
                      567362925{" "}
                    </div>
                    <div className="user_dashboard_popup_tid_text">
                      {" "}
                      567362925{" "}
                    </div>
                    <div className="user_dashboard_popup_tid_text">
                      {" "}
                      567362925{" "}
                    </div>
                    <div className="user_dashboard_popup_tid_text">
                      {" "}
                      567362925{" "}
                    </div>
                    <div className="user_dashboard_popup_tid_text">
                      {" "}
                      567362925{" "}
                    </div>
                  </div>
                  <div className="col-3 text-center">
                    <div className="user_dashboard_popup_title">
                      {" "}
                      Date of Payment{" "}
                    </div>
                    <div className="user_dashboard_popup_dop_text">
                      {" "}
                      20/11/21{" "}
                    </div>
                    <div className="user_dashboard_popup_dop_text">
                      {" "}
                      10/10/21{" "}
                    </div>
                    <div className="user_dashboard_popup_dop_text">
                      {" "}
                      10/08/21{" "}
                    </div>
                    <div className="user_dashboard_popup_dop_text">
                      {" "}
                      12/09/21{" "}
                    </div>
                    <div className="user_dashboard_popup_dop_text">
                      {" "}
                      09/07/21{" "}
                    </div>
                    <div className="user_dashboard_popup_dop_text">
                      {" "}
                      18/12/20{" "}
                    </div>
                    <div className="user_dashboard_popup_dop_text">
                      {" "}
                      15/10/20{" "}
                    </div>
                    <div className="user_dashboard_popup_dop_text">
                      {" "}
                      17/02/19{" "}
                    </div>
                    <div className="user_dashboard_popup_dop_text">
                      {" "}
                      22/07/18{" "}
                    </div>
                  </div>
                  <div className="col-3 text-center">
                    <div className="user_dashboard_popup_title"> Payment </div>
                    <div className="user_dashboard_popup_payment_text">
                      {" "}
                      $1000{" "}
                    </div>
                    <div className="user_dashboard_popup_payment_text">
                      {" "}
                      $1043{" "}
                    </div>
                    <div className="user_dashboard_popup_payment_text">
                      {" "}
                      $2095{" "}
                    </div>
                    <div className="user_dashboard_popup_payment_text">
                      {" "}
                      $1043{" "}
                    </div>
                    <div className="user_dashboard_popup_payment_text">
                      {" "}
                      $1246{" "}
                    </div>
                    <div className="user_dashboard_popup_payment_text">
                      {" "}
                      $1043{" "}
                    </div>
                    <div className="user_dashboard_popup_payment_text">
                      {" "}
                      $1043{" "}
                    </div>
                    <div className="user_dashboard_popup_payment_text">
                      {" "}
                      $1043{" "}
                    </div>
                    <div className="user_dashboard_popup_payment_text">
                      {" "}
                      $1043{" "}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="user_dashboard_popup_title"> Status </div>
                    <div className="user_dashboard_popup_status_yellow">
                      {" "}
                      Pending{" "}
                    </div>
                    <div className="user_dashboard_popup_status_green">
                      {" "}
                      Successful{" "}
                    </div>
                    <div className="user_dashboard_popup_status_green">
                      {" "}
                      Successful{" "}
                    </div>
                    <div className="user_dashboard_popup_status_green">
                      {" "}
                      Successful{" "}
                    </div>
                    <div className="user_dashboard_popup_status_green">
                      {" "}
                      Successful{" "}
                    </div>
                    <div className="user_dashboard_popup_status_green">
                      {" "}
                      Successful{" "}
                    </div>
                    <div className="user_dashboard_popup_status_green">
                      {" "}
                      Successful{" "}
                    </div>
                    <div className="user_dashboard_popup_status_green">
                      {" "}
                      Successful{" "}
                    </div>
                    <div className="user_dashboard_popup_status_green">
                      {" "}
                      Successful{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <img
          src={logo}
          alt="munidex_logo"
          className="user_dashboard_munidex_logo"
        />
        <img
          src={userprof}
          alt="Customer_profile"
          className="user_dashboard_profile_icon"
        />

        <div className="row">
          <div className="col-7">
            <div className="user_dashboard_username"> Hello Albert!</div>
            <div className="user_dashboard_text_booking_details">
              {" "}
              Booking Details
            </div>
            <div className="user_dashboard_booking_details_card">
              <div className="row">
                <div className="col text-center">
                  <div className="user_dashboard_text_booking_card_title">
                    {" "}
                    Slot{" "}
                  </div>
                  <div className="user_dashboard_slot_text">5</div>
                  <div className="user_dashboard_slot_text">7</div>
                  <div className="user_dashboard_slot_text">3</div>
                  <div className="user_dashboard_slot_text">6</div>
                  <div className="user_dashboard_slot_text">8</div>
                  <div className="user_dashboard_slot_text">5</div>
                  <div className="user_dashboard_slot_text">9</div>
                </div>
                <div className="col text-center">
                  <div className="user_dashboard_text_booking_card_title">
                    {" "}
                    Start date{" "}
                  </div>
                  <div className="user_dashboard_start_date_text">13/11/21</div>
                  <div className="user_dashboard_start_date_text">9/10/21</div>
                  <div className="user_dashboard_start_date_text">5/09/21</div>
                  <div className="user_dashboard_start_date_text">8/08/21</div>
                  <div className="user_dashboard_start_date_text">3/07/21</div>
                  <div className="user_dashboard_start_date_text">9/12/20</div>
                  <div className="user_dashboard_start_date_text">11/10/20</div>
                </div>
                <div className="col text-center">
                  <div className="user_dashboard_text_booking_card_title">
                    {" "}
                    End date{" "}
                  </div>
                  <div className="user_dashboard_end_date_text">20/11/21</div>
                  <div className="user_dashboard_end_date_text">10/10/21</div>
                  <div className="user_dashboard_end_date_text">10/08/21</div>
                  <div className="user_dashboard_end_date_text">12/09/21</div>
                  <div className="user_dashboard_end_date_text">5/08/21</div>
                  <div className="user_dashboard_end_date_text">8/11/20</div>
                  <div className="user_dashboard_end_date_text">19/11/20</div>
                </div>
                <div className="col text-center">
                  <div className="user_dashboard_text_booking_card_title">
                    {" "}
                    Payment{" "}
                  </div>
                  <div className="user_dashboard_payment_text_pending">
                    pending
                  </div>
                  <div className="user_dashboard_payment_text_completed">
                    Completed
                  </div>
                  <div className="user_dashboard_payment_text_completed">
                    Completed
                  </div>
                  <div className="user_dashboard_payment_text_completed">
                    Completed
                  </div>
                  <div className="user_dashboard_payment_text_completed">
                    Completed
                  </div>
                  <div className="user_dashboard_payment_text_completed">
                    Completed
                  </div>
                  <div className="user_dashboard_payment_text_completed">
                    Completed
                  </div>
                </div>
                <div className="col text-center">
                  <div className="user_dashboard_text_booking_card_title">
                    {" "}
                    Active{" "}
                  </div>
                  <div className="user_dashboard_active">
                    <div className="user_dashboard_active_green"></div>
                  </div>
                  <div className="user_dashboard_active">
                    <div className="user_dashboard_active_red"></div>
                  </div>
                  <div className="user_dashboard_active">
                    <div className="user_dashboard_active_red"></div>
                  </div>
                  <div className="user_dashboard_active">
                    <div className="user_dashboard_active_red"></div>
                  </div>
                  <div className="user_dashboard_active">
                    <div className="user_dashboard_active_red"></div>
                  </div>
                  <div className="user_dashboard_active">
                    <div className="user_dashboard_active_red"></div>
                  </div>
                  <div className="user_dashboard_active">
                    <div className="user_dashboard_active_red"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="user_dashboard_right_container">
              <div className="user_dashboard_balance_card">
                <div className="user_dashboard_balance_card_text mb-3">
                  {" "}
                  Balance{" "}

                  <div className="user_dashboard_pay_container text-center">
              <div className="user_dashboard_pay"> Pay </div>
            </div>
                </div>
                <div className="user_dashboard_balance_card_amount d-flex">
                  $ 650{" "}
                </div>
              </div>
              <div className="user_dashboard_transaction_card">
                <div className="user_dashboard_transaction_card_title">
                  {" "}
                  Transaction{" "}
                </div>
                <div className="user_dashboard_transaction_card_transaction_id mb-3">
                  {" "}
                  Transaction id : <span> 567362925 </span>
                </div>
                <div className="user_dashboard_transaction_card_datetime_text">
                  {" "}
                  <div className="user_dashboard_transaction_card_date_text">
                    {" "}
                    Date{" "}
                  </div>{" "}
                  <div className="user_dashboard_transaction_card_time_text">
                    {" "}
                    Time{" "}
                  </div>
                </div>
                <div className="user_dashboard_transaction_card_datetime">
                  {" "}
                  <div> 05 September 2021 </div> <div> 12:28:30 </div>
                </div>
                <div className="user_dashboard_transaction_card_amount_section">
                  <div className="user_dashboard_transaction_card_amount_text mb-3">
                    {" "}
                    Amount{" "}
                  </div>
                  <div className="user_dashboard_transaction_card_amount_number mb-3">
                    {" "}
                    $1050{" "}
                  </div>
                </div>
                <div
                  className="user_dashboard_transaction_card_seemore text-center mt-4"
                  onClick={() => setPopup(true)}
                >
                  See more
                </div>
              </div>
            </div>
          </div>
            
        </div>
        <div className="row">
          <div className="col-7">
            <div style={{ display: "none" }}>Munidex Parking</div>
          </div>
        </div>
      </div>
    </>
  );
}
