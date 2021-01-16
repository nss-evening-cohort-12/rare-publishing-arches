import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import { ReactionContext } from "./ReactionProvider"
import { ReactionForm } from "./ReactionForm"

export const ReactionSelector = (props) => {
    const params = useParams()
    const { createPostReaction, deletePostReaction } = useContext(ReactionContext)
    const { isAdmin } = useContext(AuthContext);
    const { reactionsList, currentUserPostReactions, setCurrentUserPostReactions, getReactions, getReactionCounts, getPostById, setPost } = props;

    const [isReactionFormVisible, setIsReactionFormVisible] = useState(false)

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
            {isAdmin ? (
                <>
                    <div
                        className="underline text-primary cursor__pointer"
                        onClick={() => { setIsReactionFormVisible(prev => !prev) }}
                    ><u>Create New Reaction</u></div>
                    {isReactionFormVisible ? (
                        <ReactionForm
                            setIsReactionFormVisible={setIsReactionFormVisible}
                            getReactions={getReactions}
                        />
                    ) : ('')}
                </>
            ) : ('')}
        </div>
    )
}