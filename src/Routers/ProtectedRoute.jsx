import React, { useContext } from 'react'
import { userContext } from './ContextProvider'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, roles}) => {

    const {role, isAuthenticated} = useContext(userContext);

    if(!isAuthenticated){
        return <Navigate to="/account/login"/>
    }

    if(!roles.includes(role)){
        return <Navigate to="/unauthorized" />
    }

    return children;
}

export default ProtectedRoute