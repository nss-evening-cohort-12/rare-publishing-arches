import React from 'react'

export const Reaction = (props) => {
    return (
        <div className="d-flex flex-row align-items-center mr-4">
            <img className="reaction__image mx-2" src={props.reaction.image_url} alt={props.reaction.label} />
            <span>{props.reaction.count}</span>
        </div>
    )
}