import React, { useContext, useState, useEffect, Fragment } from "react"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { TagContext } from "../tags/TagProvider"


export const PostForm = (props) => {
    // Use the required context providers for data
    const { addPost, posts, updatePost, getPosts, uploadPostImage } = useContext(PostContext)
    // const { profile, getProfile } = useContext(ProfileContext)

    // Tags data
    const { tags, getTags } = useContext(TagContext)

    // Categories data
    const { categories, getCategories } = useContext(CategoryContext)

    // Component state
    const [post, setPost] = useState({})
    const [newTags, setNewTags] = useState([])
    const [postImage, setPostImage] = useState({})

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

    const handleTagUpdate = e => {
        const updatedTagArray = []
        newTags.forEach(loopTag => {
            const newTag = {
                id: loopTag.id,
                label: loopTag.label,
                isChecked: parseInt(e.target.value) === loopTag.id ?
                    e.target.checked
                        ? true : false
                    : loopTag.isChecked ? true : false
            }
            updatedTagArray.push(newTag)
        })
        setNewTags(updatedTagArray)
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
            selectedPost.category
                ? selectedPost.category_id = selectedPost.category.id
                : selectedPost.category_id = 0
            setPost(selectedPost)
        }
    }

    const createNewTags = () => {
        const tempTags = []
        tags && tags.map(tag => tempTags.push({ id: tag.id, label: tag.label, isChecked: post.tags && post.tags.find(t => t.id === tag.id) ? true : false }))
        setNewTags(tempTags)
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createPostImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            // Update a component state variable to the value of base64ImageString
            setPostImage({ base64: base64ImageString })
        })
    }

    // Get data from API when component initilizes
    useEffect(() => {
        getPosts();
        getTags();
        getCategories();
    }, [])

    // Once provider state is updated, determine the post (if edit)
    useEffect(() => {
        getPostInEditMode()
    }, [posts])

    useEffect(() => {
        createNewTags()
    }, [post, tags])

    const callUpdatePost = (res, postTagsArray) => {
        updatePost({
            id: post.id,
            title: post.title,
            content: post.content,
            category_id: parseInt(post.category_id),
            publication_date: post.publication_date,
            author_id: post.rareuser.id,
            image_url: post.image_url,
            tags: postTagsArray,
            post_image: res.post_image_id || postImage.base64
        })
            .then(() => props.history.push("/posts"))
    }

    const callAddPost = (res, postTagsArray) => {
        addPost({
            title: post.title,
            content: post.content,
            category_id: post.category_id,
            image_url: post.image_url,
            tags: postTagsArray,
            post_image: res.post_image_id
        })
            .then(() => props.history.push("/posts"))
    }

    const constructNewPost = () => {
        const postTagsArray = newTags.filter(pt => pt.isChecked === true).map(nt => nt.id)

        if (editMode) {
            // If an image needs to be uploaded
            if (postImage && postImage.base64) {
                // PUT
                uploadPostImage({
                    post_image_b64: postImage.base64
                })
                    .then((res) => {
                        callUpdatePost(res, postTagsArray)
                    })
            } else { // If there is no image to be uploaded
                callUpdatePost({ "post_image_id": (post.post_image && post.post_image.id) || null }, postTagsArray)
            }
        } else {
            // POST

            // If an image needs to be uploaded
            if (postImage && postImage.base64) {
                uploadPostImage({
                    post_image_b64: postImage.base64
                })
                    .then((res) => res.json())
                    .then((res) => {
                        callAddPost(res, postTagsArray)
                    })
            } else { // if there is no image to be uploaded
                callAddPost({ "post_image_id": (post.post_image && post.post_image.id) || null }, postTagsArray)
            }
        }

    }

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
                        <input type="text" name="image_url" className="form-control w-75"
                            placeholder="Image URL"
                            defaultValue={post.image_url}
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
                        <select name="category_id" className="form-control w-50" value={post.category_id || ((post.category && post.category.id) || "0")} onChange={handleControlledInputChange}>
                            <option value="0" disabled>Category Select</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.label}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="d-flex flex-row flex-wrap form-check form-check-inline mb-3">
                        {
                            newTags.map(tag => (
                                <Fragment key={tag.id}>
                                    <input type="checkbox" name="tags" className="form-check-input" value={tag.id} checked={tag.isChecked} onChange={handleTagUpdate} />
                                    <label htmlFor="tagsToAdd" className="form-check-label">{tag.label}</label>
                                </Fragment>
                            ))
                        }
                    </div>
                </fieldset>
                <div className="mt-3 mb-5">
                    <input type="file" id="post_image" onChange={createPostImageString} />
                    {/* <input type="hidden" name="post_id" value={post.id} /> */}
                    {/* <button type="button" onClick={() => {
                        // Upload the stringified image that is stored in state
                    }}>Upload</button> */}
                </div>

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
