import React from "react";
import "./navBar.css";
import { Link } from "react-router-dom";
function NavBar(props) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/Favorites">Favorites</Link>

    </nav>
  );
}

export default NavBar;
