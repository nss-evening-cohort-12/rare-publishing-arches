import React, { useState, useContext, useEffect, useRef } from "react"
import { Link, useHistory } from 'react-router-dom'
import { PostContext } from "./PostProvider"
import { AuthContext } from '../auth/AuthProvider'
import "./Posts.css"

export const PostTable = () => {
    const { getPosts, posts, searchTerms, releasePost, updatePost } = useContext(PostContext)
    const { isAdmin } = useContext(AuthContext);
    const history = useHistory();
    const deletePostModal = useRef();

    const [filteredPosts, setFiltered] = useState([])
    const [postToBeDeleted, setPostToBeDeleted] = useState(0)

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

    const handleTagUpdate = e => {
        
        
    }

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
                            {isAdmin ? (<th scope="col">Approved</th>) : (<></>) }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredPosts.map(post => (
                                <tr key={post.id}>
                                    <td className="d-flex flex-row justify-content-around h-100 align-items-center p-0">
                                        <Link to={`posts/edit/${post.id}`} ><i className="fas fa-cog"></i></Link>
                                        <i className="far fa-trash-alt text-danger"
                                            onClick={() => {
                                                setPostToBeDeleted(post.id)
                                                deletePostModal.current.showModal()
                                            }}
                                        ></i>
                                    </td>
                                    <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                                    <td>{post.rareuser && post.rareuser.user.first_name} {post.rareuser && post.rareuser.user.last_name}</td>
                                    <td>{post.publication_date}</td>
                                    <td>{post.category && post.category.label}</td>
                                    <td>{post.tags && post.tags.label}</td>
                                    {isAdmin ? (<td>
                                        <input type="checkbox" name="isApproved" checked={post.approved} value={post.id} onChange={handleTagUpdate} />
                                        </td>) : (<></>) }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}