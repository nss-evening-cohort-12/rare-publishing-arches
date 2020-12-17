import React, { useContext, useState, useEffect } from "react"
import { PostContext } from "../posts/PostProvider"
import { CommentContext } from "./CommentProvider"


export const CommentForm = (props) => {

    const { addComment, comments, updateComment, getComments } = useContext(CommentContext)
    const { getPostById } = useContext(PostContext)

    const [comment, setComment] = useState({})   
    const [post, setPost] = useState({})
    
    const postId = parseInt(props.match.params.postId)
    const editMode = props.match.params.hasOwnProperty("commentId")  // true or false

    const handleControlledInputChange = (event) => {
       
        const newComment = Object.assign({}, comment)          
        newComment[event.target.name] = event.target.value
        setComment(newComment) 
    }

    const getCommentInEditMode = () => {
        if (editMode) {
            const commentId = parseInt(props.match.params.commentId)
            const selectedComment = comments.find(a => a.id === commentId) || {}
            setComment(selectedComment)
        }
    }


    // Get data from API when component initilizes
    useEffect(() => {
        getComments();
    }, [])  

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
            .then(setPost)
    }, [])

    useEffect(() => {
        getCommentInEditMode()
    }, [comments])
    
    const constructNewComment = () => {
        
        if (editMode) {
            // PUT
            updateComment({
                id: comment.id,
                subject: comment.subject,
                content: comment.content,
                post_id: postId,               
                author_id: post.rareuser.id,
            })
                .then(() => props.history.push("/comments"))
        } else {
            // POST
            addComment({
                subject: comment.subject,
                content: comment.content,
                post_id: postId,               
                author_id: post.rareuser.id,
            })
                .then(() => props.history.push("/comments"))
        }

    }
    
    return (
        <div className="container w-50">
            <form className="commentForm">
                <h2 className="postForm__title"></h2>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="subject" required autoFocus className="form-control w-75"
                            placeholder="Comment Subject"
                            defaultValue={comment.subject}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="content" required autoFocus className="form-control w-75"
                            placeholder="Comment content"
                            defaultValue={comment.content}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        constructNewComment()
                    }}
                    className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}