import React from "react"
import { Link } from "react-router-dom"
import "./Categories.css"

export const Category = (props) => (
  <div className="categories">
    <div className="categoryicon"><i className="fas fa-cog fa-2x" id={props.category.i} data-categoryname={props.category.label} onClick={props.editACategory}></i></div>
    <div className="categoryicon"><i className="far fa-trash-alt fa-2x" id={props.category.id} onClick={e => {
      props.setDeletedCategoryId(props.category.id)
      props.deleteCategoryModal.current.showModal() 
    }
    }></i></div>
    <div className="category__table">
      <table className="table table-bordered">
        <>
          <tr>
            <td><Link to={`/categories/${props.match.params.categoryId}`}>{props.category.label}</Link></td>
          </tr>
        </>
      </table>
    </div>
  </div>
)
