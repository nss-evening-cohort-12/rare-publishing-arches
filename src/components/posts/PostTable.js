import React, { useState, useContext, useEffect, useRef } from "react"
import { Link, useHistory } from 'react-router-dom'
import { PostContext } from "./PostProvider"
import { AuthContext } from "../auth/AuthProvider"
import Post from "./Post"
import "./Posts.css"

export const PostTable = () => {
    const { getPosts, posts, searchTerms, releasePost } = useContext(PostContext)
    const { isAdmin } = useContext(AuthContext)
    const history = useHistory();
    const deletePostModal = useRef();

    const [userId, setUserId] = useState(-1)
    const [filteredPosts, setFiltered] = useState([])
    const [postToBeDeleted, setPostToBeDeleted] = useState(0)

    const getUserId = () => {
        const body = { "token": `${localStorage.getItem("rare_user_id")}` }
        return fetch("http://localhost:8000/get_current_user", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => setUserId(res.user_id))
    }

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        getPosts()
        getUserId()
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
            <dialog className="dialog dialog--deletePost" ref={deletePostModal}>
                <h4>Are you sure you want to delete this post?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deletePost btn btn-outline-primary" onClick={() => {
                        releasePost(postToBeDeleted)
                            .then(history.push("/posts"))
                            .then(deletePostModal.current.close())
                    }}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deletePostModal.current.close()}>Cancel</button>
                </div>
            </dialog>
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
                            <th scope="col"></th>
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
                                    {((post.rareuser && post.rareuser.id) == userId) || (isAdmin) ? (
                                        <td className="p-0">
                                            <div className="d-flex flex-row justify-content-around h-100 align-items-center">
                                                <Link to={`posts/edit/${post.id}`} ><i className="fas fa-cog"></i></Link>
                                                <i className="far fa-trash-alt text-danger post__hover__delete"
                                                    onClick={() => {
                                                        setPostToBeDeleted(post.id)
                                                        deletePostModal.current.showModal()
                                                    }}
                                                ></i>
                                            </div>
                                        </td>) : <td></td>}
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