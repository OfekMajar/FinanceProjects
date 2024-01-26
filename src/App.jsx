import { useEffect, useState } from "react";
import firebase from "./config/firebase";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Authentication from "./pages/Authentication/Authentication";
import Favorites from "./pages/Favorites/Favorites";
import Stocks from "./pages/Home/Stocks";
import Header from "./Components/Header/Header";
import SinglePage from "./pages/SinglePage/SinglePage";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "./config/firebase";
function App() {
  const [cryptoData, setCryptoData] = useState([{}]);
  const [user, setUser] = useState();
  const [favCryptos, setFavCryptos] = useState([]);
  const baseUrl = `https://api.coincap.io/v2/assets`;
  function fetchData() {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setCryptoData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchDataWithQuery = async () => {
    const data = [...cryptoData];
    const collectionRef = collection(db, "Favorites");
    const q = query(collectionRef, where("userId", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);
      const desiredIds = [];
      querySnapshot.forEach((doc) => {
        desiredIds.push(doc.data().id);
      });
      const filteredData = data.filter((item) => desiredIds.includes(item.id));
      setFavCryptos([...filteredData]);
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
    }
  };

  useEffect(() => {
    const fetchFav = async () => {
      // Check if the user is authenticated
      if (user && user.uid) {
        try {
          await fetchDataWithQuery();
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
        }
      } else {
      }
    };

    fetchFav();
  }, [user]);

  useEffect(() => {});
  useEffect(() => {
    fetchData();

    onAuthStateChanged(getAuth(), (onlineUser) => {
      if (onlineUser) {
        setUser(onlineUser);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
      } else {
        setUser();
        // User is signed out
        // ...
      }
    });
  }, [user]);


  return (
    <>
      <BrowserRouter>
        <div id="headerContainer">
          <Header user={user} />
        </div>
        <Routes>
          {user ? (
            <Route
              path="/Authentication"
              element={
                <div id="errorPage">
                  {" "}
                  <h1>
                    whoops you are not supposed to be here <br /> you are
                    already logged in
                  </h1>{" "}
                </div>
              }
            />
          ) : (
            <Route
              path="/Authentication"
              element={<Authentication user={user} setUser={setUser} />}
            />
          )}
          <Route
            path="/Favorites"
            element={
              <div id="favoritesPageContainer">
                {" "}
                <Favorites
                  fetchDataWithQuery={fetchDataWithQuery}
                  cryptoData={cryptoData}
                  favCryptos={favCryptos}
                  user={user}
                />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div id="stocksPageContainer">
                <Stocks
                  fetchDataWithQuery={fetchDataWithQuery}
                  favCryptos={favCryptos}
                  setFavCryptos={setFavCryptos}
                  user={user}
                  cryptoData={cryptoData}
                />{" "}
              </div>
            }
          />
          <Route path="/CryptoToken" element={<div> err</div>} />
          <Route
            path="/CryptoToken/:CryptoId"
            element={
              <div id="stockSinglePageContainer">
                <SinglePage />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
