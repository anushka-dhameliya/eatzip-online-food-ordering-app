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

const initialState = {
    usersOrders: [],
    order: null,
    paymentReceiptUrl: null,
    isLoading: false,
    error: null,
    success: null
}

export const orderCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case UPDATE_ORDER_STATUS_REQUEST:
        case CANCEL_ORDER_REQUEST:
        case GET_ORDER_BY_ID_REQUEST:
        case GET_ALL_ORDERS_BY_USER_ID_REQUEST:
        case FILTER_ORDER_REQUEST:
        case GET_PAYMENT_RECEIPT_URL_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
                usersOrders: [...state.usersOrders, action.payload],
                success: "Create Order Success"
            };

        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
                usersOrders: state.usersOrders.map((item) => item.id === action.payload.id ? action.payload : item),
                success: "Update Order Status Success"
            };

        case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: null,
                usersOrders: state.usersOrders.filter((item) => item.id !== action.payload),
                success: "Cancel Order Success"
            };

        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, isLoading: false, order: action.payload, success: "Get Order By Id Success" };

        case GET_ALL_ORDERS_BY_USER_ID_SUCCESS:
        case FILTER_ORDER_SUCCESS:
            return { ...state, isLoading: false, usersOrders: action.payload, success: "Get All Orders By User Id Success" };

        case GET_PAYMENT_RECEIPT_URL_SUCCESS:
            return { ...state, isLoading: false, paymentReceiptUrl: action.payload, success: "Get payment receipt url Success" };


        case CREATE_ORDER_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
        case CANCEL_ORDER_FAILURE:
        case GET_ORDER_BY_ID_FAILURE:
        case GET_ALL_ORDERS_BY_USER_ID_FAILURE:
        case FILTER_ORDER_FAILURE:
        case GET_PAYMENT_RECEIPT_URL_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

export default orderCustomerReducer;
