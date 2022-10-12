import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import "./App.css";
import { useCookies } from 'react-cookie';
import Navbar from "./Component/Navbar/Navbar";
import Notice from "./Component/Notice/Notice";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";

function App() {
    const [cookies, setCookie] = useCookies(['token']);
    const { decodedToken, isExpired } = useJwt(cookies.token);
    const dispatch = useDispatch()
    const { user } = useSelector(state => state)
    console.log(user);

    useEffect(() => {
        dispatch({
            type: "USER",
            payload: decodedToken
        })
    }, [decodedToken])

    return (
        <Router>
            <Navbar />
            <div className="mw-1">
                <Routes>
                    <Route path="/login" element={user ?<Notice adminFlag={true} /> :<Login />} />
                    <Route path="/signup" element={ user ?<Notice adminFlag={true} /> :<Signup />} />
                    <Route path="/" element={user ? <Notice adminFlag={true} />:<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
