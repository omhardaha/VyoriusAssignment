import React, { useState } from 'react'
import Cookies from 'js-cookie'

export default function Signup() {

    function isValidEmailAddress(address) {
        return !! address.match(/.+@.+/);
    }
    const signUpHandle = async () => {
        if (email.length === 0 || password.length === 0) {
            seterror(true)
            return
        }
        try {
            if(!isValidEmailAddress(email)){
                setErrorText("Invalid Email")
                seterror(true)
                return
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username })
            };
            const response = await fetch('/auth/signup', requestOptions);
            const data = await response.json();
            await Cookies.set('token', data.token, { expires: 7 })
            await window.location.replace("/")
        } catch (error) {
            console.log(error);
            seterror(true)
        }
    }

    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState(false);
    const [errorText, setErrorText] = useState("Empty Task");

    return (
        <>
            <div className='max-w-screen-sm m-auto mt-10'>
                <div style={{color:"rgb(0 155 255)",textDecoration:"un"}} className='text-center py-3 pb-6 text-2xl'>Create New Accout</div>
                <div >
                    <span>Name</span>
                </div>
                <input className='border-input2' type="text" placeholder='Enter Your Name'
                    onChange={e => setusername(e.target.value)}>
                </input>

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
                    <button className='button-border' onClick={signUpHandle} >Signup</button>
                </div>
            </div>

            {error && <h1 className="pb-2 pt-4 justify-center">OOPs : {errorText}</h1>}
        </>
    )
}
