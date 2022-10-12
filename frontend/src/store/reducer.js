import { createStore } from "redux"

const initialState = {
    user: {},
    loggedIn: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGOUT":
            return {
                user: {},
                loggedIn: false
            }
        case "USER":
            return {
                user: action.payload,
                loggedIn: false
            }
        default:
            return state
    }
}
export default createStore(reducer)