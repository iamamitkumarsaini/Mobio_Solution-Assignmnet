import axios from "axios";
import * as types from "./actionTypes";

const getProductsDataRequest = () => {

    return {
        type : types.GET_PRODUCTS_DATA_REQUEST
    }
}

const getProductsDataSuccess = (payload,totalCount) => {

    return {
        type : types.GET_PRODUCTS_DATA_SUCCESS,
        payload
    }
}

const getProductsDataFailure = () => {

    return {
        type : types.GET_PRODUCTS_DATA_FAILURE
    }
}

const getTotalCountSuccess = (payload) => {
    return{
        type : types.GET_TOTAL_COUNT,
        payload
    }
}

const postAddToCartRequest = () => {

    return {
        type : types.POST_ADD_TO_CART_REQUEST
    }
}

const postAddToCartSuccess = (payload) => {

    return {
        type : types.POST_ADD_TO_CART_SUCCESS,
        payload
    }
}

const postAddToCartFailure = () => {

    return {
        type : types.POST_ADD_TO_CART_FAILURE
    }
}

const getUserCartDataRequest = () => {

    return {
        type : types.GET_USER_CART_DATA_REQUEST
    }
}

const getUserCartDataSuccess = (payload) => {

    return {
        type : types.GET_USER_CART_DATA_SUCCESS,
        payload
    }
}

const getUserCartDataFailure = () => {

    return {
        type : types.GET_USER_CART_DATA_FAILURE
    }
}

const patchCartDataRequest = () => {

    return {
        type : types.PATCH_CART_DATA_REQUEST
    }
}

const patchCartDataSuccess = (payload) => {

    return {
        type : types.PATCH_CART_DATA_SUCCESS,
        payload
    }
}

const patchCartDataFailure = () => {

    return {
        type : types.PATCH_CART_DATA_FAILURE
    }
}

const emptyCartDataRequest = () => {

    return {
        type : types.EMPTY_CART_DATA_REQUEST
    }
}

const emptyCartDataSuccess = (payload) => {

    return {
        type : types.EMPTY_CART_DATA_SUCCESS,
        payload
    }
}

const emptyCartDataFailure = () => {

    return {
        type : types.EMPTY_CART_DATA_FAILURE
    }
}

const deleteCartDataRequest = () => {

    return {
        type : types.DELETE_CART_DATA_REQUEST
    }
}

const deleteCartDataSuccess = (payload) => {

    return {
        type : types.DELETE_CART_DATA_SUCCESS,
        payload
    }
}

const deleteCartDataFailure = () => {

    return {
        type : types.DELETE_CART_DATA_FAILURE
    }
}





const getProductsData = (page,search,sort) => (dispatch) => {

    dispatch(getProductsDataRequest());

    return axios.get(`http://localhost:8090/products?page=${page}&sort=${sort}&search=${search}`
    // {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       authentication: `Bearer ${JSON.parse(localStorage.getItem("mobioToken"))}`
    //     }
        
    // }
    )
    .then((res) => {
        console.log("Get data", res.data)
        dispatch(getProductsDataSuccess(res.data.products));
        dispatch(getTotalCountSuccess(res.data.totalCount));
        })
    .catch((err) => {
        console.log(err);
        dispatch(getProductsDataFailure())
    })

}

const postAddToCartData = (payload) => (dispatch) => {

    dispatch(postAddToCartRequest());

    return axios.post(`http://localhost:8090/add/cart`,payload,{
        headers: {
          'Content-Type': 'application/json',
          authentication: `Bearer ${JSON.parse(localStorage.getItem("mobioToken"))}`
        }
    })
    .then((res) => {
        return dispatch(postAddToCartSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(postAddToCartFailure());
    })
}


const getUserCartData = () => (dispatch) => {

    dispatch(getUserCartDataRequest());

    return axios.get(`http://localhost:8090/get/user/cart`,{
        headers: {
            'Content-Type': 'application/json',
            authentication: `Bearer ${JSON.parse(localStorage.getItem("mobioToken"))}`
        }
    })
    .then((res) => {
        return dispatch(getUserCartDataSuccess(res.data));
    })
    .catch((err) => {
        console.log(err);
        dispatch(getUserCartDataFailure());
    })
}







const updateCartData = (id,payload) => (dispatch) => {

    dispatch(patchCartDataRequest());

    return axios.patch(`http://localhost:8090/update/cart/${id}`,payload,{
        headers: {
            'Content-Type': 'application/json',
            authentication: `Bearer ${JSON.parse(localStorage.getItem("mobioToken"))}`
        }
    })
    .then((res) => {
        return dispatch(patchCartDataSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(patchCartDataFailure());
    })
}


const removeDataFromCart = (id) => (dispatch) => {

    dispatch(emptyCartDataRequest());

    return axios.delete(`http://localhost:8090/delete/cart/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            authentication: `Bearer ${JSON.parse(localStorage.getItem("mobioToken"))}`
        }
    })
    .then((res) => {
        return dispatch(emptyCartDataSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(emptyCartDataFailure());
    })
}






const deleteCartData = () => (dispatch) => {

    dispatch(deleteCartDataRequest());

    return axios.get(`http://localhost:8090/deletecart`, 
    // {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         authentication: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    //     }
    // }
    )
    .then((res) => {
        return dispatch(deleteCartDataSuccess([res.data]));
    })
    .catch((err) => {
        console.log(err);
        dispatch(deleteCartDataFailure())
    })
}



export { getProductsData, postAddToCartData, getUserCartData, updateCartData, removeDataFromCart, deleteCartData }