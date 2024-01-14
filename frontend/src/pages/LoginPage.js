import React from "react";

const LoginPage = () => {
    return (
        <div>
            <h3>Login</h3>
            <form>
                <input type="text" name="username" placeholder="username" />
                <input type="password" name="password" placeholder="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage