import React, { useState } from "react"

export const AuthContext = React.createContext()

export const AuthProvider = (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    const [subscriberCount, setSubscriberCount] = useState(0)
    const [myUserId, setMyUserId] = useState(0)

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

    const getUserById = (id) => {
        return fetch(`http://localhost:8000/users/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
    }

    const partialyUpdateUser = (rareuserId, partialBody) => {
        return fetch(`http://localhost:8000/users/${rareuserId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(partialBody)
        })
            .then(getUsers)
    }

    const getSubscriptions = () => {
        return fetch("http://localhost:8000/subscriptions", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setSubscriptions)
    }

    const getSubscriberCount = () => {
        const body = { "token": `${localStorage.getItem("rare_user_id")}` }
        return fetch("http://localhost:8000/get_current_user", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                fetch(`http://localhost:8000/subscriptions?author=${res.user_id}`, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
                    }
                })
                    .then(res => res.json())
                    .then(res => setSubscriberCount(res.length))
            })
    }

    const subscribeToAuthor = (author_id) => {
        return fetch("http://localhost:8000/subscriptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({author_id: author_id})
        })
            .then(getSubscriptions)
    }

    const unsubscribeToAuthor = (id) => {
        return fetch(`http://localhost:8000/subscriptions/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({ended_on: true})
        })
            .then(getSubscriptions)
    }

    const getMyUserId = () => {
        const body = { "token": `${localStorage.getItem("rare_user_id")}` }
        return fetch("http://localhost:8000/get_current_user", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => setMyUserId(res.user_id))
    }

    return (
        <AuthContext.Provider value={{
            getUserAdminStatus, isAdmin, getUsers, users, getUserById, partialyUpdateUser, subscriptions, getSubscriptions, 
            subscribeToAuthor, unsubscribeToAuthor, subscriberCount, setSubscriberCount, getSubscriberCount, getMyUserId, myUserId
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
