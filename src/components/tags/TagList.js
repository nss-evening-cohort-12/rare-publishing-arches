import React, { useContext, useState, useEffect } from "react"
import { TagContext } from "./TagProvider"
import Tag from "./tag"

export const TagList = (props) => {
  const { tags, getTags, createTag, updateTag, deleteTag } = useContext(TagContext)
  const [newTag, setNewTag] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editTagId, setEditTagId] = useState(0)

  const handleInput = (e) => {
      if (isEditing) {
        updateTag({ id: editTagId, label: newTag })
        .then(setNewTag(""))
      } else {
        createTag({ label: newTag })
        .then(setNewTag(""))
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
      <div className="d-flex flex-row justify-content-around">
        <div className="allTags">
          {
            tags.map(tag => <Tag key={tag.id} tag={tag} deleteATag={deleteATag} editATag={editATag} />)
          }
        </div>
        <div className="addTagForm d-flex flex-column justify-content-around align-items-center">
          <h2>Create a new tag</h2>
          <input className="tagInput" type="text" placeholder="Add text" value={newTag} onChange={e => {
            setNewTag(e.target.value)
          }}></input>
          <button className="createTag" onClick={handleInput}>Create</button>
        </div>
      </div>
  )
}
