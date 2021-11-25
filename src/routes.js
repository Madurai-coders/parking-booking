import React from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import User_login from "./core/user_login";
import User_dashboard from "./core/user_dashboard";
import Booking from "./core/booking";
import Parkingsetup from "./core/parking_setup";
import Booking_report from "./core/booking_report";
import Payment from "./core/payment.js"
import Menu from "./core/Menu";
import User_report from "./core/user_report.js"
import "../src/assets/css/general.css";
import logo from "../src/assets/images/navlogo.svg";

const Navigation = () => {
  const location = useLocation();
  if (location.pathname === "/" || location.pathname == "/dashboard")
    return null;
  return (
      <Menu />
  );
};

const Logoplacer = () => {
  const logation = useLocation();
  if (logation.pathname === "/" || logation.pathname == "/dashboard")
  return null;
return (
  <div style={{ position: "absolute", marginLeft: "4.5rem" }}>
  <img src={logo} alt="Munidex_logo" className="admin_logo_placer" />
</div>
);
}

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <div style={{ overflow: "hidden" }}>
          <Switch>
            <Route path="/" exact component={User_login} />
            <Route path="/dashboard" exact component={User_dashboard} />
          </Switch>
          <div className="d-flex flex-row">
            <div>
              <Navigation />
            </div>
            <Logoplacer/>
            <Switch>
              <Route path="/Admindashboardbooking" exact component={Booking} />
              <Route
                path="/AdmindashboardParkingsetup"
                exact
                component={Parkingsetup}
              />
              <Route path="/Admindashboardpayment" exact component={Payment} />
              <Route path="/AdmindashboardUserreport" exact component={User_report} />
              <Route path="/AdmindashboardBookingreport" exact component={Booking_report} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Routes;
