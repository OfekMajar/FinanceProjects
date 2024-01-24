import React from "react";
import "./header.css";
import NavBar from "../NavBar/NavBar";
function Header(props) {
  return (
    <header>
      <NavBar user={props.user}></NavBar>
    </header>
  );
}

export default Header;
