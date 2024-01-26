import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import StockCard from "../../Components/StockCard";
import "./stocks.css";
import db from "../../config/firebase";
import { useEffect, useState } from "react";

const Stocks = (props) => {
  const [page,setPage]=useState(5)
console.log(props.user);
let tempUser
if(props.user==undefined){
  tempUser={uid:"guest"}
}
else{
  tempUser=props.user.uid

}
  const checkIfFavoriteExists = async (FavCryptoId) => {
    try {
      const collectionRef = collection(db, "Favorites");

      const querySnapshot = await getDocs(
        query(
          collectionRef,
          where("id", "==", FavCryptoId.id),
          where("userId", "==", props.user.uid)
        )
      );

      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking if favorite exists:", error.message);
      return false;
    }
  };

  const addToFavorites = async (e, FavCryptoId) => {
    console.log(props.favCryptos);
    try {
      
      const favoriteExists = await checkIfFavoriteExists(FavCryptoId);

      if (favoriteExists) {
        const collectionRef = collection(db, "Favorites");
        const q = query(
          collectionRef,
          where("id", "==", FavCryptoId.id),
          where("userId", "==", props.user.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
          props.fetchDataWithQuery()
        });
    
        console.log("removed from fav");
      } else {
        
        const collectionRef = collection(db, "Favorites");
        await addDoc(collectionRef, {
          id: FavCryptoId.id,
          userId: props.user.uid,
        });
        props.fetchDataWithQuery()
        console.log("Added to favorites successfully.");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
    }
   
  };
      const seperateCardRenderer=()=>{
        for (let index = 0; index < array.length; index++) {
        
        <StockCard
        favCryptos={props.favCryptos}
        userId={tempUser}
          location={true}
          addToFavorites={addToFavorites}
          singleCryptoData={props.cryptoData[i]}
        />
        }
      }
  return (
    <div id="stocksContainer">
      {props.cryptoData.map((item) => (
        <StockCard
        favCryptos={props.favCryptos}
        userId={tempUser}
          location={true}
          addToFavorites={addToFavorites}
          singleCryptoData={item}
        />
      ))}
    </div>

    // isFavorite={favorites[item.id] || false}
  );
};

export default Stocks;
