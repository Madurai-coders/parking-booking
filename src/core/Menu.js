import React from "react";
import Navbarbigscreen from "../components/respons_nav/respons_nav.js";

export default function Menu(props) {
  return (
    <>
     <Navbarbigscreen logout={props.logout} />
    </>
  );
}
