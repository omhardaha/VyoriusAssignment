import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./Notice.css"
import AddPost from '../AddPost/AddPost'
import SingleNotice from './SingleNotice'
import Cookies from 'js-cookie'

export default function Notice() {
    const [notices, setNotices] = useState([])
    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/notice/", { 'headers': { 'Authorization': Cookies.get('token') } });
            await setNotices([...res.data].reverse())
        }
        if (notices.length <= 1) fetchPosts();
    },)

    return (
        <>
            <div className="main-container ">
                <div className="heading">
                    <AddPost />
                </div>

                <div className="cards ">
                    {

                        notices.map((item, index) =>
                        (
                            <>
                                <SingleNotice key={index} item={item} />
                            </>
                        ))
                    }
                </div>
            </div>

        </>
    )
}
