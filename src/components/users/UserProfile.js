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
            </div>
            <div>
              <h2>{userProfile.user && userProfile.user.username}</h2>
              <h2>{userProfile.user && userProfile.user.email}</h2>
              <h2>{userProfile.user && userProfile.user.date_joined}</h2>
              <h2>{userProfile.user && userProfile.user.is_staff ? "Administrator" : "Author"}</h2>
              <h2>
                <Link to="/posts" query={{ userId: userProfile.id }}>
                  {userProfile.posts && userProfile.posts.length} Posts Authored
                </Link>
              </h2>
            </div>
          </div>
        </div>
    )
}
