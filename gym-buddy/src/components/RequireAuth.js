import {Navigate} from 'react-router-dom'
import React from 'react'

export default function RequireAuth ({children}) {
  const username = JSON.parse(localStorage.getItem("user"));
  const role = JSON.parse(localStorage.getItem("role"));

  if(!username){
    return <Navigate to='/login' />
  }
  return children
}

  