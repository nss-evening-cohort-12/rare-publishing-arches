import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ReactionContext } from "./ReactionProvider"

export const ReactionSelector = (props) => {
    const params = useParams()
    const { createPostReaction, deletePostReaction } = useContext(ReactionContext)
    const { reactionsList, currentUserPostReactions, setCurrentUserPostReactions, getReactions, getReactionCounts, getPostById, setPost } = props;

    const handleUpdateCurrentUserPostReactions = (reactionId) => {
        const updatedPostReactions = currentUserPostReactions
        const reactionIndex = updatedPostReactions.indexOf(reactionId);

        if (reactionIndex > -1) {
            // Delete
            updatedPostReactions.splice(reactionIndex, 1);
            deletePostReaction({ "post_id": params.postId, "reaction_id": reactionId })
                // .then(getReactionCounts())
                .then(getPostById(params.postId)
                    .then(setPost))
        } else {
            // Create (POST)
            updatedPostReactions.push(reactionId)
            createPostReaction({ "post_id": params.postId, "reaction_id": reactionId })
                .then(getPostById(params.postId)
                    .then(setPost))
        }

        setCurrentUserPostReactions(updatedPostReactions)
        getReactions()
    }

    return (
        <div className="d-flex flex-column">
            {reactionsList && reactionsList.map(reaction => (
                <div key={reaction.id} className={`d-flex flex-row ml-5 justify-contenter-around ${currentUserPostReactions && currentUserPostReactions.find(rc => rc === reaction.id) ? 'reaction__highlight' : ''}`}
                    onClick={() => handleUpdateCurrentUserPostReactions(reaction.id)}
                >
                    <img className="mr-4" height="25" width="25" src={reaction.image_url} alt="test" />
                    <span>{reaction.label}</span>
                </div>
            ))}
        </div>
    )
}