import React, { useContext, useEffect, useRef } from "react"
import { TagContext } from "./TagProvider"
import Tag from "./tag"

export const TagList = (props) => {
  const { tags, getTags, createTag } = useContext(TagContext)
  const newTag = useRef()

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      createTag({ name: e.target.value })
    }
  }

  const deleteTag = (e) => {
    
  } 

  useEffect(() => {
    getTags()
  }, [])

  return (
    <React.Fragment>
      <div className="addTagForm">
        <input type="text" ref={newTag} onKeyDown={handleInput}></input>
      </div>
      <div className="allTags">
        {
          tags.map(tag => <Tag key={tag.id} tag={tag} />)
        }
      </div>
    </React.Fragment>
  )
}
