import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function StockCard(props) {
  
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
    {props.location=="/Stocks"?<i  className={`fa-${props.isFavorite ? 'solid' : 'regular'} fa-heart favoriteBtn`} onClick={(e)=> {  props.addToFavorites(e,props.singleCryptoData)}}></i>:null}
    
    
  </div>
);


 
}

export default StockCard;
