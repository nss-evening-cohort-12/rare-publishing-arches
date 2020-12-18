import React, { useState, useContext, useEffect, useRef } from "react"
import { CommentContext } from "./CommentProvider"
import { Comment } from "./Comment"
import "./PostComments.css"


export const PostComments = (props) => {

    const editCommentDialog = useRef()
    const deleteCommentDialog = useRef()

    
    const { addComment, releaseComment, updateComment, getCommentsByPostId } = useContext(CommentContext)
    
    
    const [editedSubject, setEditSubject] = useState("")    
    const [editedContent, setEditContent] = useState("")    
    const [editCommentId, setEditCommentId] = useState(0)
    const [deletedCommentId, setDeletedCommentId] = useState(0)
    

    const [filteredComments, setFilteredComments] = useState([])
    const postId = parseInt(props.match.params.postId)

    useEffect(() => {        
        getCommentsByPostId(postId)           
            .then(setFilteredComments)           
    }, [])
  
    // Component state
    const [comment, setComment] = useState({})
    

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newComment = Object.assign({}, comment)          // Create copy
        newComment[event.target.name] = event.target.value    // Modify copy
        setComment(newComment)                                 // Set copy as new state
    } 


    const handleInput = () => { 
        
            // POST
            console.log("adding a comment")
            addComment({
                post_id: postId,
                subject: comment.subject,
                content: comment.content,                
            })
            .then(() => props.history.push(`/posts/${postId}`))
    }

    const handleEditInput =() => {
        updateComment({
            id: editCommentId,
            subject: editedSubject,
            content: editedContent
        })
        .then(() => props.history.push(`/posts/${postId}`)) 
    }

  
    const editAComment = (e) => {
      console.log(e.target)
      setEditSubject(e.target.dataset.commentsubject)
      setEditContent(e.target.dataset.commentcontent)
      setEditCommentId(e.target.id)
      editCommentDialog.current.showModal()
    }
  
    const deleteAComment = (e) => {
      releaseComment(deletedCommentId)
      .then(deleteCommentDialog.current.close())
      .then(setDeletedCommentId(0))
      .then(() => props.history.push(`/posts/${postId}`))
    }   

    return (
        <div className="container">

            <div className="">
                    <div className="row justify-content-center"> 
                        <div className="addCommentForm d-flex flex-column justify-content-around align-items-center">
                            <h2>Post Title's Comments</h2>
                            <input className="commentInput" name="subject" type="text" placeholder="Add subject" defaultValue={comment.subject} onChange={handleControlledInputChange}></input>
                            <textarea className="commentInput" name="content" type="text" placeholder="Add content" value={comment.content} onChange={handleControlledInputChange}></textarea>
                            <button className="createComment" onClick={handleInput}>Create</button>
                        </div>
                    </div>
                    <dialog className="dialog dialog--editComment" ref={editCommentDialog}>
                        <div className="d-flex flex-column justify-content-around align-items-center">
                            <h4>Edit this comment</h4>
                            <input className="form-control mb-5" type="text" placeholder="Add subject" value={editedSubject} onChange={e => {
                            setEditSubject(e.target.value)
                            }}></input>
                            <input className="form-control mb-5" type="text" placeholder="Add content" value={editedContent} onChange={e => {
                            setEditContent(e.target.value)
                            }}></input>
                            <div className="d-flex flex-row justify-content-around align-items-center w-100">
                            <button className="createComment btn btn-outline-primary" onClick={handleEditInput}>Ok</button>
                            <button className="btn btn-outline-primary" onClick={e => editCommentDialog.current.close()}>Close</button>
                            </div>
                        </div>
                    </dialog>
                    <dialog className="dialog dialog--deleteComment text-center" ref={deleteCommentDialog}>
                        <h4>Are you sure you want to delete this comment?</h4>
                        <div className="d-flex flex-row justify-content-around align-items-center w-100">
                        <button className="deleteComment btn btn-outline-primary" onClick={deleteAComment}>Ok</button>
                        <button className="btn btn-outline-primary" onClick={e => deleteCommentDialog.current.close()}>Close</button>
                        </div>
                    </dialog>
                    <div className="container">
                        <div className="row justify-content-around">
                        {
                           filteredComments.map(comment => <Comment key={comment.id} comment={comment} deleteCommentDialog={deleteCommentDialog} setComment={setComment} setDeletedCommentId={setDeletedCommentId} editAComment={editAComment} />)
                        }
                        </div>
                    </div>
                    
            </div>           
            
        </div>
    )
}