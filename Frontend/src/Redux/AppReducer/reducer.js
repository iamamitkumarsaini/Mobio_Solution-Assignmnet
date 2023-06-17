import * as types from "./actionTypes";

const initState = {
    isLoading: false,
    isError: false,
    products: [],
    totalCount: 0,
    addToCartData: [],
    getCartData: [],
    updateCartData: [],
    emptyCart: [],
    deleteCartData: []  // Order Placed
};

export const reducer = (oldState = initState, action) => {

    const { type, payload } = action;

    switch(type){
        case types.GET_PRODUCTS_DATA_REQUEST:
            return {
                ...oldState,
                isLoading:true
            };

        case types.GET_PRODUCTS_DATA_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                products:payload,
            };
        
        case types.GET_PRODUCTS_DATA_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
            };

        case types.GET_TOTAL_COUNT :
                return {
                    ...oldState,
                    totalCount:payload
            };


        case types.POST_ADD_TO_CART_REQUEST:
            return {
                ...oldState,
                isLoading:true
            };

        case types.POST_ADD_TO_CART_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                addToCartData:payload
            };
        
        case types.POST_ADD_TO_CART_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
            };
            
        case types.GET_USER_CART_DATA_REQUEST:
            return {
                ...oldState,
                isLoading:true,
        };

        case types.GET_USER_CART_DATA_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                getCartData:payload
        };

        case types.GET_USER_CART_DATA_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
        };


        case types.PATCH_CART_DATA_REQUEST:
            return {
                ...oldState,
                isLoading:true,
        };

        case types.PATCH_CART_DATA_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                updateCartData:payload
        };

        case types.PATCH_CART_DATA_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
        };

        case types.EMPTY_CART_DATA_REQUEST:
            return {
                ...oldState,
                isLoading:true,
        };

        case types.EMPTY_CART_DATA_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                emptyCart:payload
        };

        case types.EMPTY_CART_DATA_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
        };

        case types.DELETE_CART_DATA_REQUEST:
            return {
                ...oldState,
                isLoading:true,
        };

        case types.DELETE_CART_DATA_SUCCESS:
            return {
                ...oldState,
                isLoading:false,
                deleteCartData:payload
        };

        case types.DELETE_CART_DATA_FAILURE:
            return {
                ...oldState,
                isLoading:false,
                isError:true
        };
         
        default: 
            return oldState
    }
}