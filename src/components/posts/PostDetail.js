import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { PostTagList } from "../tags/PostTag"
import "./Posts.css"

export const PostDetails = (props) => {
    const { releasePost, getPostById } = useContext(PostContext)

    const [post, setPost] = useState({ user: {} })

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
            .then(setPost)
    }, {})

    return (
        <section className="post">
            <h3 className="post__title">{post.title}</h3>
            <div className="post__email">{post.content}</div>
            {/* <div className="post__owner">User: {post.first_name.name}</div> */}

            <PostTagList postId={post.id} />

            <button onClick={() => releasePost(post.id).then(() => props.history.push("/posts"))} >Release Post</button>

            <button onClick={() => {
                props.history.push(`/posts/edit/${post.id}`)
            }}>Edit</button>
        </section>
    )
}
