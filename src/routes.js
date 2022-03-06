import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import User_login from "./core/user_login";
import Admin_login from "./core/admin_login";
import User_dashboard from "./core/user_dashboard";
import Booking from "./core/booking";
import Booking_Report1 from "./core/booking_report";
import Booking_Report from "./core/booking_report copy";
import Parkingsetup from "./core/parking_setup";
import Payment from "./core/payment.js";
import Menu from "./core/Menu";
import test from "./core/test";
import Loader from "./core/loader";
import User_report from "./core/user_report.js";
import User from "./core/user.js";
import "../src/assets/css/general.css";
import logo from "../src/assets/images/navlogo.svg";
import Search from "../src/assets/images/search.jpg";
import {
  axios_call,
  axios_call_auto,
  login,
  logout,
} from "./functions/reusable_functions";
import { useHistory,Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";

const Logoplacer = (props) => {
  const logation = useLocation();
//   var icon = Cookies.get("icon")
  if (logation.pathname === "/" || logation.pathname == "/dashboard")
    return null;
  return (
      <>    <div style={{ borderRadius:'10px', position: "absolute", marginLeft: "4.5rem" }}>
      <img src={logo} alt="Munidex_logo" className="admin_logo_placer" />
    </div>

{/* <img src={Search} alt="Munidex_logo"  style={{ width:'6%', marginTop:'4px' , borderRadius:'10px', position: "absolute", marginLeft: "88%" }} /> */}
{/* <img src={icon} alt="user"  style={{ borderRadius:'100%', width:'26px', marginTop:'14px' , position: "absolute", marginLeft: "94%" }} /> */}
</>

  );
};

const Routes = () => {
  let history = useHistory();
  const [is_admin, setis_admin] = useState(false);
  const [user, setuser] = useState();

  const [loader, setloader] = useState(true);


  const call_login = async () => {
    login(true).then(function (log) {
      console.log(log.data.user.photoURL);
    //   Cookies.set('icon',log.data.user.photoURL)
      if (log != null) {
        axios({
          method: "GET",
          url: "http://127.0.0.1:8000/admins/",
          headers: { Authorization: `Bearer ${log.access}` },
        }).then((response) => {
          if (response.data[0].is_staff) {
            setis_admin(response.data[0].is_staff);
              setTimeout(() => {
            setloader(false)
        }, 2400);
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
          
          setTimeout(() => {
            setloader(false)
        }, 1500);

        }
      });
    }

  }, []);

  
  return (
    <>
      <BrowserRouter>
        <div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6 }}
						style={{ overflow: "hidden", height:"100vh" }}>
          <Switch>
            {!is_admin && (
              <>
                <Route
                  path="/admin"
                  exact
                  render={() => (
                    <Admin_login login={call_login} is_admin={is_admin} />
                  )}
                />
               
                <Route path="/dashboard" exact component={User_dashboard} />
                <Route path="/" exact component={User_login} />
                <Route   render={() => (
                    <Admin_login login={call_login} is_admin={is_admin} />
                  )}/>       

              </>
            )}
          </Switch>
          {is_admin && (
              <Switch>
                   <Route path="/" exact component={User_login} />
                  <div className="d-flex flex-row"  >
              <div >
                <Navigation />
              </div>
              <Logoplacer usericon={user}  />
              < >
                                  <Route path="/admin" exact render={() => (
                loader ? <Loader/> :<Booking/>
                  )}/>  
                  
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
               
                <Route
                path="/test"
                exact
                component={test}
                />
                
                </>

            
            </div>

              </Switch>
          )}
        </div>
      </BrowserRouter>
    </>
  );
};

export default Routes;
