import React, { useContext, useEffect } from "react"
import { TagContext } from "./TagProvider"
import Tag from "./tag"

export const PostTagList = (props) => {
  const { postTags, getTagsByPostId } = useContext(TagContext)

  useEffect(() => {
    getTagsByPostId(props.postId)
  }, [])

  return (
    <React.Fragment>
      <div className="postTags">
        {
          postTags.map(postTag => <Tag key={postTag.id} postTag={postTag} />)
        }
      </div>
    </React.Fragment>
  )
}
