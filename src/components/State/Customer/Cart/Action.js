
import { errorAlert, saveAlert, successAlert } from "../../../config/alert";
import { api } from "../../../config/api";
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


export const addItemToCart = ({ jwtToken, cartItemData }) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
        const { data } = await api.put(`api/cart/cart-item/add`, cartItemData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        successAlert("Item added to Cart Sucessfully.");

        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const updateCartItemQuantity = ({ jwtToken, cartItemId, quantity }) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_QUANTITY_REQUEST });
    try {
        const { data } = await api.put(`api/cart/cart-item/update/${cartItemId}?quantity=${quantity}`, {}, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Cart item quantity updated Successfully.");
        dispatch({ type: UPDATE_CART_ITEM_QUANTITY_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_CART_ITEM_QUANTITY_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const removeCartItem = ({ jwtToken, cartItemId }) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    try {
        const { data } = await api.delete(`api/cart/cart-item/remove/${cartItemId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        successAlert("Cart item removed Successfully.");
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
    }
    catch (error) {
        dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const calculateCartTotal = ({ jwtToken, cartId }) => async (dispatch) => {
    dispatch({ type: CALCULATE_CART_TOTAL_REQUEST });
    try {
        const { data } = await api.get(`api/cart/total/${cartId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: CALCULATE_CART_TOTAL_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CALCULATE_CART_TOTAL_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getCartById = ({ jwtToken, cartId }) => async (dispatch) => {
    dispatch({ type: GET_CART_BY_ID_REQUEST });
    try {
        
        const { data } = await api.get(`api/cart/${cartId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_CART_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_CART_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getCartByUserId = ({ jwtToken, userId }) => async (dispatch) => {
    dispatch({ type: GET_CART_BY_USER_ID_REQUEST });
    try {
        const { data } = await api.get(`api/cart/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_CART_BY_USER_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_CART_BY_USER_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const clearCart = ({ jwtToken, userId }) => async (dispatch) => {
    dispatch({ type: CLEAR_CART_REQUEST });
    try {
        const { data } = await api.put(`api/cart/clear/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: CLEAR_CART_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CLEAR_CART_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}