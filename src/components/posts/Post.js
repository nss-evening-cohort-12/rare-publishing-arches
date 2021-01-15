import React from "react"
import "./Posts.css"
import { Link } from "react-router-dom"

export default (props) => (
    <section className="post p-5 mb-5 border">
        <div className="d-flex flex-row justify-content-between">
            <h3 className="post__title">
                <Link to={`/posts/${props.post.id}`}>
                    {props.post.title}
                </Link>
            </h3>
            <small>Publication Date: {props.post.publication_date}</small>
        </div>
        <div className="d-flex flex-row justify-content-center">
            <img className="mb-5 img-fluid" src="https://via.placeholder.com/400x200" />
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="">Author: {props.post.rareuser && props.post.rareuser.user.first_name} {props.post.rareuser && props.post.rareuser.user.last_name}</div>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="border rounded-pill p-2"><small># Reaction Count</small></div>
                <Link to={`/posts/edit/${props.post.id}`}>
                    <div className="posticon"><i className="fas fa-cog fa-2x"></i></div>
                </Link>
                <div className="posticon"><i className="far fa-trash-alt fa-2x post__hover__delete" id={props.post.id} onClick={e => {
                    props.setDeletePostId(props.post.id)
                    props.deletePostModal.current.showModal()
                }}></i></div>
            </div>
        </div>
    </section>
)
