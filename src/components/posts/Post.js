import React from "react"
import "./Posts.css"
import { Link } from "react-router-dom"

export default ({ post }) => (
    <section className="post p-5 mb-5 border">
        <div className="d-flex flex-row justify-content-between">
            <h3 className="post__title">
                <Link to={`/posts/${post.id}`}>
                    {post.title}
                </Link>
            </h3>
            <small>Publication Date: {post.publication_date}</small>
        </div>
        <div className="d-flex flex-row justify-content-center">
            <img className="mb-5 img-fluid" src="https://via.placeholder.com/400x200" />
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="">Author: {post.rareuser && post.rareuser.user.first_name} {post.rareuser && post.rareuser.user.last_name}</div>
            <div className="border rounded-pill p-2"><small># Reaction Count</small></div>
        </div>
    </section>
)