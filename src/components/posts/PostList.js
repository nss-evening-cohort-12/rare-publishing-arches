import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { PostContext } from "./PostProvider"
import Post from "./Post"
import "./Posts.css"

export const PostList = (props) => {
    const { getPosts, posts, searchTerms, getPostsByUserId } = useContext(PostContext)
    const history = useHistory();

    const [filteredPosts, setFiltered] = useState([])

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        if (props.location && props.location.pathname == '/user/posts') {
            // get posts by user id
            getPostsByUserId()
        } else {
            // get all posts
            getPosts()
        }
    }, [])

    useEffect(() => {
        posts.sort((a, b) => (a.publication_date > b.publication_date) ? -1 : 1)
        const matchingPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerms.toLowerCase()))
        const validPosts = matchingPosts.filter((post) => (Date.parse(post.publication_date) < Date.now()) && (post.approved === true))
        setFiltered(validPosts)
    }, [searchTerms])


    useEffect(() => {
        posts.sort((a, b) => (a.publication_date > b.publication_date) ? -1 : 1)
        const validPosts = posts.filter((post) => (Date.parse(post.publication_date) < Date.now()) && (post.approved === true))
        setFiltered(validPosts)
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
            <div className="posts post__list mt-5 mx-5 px-3">
                {
                    filteredPosts.map(post => <Post key={post.id} post={post} />)
                }
            </div>
        </div>
    )
}