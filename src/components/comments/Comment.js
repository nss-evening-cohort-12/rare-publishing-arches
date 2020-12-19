import React from "react"
import "./PostComments.css"

export const Comment = (props) => (
    <div className="col col-4 comment p-5 m-2">
      <div className="row">
        <p className="col col-8">{props.comment.content}</p> 
        <div className="commenticon">   
          <div className="commenticon d-inline">
            <i className="far fa-trash-alt" id={props.comment.id} onClick={e => {
              props.setDeletedCommentId(props.comment.id)
              props.deleteCommentDialog.current.showModal() 
            }}></i>
          </div>
          <div className="commenticon d-inline">
            <i className="fas fa-cog" id={props.comment.id} data-commentsubject={props.comment.subject} data-commentcontent={props.comment.content} onClick={props.editAComment} ></i>
          </div>
        </div>  
      </div>
      <h6 className="m-0">{props.comment.author.user.first_name} {props.comment.author.user.last_name}</h6>
      
    </div>
)


