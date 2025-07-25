import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {

  const navigate = useNavigate();
  return (
    <>
      <h3>Welcome to Sales-savvy</h3>
      <h5>- Your 1 stop shopping solution!</h5>

      <button onClick={() => navigate('/sign_in_page')}>
        SIGN IN
      </button>
      
      <br></br>
      
      <button onClick={() => navigate('/sign_up_page')}>
        SIGN UP
      </button>


    </>
  )
}