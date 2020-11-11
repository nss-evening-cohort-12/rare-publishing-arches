import React, { useContext, useState, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { ProfileContext } from "../auth/AuthProvider"


export const PostForm = (props) => {
    // Use the required context providers for data
    const { addPost, posts, updatePost, getPosts } = useContext(PostContext)
    // const { profile, getProfile } = useContext(ProfileContext)
    
    // Component state
    const [post, setPost] = useState({})

    // Is there a a URL parameter??
    const editMode = props.match.params.hasOwnProperty("postId")  // true or false

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newPost = Object.assign({}, post)          // Create copy
        newPost[event.target.name] = event.target.value    // Modify copy
        setPost(newPost)                                 // Set copy as new state
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit an post.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the post.
            3. Update component state variable.
    */
    const getPostInEditMode = () => {
        if (editMode) {
            const postId = parseInt(props.match.params.postId)
            const selectedPost = posts.find(a => a.id === postId) || {}
            setPost(selectedPost)
        }
    }

    // Get posts from API when component initializes
    useEffect(() => {
        getPosts()
    }, [])

    // Once provider state is updated, determine the post (if edit)
    useEffect(() => {
        getPostInEditMode()
    }, [posts])


    const constructNewPost = () => {  
        const now = new Date ();     
        
        if (editMode) {
            // PUT
            updatePost({
                id: post.id,
                title: post.title,
                content: post.content,
                categoryId: 1,
                publicationDate: now,
                // userId: parseInt(localStorage.getItem("rare_user_id")),
                userId: 1,
                headerImgUrl: post.headerImgUrl
            })
                .then(() => props.history.push("/posts"))
        } else {
            // POST
            addPost({
                title: post.title,
                content: post.content,
                categoryId: 1,
                publicationDate: now,
                // userId: parseInt(localStorage.getItem("rare_user_id")),
                userId: 1,
                headerImgUrl: post.headerImgUrl
            })
                .then(() => props.history.push("/posts"))
        }
        
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">{editMode ? "Update Post" : "Admit Post"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Post title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        placeholder="Post title"
                        defaultValue={post.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Post content: </label>
                    <textarea type="text" name="content" required className="form-control"
                        placeholder="Post content"
                        value={post.content}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="headerImgUrl">Header Img Url: </label>
                    <input type="text" name="headerImgUrl" className="form-control"
                        placeholder="Header Img Url"
                        defaultValue={post.header_img_url}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Location: </label>
                    <select name="locationId" className="form-control"
                        value={post.locationId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset> */}                        
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewPost()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Submit New Post"}
            </button>
        </form>
    )
}