import React from "react";
import "./header.css";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
function Header({ user }) {
  const logOut = (e) => {
    //lets the user to log out
    e.preventDefault();
    const confirmSignOut=confirm("Are you sure you want to sign out?")
    if(confirmSignOut){
    const auth = getAuth();
      signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        setFavCryptos([]);
      })
      .catch((error) => {
        // An error happened.
        console.log(`failed to sign out  ${error}`);
      });
    }
    
  };
  return (
    <header>
      {user ? (
        <p id="headerUserName">
          {`Welcome ${user.displayName}`}{" "}
          <button onClick={logOut}> LogOut</button>
        </p>
      ) : (
        <p id="headerUserName">
          Welcome guest
          <Link to="/Authentication">
            <button>Login</button>
          </Link>
        </p>
      )}
      <h1>CoinHorizon</h1>
      <NavBar user={user}></NavBar>
    </header>
  );
}

export default Header;
