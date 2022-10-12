import React from 'react'
import "./Navbar.css"
import Cookies from 'js-cookie'
import { AiOutlineLogout } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";


export default function Navbar() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state)
    
    const logOut = () => {
        Cookies.remove("token")
        dispatch({
            type: "LOGOUT"
        })
        window.location.replace("/")
    }

    return (
        <>
            <nav className="navMenu cursor-pointer my-8">
                {user && <a href="/">MY Tasks</a>}
                {user ? <span className='' onClick={logOut} >Logout <AiOutlineLogout className='inline m-auto text-sm' /></span> : <><a href="/login">Login</a><a href="/signup">signup</a></>}
            </nav>
        </>
    )
}
