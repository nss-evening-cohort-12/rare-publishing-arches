import React, { useState } from "react"

export const AuthContext = React.createContext()

export const AuthProvider = (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([])

    const getUserAdminStatus = () => {
        const body = { "token": `${localStorage.getItem("rare_user_id")}` }
        return fetch("http://localhost:8000/is_admin", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(response => setIsAdmin(response.is_user_admin))
    }

    const getUsers = () => {
        return fetch("http://localhost:8000/users", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setUsers)
    }

    return (
        <AuthContext.Provider value={{
            getUserAdminStatus, isAdmin, getUsers, users
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}