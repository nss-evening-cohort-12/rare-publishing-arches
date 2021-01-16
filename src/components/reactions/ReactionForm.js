import React, { useContext, useState } from "react"
import { ReactionContext } from "./ReactionProvider"

export const ReactionForm = (props) => {
    // Use props
    const { setIsReactionFormVisible, getReactions } = props;

    // Use required contexts
    const { createReaction } = useContext(ReactionContext)

    // Component State
    const [newReaction, setNewReaction] = useState({})

    // Component functions
    const handleControlledInputChange = (event) => {
        const tempReaction = Object.assign({}, newReaction)
        tempReaction[event.target.name] = event.target.value
        setNewReaction(tempReaction)
    }

    const submitReaction = () => {
        createReaction(newReaction)
            .then(getReactions())
    }

    return (
        <div>
            <form>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            name="label"
                            required
                            autoFocus
                            className="form-control form-control-sm w-75 mx-auto mt-2"
                            placeholder="Reaction Label"
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            name="image_url"
                            required
                            className="form-control form-control-sm w-75 mx-auto mt-2"
                            placeholder="Reaction Image URL"
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>
                <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    onClick={e => {
                        e.preventDefault()
                        submitReaction()
                        setIsReactionFormVisible(prev => !prev)
                    }}
                >
                    Create Reaction
                </button>
            </form>
        </div>
    )
}