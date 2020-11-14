import React, { useContext, useEffect } from "react"
import { TagContext } from "./TagProvider"
import PostTag from "./PostTag"

export const PostTagList = (props) => {
  const { postTags, getTagsByPostId, deletePostTag } = useContext(TagContext)

  const deleteAPostTag = (e) => {
    e.preventDefault()
    deletePostTag(e.target.id, e.target.dataset.postid)
  }

  useEffect(() => {
    getTagsByPostId(props.postId)
    console.log(props)
  }, [])

  return (
    <React.Fragment>
      <div className="postTags">
        {
          postTags.map(postTag => <PostTag key={postTag.id} postTag={postTag} deleteAPostTag={deleteAPostTag} />)
        }
      </div>
    </React.Fragment>
  )
}
