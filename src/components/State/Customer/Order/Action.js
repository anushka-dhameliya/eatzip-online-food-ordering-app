import { errorAlert, orderCreatedSuccess, saveAlert } from "../../../config/alert";
import { api } from "../../../config/api";
import { 
    CANCEL_ORDER_FAILURE,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS,
    FILTER_ORDER_FAILURE,
    FILTER_ORDER_REQUEST,
    FILTER_ORDER_SUCCESS,
    GET_ALL_ORDERS_BY_USER_ID_FAILURE,
    GET_ALL_ORDERS_BY_USER_ID_REQUEST,
    GET_ALL_ORDERS_BY_USER_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_PAYMENT_RECEIPT_URL_FAILURE,
    GET_PAYMENT_RECEIPT_URL_REQUEST,
    GET_PAYMENT_RECEIPT_URL_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS
} from "./ActionType";



export const createOrder = ({ jwtToken, orderData }) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await api.post(`api/order`, orderData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        orderCreatedSuccess();

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const updateOrderStatus = ({ jwtToken, orderId, orderStatus }) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
        const { data } = await api.put(`api/order/${orderId}?orderStatus=${orderStatus}`, {}, {
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

export const cancelOrder = ({ jwtToken, orderId }) => async (dispatch) => {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    try {
        const { data } = await api.delete(`api/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: CANCEL_ORDER_SUCCESS, payload: orderId });
    }
    catch (error) {
        dispatch({ type: CANCEL_ORDER_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}

export const getOrderById = ({ jwtToken, orderId }) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`api/order/${orderId}`, {
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

export const getAllOrdersByUserId = ({ jwtToken }) => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDERS_BY_USER_ID_REQUEST });
    try {
        const { data } = await api.get(`api/order`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_ALL_ORDERS_BY_USER_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ALL_ORDERS_BY_USER_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const filterOrdersByUserId = ({ jwtToken, status }) => async (dispatch) => {
    dispatch({ type: FILTER_ORDER_REQUEST });
    try {
        const { data } = await api.get(`api/order/filter?status=${status}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: FILTER_ORDER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: FILTER_ORDER_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getPaymentReceiptUrl = ({ jwtToken, orderId }) => async (dispatch) => {
    dispatch({ type: GET_PAYMENT_RECEIPT_URL_REQUEST });
    try {
        const { data } = await api.get(`api/order/payment-receipt/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        if(data.payment_receipt_url !== null && data.payment_receipt_url !== undefined && data.payment_receipt_url != ''){
            window.open(data.payment_receipt_url, '_blank').focus();
        }
        else{
            errorAlert("No receipt found.");
        }

        dispatch({ type: GET_PAYMENT_RECEIPT_URL_SUCCESS, payload: data });
        
    }
    catch (error) {
        dispatch({ type: GET_PAYMENT_RECEIPT_URL_FAILURE, payload: error });
        console.log("error", error);
        errorAlert("No receipt found.");
    }
}