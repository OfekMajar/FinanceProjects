import React from 'react'

function SignIn(props) {
  return (
    <div className='logInModeContainer'>
     <form onSubmit={props.signIn}>
        <label htmlFor="userEmailInput">Email:</label>
        <input onChange={props.changeHandler}  type="email" name='userEmail' id='userEmailInput'/>
        <label htmlFor="userPasswordInput">Password:</label>
        <input onChange={props.changeHandler} type="password" name='userPassword' id='userPasswordInput'/>
        <button type='sumbit'>Sign in</button>
     </form>
     <button type='button' onClick={props.toggleMode}>don't have an account click here</button>
    </div>
  )
}

export default SignIn
