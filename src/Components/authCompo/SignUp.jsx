import React from 'react'

function SignUp(props) {
  return (
    <div className='logInModeContainer'>
       <form onSubmit={props.signUp}>
        <label htmlFor="userNameInput">Username:</label>
        <input onChange={props.changeHandler} type="text" name='userName' id='userNameInput' required/> 
        <label htmlFor="userEmailInput">Email:</label>
        <input onChange={props.changeHandler}  type="email" name='userEmail' id='userEmailInput' required/>
        <label htmlFor="userPasswordInput">Password:</label>
        <input onChange={props.changeHandler}  type="password" name='userPassword' id='userPasswordInput' required/>
        <button type='sumbit'>Sign up</button>
     </form>
     <button className='switchSignUpLogInBtn' type='button' onClick={props.toggleMode}>already have an account click here</button>

    </div>
  )
}

export default SignUp
