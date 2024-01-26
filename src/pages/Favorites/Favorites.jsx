import React, { useEffect, useState } from "react";
import StockCard from "../../Components/StockCard";
import { collection, getDocs, query, where,getDoc,deleteDoc } from 'firebase/firestore';
import "./favorites.css"
import db from "../../config/firebase";
function Favorites(props) {
 
  const [loading, setLoading] = useState(true);
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
        const confirmDelete=confirm("are you sure you want to delete ?")
        if(confirmDelete){
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
        }
        
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


  return (
    <div >
      {props.user==undefined?<p>You must login before being able to add to favorites</p>:<div id="favCardContainer"> {props.favCryptos.length === 0 ? <p>You have no favorites saved up</p> : null}
      <button onClick={() => console.log(props.favCryptos)}>testclick</button>
      {props.favCryptos.map((item) => (
        
        <StockCard 
         favCryptos={props.favCryptos}
        userId={tempUser}
          location={true}
          addToFavorites={addToFavorites}
          singleCryptoData={item}/>
      ))}</div>}
     
    </div>
  );
}

export default Favorites;
