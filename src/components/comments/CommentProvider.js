import React, { useState } from "react"

export const CommentContext = React.createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getComments = () => {
        return fetch("http://localhost:8000/comments", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setComments)
    }

    const getCommentsByUserId = () => {
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
                fetch(`http://localhost:8000/comments?user=${res.user_id}`, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
                    }
                })
                    .then(res => res.json())
                    .then(res => setComments(res.comments))
            })
    }

    const getCommentsByPostId = (postId) => {
        return fetch(`http://localhost:8000/comments?post=${postId}`, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
                    }
                })
                    .then(res => res.json())            
    }

    // const getCommentById = (id) => {
    //     return fetch(`http://localhost:8088/comments/${id}?_expand=location&_expand=customer`)
    //         .then(res => res.json())
    // }

    const getCommentById = (id) => {
        return fetch(`http://localhost:8000/comments/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
    }

    const addComment = comment => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
    }

    const updateComment = comment => {
        return fetch(`http://localhost:8000/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
    }

    const releaseComment = (commentId) => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
        })
            .then(getComments)
    }

    return (
        <CommentContext.Provider value={{
            comments, addComment, getComments, getCommentById,
            releaseComment, updateComment,
            getCommentsByUserId, getCommentsByPostId
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}