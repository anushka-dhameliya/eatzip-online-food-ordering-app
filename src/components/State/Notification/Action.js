
import { errorAlert } from "../../config/alert";
import { api } from "../../config/api";
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


export const updateNotificationStatus = ({ jwtToken, id, status }) => async (dispatch) => {
    dispatch({ type: UPDATE_NOTIFICATION_STATUS_REQUEST });
    try {

        const { data } = await api.put(`api/notifications/${id}?status=${status}`, {}, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: UPDATE_NOTIFICATION_STATUS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UPDATE_NOTIFICATION_STATUS_FAILURE, payload: error });
        console.log("error", error);
        errorAlert(error.response.data.message);
    }
}


export const getNotificationById = ({ jwtToken, id }) => async (dispatch) => {
    dispatch({ type: GET_NOTIFICATION_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`api/notifications/${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_NOTIFICATION_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_NOTIFICATION_BY_ID_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getAllNotifications = ({ jwtToken }) => async (dispatch) => {
    dispatch({ type: GET_ALL_NOTIFICATIONS_REQUEST });
    try {
        const { data } = await api.get(`api/notifications`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_ALL_NOTIFICATIONS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_ALL_NOTIFICATIONS_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getNotificationCount = ({ jwtToken }) => async (dispatch) => {
    dispatch({ type: GET_NOTIFICATION_COUNT_REQUEST });
    try {
        const { data } = await api.get(`api/notifications/count`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: GET_NOTIFICATION_COUNT_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_NOTIFICATION_COUNT_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const filterNotifications = ({ jwtToken, status }) => async (dispatch) => {
    dispatch({ type: FILTER_NOTIFICATION_REQUEST });
    try {
        const { data } = await api.get(`api/notifications/filter?status=${status}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        dispatch({ type: FILTER_NOTIFICATION_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: FILTER_NOTIFICATION_FAILURE, payload: error });
        console.log("error", error);
    }
}
