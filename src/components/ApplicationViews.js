import React from "react"
import { Route } from "react-router-dom"
import { PostDetails } from "./posts/PostDetail.js"
import { PostSearch } from "./posts/PostSearch.js"
import { PostProvider } from "./posts/PostProvider.js"
import { PostList } from "./posts/PostList.js"
import { PostTable } from "./posts/PostTable.js"
import { PostForm } from "./posts/PostForm.js"
import { TagProvider } from "./tags/TagProvider.js"
import { TagList } from "./tags/TagList.js"
import { CategoryProvider } from './categories/CategoryProvider.js'
import { CategoryList } from './categories/CategoryList'
import { NavBar } from "./nav/NavBar"


export const ApplicationViews = () => {
    return <>
        <NavBar />
        <main style={{
            margin: "1rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <CategoryProvider>
                <TagProvider>
                    <PostProvider>
                        <Route exact path="/">
                            <PostList />
                        </Route>
                        <Route path="/user/posts" render={props => <PostList {...props} />} />
                        <Route exact path="/posts" render={(props) => {
                            return <>
                                <main className="postContainer">
                                    <h1>Posts</h1>

                                    <PostSearch />
                                    <PostTable />
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
                    <Route exact path="/tags" render={() => {
                        return <>
                            <main className="tagsContainer">
                                <h1>Available Tags</h1>
                                <TagList />
                            </main>
                        </>
                    }} />
                </TagProvider>
                <Route exact path='/categories' render={() => {
                    return <>
                        <main className='categoriesContainer'>
                            <h1>Categories</h1>
                            <CategoryList />
                        </main>
                    </>
                }} />
            </CategoryProvider>
        </main>
    </>
}
