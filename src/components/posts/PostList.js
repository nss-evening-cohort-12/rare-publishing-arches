import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { PostContext } from "./PostProvider"
import Post from "./Post"
import "./Posts.css"

export const PostList = () => {
    const { getPosts, posts, searchTerms } = useContext(PostContext)
    const history = useHistory();

    const [filteredPosts, setFiltered] = useState([])

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        const matchingPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(matchingPosts)
    }, [searchTerms])


    useEffect(() => {
        setFiltered(posts)
    }, [posts])

    return (
        <div>
            <div className="d-flex flex-row justify-content-end">
                <button className="d-flex flex-row justify-content-center align-items-center post__add btn btn-primary mr-5"
                    onClick={() => history.push("/posts/create")}
                >
                    Add Post
                    <i className="fas fa-plus ml-4 mr-2"></i>
                </button>
            </div>
            <div className="posts post__list mt-5 mx-5">
                {
                    filteredPosts.map(post => <Post key={post.id} post={post} />)
                }
            </div>
        </div>
    )
}