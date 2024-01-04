import React from 'react'
import { useAppSelector } from '../store/configureStore'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
/**
  * It is a React function component for route protection.
  * It uses Redux to obtain the current user status and determine routing navigation based on whether the user exists.
  * If the user is not logged in, it will redirect to the login page. If the user is logged in, the corresponding subcomponent is rendered.
  *
  * @returns If the user is not logged in, returns the Navigate component that redirects to the login page. Otherwise, return to the Outlet component to continue rendering child routes.
  */
export default function RequireAuth() {
    const {user}=useAppSelector(state=>state.account);
    const location=useLocation();

    if(!user){
        toast.warn('You should log in before check out')
        return <Navigate to='/login' state={{from: location}}/>

    }
    return <Outlet/>
}
