import {
    ADD_ITEM_TO_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    CALCULATE_CART_TOTAL_FAILURE,
    CALCULATE_CART_TOTAL_REQUEST,
    CALCULATE_CART_TOTAL_SUCCESS,
    CLEAR_CART_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    GET_CART_BY_ID_FAILURE,
    GET_CART_BY_ID_REQUEST,
    GET_CART_BY_ID_SUCCESS,
    GET_CART_BY_USER_ID_FAILURE,
    GET_CART_BY_USER_ID_REQUEST,
    GET_CART_BY_USER_ID_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_QUANTITY_FAILURE,
    UPDATE_CART_ITEM_QUANTITY_REQUEST,
    UPDATE_CART_ITEM_QUANTITY_SUCCESS
} from "./ActionType";

const initialState = {
    cart: {},
    cartItems: [],
    cartTotal: null,
    isLoading: false,
    error: null,
    success: null
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART_REQUEST:
        case UPDATE_CART_ITEM_QUANTITY_REQUEST:
        case REMOVE_CART_ITEM_REQUEST:
        case CALCULATE_CART_TOTAL_REQUEST:
        case GET_CART_BY_ID_REQUEST:
        case GET_CART_BY_USER_ID_REQUEST:
        case CLEAR_CART_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: [...state.cartItems, action.payload],
                success: "Add Cart Item Success"
            };

        case UPDATE_CART_ITEM_QUANTITY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: state.cartItems.map((item) => item.id === action.payload.id ? action.payload : item),
                success: "Update Cart Item Quantity Success"
            };

        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cart: action.payload,
                cartItems: action.payload.cartItems,
                success: "Remove Cart Item Success"
            };

        case CALCULATE_CART_TOTAL_SUCCESS:
            return { ...state, isLoading: false, cartTotal: action.payload, success: "Calculate Cart Total Success" };

        case GET_CART_BY_ID_SUCCESS:
            return { 
                ...state, 
                isLoading: false, 
                cart: action.payload, 
                cartItems: action.payload.cartItems, 
                success: "Get Cart Success" 
            };

        case GET_CART_BY_USER_ID_SUCCESS:
            return { 
                ...state, 
                isLoading: false, 
                cart: action.payload, 
                cartItems: action.payload.cartItems, 
                success: "Get Cart By User Id Success" 
            };

        case CLEAR_CART_SUCCESS:
            return { ...state, isLoading: false, cart: {}, cartItems: [], success: "Clear Cart Success" };


        case ADD_ITEM_TO_CART_FAILURE:
        case UPDATE_CART_ITEM_QUANTITY_FAILURE:
        case REMOVE_CART_ITEM_FAILURE:
        case CALCULATE_CART_TOTAL_FAILURE:
        case GET_CART_BY_ID_FAILURE:
        case GET_CART_BY_USER_ID_FAILURE:
        case CLEAR_CART_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

export default cartReducer;