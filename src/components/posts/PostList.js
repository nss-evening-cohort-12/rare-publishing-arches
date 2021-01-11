import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { PostContext } from "./PostProvider"
import { AuthContext } from '../auth/AuthProvider'
import Post from "./Post"
import "./Posts.css"

export const PostList = (props) => {
    const { getPosts, posts, searchTerms, getPostsByUserId, getPostsByCurrentUserId } = useContext(PostContext)
    const { getUserById } = useContext(AuthContext)  
    const [ userProfile, setUserProfile ] = useState({})

    const history = useHistory();

    const [filteredPosts, setFiltered] = useState([])

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        if (props.location && props.location.pathname.includes('/user/posts') && props.match.params.userId) {
            // get posts by user id
            getPostsByUserId(parseInt(props.match.params.userId))
        } else if (props.location && props.location.pathname === '/user/posts') {
            getPostsByCurrentUserId()
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

    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        getUserById(userId ? userId : localStorage.getItem("rare_user_id"))
            .then(setUserProfile)    
      }, [])

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
                <h2>{
                        props.location.pathname.includes('/user/posts') 
                            && userProfile.user && `${userProfile.user.first_name} ${userProfile.user.last_name}'s Posts`
                }</h2>
                {
                    filteredPosts.map(post => <Post key={post.id} post={post} />)
                }
            </div>
        </div>
    )
}
