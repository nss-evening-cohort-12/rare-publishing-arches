import React from "react"
import "./Posts.css"
import { Link } from "react-router-dom"

export default ({ post }) => (
    <section className="post">
        <h3 className="post__title">
            <Link to={`/posts/${post.id}`}>
                { post.title }
            </Link>
        </h3>
        <div className="post__email">{ post.content }</div>
    </section>
)