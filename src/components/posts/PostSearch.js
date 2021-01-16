import React, { useContext } from "react"
import { PostContext } from "./PostProvider"
import { TagContext } from "../tags/TagProvider"

export const PostSearch = () => {
    const { setTerms } = useContext(PostContext)
    const { setSearchTags } = useContext(TagContext)

    return (
        <>
            <div>Search for a post</div>
            <input type="text" className="posts__search"
                onChange={
                    (changeEvent) => {
                        setTerms(changeEvent.target.value)
                        setSearchTags(changeEvent.target.value)
                    }
                }
                placeholder="Enter search string or tag here..." />
        </>
    )
}
