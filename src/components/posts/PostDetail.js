import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { PostContext } from "./PostProvider"
import { PostTagList } from "../tags/PostTagList"
import { TagContext } from "../tags/TagProvider"
import "./Posts.css"

export const PostDetails = (props) => {
    const { releasePost, getPostById } = useContext(PostContext)
    const { postTags, getTagsByPostId } = useContext(TagContext)
    const history = useHistory();

    const [post, setPost] = useState({ user: {} })

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
            .then(setPost)
    }, [])

    return (
        <section className="post d-flex flex-row">
            <div className="post_details d-flex flex-column container">
                <h3 className="post__title text-center">{post.title}</h3>
                <div className="d-flex flex-row justify-content-between">
                    <div className="post__manage__buttons">
                        <i className="fas fa-trash-alt"></i>
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
                <div className="d-flex align-items-center border border-primary rounded px-5 mb-3">Tag</div>
                <div className="d-flex align-items-center border border-primary rounded px-5 mb-3">Tag</div>
                <div className="d-flex align-items-center border border-primary rounded px-5 mb-3">Tag</div>
                <div className="d-flex align-items-center border border-primary rounded px-5 mb-3">Tag</div>
                <div className="d-flex align-items-center border border-primary rounded px-5 mb-3">Tag</div>
                <div className="d-flex align-items-center border border-primary rounded px-5 mb-3">Tag</div>
            </div>
        </section>
    )
}
