import React, { useState, useContext, useEffect, useRef } from "react"
import { CategoryContext } from "./CategoryProvider"
import { PostContext } from "../posts/PostProvider"
import Post from "../posts/Post"
import "./CategoryPost.css"


export const CategoryPost = (props) => {
  const { categories, getPostByCategoryId } = useContext(CategoryContext)
  const { releasePost } = useContext(PostContext)

  const deletePostModal = useRef()

  const [posts, setPost] = useState([])
  const [deletePostId, setDeletePostId] = useState(0)

  const deleteAPost = (e) => {
    releasePost(deletePostId)
      .then(setDeletePostId())
      .then(deletePostModal.current.close())
  }

  useEffect(() => {
    const categoryId = parseInt(props.match.params.categoryId)
    getPostByCategoryId(categoryId)
      .then(setPost)
  }, [])

  return (
    <section>
      <dialog className="dialog dialog--deletePost" ref={deletePostModal}>
        <h4>Are you sure you want to delete this post?</h4>
        <div className="d-flex flex-row justify-content-around align-items-center w-100">
          <button className="deletePost btn btn-outline-primary" onClick={deleteAPost}>Ok</button>
          <button className="btn btn-outline-primary" onClick={e => deletePostModal.current.close()}>Cancel</button>
        </div>
      </dialog>
      <div className="categoryPostContainer">
        <div className="categoryPost__title" id={props.match.params.categoryId}>
          <h1>{categories.find(category => category.id == props.match.params.categoryId).label}</h1>
        </div>
        <div className="d-flex flex-row justify-content-end"></div>
        <div className="category__post post__list mt-5 mx-5 px-3">
          {
            posts.map(post => <Post key={post.id} post={post} setDeletePostId={setDeletePostId} deletePostModal={deletePostModal} />)
          }
        </div>
      </div>
    </section>
  )
}
