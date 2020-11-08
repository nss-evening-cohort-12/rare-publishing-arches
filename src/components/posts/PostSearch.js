import React, { useContext } from "react"
import { PostContext } from "./PostProvider"

export const PostSearch = () => {
    const { setTerms } = useContext(PostContext)

    return (
        <>
            <div>Search for an post</div>
            <input type="text" className="posts__search"
                onChange={
                    (changeEvent) => {
                        setTerms(changeEvent.target.value)
                    }
                }
                placeholder="Enter search string here..." />
        </>
    )
}