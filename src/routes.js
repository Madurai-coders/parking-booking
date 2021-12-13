import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import User_login from "./core/user_login";
import Admin_login from "./core/admin_login";
import User_dashboard from "./core/user_dashboard";
import Booking from "./core/booking";
import Booking_Report from "./core/booking_report";
import Parkingsetup from "./core/parking_setup";
import Payment from "./core/payment.js";
import Menu from "./core/Menu";
import User_report from "./core/user_report.js";
import User from "./core/user.js";
import "../src/assets/css/general.css";
import logo from "../src/assets/images/navlogo.svg";
import {
  axios_call,
  axios_call_auto,
  login,
  logout,
} from "./functions/reusable_functions";
import { useHistory,Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Logoplacer = () => {
  const logation = useLocation();
  if (logation.pathname === "/" || logation.pathname == "/dashboard")
    return null;
  return (
    <div style={{ position: "absolute", marginLeft: "4.5rem" }}>
      <img src={logo} alt="Munidex_logo" className="admin_logo_placer" />
    </div>
  );
};

const Routes = () => {
  let history = useHistory();
  const [is_admin, setis_admin] = useState(false);

  const call_login = async () => {
    login(true).then(function (log) {
      console.log(log);
      if (log != null) {
        axios({
          method: "GET",
          url: "http://127.0.0.1:8000/admins/",
          headers: { Authorization: `Bearer ${log.access}` },
        }).then((response) => {
          if (response.data[0].is_staff) {
            setis_admin(response.data[0].is_staff);
          }
        });
      }
    });
  };

  const call_logout = async () => {
    logout().then(function (log) {
      console.log(log);
      if (log != null) {
        setis_admin(false);
      }
    });
  };

  const Navigation = () => {
    const location = useLocation();
    if (location.pathname === "/" || location.pathname == "/dashboard")
      return null;
    return <Menu logout={call_logout} />;
  };

  useEffect(() => {
    if (Cookies.get("access_token")) {
      console.log("Admin_login check");

      axios_call("GET", "admins/").then((response) => {
        if (response[0].is_staff) {
          setis_admin(response[0].is_staff);
        }
      });
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <div style={{ overflow: "hidden", height:"100vh" }}>
          <Switch>
            {is_admin && (
              <>
                <Route
                  path="/admin"
                  exact
                  render={() => (
                    <Admin_login login={call_login} is_admin={is_admin} />
                  )}
                />
               
                <Route path="/dashboard" exact component={User_dashboard} />
                <Route path="/*" exact={true} component={User_login} />

              </>
            )}
          </Switch>
          {!is_admin && (
            
              <Switch>
                  <div className="d-flex flex-row">
              <div>
                <Navigation />
              </div>
              <Logoplacer />
                <Route path="/admin" exact component={Booking} />       
               
                <Route
                  path="/AdmindashboardBookingreport"
                  exact
                  component={Booking_Report}
                />
                <Route
                  path="/AdmindashboardParkingsetup"
                  exact
                  component={Parkingsetup}
                />
                <Route
                  path="/Admindashboardpayment"
                  exact
                  component={Payment}
                />
                <Route
                  path="/AdmindashboardUserreport"
                  exact
                  component={User_report}
                />
                <Route path="/" exact component={User_login} />
            </div>

              </Switch>
          )}
        </div>
      </BrowserRouter>
    </>
  );
};

export default Routes;
