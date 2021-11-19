import React from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import User_login from "./core/user_login";
import User_dashboard from "./core/user_dashboard";
import Booking from "./core/booking";
import Menu from "./core/Menu";
import "../src/assets/css/general.css";

// const Navigation = () => {
//   const location = useLocation();
//   if (location.pathname === "/" || location.pathname == "/dashboard")
//     return null;
//   return <Menu />;
// };

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <div style={{ overflow: "hidden" }}>
          {/* <Navigation /> */}
          <Switch>
            <Route path="/" exact component={User_login} />
            <Route path="/dashboard" exact component={User_dashboard} />
            <Route path="/Admindashboardbooking" exact component={Booking} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Routes;
