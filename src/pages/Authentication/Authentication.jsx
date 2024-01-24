import React, { useEffect, useState } from "react";
import "./authentication.css"
import { getAuth,updateProfile, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged  } from "firebase/auth";
import SignIn from "../../Components/authCompo/SignIn";
import SignUp from "../../Components/authCompo/SignUp";
import db from "../../config/firebase";
import {addDoc, collection,doc,getDoc, setDoc,} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';




function Authentication(props) {
  const [isLoginMode,setIsLoginMode]=useState(true)
  const [tempUser,setTempUser]= useState({})
  const navigate = useNavigate( )
  

  const toggleMode= async()=>{ //switches between signIn and SignUp forms
    setIsLoginMode(!isLoginMode)
    
  }


  const changeHandler=(e)=>{//help to save the user's data
    e.preventDefault()
    tempUser[e.target.name]=e.target.value
    setTempUser({...tempUser })
  }


  const signUp=(e)=>{//let the user to sign in
    e.preventDefault()
    const auth = getAuth();
    const userEmail= tempUser.userEmail
    const userPassword =tempUser.userPassword
    const userName =tempUser.userName
    
    createUserWithEmailAndPassword(auth,userEmail,userPassword)
      .then( async (userCredential) => {
        const user = userCredential.user;
        const displayName = userName;
    updateProfile(user, { displayName })

        await setDoc(doc(db,"users",user.uid),{userEmail,userName,role:"regular"})
        setIsLoginMode(true)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log("HELPPPPP");
      });
  }


  const signIn=(e)=>{//let the user to sign up
    e.preventDefault()

    const auth = getAuth();
    signInWithEmailAndPassword(auth,tempUser.userEmail, tempUser.userPassword)
      .then( async (userCredential) => {
        const user = userCredential.user;
        const docRef= doc(db,"users",user.uid)
        const docData= await getDoc(docRef)
        console.log(docData.data());
        props.setUser({...docData.data(), uid:docData.id});
        navigate('/')

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      });

  }




  return <div>
{props.user? <div>
  <button onClick={logOut}>Log out</button>
</div>:<div >{isLoginMode?<SignIn toggleMode={toggleMode} signIn={signIn} changeHandler={changeHandler}/>:<SignUp toggleMode={toggleMode} signUp={signUp} changeHandler={changeHandler}/>} </div>}
  </div>;
}

export default Authentication;
