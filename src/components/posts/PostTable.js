import React, { useState, useContext, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom'
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
                                    <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
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