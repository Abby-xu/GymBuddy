import React, { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedRole = JSON.parse(localStorage.getItem("role"));
    
        if (storedUser && storedRole) {
            setUser(storedUser);
            setRole(storedRole);
        }

    }, []);

    const login = (username, identity) => {
        setUser(username)
        setRole(identity);
        localStorage.setItem("user", JSON.stringify(username));
        localStorage.setItem("role", JSON.stringify(identity));
    }

    const logout = () => {
        setUser('')
        setRole('')
        localStorage.removeItem("user");
        localStorage.removeItem("selectedDate");
        localStorage.removeItem("role");
    }

    return (
        <AuthContext.Provider value={{user, role, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
 }

 export const useAuth = () => {
    return useContext(AuthContext)
 }