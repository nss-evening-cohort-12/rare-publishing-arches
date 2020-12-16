import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { PostContext } from "../posts/PostProvider"
import { CommentContext } from "./CommentProvider"
import { Comment } from "./Comment"
import "./PostComments.css"

export const PostComments = (props) => {
    const { getPosts, posts, searchTerms, getPostsByUserId } = useContext(PostContext)
    const { getCommentsByPostId } = useContext(CommentContext)
    const history = useHistory();

    const [filteredComments, setFilteredComments] = useState([])

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        
        getCommentsByPostId(postId)           
            .then(setFilteredComments)           
    }, [])

    return (
        <div>
            
            <div className="mt-5 mx-5 px-3">
                {
                    filteredComments.map(comment => <Comment key={comment.id} comment={comment} />)
                }
            </div>
        </div>
    )
}