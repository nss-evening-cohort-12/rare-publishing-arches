import React, { useState, useContext, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import "./Users.css"

export const UserTable = () => {
    const { isAdmin, getUsers, users } = useContext(AuthContext)
    const [sortedUsers, setSortedUsers] = useState([])    

    useEffect(() => {
        getUsers()        
    }, [])

    useEffect(() => {
        const tempSortedUsers = users.sort((a, b) => (a.user.username.toLowerCase() < b.user.username.toLowerCase()) ? -1 : 1)
        setSortedUsers(tempSortedUsers)
    }, [users])

    const handleIsApprovedUpdate = e => {
              
    }

    return (
        <div>   
            <div className="d-flex justify-content-center mt-5">
            <h1>Users</h1>
            </div>        
            <div className="users user__table mt-5 mx-3 px-3">
                <table className="table table-bordered table-striped">
                   
                    <tbody>
                        {
                            sortedUsers.map(rareuser => (
                                <tr key={rareuser.id}>
                                    
                                    <td><Link to={`/users/${rareuser.id}`}>{rareuser.user.username}</Link></td>
                                    <td>
                                        <span>{rareuser.user.first_name} {rareuser.user.first_name}</span>
                                    </td>
                                    <td>
                                        <input type="checkbox" className= "mr-2" name="isActive" checked={rareuser.user.is_active} value={rareuser.id} onChange={handleIsApprovedUpdate} />
                                        <label className="form-check-label">Active</label>
                                    </td>
                                    
                                    <td className="d-flex justify-content-center align-items-center" onchange={handleIsApprovedUpdate}>           
                                        <input type="radio" className="mr-2" name={rareuser.user.id} checked={!(rareuser.user.is_staff)} value={rareuser.user.id} />
                                        <label className="form-check-label mr-4">Author</label>
                                    
                                        <input type="radio" className="mx-2" name={rareuser.user.id} checked={rareuser.user.is_staff} value={rareuser.user.id} />
                                        <label className="form-check-label">Admin</label>
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