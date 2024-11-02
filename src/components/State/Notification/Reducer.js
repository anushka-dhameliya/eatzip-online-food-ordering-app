import {
    FILTER_NOTIFICATION_FAILURE,
    FILTER_NOTIFICATION_REQUEST,
    FILTER_NOTIFICATION_SUCCESS,
    GET_ALL_NOTIFICATIONS_FAILURE,
    GET_ALL_NOTIFICATIONS_REQUEST,
    GET_ALL_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATION_BY_ID_FAILURE,
    GET_NOTIFICATION_BY_ID_REQUEST,
    GET_NOTIFICATION_BY_ID_SUCCESS,
    GET_NOTIFICATION_COUNT_FAILURE,
    GET_NOTIFICATION_COUNT_REQUEST,
    GET_NOTIFICATION_COUNT_SUCCESS,
    UPDATE_NOTIFICATION_STATUS_FAILURE,
    UPDATE_NOTIFICATION_STATUS_REQUEST,
    UPDATE_NOTIFICATION_STATUS_SUCCESS
} from "./ActionType";

const initialState = {
    notifications: [],
    notificationCount: 0,
    notification: null,
    isLoading: false,
    error: null,
    success: null
}

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NOTIFICATIONS_REQUEST:
        case GET_NOTIFICATION_BY_ID_REQUEST:
        case UPDATE_NOTIFICATION_STATUS_REQUEST:
        case GET_NOTIFICATION_COUNT_REQUEST:
        case FILTER_NOTIFICATION_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case GET_NOTIFICATION_COUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                notificationCount: action.payload,
                success: "Get Notification Count Success"
            };

        case GET_ALL_NOTIFICATIONS_SUCCESS:
        case FILTER_NOTIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                notifications: action.payload,
                success: "Get All Notifications Success"
            };

        case UPDATE_NOTIFICATION_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                notification: action.payload,
                notifications: state.notifications.map((item) => item.id === action.payload.id ? action.payload : item),
                success: "Update Notification Status Success"
            };

        case GET_NOTIFICATION_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                notification: action.payload,
                notifications: [...state.notifications, action.payload],
                success: "Get Notification By Id Success"
            };

        case GET_ALL_NOTIFICATIONS_FAILURE:
        case GET_NOTIFICATION_BY_ID_FAILURE:
        case UPDATE_NOTIFICATION_STATUS_FAILURE:
        case GET_NOTIFICATION_COUNT_FAILURE:
        case FILTER_NOTIFICATION_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

export default notificationReducer;
