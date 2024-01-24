import React from "react";

function HomePage(props) {
  return <div>
    <button onClick={()=>console.log(props.user)}></button>
  </div>;
}

export default HomePage;
