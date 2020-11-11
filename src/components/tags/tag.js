import React from "react"
import "./tag.css"

export default (props) => (
  <div className="tags">
    <div className="tagname">{props.tag.name}</div>
    <div className="tagicon"><i className="far fa-trash-alt" id={props.tag.id} onClick={props.deleteATag}></i></div>
    <div className="tagicon"><i className="fas fa-pencil-alt" id={props.tag.id} data-tagname={props.tag.name} onClick={props.editATag} ></i></div>
  </div>
)
