import React, { createContext } from 'react'

export const userContext = createContext()

const ContextProvider = ({ children }) => {

    const role = localStorage.getItem('role');
    const jwtToken = localStorage.getItem('jwtToken');
    const isAuthenticated = jwtToken !== null && jwtToken !== '';

    return (
        <userContext.Provider value={{role, isAuthenticated}}>
            {children}
        </userContext.Provider>
    )
}

export default ContextProvider