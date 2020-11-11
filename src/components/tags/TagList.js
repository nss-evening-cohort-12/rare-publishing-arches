import React, { useContext, useState, useEffect } from "react"
import { TagContext } from "./TagProvider"
import Tag from "./tag"

export const TagList = (props) => {
  const { tags, getTags, createTag, updateTag, deleteTag } = useContext(TagContext)
  const [newTag, setNewTag] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editTagId, setEditTagId] = useState(0)

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      if (isEditing) {
        updateTag({ id: editTagId, name: newTag })
        .then(setNewTag(""))
      } else {
        createTag({ name: e.target.value })
        .then(setNewTag(""))
      }
    }
  }

  const editATag = (e) => {
    setNewTag(e.target.dataset.tagname)
    setEditTagId(e.target.id)
    setIsEditing(true)
  }

  const deleteATag = (e) => {
    deleteTag(e.target.id)
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <React.Fragment>
      <div className="addTagForm">
        <input type="text" placeholder="Enter new tag" value={newTag} onKeyDown={handleInput} onChange={e => {
          setNewTag(e.target.value)
        }}></input>
      </div>
      <div className="allTags">
        {
          tags.map(tag => <Tag key={tag.id} tag={tag} deleteATag={deleteATag} editATag={editATag} />)
        }
      </div>
    </React.Fragment>
  )
}
