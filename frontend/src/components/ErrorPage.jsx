import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
  const navigate=useNavigate()
  return <div ><h1>404 error</h1>
  <button onClick={()=>navigate('/')}>navigate to home page</button></div>
  
}
