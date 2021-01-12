import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { PostContext } from "./PostProvider"
import { PostReaction } from "../reactions/PostReaction"
import { ReactionContext } from "../reactions/ReactionProvider"
import "./Posts.css"

export const PostDetails = (props) => {
    const { getPostById, releasePost } = useContext(PostContext)
    const { reactionsList, getReactions } = useContext(ReactionContext)
    const history = useHistory();
    const deletePostModal = useRef();

    const [post, setPost] = useState({})

    const [reactionCounts, setReactionCounts] = useState([])
    const [showReactionSelector, setShowReactionSelector] = useState(false)
    const [currentUserPostReactions, setCurrentUserPostReactions] = useState([])

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
            .then(setPost)
    }, [])

    useEffect(() => {
        getReactions()
    }, [])

    const getReactionCounts = (reactionsArray) => {
        var reactionCountsArray = [];
        var reactionCounts = {}

        // Initialize the reactionCounts array with the reaction and its respective count
        reactionsArray.forEach(reaction => {
            reactionCounts[reaction.reaction.id] = { ...reaction.reaction, "count": 0 }
        })

        // Loop over each reaction on the post and count the unique reactions
        reactionsArray.forEach(reaction => {
            reactionCounts[reaction.reaction.id].count += 1
            // reactionCounts[reaction.reaction.id].users.push(reaction.user.id)
        })

        Object.keys(reactionCounts).forEach(reaction => {
            reactionCountsArray.push(reactionCounts[reaction])
        })

        // Set the counts of the unique reactions
        setReactionCounts(reactionCountsArray)
    }

    useEffect(() => {
        post.reactions && getReactionCounts(post.reactions)
    }, [post])

    useEffect(() => {
        const body = { "token": `${localStorage.getItem("rare_user_id")}` }
        fetch("http://localhost:8000/get_current_user", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                const userReactions = [];
                post.reactions && post.reactions.forEach(postReaction => {
                    if (postReaction.user.id === res.user_id) {
                        userReactions.push(postReaction.reaction.id)
                    }
                })
                setCurrentUserPostReactions(userReactions);
            })
    }, [reactionCounts])

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
            <div className="post_details d-flex flex-column container mr-0">
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
                        <small >Published on {post.publication_date} </small>
                        <small className="d-block"> By {post.rareuser && post.rareuser.user.first_name} {post.rareuser && post.rareuser.user.last_name}</small>
                    </div>
                    <div>
                        <button className="btn btn-outline-primary mt-0" onClick={() => history.push(`/post/${post.id}/comments`)}>View Comments</button>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center border border-primary rounded px-3 h-100 reaction__container" onClick={() => { setShowReactionSelector(prev => !prev) }}>
                            {post.reactions && post.reactions.length > 0 ? (
                                reactionCounts && reactionCounts.map(reaction => (
                                    <PostReaction key={reaction.id} reaction={reaction} />
                                ))
                            ) : ('No Reactions Yet')}
                        </div>
                        {showReactionSelector ? (
                            <div className="text-center">
                                <strong>Reaction Selector</strong>
                                <div className="d-flex flex-column">
                                    {reactionsList && reactionsList.map(reaction => (
                                        // <div className="d-flex flex-row ml-5">
                                        <div className={`d-flex flex-row ml-5 ${currentUserPostReactions && currentUserPostReactions.find(rc => rc === reaction.id) ? 'reaction__highlight' : ''}`}>
                                            <img className="mr-4" height="25" width="25" src={reaction.image_url} alt="test" />
                                            <span>{reaction.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : ('')}
                    </div>
                </div>
                <div className="post__content">
                    {post.content}
                </div>
            </div>
            <div className="mr-auto">
                {post.tags && post.tags.map(tag => (
                    <div key={tag.id} className="d-flex align-items-center border border-primary rounded px-5 mb-3">{tag.label}</div>
                ))}
            </div>
        </section>
    )
}
