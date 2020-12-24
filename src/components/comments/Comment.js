import React from "react"
import "./PostComments.css"

export const Comment = (props) => (
    <div className="col col-4 comment p-5 m-2">
      
      <div className="row">        
        <h5 className="col col-9">{props.comment.subject}</h5> 
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
      <p>{props.comment.content}</p>
      <h6 className="m-0">{props.comment.author.user.first_name} {props.comment.author.user.last_name}</h6>
      <h6 className="dateComment m-0">{new Date(props.comment.created_on).toLocaleString()}</h6>
      
    </div>
)


