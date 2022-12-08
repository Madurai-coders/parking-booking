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
import logo from "../src/assets/images/navlogo.svg";
import Search from "../src/assets/images/search.jpg";
import {
  axios_call,
  axios_call_auto,
  login,
  logout,
  email_login
} from "./functions/reusable_functions";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
 // Inside of your index.js
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import "../src/assets/css/general.css";
import screenwidth from "./assets/images/screenwidth.svg"
import { useMediaQuery } from 'react-responsive'

const Logoplacer = (props) => {
  const logation = useLocation();
  //   var icon = Cookies.get("icon")
  if (logation.pathname === "/" || logation.pathname == "/dashboard")
    return null;
  return (
    <>
      {" "}
      <div
        style={{
          borderRadius: "10px",
          position: "absolute",
          marginLeft: "4.5rem",
        }}
      >
        <img src={logo} alt="Munidex_logo" className="admin_logo_placer" />
      </div>
      {/* <img src={Search} alt="Munidex_logo"  style={{ width:'6%', marginTop:'4px' , borderRadius:'10px', position: "absolute", marginLeft: "88%" }} /> */}
      {/* <img src={icon} alt="user"  style={{ borderRadius:'100%', width:'26px', marginTop:'14px' , position: "absolute", marginLeft: "94%" }} /> */}
    </>
  );
};

const Routes = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
      })
      
  let history = useHistory();
  const [is_admin, setis_admin] = useState(false);
  const [user, setuser] = useState();

  const [loader, setloader] = useState(true);
  const [loading, setloading] = useState(false);

  const call_login = async () => {

    login(true).then(function (log) {
      console.log(log.data);
    //   Cookies.set('icon',log.data.user.photoURL)
    setloading(true)

      if (log != null) {
        axios({
          method: "GET",
          url: "https://parkingdev1.munidex.info/admins/",
          headers: { Authorization: `Bearer ${log.access}` },
        }).then((response) => {
            console.log(response)
          if (response.data[0].is_staff) {
            setis_admin(response.data[0].is_staff);
            setloading(false)
              setTimeout(() => {
            setloader(false)
        }, 3000);
          }
        });
      }
    });
  };


  const Email_login = async (email,password) => {

    email_login(true,email,password).then(function (log) {
    //   console.log(log.data.user.photoURL);
    //   Cookies.set('icon',log.data.user.photoURL)
    setloading(true)

      if (log != null && log != 'error') {
        axios({
          method: "GET",
          url: "https://parkingdev1.munidex.info/admins/",
          headers: { Authorization: `Bearer ${log.access}` },
        }).then((response) => {
          if (response.data[0].is_staff) {
            setis_admin(response.data[0].is_staff);
            setloading(false)
              setTimeout(() => {
            setloader(false)
        }, 3000);
          }
        });
      }
      else{
        setloading('error')
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
        }, 3000);

          
        }
      });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
     
      <div className={isDesktopOrLaptop?"row justify-content-center":''} >
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ overflowX: "hidden", height: "100vh" ,maxWidth:'1900px',}}
        >
          <Switch>
            {!is_admin && (
              <>
                <Route
                  path="/admin"
                  exact
                  render={() => (
                    <Admin_login login={call_login} Email_login={Email_login} is_admin={is_admin} loading={loading} />
                  )}
                />
                <Route
                  path="/"
                  exact
                  render={() => (
                    <User_login login={call_login} Email_login={Email_login} is_admin={is_admin} loading={loading} />
                  )}
                />

                <Route path="/dashboard" exact component={User_dashboard} />
                <Route path="/dashboard/:id/:status/:key" exact component={User_dashboard} />
                
              </>
            )}
          </Switch>
          {is_admin && (
            
            <Switch>

                 {window.innerWidth>1100 ?
              <div className="d-flex flex-row" >
                <div>
                  <Navigation />
                </div>
                <Logoplacer usericon={user} />
                <>
                  <Route
                    path="/admin"
                    exact
                    render={() => (loader ? <Loader /> : <Booking />)}
                  />

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

                  <Route path="/test" exact component={test} />
                </>
              </div>
              :
              <>
              <div className="centered">
                                    {" "}
                                    <img src={screenwidth} className="w-100" />
                                  
                                  <div className="h4 text-center text-muted mt-5">
                                   Not supported
                                  </div>
                                  </div>
              </>
                }
            </Switch>


          )
          }
        </div></div>
       
      </BrowserRouter>
    </>
  );
};

export default Routes;
