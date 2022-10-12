import React, { useState } from 'react'
import axios from 'axios'
import { AiFillDelete } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import { AiOutlineCheck } from "react-icons/ai"
import Cookies from 'js-cookie'

export default function SingleNotice({ item }) {

    const delP = async () => {
        await axios.delete("/notice/" + item._id,{ 'headers': { 'Authorization': Cookies.get('token') } });
        await window.location.reload()
    }

    const [edit, setEdit] = useState(true)
    const [task, settask] = useState(item.notice)
    const [desc, setDesc] = useState(item.desc)

    const updateTask = async () => {
        try {
            await axios.put('/notice/' + item._id, { notice: task, desc: desc },{ 'headers': { 'Authorization': Cookies.get('token') } });
            await window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div style={{ margin: "38px 10px", padding: "10px", backgroundColor: "white" }} className="drop-shadow-2xl cards-borde">
            <div>
                {edit ? <h1 className='font-bold text-xl'> {item.notice}</h1> :<input className='bg-transperent border-input' onChange={(e) => settask(e.target.value)} value={task}></input>}

                <span className='float-right cursor-pointer'>
                    {!edit?<><AiOutlineCheck onClick={updateTask} className='m-1 text-normal inline hover:text-red-600' /></>:<FiEdit onClick={() => { setEdit(!edit) }} className='m-1 text-normal inline hover:text-red-600' />}
                    <AiFillDelete className='m-1 text-normal inline hover:text-red-600' onClick={() => delP(item._id)} />
                </span>

            </div>

            <div className='soft-text'>
                {edit ? <span>{item.desc}</span> : <input className='mt-1 border-input' onChange={(e) => setDesc(e.target.value)} value={desc}></input>}
            </div>
        </div>
    )
}
