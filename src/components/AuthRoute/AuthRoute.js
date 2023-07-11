import React from 'react'
import { useSelector } from 'react-redux'

const AuthenticatedRoute = ({ children }) => {
 const { userInfo } = useSelector((state) => state?.users?.userAuth)

 if (!userInfo) {
  window.location.href = '/login'
  return null
 }
  return (
    <div>
      {children}
    </div>
  )
}

export default AuthenticatedRoute
