import React, { useContext, useState, useEffect } from 'react'
import { CategoryContext } from './CategoryProvider'
import Category from './Category.js'

export const CategoryList = (props) => {
  const { categories, getCategories, createCategory, updateCategory, deleteCategory } = useContext(CategoryContext)
  const [newCategory, setNewCategory] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editCategoryId, setEditCategoryId] = useState(0)

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      if (isEditing) {
        updateCategory({ id: editCategoryId, name: newCategory })
        .then(setNewCategory(''))
      } else {
        createCategory({ name: e.target.value })
        .then(setNewCategory(''))
      }
    }
  }

  const editACategory = (e) => {
    setNewCategory(e.target.dataset.categoryname)
    setEditCategoryId(e.target.id)
    setIsEditing(true)
  }

  const deleteACategory = (e) => {
    deleteCategory(e.target.id)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <React.Fragment>
      <div className='addCategoryFrom'>
        <input type='text' placeholder='Enter new category' value={newCategory} onKeyDown={handleInput} onChange={e => {
          setNewCategory(e.target.value)
        }}></input>
      </div>
      <div className='allCategories'>
        {
          categories.map(category => <Category key={category.id} category={category} deleteACategory={deleteACategory} editACategory={editACategory} />)
        }
      </div>
    </React.Fragment>
  )
}
