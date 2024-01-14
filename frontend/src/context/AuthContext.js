import React, { createContext, useState, useEffect } from 'react'
import {Router, useNavigate} from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(
        () => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    )
    let [user, setUser] = useState(
        () => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
    )
    const navigate = useNavigate();

    let loginUser = async(e) => {
        e.preventDefault()
        let response = await fetch(
            'http://127.0.0.1:8000/api/token/',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'username': e.target.username.value, 'password': e.target.password.value
                })
            },
        )
        let data = await response.json()
        console.log(data)
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Something went wrong!')
        }
    }

    let logout = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}