import React, { useState } from "react"

export const ReactionContext = React.createContext()

export const ReactionProvider = (props) => {
    const [reactionsList, setReactionsList] = useState([])

    const getReactions = () => {
        return fetch("http://localhost:8000/reactions", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(res => setReactionsList(res.results))
    }

    const createPostReaction = (postDetails) => {
        return fetch("http://localhost:8000/postreactions", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postDetails)
        })
            .then(res => res.json())
    }

    const deletePostReaction = (postDetails) => {
        return fetch("http://localhost:8000/postreactions", {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postDetails)
        })
    }

    return (
        <ReactionContext.Provider value={{
            reactionsList, getReactions, createPostReaction, deletePostReaction
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}