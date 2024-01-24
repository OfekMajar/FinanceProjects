import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../config/firebase";
import StockCard from "../../Components/StockCard";
import { useLocation } from "react-router-dom";

function Favorites(props) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const fetchDataWithQuery = async () => {
    const data = [...props.cryptoData];
    const collectionRef = collection(db, "Favorites");
    const q = query(collectionRef, where("userId", "==", props.user.uid));

    try {
      const querySnapshot = await getDocs(q);
      const desiredIds = [];
      querySnapshot.forEach((doc) => {
        desiredIds.push(doc.data().id);
        console.log(doc.data().id);
      });
      console.log(desiredIds);
      const filteredData = data.filter((item) => desiredIds.includes(item.id));
      setFavorites([...filteredData]);
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Check if the user is authenticated
      if (props.user && props.user.uid) {
        try {
          await fetchDataWithQuery();
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Set loading to false if user is not authenticated
      }
    };

    fetchData();
  }, [props.user]); // Add props.user as a dependency

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {favorites.length === 0 ? <p>You have no favorites saved up</p> : null}
      <button onClick={() => console.log(favorites)}>testclick</button>
      {favorites.map((item) => (
        <StockCard location={false} singleCryptoData={item} />
      ))}
    </div>
  );
}

export default Favorites;
