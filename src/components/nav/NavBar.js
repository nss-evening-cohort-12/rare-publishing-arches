import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="mt-3">
            <div className="d-flex flex-row flex-nowrap">
                <li className="navbar__item mx-3">
                    <Link to="/">
                        <img className="navbar__logo" alt="" src={Logo} />
                    </Link>
                </li>
                <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/" className="btn btn-outline-primary w-100">All Posts</Link>
                    </div>
                </li>
                <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/" className="btn btn-outline-primary w-100">My Posts</Link>
                    </div>
                </li>
                <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/" className="btn btn-outline-primary w-100">Category Manager</Link>
                    </div>
                </li>
                <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/" className="btn btn-outline-primary w-100">Tag Manager</Link>
                    </div>
                </li>
                <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/" className="btn btn-outline-primary w-100">User Manager</Link>
                    </div>
                </li>
                {
                    (localStorage.getItem("rare_user_id") !== null) ?
                        <li className="navbar__item ml-auto mr-3">
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-primary w-100"
                                    onClick={() => {
                                        localStorage.removeItem("rare_user_id");
                                        history.push({ pathname: "/" });
                                    }}
                                >Logout</button>
                            </div>
                        </li> :
                        <>
                            <li className="navbar__item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="navbar__item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                }
            </div>
        </ul>
    )
}
