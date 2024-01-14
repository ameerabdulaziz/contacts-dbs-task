import React, {useContext} from "react";
import {Link} from 'react-router-dom'
import AuthContext from "../context/AuthContext";

const Header = () => {
    let {user, logout} = useContext(AuthContext)
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {user ? (
                        <Link to="/login" onClick={logout}>Logout</Link>
                    ): (
                        <Link to="/login">Login</Link>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default Header