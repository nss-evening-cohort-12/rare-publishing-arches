import React, { useState, useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"
import Post from "./Post"
import "./Posts.css"

export const PostList = ({ history }) => {
    const { getPosts, posts, searchTerms } = useContext(PostContext)

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
        <div style={{ marginTop: "2rem"}}>
            <button onClick={() => history.push("/posts/create")}>
                Make New Post
            </button>
            <div className="posts">
                {
                    filteredPosts.map(post => <Post key={post.id} post={post} />)
                }
            </div>
        </div>
    )
}