import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

    const access = localStorage.getItem('access_token')
    
    return access ? <Outlet/> : < Navigate  to='/signin' replace/>
}

export default ProtectedRoutes