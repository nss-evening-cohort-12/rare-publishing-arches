import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { PostContext } from "./PostProvider"
import "./Posts.css"

export const PostDetails = (props) => {
    const { getPostById, releasePost } = useContext(PostContext)
    const history = useHistory();
    const deletePostModal = useRef();

    const [post, setPost] = useState({})

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
            .then(setPost)
    }, [])

    return (
        <section className="post d-flex flex-row">
            <dialog className="dialog dialog--deletePost" ref={deletePostModal}>
                <h4>Are you sure you want to delete this post?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deletePost btn btn-outline-primary" onClick={() => {
                        releasePost(post.id)
                            .then(history.push("/posts"))
                    }}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deletePostModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            <div className="post_details d-flex flex-column container">
                <h3 className="post__title text-center">{post.title}</h3>
                <div className="d-flex flex-row justify-content-between">
                    <div className="post__manage__buttons">
                        <i className="fas fa-trash-alt post__hover__delete" onClick={() => {
                            deletePostModal.current.showModal()
                        }}></i>
                        <i className="fas fa-cog post__hover" onClick={() => history.push(`/posts/edit/${post.id}`)}></i>
                    </div>
                    <div>
                        <small>{post.category && post.category.label}</small>
                    </div>
                </div>
                <div className="text-center">
                    <img className="mb-5 img-fluid w-100" src="https://via.placeholder.com/400x100" />
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <small>By {post.rareuser && post.rareuser.user.first_name} {post.rareuser && post.rareuser.user.last_name}</small>
                    </div>
                    <div>
                        <button className="btn btn-outline-primary">View Comments</button>
                    </div>
                    <div className="d-flex align-items-center border border-primary rounded px-3 h-100">
                        Reactions go here
                    </div>
                </div>
                <div className="post__content">
                    {post.content}
                </div>
            </div>
            <div className="mx-5">
                {post.tags && post.tags.map(tag => (
                    <div key={tag.id} className="d-flex align-items-center border border-primary rounded px-5 mb-3">{tag.label}</div>
                ))}
            </div>
        </section>
    )
}
