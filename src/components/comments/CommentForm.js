import React, { useContext, useState, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { CommentContext } from "./CommentProvider"


export const CommentForm = (props) => {

    const { addComment, comments, updateComment, getComments } = useContext(CommentContext)

    const [comment, setComment] = useState({})

    const editMode = props.match.params.hasOwnProperty("postId") 

    const handleControlledInputChange = (event) => {
       
        const newPost = Object.assign({}, post)          
        newPost[event.target.name] = event.target.value
        setPost(newPost) 
    }



const getPostInEditMode = () => {
    if (editMode) {
        const postId = parseInt(props.match.params.postId)
        const selectedPost = posts.find(a => a.id === postId) || {}
        setPost(selectedPost)
    }
}

    // Get data from API when component initilizes
    useEffect(() => {
        getComments();
    }, [])

    useEffect(() => {
        getPostInEditMode()
    }, [posts])
    
    return (
        <div className="container w-50">
            <form className="postForm">
                <h2 className="postForm__title">{editMode ? "Update Post" : "New Post"}</h2>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="title" required autoFocus className="form-control w-75"
                            placeholder="Post title"
                            defaultValue={post.title}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="headerImgUrl" className="form-control w-75"
                            placeholder="Image URL"
                            defaultValue={post.header_img_url}
                            onChange={handleControlledInputChange}>
                        </input>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <textarea rows="7" type="text" name="content" required className="form-control"
                            placeholder="Article content"
                            value={post.content}
                            onChange={handleControlledInputChange}>
                        </textarea>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select name="categoryId" className="form-control w-50" defaultValue="0" onChange={handleControlledInputChange}>
                            <option value="0" disabled>Category Select</option>
                            {categories.map(category => (
                                <option value={category.id}>{category.label}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="d-flex flex-row flex-wrap form-check form-check-inline mb-3">
                        <input type="checkbox" name="tag-1" className="form-check-input" />
                        <label for="tag-1" className="form-check-label">Tag1</label>
                        <input type="checkbox" name="tag-2" className="form-check-input" />
                        <label for="tag-2" className="form-check-label">Tag2</label>
                        <input type="checkbox" name="tag-3" className="form-check-input" />
                        <label for="tag-3" className="form-check-label">Tag3</label>
                        <input type="checkbox" name="tag-4" className="form-check-input" />
                        <label for="tag-4" className="form-check-label">Tag4</label>
                        <input type="checkbox" name="tag-5" className="form-check-input" />
                        <label for="tag-5" className="form-check-label">Tag5</label>
                    </div>
                </fieldset>

                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        constructNewPost()
                    }}
                    className="btn btn-primary">
                    {editMode ? "Save" : "Publish"}
                </button>
            </form>
        </div>
    )
}