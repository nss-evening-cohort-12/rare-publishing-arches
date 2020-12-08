import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"

export const Login = () => {
    const email = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const errorDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch('http://127.0.0.1:8088/user?email=' + email.current.value, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("rare_user_id", res.token)
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
            .catch(err => errorDialog.current.showModal())
    }

    return (
        <main className="container vh-100">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <dialog className="dialog dialog--auth" ref={errorDialog}>
                <div>Could not contact server.</div>
                <button className="button--close" onClick={e => errorDialog.current.close()}>Close</button>
            </dialog>
            <header>
                <h1 className="mt-5 text-center">Rare</h1>
            </header>
            <div className="mt-5">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img className="mt-5" src="https://via.placeholder.com/200x75" />
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center h-50">
                <form onSubmit={handleLogin}>
                    <input ref={email} type="email" id="email" className="form-control mb-5" placeholder="Username" required autoFocus />
                    <input ref={password} type="password" id="password" className="form-control mb-5" placeholder="Password" required />
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-primary w-100" type="submit">Login</button>
                    </div>
                </form>
                <div className="mt-3">
                    <small className="underline text-primary">
                        <Link to="/register">
                            Don't have an account yet? Click here to sign up!
                        </Link>
                    </small>
                </div>
            </div>
        </main >
        // <main className="container text-center">
        //     <dialog className="dialog dialog--auth" ref={invalidDialog}>
        //         <div>Email or password was not valid.</div>
        //         <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
        //     </dialog>
        //     <section>
        //         <form className="form--login" onSubmit={handleLogin}>
        //             <h1>Rare</h1>
        //             <fieldset>
        //                 {/* <label htmlFor="inputEmail"> Email address </label> */}
        //                 <input ref={email} type="email" id="email" className="form-control" defaultValue="me@me.com" placeholder="Email address" required autoFocus />
        //             </fieldset>
        //             <fieldset>
        //                 {/* <label htmlFor="inputPassword"> Password </label> */}
        //                 <input ref={password} type="password" id="password" className="form-control" defaultValue="me" placeholder="Password" required />
        //             </fieldset>
        //             <fieldset style={{
        //                 textAlign: "center"
        //             }}>
        //                 <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
        //             </fieldset>
        //         </form>
        //     </section>
        //     <section className="link--register">
        //         <Link to="/register">Not a member yet?</Link>
        //     </section>
        // </main>
    )
}
