import React from "react"
import "./PostComments.css"

export const Comment = (props) => (
    <div className="col col-4 comment p-5 m-2">
    <div className="commenticon">
        <i className="fas fa-cog" id={props.comment.id} data-commentname={props.comment.subject} onClick={props.editAComment} ></i></div>
    <div className="commenticon">
        <i className="far fa-trash-alt" id={props.comment.id} onClick={e => {
        props.setDeletedCommentId(props.comment.id)
        props.deleteCommentDialog.current.showModal() 
      }
    }></i></div>
    <p>{props.comment.content}</p>
    <h1>{props.comment.author.id}</h1>
  </div>
)


