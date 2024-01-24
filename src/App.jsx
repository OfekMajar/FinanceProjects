import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import firebase from "./config/firebase";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Authentication from "./pages/Authentication/Authentication";
import Favorites from "./pages/Favorites/Favorites";
import HomePage from "./pages/Home/HomePage";
import Stocks from "./pages/Stocks/Stocks"
import NavBar from "./Components/NavBar/NavBar";
import Header from "./Components/Header/Header";
import SinglePage from "./pages/SinglePage/SinglePage";
import {getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [cryptoData, setCryptoData] = useState([{}]);
  const [user,setUser]=useState()
  
  const baseUrl = `https://api.coincap.io/v2/assets`;
 
  function fetchData() {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCryptoData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect
  useEffect(() => {
    fetchData();

    onAuthStateChanged(getAuth(), (onlineUser) => {
      if (onlineUser) {
        console.log("user is ",onlineUser);
        setUser(onlineUser)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        
      } else {
        console.log("user outtt");
        setUser(null)
        // User is signed out
        // ...
      }
      
    });
  }, [user]);
  const logOut = (e)=>{//lets the user to log out
    e.preventDefault()
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
    }).catch((error) => {
      // An error happened.
      console.log(`failed to sign out  ${error}`);
    });
  }
  
  return (
    <>
      
      <BrowserRouter>
        <div id="headerContainer">
      {user?<p id="headerUserName">{user.displayName} <button onClick={logOut}> LogOut</button></p>:<p id="headerUserName">guest <Link to="/Authentication"><button >Login</button></Link> </p>}
          
          <Header user={user}/>
        </div>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
         {user?<Route path="/Authentication" element={<div id="errorPage"> <h1>whoops you are not supposed to be here <br /> you are already logged in</h1> </div>}/>:<Route path="/Authentication" element={<Authentication user={user} setUser={setUser} />} />} 
          <Route path="/Favorites" element={<Favorites cryptoData={cryptoData} user={user} />} />
          <Route path="/Stocks" element={<div id="stocksPageContainer"><Stocks user={user}  cryptoData={cryptoData}/> </div> }/>
          <Route path="/CryptoToken" element={<div> err</div>}/>
          <Route path="/CryptoToken/:CryptoId" element={<div id="stockSinglePageContainer"><SinglePage /></div> }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
