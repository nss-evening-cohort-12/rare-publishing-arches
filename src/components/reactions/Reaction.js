import React from 'react'

export const Reaction = (props) => {
    return (
        <img className="reaction__image mx-2" src={props.reaction.image_url} alt={props.reaction.label} />
    )
}