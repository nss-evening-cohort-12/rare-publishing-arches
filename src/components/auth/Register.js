import React, { useRef } from "react"
import { Link } from "react-router-dom"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const bio = useRef()
    const profileUrl = useRef()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "username": username.current.value,
                "bio": bio.current.value,
                "profile_image_url": profileUrl.current.value,
            }

            return fetch("http://127.0.0.1:8088/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("valid" in res && res.valid) {
                        localStorage.setItem("rare_user_id", res.token)
                        props.history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main className="container-md vh-100">
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                    <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <header className="mt-5 text-center">
                <h1>Rare</h1>
            </header>
            <form className="form--login" onSubmit={handleRegister}>
                <div className="d-flex flex-row justify-content-center align-items-center mt-5">
                    <div className="d-flex flex-column w-100 text-center mr-5">
                        <img className="mb-5 img-fluid" src="https://via.placeholder.com/300x200" />
                        <input ref={firstName} name="firstName" type="text" id="register--first-name" className="form-control mb-5" placeholder="First Name" required autoFocus />
                        <input ref={lastName} name="lastname" type="text" id="register--last-name" className="form-control mb-5" placeholder="Last Name" required />
                        <input ref={email} name="email" type="email" id="register--email" className="form-control mb-5" placeholder="Email" required />
                    </div>
                    <div className="d-flex flex-column w-100 text-center">
                        <input ref={username} name="username" type="text" id="register--username" className="form-control mb-5" placeholder="Username" required />
                        <input ref={password} name="password" type="password" id="register--password" className="form-control mb-5" placeholder="Password" required />
                        <input ref={verifyPassword} name="verifyPassword" type="password" id="register--verify-password" className="form-control mb-5" placeholder="Verify Password" required />
                        <input ref={profileUrl} name="profileUrl" type="text" id="register--profile-pic" className="form-control mb-5" placeholder="Profile Pic URL" required />
                        <textarea ref={bio} name="bio" type="text" id="register--bio" className="form-control mb-5" placeholder="Bio" rows="4" required />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-primary w-50" type="submit">Register</button>
                </div>
            </form>
        </main>
    )
}
