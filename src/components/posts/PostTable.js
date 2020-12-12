import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { PostContext } from "./PostProvider"
import Post from "./Post"
import "./Posts.css"

export const PostTable = () => {
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
            <div className="posts post__table mt-5 mx-3 px-3">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredPosts.map(post => (
                                <tr key={post.id}>
                                    <td>{post.title}</td>
                                    <td>{post.rareuser && post.rareuser.user.first_name} {post.rareuser && post.rareuser.user.last_name}</td>
                                    <td>{post.publication_date}</td>
                                    <td>{post.category && post.category.label}</td>
                                    <td>{post.tags && post.tags.label}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}