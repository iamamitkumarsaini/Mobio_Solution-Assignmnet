import * as types from "./actionTypes";
import axios from "axios";


const postSignupRequest = () => {

    return {
        type : types.USER_SIGNUP_REQUEST
    }
}



const postSignupSuccess = (payload) => {

    return {
        type : types.USER_SIGNUP_SUCCESS,
        payload
    }
}



const postSignupFailure = () => {

    return {
        type : types.USER_SIGNUP_FAILURE
    }
}

const postLoginRequest = () => {

    return {
        type : types.USER_lOGIN_REQUEST
    }
}



const postLoginSuccess = (payload) => {

    return {
        type : types.USER_lOGIN_SUCCESS,
        payload
    }
}



const postLoginFailure = () => {

    return {
        type : types.USER_lOGIN_FAILURE
    }
}


const postsignupUser = (payload) => (dispatch) => {

    dispatch(postSignupRequest());

    return axios.post(`http://localhost:8090/signup`,payload)
    .then((res) => {
        return dispatch(postSignupSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(postSignupFailure());
    })
    
}


const postLoginUser = (payload) => (dispatch) => {

    dispatch(postLoginRequest());

    return axios.post(`http://localhost:8090/login`,payload)
    .then((res) => {
        console.log("LOgin Data",res.data.user)
        localStorage.setItem("mobioToken",JSON.stringify(res.data.token))
        localStorage.setItem("userData",JSON.stringify(res.data.user))
        return dispatch(postLoginSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(postLoginFailure());
    })
    
}



export { postLoginUser, postsignupUser }