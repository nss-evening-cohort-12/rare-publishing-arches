import React from "react"
import "./PostComments.css"
import { Link } from "react-router-dom"

export const Comment = ({ comment }) => (
    <section className="comment p-5 mb-5 border">
        <div className="d-flex flex-row justify-content-between">
            <h3 className="comment__title">
                <Link to={`/comments/${comment.id}`}>
                    {comment.title}
                </Link>
                asdfasdfasdfcccccc
            </h3>
            
        </div>        
    </section>
)