import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import User_login from "./core/user_login";
import User_dashboard from "./core/user_dashboard";
import"../src/assets/css/general.css"


const Routes = () => {

  return (
      <>
    <BrowserRouter>
    <div style={{ overflow: "hidden" }}>
    <Switch>
      <Route  path="/" exact component={User_login} />
      <Route  path="/dashboard" exact component={User_dashboard} />
    </Switch>
     </div>
    </BrowserRouter>
    </>
  );
};

export default Routes;
