import React from "react";
import {useNavigate} from "react-router-dom"
import "../styles/login.css"

export default function Login(props) {
    let navigate= useNavigate();
    const [user, setUser] = React.useState({ userName: "", userId: "" })

    function login(event) {
        event.preventDefault();
        console.log(user);
        props.login(user)
        navigate("/home")
    }

    function handleInput(event) {
        setUser((prev) => {
            return ({ ...prev, [event.target.name]: event.target.value })
        })
    }
    return (
        <div className="container">
            <form className="login-flex" onSubmit={login}>
                <input
                    className="login-input"
                    onChange={handleInput}
                    value={user.userName}
                    placeholder="username"
                    name="userName"
                />
                <input
                    className="login-input"
                    onChange={handleInput}
                    value={user.userId}
                    placeholder="password"
                    name="userId"
                />
                <button className="login-button">Login</button>
            </form>

        </div>
    )
}