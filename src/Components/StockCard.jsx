import { collection, getDocs, query, where,getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../config/firebase';
function StockCard(props) {
  const [isFavorite,setIsFavorite]=useState(false)
 
  const checkIfInFav= async()=>{
    const collectionRef=collection(db,"Favorites")
    const q = query(collectionRef,where("userId","==",props.userId),where("id","==",props.singleCryptoData.id))
    const querySnapshot= await getDocs(q)
    if(!querySnapshot.empty){
      setIsFavorite(true)
    }
    else{
      setIsFavorite(false)
    }
  }
  useEffect(()=>{
checkIfInFav()
  },[props.userId,props.favCryptos])
  const navigate =useNavigate()
  
  const goToSinglePage=(e)=>{
  
    navigate(`/CryptoToken/${props.singleCryptoData.id}`)
  }
 return (
  <div className="cryptoCard">
    <div className="cryptoHeader">
      <h2 className="cryptoName">{props.singleCryptoData.name}</h2>
      <p className="cryptoSymbol">{props.singleCryptoData.symbol}</p>
    </div>
    <div className="cryptoDetails">
      <p className="cryptoPrice">Price: {parseFloat(props.singleCryptoData.priceUsd).toFixed(8)}$</p>
      <p className="priceChange">Change (24h): {parseFloat(props.singleCryptoData.changePercent24Hr).toFixed(2)}%</p>
      <p className="cryptoRank">Ranking: {props.singleCryptoData.rank}</p>
    </div>
    <button className="seeMoreBtn" name={props.singleCryptoData.id} onClick={goToSinglePage}>
      See More
    </button>
    {props.userId.uid=="guest"?<div>{props.location?<i title="Must login to add to favorites"  className={`fa-solid fa-heart favoriteBtn disabledBtn`}  onClick={(e)=> {  alert("to save you need to login")}}></i>:null}</div>:<div>{props.location?<i title={`${isFavorite?"Remove from favorites":"Add to favorites"}`} className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart favoriteBtn`}  onClick={(e)=> {  props.addToFavorites(e,props.singleCryptoData)}}></i>:null}</div>}
    
    
    
  </div>
);


 
}

export default StockCard;
