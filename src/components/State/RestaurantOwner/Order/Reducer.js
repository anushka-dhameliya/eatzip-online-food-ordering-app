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

const initialState = {
    restaurantOrders: [],
    order: null,
    isLoading: false,
    error: null,
    success: null
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ORDER_STATUS_REQUEST:
        case GET_ORDER_BY_ID_REQUEST:
        case GET_ALL_ORDERS_BY_RESTAURANT_ID_REQUEST:
        case FILTER_ORDERS_BY_RESTAURANT_ID_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
                restaurantOrders: state.restaurantOrders.map((item) => item.id === action.payload.id ? action.payload : item),
                success: "Update Order Status Success"
            };
        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, isLoading: false, order: action.payload, success: "Get Order By Id Success" };

        case GET_ALL_ORDERS_BY_RESTAURANT_ID_SUCCESS:
        case FILTER_ORDERS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, isLoading: false, restaurantOrders: action.payload, success: "Get All Orders By Restaurant Id Success" };

        case UPDATE_ORDER_STATUS_FAILURE:
        case GET_ORDER_BY_ID_FAILURE:
        case GET_ALL_ORDERS_BY_RESTAURANT_ID_FAILURE:
        case FILTER_ORDERS_BY_RESTAURANT_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

export default orderReducer;
