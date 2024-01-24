import { addDoc, collection, doc, getDoc,setDoc,getDocs,query,where,deleteDoc } from "firebase/firestore";
import StockCard from "../../Components/StockCard";
import "./stocks.css"
import db from "../../config/firebase";
import { useEffect, useState } from "react";
import { useLocation  } from 'react-router-dom';


const Stocks = (props) => {
  const location=useLocation().pathname
  const [favorites, setFavorites] = useState({});
  
  const checkIfFavoriteExists = async (FavCryptoId) => {
    try {
      const collectionRef = collection(db, "Favorites");
  
      // Perform a query to check if the document exists
      const querySnapshot = await getDocs(
        query(collectionRef, where("id", "==", FavCryptoId.id), where("userId", "==", props.user.uid))
      );
  
      // If there are any documents matching the query, it means the favorite already exists
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking if favorite exists:", error.message);
      return false; // Return false in case of an error
    }
  };
  // useEffect(async()=>{
   
  // },[favorites])
  const addToFavorites = async (e,FavCryptoId) => {
    
    try {
      // Check if the favorite already exists before adding
      const favoriteExists = await checkIfFavoriteExists(FavCryptoId);
  
      if (favoriteExists) {
        
        const collectionRef = collection(db, "Favorites");
        const q=query(collectionRef, where("id", "==", FavCryptoId.id), where("userId", "==", props.user.uid))
        const querySnapshot=await getDocs(q)
        querySnapshot.forEach(async(doc)=>{
            await deleteDoc(doc.ref)
        })
        setFavorites((prevFavorites) => {
          const { [FavCryptoId.id]: _, ...newFavorites } = prevFavorites;
          return newFavorites;
        });
        console.log("removed from fav");
        
      } else {
        
        const collectionRef = collection(db, "Favorites"); 
        await addDoc(collectionRef, {id: FavCryptoId.id,userId: props.user.uid,});
    
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [FavCryptoId.id]: true,
      }));
        console.log("Added to favorites successfully.");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
    }
   
  };
  
  return( <div id="stocksContainer">
    {props.cryptoData.map((item) => (
      <StockCard location={location}    isFavorite={favorites[item.id] || false}   addToFavorites={addToFavorites} singleCryptoData={item}  />
    ))}
  </div>
  
   
     
    
  )
  
  
 
};

export default Stocks;
