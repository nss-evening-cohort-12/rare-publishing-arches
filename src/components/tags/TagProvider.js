import React, { useState } from "react"

export const TagContext = React.createContext()

export const TagProvider = (props) => {
  const [tags, setTags] = useState([])
  const [postTags, setPostTags] = useState([])

  const getTags = () => {
    return fetch("http://localhost:8088/tags")
      .then(res => res.json())
      .then(setTags)
  }

  const getTagsByPostId = postId => {
    return fetch(`http://localhost:8088/tags/${postId}`)
      .then(res => res.json())
      .then(setPostTags)
  }

  const createTag = tag => {
    return fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    })
        .then(getTags)
  }

  const createPostTag = posttag => {
    return fetch("http://localhost:8088/posttags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(posttag)
    })
        .then(() => getTagsByPostId(posttag.post_id))
  }

  const updateTag = tag => {
    return fetch(`http://localhost:8088/tags/${tag.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    })
        .then(getTags)
}

  const deleteTag = id => {
    return fetch(`http://localhost:8088/tags/${id}`, {
      method: "DELETE",
    })
      .then(getTags)
  }

  const deletePostTag = (id, postId) => {
    return fetch(`http://localhost:8088/posttags/${id}`, {
      method: "DELETE",
    })
      .then(() => getTagsByPostId(postId))
  }

  return (
    <TagContext.Provider value={{
      tags, postTags, getTags, getTagsByPostId, createTag, deleteTag, updateTag, deletePostTag, createPostTag
    }}>
      {props.children}
    </TagContext.Provider>
  )


}
