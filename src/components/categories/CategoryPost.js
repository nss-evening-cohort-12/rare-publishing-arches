import React, { useState, useContext, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import Post from "../posts/Post"
import "./CategoryPost.css"


export const CategoryPost = (props) => {
    const { categories, getPostByCategoryId } = useContext(CategoryContext)

    const [posts, setPost] = useState([])

    useEffect(() => {
        const categoryId = parseInt(props.match.params.categoryId)
        getPostByCategoryId(categoryId)
            .then(setPost)
    }, [])

    return (
      <section>
        <div className="categoryPostContainer">
          <div className="categoryPost__title" id={props.match.params.categoryId}>
            <h1>{categories.find(category => category.id == props.match.params.categoryId)}</h1>
          </div>
          <div className="d-flex flex-row justify-content-end"></div>
            <div className="category__post post__list mt-5 mx-5 px-3">
                {
                    posts.map(post => <Post key={post.id} post={post} />)
                }
            </div>
        </div>
    </section>
    )
}
