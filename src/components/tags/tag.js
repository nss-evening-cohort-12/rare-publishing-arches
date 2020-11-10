import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./tag.css"

export default ({tag}) => (
  <div className="tags">
    <h5>{tag.name} <FontAwesomeIcon icon="fatrash"></FontAwesomeIcon></h5>
  </div>
)
