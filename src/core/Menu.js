import React from "react";
import Navbarbigscreen from "../components/navbar/navbar_bigscreen.js";

export default function Menu(props) {
  return (
    <>
     <Navbarbigscreen logout={props.logout} />
    </>
  );
}
