import React, { useState, useContext, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import "./Users.css"

export const UserTable = () => {
    const { isAdmin, getUsers, users } = useContext(AuthContext)    

    useEffect(() => {
        getUsers()        
    }, [])

    const handleIsApprovedUpdate = e => {
        // const postId = parseInt(e.target.value)
        // const partialObject = {"approved" : e.target.checked }    
        // partialyUpdatePost(postId, partialObject)        
    }

    return (
        <div>           
            <div className="users user__table mt-5 mx-3 px-3">
                <table className="table table-bordered table-striped">
                   
                    <tbody>
                        {
                            users.map(rareuser => (
                                <tr key={rareuser.id}>
                                    
                                    <td><Link to={`/users/${rareuser.id}`}>{rareuser.user.username}</Link></td>
                                    <td>
                                        <input type="checkbox" name="isApproved" checked={rareuser.user.is_active} value={rareuser.id} onChange={handleIsApprovedUpdate} />
                                          Active
                                    </td>
                                    <td>           
                                        <input type="checkbox" name="isApproved" checked={!(rareuser.user.is_staff)} value={rareuser.id} onChange={handleIsApprovedUpdate} />
                                          Author
                                    </td>
                                    <td> 
                                        <input type="checkbox" name="isApproved" checked={rareuser.user.is_staff} value={rareuser.id} onChange={handleIsApprovedUpdate} />
                                          Admin
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}