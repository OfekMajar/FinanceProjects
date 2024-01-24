import React, { useEffect, useRef, useState } from 'react';
import {useParams} from "react-router-dom"
import "./SinglePage.css"


function SinglePage(props) {
  const canvasRef = useRef(null);
  const [hoveredData, setHoveredData] = useState(null);
  const [currentCryptoIdData,setCurrentCryptoIdData]= useState([{}])
  const currentCryptoId=useParams().CryptoId
const graphFetcher = () => {
  fetch(`https://api.coincap.io/v2/assets/${currentCryptoId}/history?interval=d1`)
    .then((res) => res.json())
    .then((data) => {
      const tempObj = data.data;
      console.log({ ...tempObj });
   setCurrentCryptoIdData(tempObj)
    })
    .catch((err) => {
      console.error(err);
      console.log("something went wrong");
    });
};

  useEffect (()=>{
    graphFetcher()
  },[])
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  
    const data = currentCryptoIdData;
  
    // Define the dimensions of the graph
    const graphWidth = 800;
    const graphHeight = 400;
  
    // Find the minimum and maximum values of the price for scaling
    const minPrice = Math.min(...data.map((entry) => parseFloat(entry.priceUsd)));
    const maxPrice = Math.max(...data.map((entry) => parseFloat(entry.priceUsd)));
  
    // Function to convert time to x-coordinate
    const timeToX = (time) => {
      const minTime = data[0].time;
      const maxTime = data[data.length - 1].time;
      const normalizedTime = (time - minTime) / (maxTime - minTime);
      return normalizedTime * graphWidth;
    };
  
    // Function to convert price to y-coordinate
    const priceToY = (price) => {
      const normalizedPrice = (parseFloat(price) - minPrice) / (maxPrice - minPrice);
      return (1 - normalizedPrice) * graphHeight;
    };
  
    // Function to handle mouse movement
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
  
      // Find the closest data point based on mouse position
      const closestDataPoint = data.reduce((closest, current) => {
        const x = timeToX(current.time);
        const y = priceToY(current.priceUsd);
        const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
  
        if (!closest || distance < closest.distance) {
          return { dataPoint: current, distance };
        }
  
        return closest;
      }, null);
  
      setHoveredData(closestDataPoint ? closestDataPoint.dataPoint : null);
    };
  
    // Function to handle mouse leaving the canvas
    const handleMouseLeave = () => {
      setHoveredData(null);
    };
  
    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
  
    // Drawing logic for the line chart
    context.clearRect(0, 0, graphWidth, graphHeight);
  
    context.beginPath();
    context.moveTo(timeToX(data[0].time), priceToY(data[0].priceUsd));
  
    for (let i = 1; i < data.length; i++) {
      const x = timeToX(data[i].time);
      const y = priceToY(data[i].priceUsd);
      context.lineTo(x, y);
    }
  
    context.stroke();
  
    // Cleanup event listeners on component unmount
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [currentCryptoIdData, hoveredData]);
  
  return (
    <div id="singleStock">
      <div id='singleStockInfoBox'>
      <h2>{currentCryptoId}:</h2>
      <p></p>
      <canvas className='canvas-container' ref={canvasRef} width={800} height={400}/>
      {hoveredData && (
        <div id='priceShoer' >
          <p>Price: {parseFloat(hoveredData.priceUsd).toFixed(2)}$</p>
          <p>Time: {new Date(hoveredData.time).toLocaleString()}</p>
        </div>
      )}
    </div>
    </div>
  );
 

}

export default SinglePage;
