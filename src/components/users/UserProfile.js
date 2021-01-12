import React, { useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import "./Users.css"

export const UserProfile = (props) => {
    const { getUserById } = useContext(AuthContext)  
    const [ userProfile, setUserProfile ] = useState({})

    useEffect(() => {
      const userId = parseInt(props.match.params.userId)
      getUserById(userId)
        .then(setUserProfile)   
    }, [])


    return (
        <div>   
          <div className="d-flex justify-content-center mt-5">
            <div>
              <img src={userProfile.profile_image_url} alt={userProfile.user && userProfile.user.username} className="userimg" />
              <br />
              {userProfile.user && userProfile.user.first_name} {userProfile.user && userProfile.user.last_name}
            </div>
            <div>
              <h2>{userProfile.user && userProfile.user.username}</h2>
              <h4>{userProfile.user && userProfile.user.email}</h4>
              <h4>Member since {userProfile.user && new Date(userProfile.user.date_joined).toLocaleDateString("en-US")}</h4>
              <h4>{userProfile.user && userProfile.user.is_staff ? "Administrator" : "Author"}</h4>
              <h4>
                <Link to={`/user/posts/${userProfile.id}`}>
                  {userProfile.posts && userProfile.posts.length} Posts Authored
                </Link>
              </h4>
            </div>
            <div>
              <button className="btn btn-primary ml-5">Subscribed</button>
            </div>
          </div>
        </div>
    )
}
