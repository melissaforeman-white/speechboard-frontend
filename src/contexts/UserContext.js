import { createContext, useState, useEffect } from 'react';
import AccountsAPI from '../api/AccountsAPI'
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"

const UserContext = createContext()

export default UserContext;

export const UserProvider = ({children}) => {

    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault();
        let username = e.target[0].value
        let password = e.target[1].value
        let response = await AccountsAPI.accountLogin(username, password)
        if (response) {
            setAuthTokens(response)
            let userData= jwt_decode(response.access)
            setUser(userData)
            console.log('the user is ', userData)
            localStorage.setItem('authTokens', JSON.stringify(response))
            navigate('/')

        }
        console.log('response ',response)
        console.log('the token is ', authTokens)
        console.log('the user is ', user)
    }

    let logoutUser = () => {
        setUser(null)
        setAuthTokens(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }
    let updateToken = async () => {
        console.log('update token called')
        let response = await AccountsAPI.updateToken(authTokens.refresh)
        if (response) {
            setAuthTokens(response)
            let userData= jwt_decode(response.access)
            setUser(userData)
            localStorage.setItem('authTokens', JSON.stringify(response))
        }
        else {
            logoutUser()
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        let fiveMinutes = 1000 * 60 * 5
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fiveMinutes)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])


    return (
        <UserContext.Provider value={contextData}>
            { children }
        </UserContext.Provider>
    )
}