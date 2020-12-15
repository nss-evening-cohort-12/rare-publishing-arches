import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getPosts = () => {
        return fetch("http://localhost:8000/posts", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostsByUserId = () => {
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
                fetch(`http://localhost:8000/users/${res.user_id}`, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
                    }
                })
                    .then(res => res.json())
                    .then(res => setPosts(res.posts))
            })
    }

    // const getPostById = (id) => {
    //     return fetch(`http://localhost:8088/posts/${id}?_expand=location&_expand=customer`)
    //         .then(res => res.json())
    // }

    const getPostById = (id) => {
        return fetch(`http://localhost:8000/posts/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
    }

    const addPost = post => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const updatePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const releasePost = (postId) => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
        })
            .then(getPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, addPost, getPosts, getPostById,
            searchTerms, setTerms, releasePost, updatePost,
            getPostsByUserId
        }}>
            {props.children}
        </PostContext.Provider>
    )
}