import React from "react"
import { Route } from "react-router-dom"
import { PostDetails } from "./posts/PostDetail.js"
import { PostSearch } from "./posts/PostSearch.js"
import { PostProvider } from "./posts/PostProvider.js"
import { PostList } from "./posts/PostList.js"
import { PostForm } from "./posts/PostForm.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <PostProvider>
                        <Route exact path="/">
                            <PostList />
                        </Route>
                        <Route exact path="/posts" render={(props) => {
                            return <>
                                <main className="postContainer">
                                    <h1>Posts</h1>

                                    <PostSearch />
                                    <PostList history={props.history} />
                                </main>

                            </>
                        }} />

                        <Route exact path="/posts/create" render={(props) => {
                            return <PostForm {...props} />
                        }} />

                        <Route path="/posts/:postId(\d+)" render={
                            props => <PostDetails {...props} />
                        } />

                        <Route path="/posts/edit/:postId(\d+)" render={
                            props => <PostForm {...props} />
                        } />
            </PostProvider>
        </main>
    </>
}
