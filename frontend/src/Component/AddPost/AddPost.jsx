import React, { useState } from 'react'
import { GrAdd } from "react-icons/gr"
import "./AddPost.css"
import Cookies from 'js-cookie'

export default function AddPost() {
    const [loading, setLoading] = useState(false)

    const addTask = async () => {

        if (task.length === 0 || taskdecs.length === 0) {
            seterror(true)
            return
        }
        try {
            setLoading(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': Cookies.get('token') },
                body: JSON.stringify({ notice: task, desc: taskdecs })
            };
            const response = await fetch('/notice/', requestOptions);
            await response.json();
            await window.location.reload()
            await setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            seterror(true)
        }
    }

    const [task, setTask] = useState("");
    const [taskdecs, setTaskdesc] = useState("");
    const [error, seterror] = useState(false);

    return (
        <>
            <div>
                <input className='border-input2 ' type="text" placeholder='Enter Your Task' onChange={e => setTask(e.target.value)}></input>
                <input className='border-input2' type="text" placeholder='Enter Your Task Description' onChange={e => setTaskdesc(e.target.value)}></input>
                <div className='drop-shadow-lg'>
                    <button className='bg-orange-200 p-3 rounded-full hover:bg-orange-400' onClick={addTask} >
                        <GrAdd className={loading && "animate-spin"} />
                    </button>
                </div>
            </div>
            {error && <h1 className="pb-2 pt-4 justify-center">OOPs : Empty Task</h1>}
        </>
    )
}
