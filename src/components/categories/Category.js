import React from 'react'
import './Categories.css'

export default (props) => (
  <div className="categories">
    <div className="categoryName">{props.category.name}</div>
    <div className="categoryIcon"><i className="far fa-trash-alt" id={props.category.id} onClick={props.deleteACategory}></i></div>
    <div className="categoryIcon"><i className="fas fa-pencil-alt" id={props.category.id} data-tagname={props.category.name} onClick={props.editACategory} ></i></div>
  </div>
)
