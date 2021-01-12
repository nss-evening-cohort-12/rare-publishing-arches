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

    return (
        <ReactionContext.Provider value={{
            reactionsList, getReactions
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}