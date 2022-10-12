import React, { useState } from 'react'
import "./Login.css"
import Cookies from 'js-cookie'

export default function Login() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState(false);

    const LoginUser = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            };

            const response = await fetch('/auth/login', requestOptions);

            const data = await response.json();
            await Cookies.set('token', data, { expires: 7 })
            await window.location.replace("/")
        } catch (error) {
            console.log(error);
            seterror(true)
        }
    }
    return (
        <>
            <div className='max-w-screen-sm  m-auto '>
                <div style={{color:"rgb(0 155 255)",textDecoration:"un"}} className='text-center py-3 pb-6 text-2xl'>Login To Your Account</div>
                <div >
                    <span>Email</span>
                </div>

                <input className='border-input2' type="email" placeholder='Enter Your Email'
                    onChange={e => setemail(e.target.value)}></input>
                <div >
                    <span>Password</span>
                </div>

                <input className='border-input2' type="password" placeholder='Enter Your Password'
                    onChange={e => setpassword(e.target.value)}>
                </input>
                <div className='text-center mt-4'>
                    <button className='button-border' onClick={LoginUser} >Login</button>
                </div>
            </div>

            {error && <h1 className="pb-2 pt-4 justify-center">OOPs : Invalid Credintial</h1>}
        </>
    )
}
