import { errorAlert, saveAlert } from "../../../config/alert";
import { api } from "../../../config/api";
import { 
    FILTER_ORDERS_BY_RESTAURANT_ID_FAILURE,
    FILTER_ORDERS_BY_RESTAURANT_ID_REQUEST,
    FILTER_ORDERS_BY_RESTAURANT_ID_SUCCESS,
    GET_ALL_ORDERS_BY_RESTAURANT_ID_FAILURE,
    GET_ALL_ORDERS_BY_RESTAURANT_ID_REQUEST,
    GET_ALL_ORDERS_BY_RESTAURANT_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS
} from "./ActionType";

export const updateOrderStatus = ({ jwtToken, orderId, orderStatus }) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
        const { data } = await api.put(`api/admin/order/${orderId}?orderStatus=${orderStatus}`, {}, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        saveAlert("Order status changed Successfully.");

        dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const getOrderById = ({ jwtToken, orderId }) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`api/admin/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getAllOrdersByRestaurantId = ({ jwtToken, restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDERS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`api/admin/order/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_ALL_ORDERS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ALL_ORDERS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const filterOrdersByRestaurantId = ({ jwtToken, restaurantId, status }) => async (dispatch) => {
    dispatch({ type: FILTER_ORDERS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`api/admin/order/restaurant/${restaurantId}/filter?status=${status}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: FILTER_ORDERS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: FILTER_ORDERS_BY_RESTAURANT_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}